// Templater user script: pick a tag, then a file with that tag, and return a link to it.
// Usage in a template:
//   <% await tp.user.pickTagLink(tp) %>               -> asks for the tag
//   <% await tp.user.pickTagLink(tp, "location") %>   -> uses #location (and nested #location/...)
//   <% await tp.user.pickTagLink(tp, "location", "Home town") %> -> custom label in the prompt
//
// If no label is given, the prompt shows the text written before the call on the same line
// (e.g. "Belongs to"), or the previous non-empty line if the call is alone on its line.

const EMPTY = { empty: true };
const EMPTY_LABEL = "— (empty) —";

const CALL_PATTERN =/tp\.user\.pickTagLink\s*\(/;
// Counts calls per template so each call finds its own line when used several times
const callCounters = new Map();

async function getContextLabel(tp) {
    try {
        const file = tp.config.template_file ?? tp.config.target_file;
        if (!file) return "";
        const lines = (await app.vault.read(file)).split(/\r?\n/);
        const callLines = lines
            .map((line, i) => (CALL_PATTERN.test(line) ? i : -1))
            .filter((i) => i >= 0);
        if (callLines.length === 0) return "";

        const n = callCounters.get(file.path) ?? 0;
        callCounters.set(file.path, (n + 1) % callLines.length);
        const lineIndex = callLines[n % callLines.length];

        // Text before "<%" on the same line
        const before = lines[lineIndex].split("<%")[0].trim();
        if (before) return before;

        // Otherwise the previous non-empty line (ignoring "---" separators)
        for (let i = lineIndex - 1; i >= 0; i--) {
            const prev = lines[i].trim();
            if (prev && prev !== "---") return prev;
        }
    } catch (e) {
        console.warn("pickTagLink: could not read context line", e);
    }
    return "";
}

function getTags(cache) {
    const tags = new Set();
    for (const t of cache.tags ?? []) tags.add(t.tag);

    let fm = cache.frontmatter?.tags ?? cache.frontmatter?.tag;
    if (typeof fm === "string") fm = fm.split(/[,\s]+/);
    for (const t of Array.isArray(fm) ? fm : []) {
        if (!t) continue;
        const s = String(t).trim();
        if (s) tags.add(s.startsWith("#") ? s : "#" + s);
    }
    return tags;
}

async function pickTagLink(tp, tag, label) {
    label = (typeof label === "string" && label.trim()) || (await getContextLabel(tp));
    const prefix = label ? `${label} → ` : "";

    // tag (lowercase) -> { display, files }
    const tagToFiles = new Map();
    for (const file of app.vault.getMarkdownFiles()) {
        const cache = app.metadataCache.getFileCache(file);
        if (!cache) continue;
        for (const tag of getTags(cache)) {
            const key = tag.toLowerCase();
            if (!tagToFiles.has(key)) tagToFiles.set(key, { display: tag, files: [] });
            tagToFiles.get(key).files.push(file);
        }
    }

    let pickedTag;
    if (typeof tag === "string" && tag.trim()) {
        // Tag given: collect files with that tag or any nested tag (#tag/...)
        const wanted = "#" + tag.trim().replace(/^#/, "").toLowerCase();
        const files = new Set();
        for (const [key, entry] of tagToFiles) {
            if (key === wanted || key.startsWith(wanted + "/")) {
                entry.files.forEach((f) => files.add(f));
            }
        }
        if (files.size === 0) {
            new Notice(`No files found with tag ${wanted}`);
            return "";
        }
        pickedTag = { display: wanted, files: [...files] };
    } else {
        // No tag given: ask for one
        const tagEntries = [...tagToFiles.values()].sort((a, b) =>
            a.display.localeCompare(b.display)
        );
        pickedTag = await tp.system.suggester(
            [EMPTY_LABEL, ...tagEntries.map((t) => `${t.display} (${t.files.length})`)],
            [EMPTY, ...tagEntries],
            false,
            `${prefix}Pick a tag`
        );
        if (!pickedTag || pickedTag === EMPTY) return "";
    }

    const files = pickedTag.files.sort((a, b) => a.basename.localeCompare(b.basename));
    const pickedFile = await tp.system.suggester(
        [EMPTY_LABEL, ...files.map((f) => (f.parent && f.parent.path !== "/" ? `${f.basename}  —  ${f.parent.path}` : f.basename))],
        [EMPTY, ...files],
        false,
        `${prefix}Pick a file tagged ${pickedTag.display}`
    );
    if (!pickedFile || pickedFile === EMPTY) return "";

    const sourcePath = app.workspace.getActiveFile()?.path ?? "";
    return app.fileManager.generateMarkdownLink(pickedFile, sourcePath);
}

module.exports = pickTagLink;
