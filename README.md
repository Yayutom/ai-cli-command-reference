# AI CLI Command Reference

Unofficial practical reference for people who use **Codex CLI** and **Claude Code** side by side.

Live demo: https://yayutom.github.io/ai-cli-command-reference/

## What It Does

This site maps Codex CLI and Claude Code commands by the job you want to do, with a bias toward the commands you actually type inside the TUI.

- TUI / slash command first, instead of showing launch commands everywhere
- Codex and Claude Code equivalents shown side by side
- CLI-only commands kept as secondary references
- Search and filters for parity, tool, and command type
- One-click copy buttons for every command

## Why This Exists

When switching between AI coding CLIs, the hard part is not remembering how to start the tool. The friction is remembering the command you need while you are already inside the TUI.

This reference is designed around that workflow: start the agent once, then quickly find the slash command that does the job.

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

## License

MIT
