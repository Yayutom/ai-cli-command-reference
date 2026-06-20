// Minimal smoke test for the pure logic in script.js.
// Run with: node smoke-test.js
// script.js guards its DOM access, so it can be required under Node.

const s = require("./script.js");

let failures = 0;
function check(name, condition) {
  if (condition) {
    console.log(`ok   - ${name}`);
  } else {
    console.error(`FAIL - ${name}`);
    failures += 1;
  }
}

// --- search index must never throw, including single-sided override rows ---
check(
  "searchText over every item does not throw",
  (() => {
    try {
      for (const row of s.comparisonRows) s.searchText(row);
      for (const item of [...s.cliCommands, ...s.slashCommands]) s.searchText(item);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  })()
);

// "ログイン" overrides only the claude side -> codex side must stay searchable.
const login = s.comparisonRows.find((row) => row.task === "ログイン");
check("single-sided override row found", Boolean(login));
check("codex CLI command searchable on single-sided row", s.searchText(login).includes("codex login"));
check("claude override slash searchable on single-sided row", s.searchText(login).includes("/login"));

// matchesQuery must no longer match JSON structural keys.
const probe = s.comparisonRows[1];
s.state.query = "parity";
check("structural key 'parity' does not match content", s.matchesQuery(probe) === false);
s.state.query = "";

// "/branch" must be searchable on the compare row that displays it via TUI override.
const fork = s.comparisonRows.find((row) => row.task === "会話を分岐");
check("/branch searchable on 会話を分岐 row", s.searchText(fork).includes("/branch"));

// --- reference model (paired, by purpose) ---
check("referenceRows excludes the launcher row", !s.referenceRows().some((row) => row.task === "対話セッションを開始"));
check("allCategories is non-empty and includes Session", s.allCategories().includes("Session"));

// toolForms returns the base command plus the TUI override when present.
const mcp = s.comparisonRows.find((row) => row.task === "MCP を管理");
check("toolForms base command (claude)", s.toolForms(mcp, "claude").base.command === "claude mcp");
check("toolForms TUI override (claude /mcp)", s.toolForms(mcp, "claude").tui.command === "/mcp");

// Renderers build strings without touching the DOM.
check(
  "renderReference / renderDictionary build strings without throwing",
  (() => {
    try {
      s.state.query = "";
      s.state.category = "all";
      const reference = s.renderReference();
      const dictionary = s.renderDictionary();
      return typeof reference === "string" && reference.includes("用途別 対応表") && typeof dictionary === "string";
    } catch (error) {
      console.error(error);
      return false;
    }
  })()
);

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
