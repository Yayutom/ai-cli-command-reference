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

// --- B: search index must never throw, including single-sided override rows ---
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

// "/branch" placeholder must be searchable on the compare row that displays it.
const fork = s.comparisonRows.find((row) => row.task === "会話を分岐");
check("/branch searchable on 会話を分岐 row", s.searchText(fork).includes("/branch"));

// --- C: hasSlashPeer is exact-token, not substring ---
check("/agent is NOT a peer of /agents", s.hasSlashPeer("/agent", "claude") === false);
check("/agents is NOT a peer of /agent", s.hasSlashPeer("/agents", "codex") === false);
check("/mcp peers across tools (real equivalent)", s.hasSlashPeer("/mcp", "claude") === true);
check("multi-alias '/clear, /reset, /new' peers codex", s.hasSlashPeer("/clear, /reset, /new", "codex") === true);
check("'/side, /btw' peers claude via /btw", s.hasSlashPeer("/side, /btw", "claude") === true);

if (failures) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll checks passed.");
