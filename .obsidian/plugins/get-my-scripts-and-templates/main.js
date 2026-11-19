var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => GetMyScriptsPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian5 = require("obsidian");

// src/github.ts
var import_obsidian = require("obsidian");
var API = "https://api.github.com";
async function gh(cfg, path) {
  var _a, _b;
  const params = {
    url: `${API}${path}`,
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {}
    },
    throw: false
  };
  const res = await (0, import_obsidian.requestUrl)(params);
  if (res.status >= 400) {
    let detail = "";
    try {
      detail = (_b = (_a = res.json) == null ? void 0 : _a.message) != null ? _b : "";
    } catch (e) {
    }
    throw new Error(`GitHub API ${res.status} on ${path}${detail ? `: ${detail}` : ""}`);
  }
  return res.json;
}
var enc = encodeURIComponent;
async function getLatestCommit(cfg) {
  var _a, _b;
  const data = await gh(
    cfg,
    `/repos/${enc(cfg.owner)}/${enc(cfg.repo)}/commits/${enc(cfg.branch)}`
  );
  return {
    sha: data.sha,
    message: data.commit.message,
    date: (_b = (_a = data.commit.committer) == null ? void 0 : _a.date) != null ? _b : ""
  };
}
async function getTree(cfg, commitSha) {
  const data = await gh(cfg, `/repos/${enc(cfg.owner)}/${enc(cfg.repo)}/git/trees/${commitSha}?recursive=1`);
  if (data.truncated) {
    throw new Error(
      "Repository tree is too large for the GitHub API (truncated). Use a smaller repo for templates/scripts."
    );
  }
  return data.tree.filter((e) => e.type === "blob").map((e) => ({ path: e.path, sha: e.sha }));
}
async function getBlob(cfg, sha) {
  const data = await gh(
    cfg,
    `/repos/${enc(cfg.owner)}/${enc(cfg.repo)}/git/blobs/${sha}`
  );
  if (data.encoding !== "base64")
    throw new Error(`Unexpected blob encoding: ${data.encoding}`);
  const bin = atob(data.content.replace(/\s/g, ""));
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++)
    bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}
async function gitBlobSha(content) {
  const header = new TextEncoder().encode(`blob ${content.byteLength}\0`);
  const buf = new Uint8Array(header.length + content.byteLength);
  buf.set(header, 0);
  buf.set(new Uint8Array(content), header.length);
  const digest = await crypto.subtle.digest("SHA-1", buf);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// src/modal.ts
var import_obsidian2 = require("obsidian");
var LABEL = { add: "New", update: "Changed", delete: "Removed" };
var UpdateModal = class extends import_obsidian2.Modal {
  constructor(app, plan, commit, onDecide) {
    super(app);
    this.plan = plan;
    this.commit = commit;
    this.onDecide = onDecide;
    this.decided = false;
    this.selected = new Set(plan.changes.filter((c) => !c.locallyModified).map((c) => c.localPath));
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.titleEl.setText("Templates & scripts update available");
    const firstLine = this.commit.message.split("\n")[0];
    contentEl.createEl("p", {
      text: `Latest commit ${this.commit.sha.slice(0, 7)}: "${firstLine}"`
    });
    const conflicts = this.plan.changes.filter((c) => c.locallyModified).length;
    if (conflicts > 0) {
      contentEl.createEl("p", {
        cls: "mod-warning",
        text: `${conflicts} file(s) were edited in this vault. They are unchecked so your edits are kept; check them to overwrite with the repo version.`
      });
    }
    const list = contentEl.createDiv({ cls: "gmst-change-list" });
    for (const c of this.plan.changes) {
      const desc = c.locallyModified ? `${LABEL[c.kind]} \u2014 edited locally` : LABEL[c.kind];
      new import_obsidian2.Setting(list).setName(c.localPath).setDesc(desc).addToggle(
        (t) => t.setValue(this.selected.has(c.localPath)).onChange((v) => {
          if (v)
            this.selected.add(c.localPath);
          else
            this.selected.delete(c.localPath);
        })
      );
    }
    new import_obsidian2.Setting(contentEl).addButton(
      (b) => b.setButtonText("Update").setCta().onClick(
        () => this.finish({
          action: "update",
          changes: this.plan.changes.filter((c) => this.selected.has(c.localPath))
        })
      )
    ).addButton((b) => b.setButtonText("Later").onClick(() => this.finish({ action: "later" }))).addButton(
      (b) => b.setButtonText("Skip this version").setTooltip("Don't ask again until the repo changes again").onClick(() => this.finish({ action: "skip" }))
    );
  }
  finish(d) {
    this.decided = true;
    this.onDecide(d);
    this.close();
  }
  onClose() {
    this.contentEl.empty();
    if (!this.decided)
      this.onDecide({ action: "later" });
  }
};

// src/settings.ts
var import_obsidian3 = require("obsidian");
var DEFAULT_SETTINGS = {
  owner: "",
  repo: "",
  branch: "main",
  token: "",
  mappings: [
    { remotePath: "templates", localPath: "Templates" },
    { remotePath: "scripts", localPath: "Scripts" }
  ],
  checkOnStartup: true,
  checkIntervalMinutes: 60,
  lastSyncedSha: "",
  skippedSha: "",
  syncedFiles: {}
};
var SettingsTab = class extends import_obsidian3.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    const s = this.plugin.settings;
    const save = () => this.plugin.saveSettings();
    containerEl.empty();
    new import_obsidian3.Setting(containerEl).setName("Repository").setHeading();
    new import_obsidian3.Setting(containerEl).setName("Repository").setDesc("GitHub repo as owner/name, or paste its URL.").addText(
      (t) => t.setPlaceholder("owner/my-templates").setValue(s.owner && s.repo ? `${s.owner}/${s.repo}` : "").onChange(async (v) => {
        const m = v.trim().replace(/\.git$/, "").match(/(?:github\.com[/:])?([^/\s]+)\/([^/\s]+)\/?$/);
        s.owner = m ? m[1] : "";
        s.repo = m ? m[2] : "";
        await save();
      })
    );
    new import_obsidian3.Setting(containerEl).setName("Branch").addText(
      (t) => t.setValue(s.branch).onChange(async (v) => {
        s.branch = v.trim() || "main";
        await save();
      })
    );
    new import_obsidian3.Setting(containerEl).setName("Access token").setDesc(
      "Needed for private repos (fine-grained token with read-only Contents access). Optional for public repos, but raises the API rate limit. Stored in this vault's plugin data.json."
    ).addText((t) => {
      t.inputEl.type = "password";
      t.setValue(s.token).onChange(async (v) => {
        s.token = v.trim();
        await save();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Folder mappings").setHeading();
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "Each repo folder is copied into the given vault folder. Leave the repo folder empty to use the repo root. Hidden folders and the .obsidian config folder are never written to."
    });
    s.mappings.forEach((m, i) => {
      new import_obsidian3.Setting(containerEl).addText(
        (t) => t.setPlaceholder("repo folder").setValue(m.remotePath).onChange(async (v) => {
          m.remotePath = v.trim();
          await save();
        })
      ).addText(
        (t) => t.setPlaceholder("vault folder").setValue(m.localPath).onChange(async (v) => {
          m.localPath = v.trim();
          await save();
        })
      ).addExtraButton(
        (b) => b.setIcon("trash").setTooltip("Remove mapping").onClick(async () => {
          s.mappings.splice(i, 1);
          await save();
          this.display();
        })
      );
    });
    new import_obsidian3.Setting(containerEl).addButton(
      (b) => b.setButtonText("Add mapping").onClick(async () => {
        s.mappings.push({ remotePath: "", localPath: "" });
        await save();
        this.display();
      })
    );
    new import_obsidian3.Setting(containerEl).setName("Update checks").setHeading();
    new import_obsidian3.Setting(containerEl).setName("Check when Obsidian starts").addToggle(
      (t) => t.setValue(s.checkOnStartup).onChange(async (v) => {
        s.checkOnStartup = v;
        await save();
      })
    );
    new import_obsidian3.Setting(containerEl).setName("Check every (minutes)").setDesc("0 turns periodic checks off.").addText((t) => {
      t.inputEl.type = "number";
      t.setValue(String(s.checkIntervalMinutes)).onChange(async (v) => {
        const n = Math.max(0, Math.floor(Number(v) || 0));
        s.checkIntervalMinutes = n;
        await save();
        this.plugin.restartInterval();
      });
    });
    new import_obsidian3.Setting(containerEl).setName("Check now").setDesc(
      s.lastSyncedSha ? `Last synced commit: ${s.lastSyncedSha.slice(0, 7)}` : "Nothing synced yet."
    ).addButton(
      (b) => b.setButtonText("Check for updates").onClick(() => this.plugin.checkForUpdates(true))
    );
  }
};

// src/sync.ts
var import_obsidian4 = require("obsidian");
function trimSlashes(p) {
  return p.replace(/^\/+|\/+$/g, "");
}
function mapRemoteToLocal(remoteFile, mappings) {
  for (const m of mappings) {
    const remote = trimSlashes(m.remotePath);
    const local = trimSlashes(m.localPath);
    let rel = null;
    if (remote === "")
      rel = remoteFile;
    else if (remoteFile.startsWith(remote + "/"))
      rel = remoteFile.slice(remote.length + 1);
    if (rel !== null)
      return (0, import_obsidian4.normalizePath)(local ? `${local}/${rel}` : rel);
  }
  return null;
}
function isAllowedTarget(vault, localPath) {
  const segments = localPath.split("/");
  if (segments.some((s) => s.startsWith(".") || s === ".."))
    return false;
  return !(localPath === vault.configDir || localPath.startsWith(vault.configDir + "/"));
}
async function localSha(vault, path) {
  const f = vault.getAbstractFileByPath(path);
  if (!(f instanceof import_obsidian4.TFile))
    return null;
  return gitBlobSha(await vault.readBinary(f));
}
async function buildPlan(vault, cfg, commitSha, mappings, synced) {
  const tree = await getTree(cfg, commitSha);
  const changes = [];
  const seen = /* @__PURE__ */ new Set();
  for (const entry of tree) {
    const localPath = mapRemoteToLocal(entry.path, mappings);
    if (!localPath || seen.has(localPath) || !isAllowedTarget(vault, localPath))
      continue;
    seen.add(localPath);
    const current = await localSha(vault, localPath);
    if (current === entry.sha)
      continue;
    if (current === null) {
      changes.push({ kind: "add", localPath, remoteSha: entry.sha, locallyModified: false });
    } else {
      const lastWritten = synced[localPath];
      changes.push({
        kind: "update",
        localPath,
        remoteSha: entry.sha,
        locallyModified: lastWritten !== current
      });
    }
  }
  for (const [localPath, lastWritten] of Object.entries(synced)) {
    if (seen.has(localPath))
      continue;
    const current = await localSha(vault, localPath);
    if (current === null)
      continue;
    changes.push({ kind: "delete", localPath, locallyModified: current !== lastWritten });
  }
  changes.sort((a, b) => a.localPath.localeCompare(b.localPath));
  const folders = /* @__PURE__ */ new Set();
  for (const e of tree) {
    const parts = e.path.split("/");
    for (let i = 1; i < parts.length && i <= 2; i++)
      folders.add(parts.slice(0, i).join("/"));
  }
  return { commitSha, changes, matchedFiles: seen.size, repoFolders: [...folders].sort() };
}
async function ensureFolder(vault, folderPath) {
  if (!folderPath || folderPath === "/")
    return;
  const existing = vault.getAbstractFileByPath(folderPath);
  if (existing instanceof import_obsidian4.TFolder)
    return;
  if (existing)
    throw new Error(`"${folderPath}" exists but is a file, not a folder`);
  const parent = folderPath.includes("/") ? folderPath.slice(0, folderPath.lastIndexOf("/")) : "";
  await ensureFolder(vault, parent);
  await vault.createFolder(folderPath);
}
async function applyPlan(vault, cfg, changes, synced) {
  const next = { ...synced };
  const errors = [];
  for (const c of changes) {
    try {
      if (c.kind === "delete") {
        const f2 = vault.getAbstractFileByPath(c.localPath);
        if (f2 instanceof import_obsidian4.TFile)
          await vault.trash(f2, true);
        delete next[c.localPath];
        continue;
      }
      const data = await getBlob(cfg, c.remoteSha);
      const parent = c.localPath.includes("/") ? c.localPath.slice(0, c.localPath.lastIndexOf("/")) : "";
      await ensureFolder(vault, parent);
      const f = vault.getAbstractFileByPath(c.localPath);
      if (f instanceof import_obsidian4.TFile)
        await vault.modifyBinary(f, data);
      else if (f)
        throw new Error("a folder exists at this path");
      else
        await vault.createBinary(c.localPath, data);
      next[c.localPath] = c.remoteSha;
    } catch (e) {
      errors.push(`${c.localPath}: ${e.message}`);
    }
  }
  return { synced: next, errors };
}

// src/main.ts
var GetMyScriptsPlugin = class extends import_obsidian5.Plugin {
  constructor() {
    super(...arguments);
    this.intervalId = null;
    this.checking = false;
  }
  async onload() {
    await this.loadSettings();
    this.addSettingTab(new SettingsTab(this.app, this));
    this.addRibbonIcon(
      "folder-sync",
      "Check templates & scripts for updates",
      () => this.checkForUpdates(true)
    );
    this.addCommand({
      id: "check-for-updates",
      name: "Check for updates",
      callback: () => this.checkForUpdates(true)
    });
    this.app.workspace.onLayoutReady(() => {
      if (this.settings.checkOnStartup)
        this.checkForUpdates(false);
      this.restartInterval();
    });
  }
  restartInterval() {
    if (this.intervalId !== null)
      window.clearInterval(this.intervalId);
    this.intervalId = null;
    const mins = this.settings.checkIntervalMinutes;
    if (mins > 0) {
      this.intervalId = this.registerInterval(
        window.setInterval(() => this.checkForUpdates(false), mins * 60 * 1e3)
      );
    }
  }
  repoConfig() {
    const s = this.settings;
    if (!s.owner || !s.repo)
      return null;
    return { owner: s.owner, repo: s.repo, branch: s.branch || "main", token: s.token };
  }
  /**
   * @param manual true when the user triggered it: shows "up to date" / config notices
   *               and ignores a previously skipped version.
   */
  async checkForUpdates(manual) {
    if (this.checking)
      return;
    const cfg = this.repoConfig();
    if (!cfg) {
      if (manual)
        new import_obsidian5.Notice("Set the GitHub repository in the plugin settings first.");
      return;
    }
    if (this.settings.mappings.length === 0) {
      if (manual)
        new import_obsidian5.Notice("Add at least one folder mapping in the plugin settings.");
      return;
    }
    this.checking = true;
    try {
      const commit = await getLatestCommit(cfg);
      const s = this.settings;
      if (!manual && (commit.sha === s.lastSyncedSha || commit.sha === s.skippedSha))
        return;
      const plan = await buildPlan(this.app.vault, cfg, commit.sha, s.mappings, s.syncedFiles);
      if (plan.matchedFiles === 0 && plan.changes.length === 0) {
        const mapped = s.mappings.map((m) => `"${m.remotePath || "(repo root)"}"`).join(", ");
        const found = plan.repoFolders.length ? plan.repoFolders.join(", ") : "(no folders)";
        new import_obsidian5.Notice(
          `No files in ${cfg.owner}/${cfg.repo}@${cfg.branch} match your mappings (${mapped}).
Folders in the repo: ${found}
Note: folder names are case-sensitive.`,
          15e3
        );
        return;
      }
      if (plan.changes.length === 0) {
        s.lastSyncedSha = commit.sha;
        await this.saveSettings();
        if (manual)
          new import_obsidian5.Notice("Templates & scripts are up to date.");
        return;
      }
      new UpdateModal(this.app, plan, commit, async (decision) => {
        if (decision.action === "later")
          return;
        if (decision.action === "skip") {
          s.skippedSha = commit.sha;
          await this.saveSettings();
          return;
        }
        const notice = new import_obsidian5.Notice(`Updating ${decision.changes.length} file(s)\u2026`, 0);
        const { synced, errors } = await applyPlan(this.app.vault, cfg, decision.changes, s.syncedFiles);
        notice.hide();
        s.syncedFiles = synced;
        s.lastSyncedSha = commit.sha;
        s.skippedSha = "";
        await this.saveSettings();
        if (errors.length) {
          console.error("[get-my-scripts-and-templates] sync errors", errors);
          new import_obsidian5.Notice(`Updated with ${errors.length} error(s). See the developer console.`);
        } else {
          new import_obsidian5.Notice(`Updated ${decision.changes.length} file(s) to ${commit.sha.slice(0, 7)}.`);
        }
      }).open();
    } catch (e) {
      console.error("[get-my-scripts-and-templates]", e);
      if (manual)
        new import_obsidian5.Notice(`Update check failed: ${e.message}`);
    } finally {
      this.checking = false;
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    this.settings.mappings = this.settings.mappings.map((m) => ({ ...m }));
    this.settings.syncedFiles = { ...this.settings.syncedFiles };
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
