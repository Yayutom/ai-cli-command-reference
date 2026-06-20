# AI CLI Command Reference

Unofficial practical reference for people who use **Codex CLI** and **Claude Code** side by side.

Live demo: https://yayutom.github.io/ai-cli-command-reference/

## What It Does

This site lines up Codex CLI and Claude Code commands that do the same job, organized by purpose, so you can look one up from the other.

- Same-function commands shown side by side, Claude Code first
- Grouped by purpose (Session, Auth, MCP, ...), with search and a category filter
- A one-line "when to use" note on every function
- Base command plus the in-session slash form when both exist
- A full CLI / slash command dictionary kept as a secondary reference
- One-click copy buttons for every command

## Why This Exists

If you use both tools, you usually remember one tool's commands better than the other's. This reference is built for that: find the command you already know (Claude Code) and read the equivalent right next to it (Codex), grouped by what you are trying to do.

## Verified Versions

- Codex CLI: `0.141.0`
- Claude Code: `2.1.183`
- Verified on: `2026-06-20`

Commands change quickly. Treat this as a practical snapshot, not an official specification.

## Sources

- OpenAI Codex CLI reference: https://developers.openai.com/codex/cli/reference
- OpenAI Codex slash commands: https://developers.openai.com/codex/cli/slash-commands
- Claude Code CLI reference: https://code.claude.com/docs/en/cli-reference
- Claude Code commands: https://code.claude.com/docs/en/commands

## Local Preview

Open `index.html` directly in a browser, or serve the directory with any static file server.

```bash
open index.html
```

## Files

- `index.html` - static site entry
- `styles.css` - responsive UI
- `script.js` - command data, search, filters, view switching, copy behavior
- `smoke-test.js` - Node smoke test for the pure logic (`node smoke-test.js`)
- `LICENSE` - MIT license
- `.nojekyll` - disables Jekyll processing on GitHub Pages

## License

MIT
