// QuickAdd user script: pick a tag, then pick a file that has that tag.
//
// Result:
//   - Inserts a link to the chosen file at the cursor in the active note
//   - Sets the QuickAdd variable {{VALUE:pickedFile}} to a [[wikilink]] of the chosen file
//   - Returns the same link (usable as {{MACRO:<macro name>}} in templates)
//   - Optionally opens the file (see "Open file" setting)

module.exports = {
    entry: async (params, settings) => {
        const { app, quickAddApi, obsidian } = params;

        // Grab the active editor now, before the suggesters take focus
        const editor = app.workspace.activeEditor?.editor
            ?? app.workspace.getActiveViewOfType(obsidian.MarkdownView)?.editor;
        const sourcePath = app.workspace.getActiveFile()?.path ?? "";

        // 1. Build a map of tag -> files
        const tagToFiles = new Map();
        for (const file of app.vault.getMarkdownFiles()) {
            const cache = app.metadataCache.getFileCache(file);
            if (!cache) continue;
            const tags = new Set(obsidian.getAllTags(cache) ?? []);
            for (const tag of tags) {
                const key = tag.toLowerCase();
                if (!tagToFiles.has(key)) tagToFiles.set(key, { display: tag, files: [] });
                tagToFiles.get(key).files.push(file);
            }
        }

        if (tagToFiles.size === 0) {
            new obsidian.Notice("No tags found in the vault.");
            return;
        }

        // 2. Pick a tag
        const tagEntries = [...tagToFiles.values()].sort((a, b) =>
            a.display.localeCompare(b.display)
        );
        const pickedTag = await quickAddApi.suggester(
            tagEntries.map((t) => `${t.display} (${t.files.length})`),
            tagEntries
        );
        if (!pickedTag) return;

        // 3. Pick a file with that tag
        const files = pickedTag.files.sort((a, b) => a.basename.localeCompare(b.basename));
        const pickedFile = await quickAddApi.suggester(
            files.map((f) => (f.parent && f.parent.path !== "/" ? `${f.basename}  —  ${f.parent.path}` : f.basename)),
            files
        );
        if (!pickedFile) return;

        // 4. Output
        const link = app.fileManager.generateMarkdownLink(pickedFile, sourcePath);
        params.variables.pickedFile = link;
        params.variables.pickedTag = pickedTag.display;

        // Write the link at the cursor (replaces selection if any)
        if (editor) {
            editor.replaceSelection(link);
            editor.focus();
        } else {
            new obsidian.Notice("No open note to insert the link into.");
        }

        if (settings["Open file"]) {
            await app.workspace.getLeaf(false).openFile(pickedFile);
        }

        return link;
    },
    settings: {
        name: "Pick Tag → File",
        author: "",
        options: {
            "Open file": {
                type: "toggle",
                defaultValue: false,
            },
        },
    },
};
