const comparisonRows = [
  {
    category: "Session",
    task: "対話セッションを開始",
    summary: "作業ディレクトリで通常の対話型エージェントを起動する。",
    codex: { command: "codex [PROMPT]", desc: "prompt を渡すと初回メッセージ付きで TUI を開始。" },
    claude: { command: "claude [prompt]", desc: "prompt を渡すと初回メッセージ付きで対話セッションを開始。" },
    parity: "same",
    note: "最も基本の入口。どちらもカレントディレクトリの文脈を読む。"
  },
  {
    category: "Automation",
    task: "非対話で1回実行",
    summary: "CI、pipe、スクリプトから完了まで走らせる。",
    codex: { command: "codex exec \"task\"", desc: "alias は codex e。JSON 出力や schema 検証も可能。" },
    claude: { command: "claude -p \"task\"", desc: "print mode。text/json/stream-json 出力を選択可能。" },
    parity: "same",
    note: "自動化ではこの組み合わせが一番近い。"
  },
  {
    category: "Automation",
    task: "stdin を処理",
    summary: "ログやファイル内容を pipe して質問する。",
    codex: { command: "cat file | codex exec -", desc: "PROMPT に - を渡すと stdin を読む。" },
    claude: { command: "cat file | claude -p \"query\"", desc: "piped content を print mode で処理。" },
    parity: "same",
    note: "Codex は '-' を明示する運用が分かりやすい。"
  },
  {
    category: "Session",
    task: "直近セッションを再開",
    summary: "前回の会話を続ける。",
    codex: { command: "codex resume --last", desc: "picker なしで直近の interactive session を再開。" },
    claude: { command: "claude -c", desc: "current directory の直近 conversation を continue。" },
    parity: "similar",
    note: "Claude は current directory 基準。Codex は saved session picker / --last。"
  },
  {
    category: "Session",
    task: "指定セッションを再開",
    summary: "ID や名前で以前の会話に戻る。",
    codex: { command: "codex resume <SESSION>", desc: "interactive session を指定して再開。" },
    claude: { command: "claude -r <session>", desc: "session ID または name を指定して resume。" },
    parity: "same",
    note: "名前運用をするなら Claude は -n / /rename、Codex は session list を確認。"
  },
  {
    category: "Session",
    task: "会話を分岐",
    summary: "同じ文脈から別案を試す。",
    codex: { command: "codex fork [SESSION]", desc: "保存済みセッションを fork。TUI では /fork。" },
    claude: { command: "claude -r <session> --fork-session", desc: "resume 時に新しい session ID を作る。TUI では /branch や /fork。" },
    parity: "similar",
    note: "Codex の fork は CLI command と slash の両方にある。"
  },
  {
    category: "Review",
    task: "コードレビュー",
    summary: "差分や PR を読み、バグ・リスクを指摘する。",
    codex: { command: "codex review", desc: "非対話で code review を実行。TUI では /review。" },
    claude: { command: "claude ultrareview [target]", desc: "cloud-hosted multi-agent review。TUI では /code-review, /review, /security-review。" },
    parity: "similar",
    note: "Claude Code は local slash review の種類が多い。Codex は CLI の review が明示的。"
  },
  {
    category: "Auth",
    task: "ログイン",
    summary: "アカウント認証を開始する。",
    codex: { command: "codex login", desc: "Codex の認証を管理。" },
    claude: { command: "claude auth login", desc: "Anthropic account / Console 認証。" },
    parity: "same",
    note: "logout は codex logout / claude auth logout。"
  },
  {
    category: "Auth",
    task: "ログアウト",
    summary: "保存済み認証情報を削除する。",
    codex: { command: "codex logout", desc: "Codex の stored credentials を削除。" },
    claude: { command: "claude auth logout", desc: "Anthropic account から sign out。" },
    parity: "same",
    note: "共有端末では作業後に確認。"
  },
  {
    category: "Auth",
    task: "認証状態を確認",
    summary: "ログイン済みかを診断する。",
    codex: { command: "codex doctor", desc: "auth を含むインストール状態を診断。" },
    claude: { command: "claude auth status", desc: "auth status を JSON または text で表示。" },
    parity: "similar",
    note: "Codex は doctor 側に寄っている。"
  },
  {
    category: "MCP",
    task: "MCP を管理",
    summary: "Model Context Protocol server / tool を設定・確認する。",
    codex: { command: "codex mcp", desc: "external MCP servers を管理。TUI では /mcp。" },
    claude: { command: "claude mcp", desc: "MCP servers を configure / manage。TUI では /mcp。" },
    parity: "same",
    note: "両方とも MCP は中核機能。server ごとの read/write 権限は別途確認。"
  },
  {
    category: "Plugins",
    task: "plugin を管理",
    summary: "plugin の install / enable / inspect を行う。",
    codex: { command: "codex plugin", desc: "Codex plugins を管理。TUI では /plugins。" },
    claude: { command: "claude plugin", desc: "Claude Code plugins を管理。alias: claude plugins。TUI では /plugin。" },
    parity: "same",
    note: "名前は Codex が plural slash、Claude は singular slash。"
  },
  {
    category: "Diagnostics",
    task: "健康診断",
    summary: "設定、認証、runtime、更新状態を確認する。",
    codex: { command: "codex doctor", desc: "local install / config / auth / runtime health を診断。" },
    claude: { command: "claude doctor", desc: "Claude Code auto-updater と設定の health check。" },
    parity: "same",
    note: "不調時の最初の確認先。"
  },
  {
    category: "Updates",
    task: "最新版へ更新",
    summary: "CLI 本体を更新する。",
    codex: { command: "codex update", desc: "Codex を最新バージョンへ更新。" },
    claude: { command: "claude update", desc: "update / upgrade で最新版を確認・install。" },
    parity: "same",
    note: "Claude は claude install [version] で特定版も指定できる。"
  },
  {
    category: "Config",
    task: "model を指定",
    summary: "使用モデルを起動時または session 中に切り替える。",
    codex: { command: "codex -m <model>", desc: "TUI では /model。exec でも --model を利用。" },
    claude: { command: "claude --model <model>", desc: "TUI では /model。alias や full model ID を指定。" },
    parity: "same",
    note: "reasoning effort は Codex / Claude とも別設定を持つ。"
  },
  {
    category: "Config",
    task: "作業ディレクトリを指定",
    summary: "起動時に workspace root を切り替える。",
    codex: { command: "codex -C <dir>", desc: "Tell the agent to use dir as working root。" },
    claude: { command: "cd <dir> && claude", desc: "追加アクセスは --add-dir。TUI では /cd と /add-dir。" },
    parity: "similar",
    note: "Codex は -C が明示的。Claude は shell cwd と /cd の組み合わせ。"
  },
  {
    category: "Permissions",
    task: "sandbox / permission を設定",
    summary: "コマンド実行の許可範囲を決める。",
    codex: { command: "codex -s workspace-write -a on-request", desc: "sandbox mode と approval policy を指定。TUI では /permissions。" },
    claude: { command: "claude --permission-mode plan", desc: "permission mode を指定。TUI では /permissions。" },
    parity: "similar",
    note: "danger bypass 系はどちらも隔離環境以外では避ける。"
  },
  {
    category: "Context",
    task: "画像やファイルを初回 prompt に添付",
    summary: "視覚資料や指定ファイルを文脈として渡す。",
    codex: { command: "codex -i image.png", desc: "初回 prompt に image を attach。" },
    claude: { command: "claude --file <file_id:path>", desc: "startup で file resource を取得。通常ファイル文脈は prompt / tool 経由。" },
    parity: "similar",
    note: "ローカル画像添付は Codex の -i が分かりやすい。"
  },
  {
    category: "Context",
    task: "追加ディレクトリを許可",
    summary: "workspace 外の追加 path を読めるようにする。",
    codex: { command: "codex --add-dir <dir>", desc: "primary workspace と並べて writable/readable root を追加。" },
    claude: { command: "claude --add-dir <dir>", desc: "追加ディレクトリへ tool access を許可。TUI では /add-dir。" },
    parity: "same",
    note: "どちらも機密 path は明示的に扱う。"
  },
  {
    category: "Remote",
    task: "remote control",
    summary: "別 UI からローカル session を操作できるようにする。",
    codex: { command: "codex remote-control", desc: "app-server daemon の remote control を管理。" },
    claude: { command: "claude remote-control", desc: "Claude.ai / app から制御する server を開始。" },
    parity: "similar",
    note: "接続方式と UI は異なるが、目的は近い。"
  },
  {
    category: "Desktop",
    task: "desktop app",
    summary: "GUI / desktop 体験へ移動する。",
    codex: { command: "codex app", desc: "Codex desktop app を launch。未導入なら installer を開く。" },
    claude: { command: "/desktop", desc: "Claude Code Desktop app で current session を続ける slash command。" },
    parity: "similar",
    note: "Claude は session 内 slash command 側。"
  },
  {
    category: "Patch",
    task: "最新 diff を適用",
    summary: "agent が作った patch を working tree に apply する。",
    codex: { command: "codex apply", desc: "latest diff を git apply として local working tree に適用。alias: codex a。" },
    claude: { command: "該当なし", desc: "Claude Code は通常 session 内で直接 edit する。" },
    parity: "codex-only",
    note: "Codex 独自に近いローカル patch 操作。"
  },
  {
    category: "Shell",
    task: "shell completion を生成",
    summary: "zsh/bash/fish などの補完 script を出力する。",
    codex: { command: "codex completion", desc: "shell completion scripts を生成。" },
    claude: { command: "該当なし", desc: "現在の CLI reference では同等 subcommand が見当たらない。" },
    parity: "codex-only",
    note: "shell 設定に組み込む用途。"
  },
  {
    category: "Feature flags",
    task: "feature flag を管理",
    summary: "実験機能を list / enable / disable する。",
    codex: { command: "codex features", desc: "known feature flags と effective state を確認・変更。" },
    claude: { command: "/config, /experimental", desc: "設定 UI や実験系 slash command で近い操作を行う。" },
    parity: "similar",
    note: "Codex は CLI subcommand として明示。Claude は TUI 設定側。"
  },
  {
    category: "Background",
    task: "background agent を管理",
    summary: "裏で動く agent / session を一覧・停止・再接続する。",
    codex: { command: "/ps, /stop", desc: "experimental background terminals を表示・停止。" },
    claude: { command: "claude agents", desc: "background sessions を monitor / dispatch。TUI では /background, /tasks。" },
    parity: "similar",
    note: "Claude Code の background agent 管理は CLI subcommand が厚い。"
  },
  {
    category: "Cloud",
    task: "cloud / web session",
    summary: "クラウド側 agent や web session と連携する。",
    codex: { command: "codex cloud", desc: "Codex Cloud tasks を browse し、changes を local に apply。" },
    claude: { command: "claude --remote, /teleport", desc: "Claude Code on the web session を作成・terminal に取り込む。" },
    parity: "similar",
    note: "概念は近いが、対象 platform と workflow は異なる。"
  },
  {
    category: "Install",
    task: "native binary install",
    summary: "CLI 本体を install / reinstall する。",
    codex: { command: "install script / npm / brew", desc: "codex CLI 内 subcommand ではなく配布経路で install。" },
    claude: { command: "claude install [version]", desc: "stable / latest / specific version を install。" },
    parity: "claude-only",
    note: "Claude は CLI から install を持つ。Codex は update はあるが install は外部配布経路。"
  },
  {
    category: "Project state",
    task: "project の local state を削除",
    summary: "transcripts、task lists、debug logs などを purge する。",
    codex: { command: "codex delete <session>", desc: "session 単位の削除。project 全体 purge は docs 上では別扱い。" },
    claude: { command: "claude project purge [path]", desc: "指定 project の Claude Code local state を削除。" },
    parity: "claude-only",
    note: "Claude Code 独自の project-state 管理。"
  }
];

const hiddenTuiTasks = new Set(["対話セッションを開始"]);

const tuiOverrides = {
  "直近セッションを再開": {
    codex: { command: "/resume", desc: "保存済み conversation picker から再開。", label: "TUI" },
    claude: { command: "/resume, /continue", desc: "conversation picker から再開。", label: "TUI" }
  },
  "指定セッションを再開": {
    codex: { command: "/resume", desc: "saved conversation list から対象を選ぶ。", label: "TUI" },
    claude: { command: "/resume, /continue", desc: "conversation picker から対象を選ぶ。", label: "TUI" }
  },
  "会話を分岐": {
    codex: { command: "/fork", desc: "current conversation を新しい thread に fork。", label: "TUI" },
    claude: { command: "/branch", desc: "current conversation を分岐。", label: "TUI" }
  },
  "コードレビュー": {
    codex: { command: "/review", desc: "working tree の review を依頼。", label: "TUI" },
    claude: { command: "/code-review", desc: "diff review。必要に応じて --fix や ultra を指定。", label: "TUI" }
  },
  "ログイン": {
    claude: { command: "/login", desc: "Anthropic account に sign in。", label: "TUI" }
  },
  "ログアウト": {
    codex: { command: "/logout", desc: "Codex から sign out。", label: "TUI" },
    claude: { command: "/logout", desc: "Claude Code から sign out。", label: "TUI" }
  },
  "認証状態を確認": {
    codex: { command: "/status", desc: "session config、account、usage などを確認。", label: "TUI" },
    claude: { command: "/status", desc: "version、model、account、connectivity を確認。", label: "TUI" }
  },
  "MCP を管理": {
    codex: { command: "/mcp", desc: "configured MCP tools と server details を確認。", label: "TUI" },
    claude: { command: "/mcp", desc: "MCP server connections と OAuth 状態を管理。", label: "TUI" }
  },
  "plugin を管理": {
    codex: { command: "/plugins", desc: "plugin tools、install 候補、availability を確認。", label: "TUI" },
    claude: { command: "/plugin", desc: "Claude Code plugins を管理。", label: "TUI" }
  },
  "健康診断": {
    codex: { command: "/status", desc: "session config、writable roots、account 状態を確認。", label: "TUI" },
    claude: { command: "/doctor", desc: "installation と settings を診断。", label: "TUI" }
  },
  "model を指定": {
    codex: { command: "/model", desc: "active model と reasoning effort を選択。", label: "TUI" },
    claude: { command: "/model", desc: "AI model を切り替え、default として保存可能。", label: "TUI" }
  },
  "作業ディレクトリを指定": {
    claude: { command: "/cd", desc: "session の working directory を移動。", label: "TUI" }
  },
  "sandbox / permission を設定": {
    codex: { command: "/permissions", desc: "承認なしで実行できる範囲を調整。", label: "TUI" },
    claude: { command: "/permissions", desc: "tool permission rules を管理。", label: "TUI" }
  },
  "画像やファイルを初回 prompt に添付": {
    codex: { command: "/mention", desc: "file/folder を conversation に attach。", label: "TUI" },
    claude: { command: "/ide", desc: "IDE context や selection を使って文脈を渡す。", label: "TUI" }
  },
  "追加ディレクトリを許可": {
    claude: { command: "/add-dir", desc: "current session に working directory access を追加。", label: "TUI" }
  },
  "desktop app": {
    claude: { command: "/desktop, /app", desc: "current session を Claude Code Desktop app で続ける。", label: "TUI" }
  },
  "feature flag を管理": {
    codex: { command: "/experimental", desc: "experimental features を toggle。", label: "TUI" },
    claude: { command: "/config, /experimental", desc: "settings UI や experimental setting を確認。", label: "TUI" }
  },
  "background agent を管理": {
    codex: { command: "/ps, /stop", desc: "background terminals を表示・停止。", label: "TUI" },
    claude: { command: "/background, /tasks", desc: "background agent と tasks を管理。", label: "TUI" }
  },
  "cloud / web session": {
    claude: { command: "/teleport, /tp", desc: "Claude Code on the web session を terminal に取り込む。", label: "TUI" }
  }
};

const cliCommands = [
  { tool: "codex", name: "codex", command: "codex [OPTIONS] [PROMPT]", desc: "対話型 CLI を開始。subcommand なしなら options は interactive CLI に渡される。", category: "Session" },
  { tool: "codex", name: "exec", command: "codex exec [PROMPT]", desc: "非対話実行。CI、スクリプト、pipe 処理向け。alias: codex e。", category: "Automation" },
  { tool: "codex", name: "review", command: "codex review", desc: "非対話でコードレビューを実行する。", category: "Review" },
  { tool: "codex", name: "login", command: "codex login", desc: "Codex の login を管理する。", category: "Auth" },
  { tool: "codex", name: "logout", command: "codex logout", desc: "保存済み認証情報を削除する。", category: "Auth" },
  { tool: "codex", name: "mcp", command: "codex mcp", desc: "external MCP servers を管理する。", category: "MCP" },
  { tool: "codex", name: "plugin", command: "codex plugin", desc: "Codex plugins を管理する。", category: "Plugins" },
  { tool: "codex", name: "mcp-server", command: "codex mcp-server", desc: "Codex を stdio MCP server として起動する。", category: "MCP" },
  { tool: "codex", name: "app-server", command: "codex app-server", desc: "experimental app server と関連 tooling を実行する。", category: "Remote" },
  { tool: "codex", name: "remote-control", command: "codex remote-control", desc: "remote control が有効な app-server daemon を管理する。", category: "Remote" },
  { tool: "codex", name: "app", command: "codex app", desc: "Codex desktop app を起動する。未導入なら installer を開く。", category: "Desktop" },
  { tool: "codex", name: "completion", command: "codex completion", desc: "shell completion script を生成する。", category: "Shell" },
  { tool: "codex", name: "update", command: "codex update", desc: "Codex を最新バージョンへ更新する。", category: "Updates" },
  { tool: "codex", name: "doctor", command: "codex doctor", desc: "install、config、auth、runtime health を診断する。", category: "Diagnostics" },
  { tool: "codex", name: "sandbox", command: "codex sandbox", desc: "Codex-provided sandbox 内で command を実行する。", category: "Permissions" },
  { tool: "codex", name: "debug", command: "codex debug", desc: "debugging tools。", category: "Diagnostics" },
  { tool: "codex", name: "apply", command: "codex apply", desc: "latest Codex diff を git apply として working tree に適用する。alias: codex a。", category: "Patch" },
  { tool: "codex", name: "resume", command: "codex resume [SESSION]", desc: "interactive session を再開。--last で直近を継続。", category: "Session" },
  { tool: "codex", name: "archive", command: "codex archive <SESSION>", desc: "保存済み session を archive する。", category: "Session" },
  { tool: "codex", name: "delete", command: "codex delete <SESSION>", desc: "保存済み session を完全削除する。", category: "Session" },
  { tool: "codex", name: "unarchive", command: "codex unarchive <SESSION>", desc: "archived session を復元する。", category: "Session" },
  { tool: "codex", name: "fork", command: "codex fork [SESSION]", desc: "以前の session を fork して別方向に進める。", category: "Session" },
  { tool: "codex", name: "cloud", command: "codex cloud", desc: "Codex Cloud tasks を browse し local に changes を apply する。", category: "Cloud" },
  { tool: "codex", name: "exec-server", command: "codex exec-server", desc: "standalone exec-server service を実行する。experimental。", category: "Automation" },
  { tool: "codex", name: "features", command: "codex features", desc: "feature flags を inspect / enable / disable する。", category: "Config" },
  { tool: "codex", name: "help", command: "codex help [COMMAND]", desc: "command help を表示する。", category: "Help" },
  { tool: "claude", name: "claude", command: "claude [prompt]", desc: "対話セッションを開始。prompt を渡すと初回メッセージ付きで開始。", category: "Session" },
  { tool: "claude", name: "print", command: "claude -p \"query\"", desc: "print / SDK mode。回答を出力して終了する。", category: "Automation" },
  { tool: "claude", name: "continue", command: "claude -c", desc: "current directory の直近 conversation を continue。", category: "Session" },
  { tool: "claude", name: "resume", command: "claude -r <session>", desc: "session ID または name で conversation を resume。", category: "Session" },
  { tool: "claude", name: "auth", command: "claude auth", desc: "login、logout、status など authentication を管理。", category: "Auth" },
  { tool: "claude", name: "agents", command: "claude agents", desc: "background sessions を monitor / dispatch。", category: "Background" },
  { tool: "claude", name: "attach", command: "claude attach <id>", desc: "background session に terminal から attach。", category: "Background" },
  { tool: "claude", name: "auto-mode", command: "claude auto-mode defaults", desc: "auto mode classifier rules や effective config を確認。", category: "Permissions" },
  { tool: "claude", name: "daemon", command: "claude daemon status", desc: "background-session supervisor の状態を診断。", category: "Background" },
  { tool: "claude", name: "logs", command: "claude logs <id>", desc: "background session の recent output を表示。", category: "Background" },
  { tool: "claude", name: "mcp", command: "claude mcp", desc: "MCP servers を configure / manage。", category: "MCP" },
  { tool: "claude", name: "plugin", command: "claude plugin", desc: "Claude Code plugins を管理。alias: claude plugins。", category: "Plugins" },
  { tool: "claude", name: "project", command: "claude project purge [path]", desc: "project local state を削除。dry-run や interactive 確認あり。", category: "Project" },
  { tool: "claude", name: "remote-control", command: "claude remote-control", desc: "Claude.ai / app から制御できる remote control server を開始。", category: "Remote" },
  { tool: "claude", name: "respawn", command: "claude respawn <id>", desc: "background session を conversation intact で再起動。", category: "Background" },
  { tool: "claude", name: "rm", command: "claude rm <id>", desc: "background session を list から remove。transcript は残る。", category: "Background" },
  { tool: "claude", name: "setup-token", command: "claude setup-token", desc: "CI / scripts 用 long-lived OAuth token を生成。", category: "Auth" },
  { tool: "claude", name: "stop", command: "claude stop <id>", desc: "background session を停止。alias: claude kill。", category: "Background" },
  { tool: "claude", name: "ultrareview", command: "claude ultrareview [target]", desc: "cloud-hosted multi-agent code review を非対話で実行。", category: "Review" },
  { tool: "claude", name: "doctor", command: "claude doctor", desc: "Claude Code auto-updater と health を確認。", category: "Diagnostics" },
  { tool: "claude", name: "install", command: "claude install [version]", desc: "native build を install / reinstall。stable/latest/specific version。", category: "Install" },
  { tool: "claude", name: "update", command: "claude update", desc: "update を確認し install。alias: claude upgrade。", category: "Updates" }
];

const slashCommands = [
  { tool: "codex", command: "/permissions", desc: "Codex が承認なしで実行できる範囲を調整。", category: "Permissions" },
  { tool: "codex", command: "/ide", desc: "open files や selection など IDE context を追加。", category: "Context" },
  { tool: "codex", command: "/keymap", desc: "TUI keyboard shortcuts を remap。", category: "UI" },
  { tool: "codex", command: "/vim", desc: "composer の Vim mode を toggle。", category: "UI" },
  { tool: "codex", command: "/sandbox-add-read-dir", desc: "Windows で sandbox read access directory を追加。", category: "Permissions" },
  { tool: "codex", command: "/agent", desc: "active agent thread を切り替え。", category: "Agents" },
  { tool: "codex", command: "/apps", desc: "apps/connectors を browse して prompt に挿入。", category: "Apps" },
  { tool: "codex", command: "/plugins", desc: "plugin tools、install 候補、availability を確認・管理。", category: "Plugins" },
  { tool: "codex", command: "/hooks", desc: "lifecycle hooks を view/manage/trust/disable。", category: "Hooks" },
  { tool: "codex", command: "/clear", desc: "terminal を clear し fresh chat を開始。", category: "Session" },
  { tool: "codex", command: "/archive", desc: "current session を archive して exit。", category: "Session" },
  { tool: "codex", command: "/delete", desc: "current session を完全削除して exit。", category: "Session" },
  { tool: "codex", command: "/compact", desc: "会話を要約して context tokens を空ける。", category: "Context" },
  { tool: "codex", command: "/copy", desc: "latest completed Codex output を copy。", category: "UI" },
  { tool: "codex", command: "/diff", desc: "Git diff と untracked files を表示。", category: "Git" },
  { tool: "codex", command: "/exit", desc: "CLI を終了。alias: /quit。", category: "Session" },
  { tool: "codex", command: "/experimental", desc: "experimental features を toggle。", category: "Config" },
  { tool: "codex", command: "/approve", desc: "auto review denial の recent action を一度だけ retry 承認。", category: "Permissions" },
  { tool: "codex", command: "/memories", desc: "memory injection / generation を configure。", category: "Memory" },
  { tool: "codex", command: "/skills", desc: "local skills を browse / use。", category: "Skills" },
  { tool: "codex", command: "/import", desc: "Claude Code setup、project files、recent chats を import。", category: "Migration" },
  { tool: "codex", command: "/feedback", desc: "logs を Codex maintainers に送信。", category: "Support" },
  { tool: "codex", command: "/init", desc: "current directory に AGENTS.md scaffold を生成。", category: "Project" },
  { tool: "codex", command: "/logout", desc: "Codex から sign out。", category: "Auth" },
  { tool: "codex", command: "/mcp", desc: "configured MCP tools を list。verbose で server details。", category: "MCP" },
  { tool: "codex", command: "/mention", desc: "file/folder を conversation に attach。", category: "Context" },
  { tool: "codex", command: "/model", desc: "active model と reasoning effort を選択。", category: "Model" },
  { tool: "codex", command: "/fast", desc: "Fast service tier を toggle / status 確認。", category: "Model" },
  { tool: "codex", command: "/plan", desc: "plan mode に切り替え、任意 prompt を送る。", category: "Planning" },
  { tool: "codex", command: "/goal", desc: "task goal を set/pause/resume/view/clear。", category: "Planning" },
  { tool: "codex", command: "/personality", desc: "response style を選択。", category: "UI" },
  { tool: "codex", command: "/ps", desc: "experimental background terminals と recent output を表示。", category: "Background" },
  { tool: "codex", command: "/stop", desc: "background terminals を停止。", category: "Background" },
  { tool: "codex", command: "/fork", desc: "current conversation を新しい thread に fork。", category: "Session" },
  { tool: "codex", command: "/side, /btw", desc: "main transcript を乱さない ephemeral side conversation。", category: "Session" },
  { tool: "codex", command: "/raw", desc: "raw scrollback mode を toggle。", category: "UI" },
  { tool: "codex", command: "/resume", desc: "saved conversation list から再開。", category: "Session" },
  { tool: "codex", command: "/new", desc: "同じ CLI session 内で fresh conversation を開始。", category: "Session" },
  { tool: "codex", command: "/quit", desc: "CLI を終了。", category: "Session" },
  { tool: "codex", command: "/review", desc: "working tree の review を依頼。", category: "Review" },
  { tool: "codex", command: "/status", desc: "session config、token usage、writable roots などを表示。", category: "Diagnostics" },
  { tool: "codex", command: "/usage", desc: "account token usage や rate-limit reset を確認。", category: "Usage" },
  { tool: "codex", command: "/debug-config", desc: "config layer と policy requirements を診断。", category: "Diagnostics" },
  { tool: "codex", command: "/statusline", desc: "TUI status-line fields を configure。", category: "UI" },
  { tool: "codex", command: "/title", desc: "terminal window/tab title fields を configure。", category: "UI" },
  { tool: "codex", command: "/theme", desc: "syntax highlighting theme を preview / persist。", category: "UI" },
  { tool: "claude", command: "/add-dir", desc: "current session に working directory access を追加。", category: "Context" },
  { tool: "claude", command: "/advisor", desc: "second model advisor tool を enable/disable。", category: "Model" },
  { tool: "claude", command: "/agents", desc: "agent configurations を管理。", category: "Agents" },
  { tool: "claude", command: "/autofix-pr", desc: "cloud session が current PR の CI/review fixes を監視。", category: "Cloud" },
  { tool: "claude", command: "/background, /bg", desc: "current session を background agent として detach。", category: "Background" },
  { tool: "claude", command: "/batch", desc: "large-scale changes を worktree subagents に分解。", category: "Workflow" },
  { tool: "claude", command: "/branch", desc: "current conversation を分岐。", category: "Session" },
  { tool: "claude", command: "/btw", desc: "conversation を膨らませず quick side question。", category: "Session" },
  { tool: "claude", command: "/cd", desc: "session の working directory を移動。", category: "Context" },
  { tool: "claude", command: "/chrome", desc: "Claude in Chrome settings を configure。", category: "Browser" },
  { tool: "claude", command: "/claude-api", desc: "Claude API reference / migration / Managed Agents onboarding。", category: "Skills" },
  { tool: "claude", command: "/clear, /reset, /new", desc: "context を空にして新しい conversation を開始。", category: "Session" },
  { tool: "claude", command: "/code-review", desc: "diff review。--fix や --comment、ultra review も指定可能。", category: "Review" },
  { tool: "claude", command: "/color", desc: "prompt bar color を設定。", category: "UI" },
  { tool: "claude", command: "/compact", desc: "conversation を要約して context を空ける。", category: "Context" },
  { tool: "claude", command: "/config, /settings", desc: "settings UI を開く、または key=value で直接設定。", category: "Config" },
  { tool: "claude", command: "/context", desc: "current context usage を可視化。", category: "Context" },
  { tool: "claude", command: "/copy", desc: "last assistant response / code block を clipboard へ。", category: "UI" },
  { tool: "claude", command: "/cost, /stats, /usage", desc: "cost、plan usage、activity stats を表示。", category: "Usage" },
  { tool: "claude", command: "/debug", desc: "debug logging を有効にし issue focused analysis。", category: "Diagnostics" },
  { tool: "claude", command: "/deep-research", desc: "web searches を fan out して cited report を生成。", category: "Research" },
  { tool: "claude", command: "/desktop, /app", desc: "current session を Claude Code Desktop app で続ける。", category: "Desktop" },
  { tool: "claude", command: "/diff", desc: "interactive diff viewer を開く。", category: "Git" },
  { tool: "claude", command: "/doctor", desc: "installation と settings を診断。", category: "Diagnostics" },
  { tool: "claude", command: "/effort", desc: "model effort level を設定。", category: "Model" },
  { tool: "claude", command: "/exit, /quit", desc: "CLI を終了。background attached session では detach。", category: "Session" },
  { tool: "claude", command: "/export", desc: "current conversation を plain text export。", category: "Session" },
  { tool: "claude", command: "/fast", desc: "fast mode を toggle。", category: "Model" },
  { tool: "claude", command: "/feedback, /bug, /share", desc: "bug report や conversation share。", category: "Support" },
  { tool: "claude", command: "/fewer-permission-prompts", desc: "read-only calls を分析し allowlist を提案。", category: "Permissions" },
  { tool: "claude", command: "/focus", desc: "focus view を toggle。", category: "UI" },
  { tool: "claude", command: "/fork", desc: "forked subagent を spawn。", category: "Agents" },
  { tool: "claude", command: "/goal", desc: "goal を set/view/clear して継続作業。", category: "Planning" },
  { tool: "claude", command: "/help", desc: "help と available commands を表示。", category: "Help" },
  { tool: "claude", command: "/hooks", desc: "hook configurations を表示。", category: "Hooks" },
  { tool: "claude", command: "/ide", desc: "IDE integrations と status を管理。", category: "Context" },
  { tool: "claude", command: "/init", desc: "project CLAUDE.md guide を初期化。", category: "Project" },
  { tool: "claude", command: "/login", desc: "Anthropic account に sign in。", category: "Auth" },
  { tool: "claude", command: "/logout", desc: "sign out。", category: "Auth" },
  { tool: "claude", command: "/loop, /proactive", desc: "prompt を interval または self-paced で繰り返し実行。", category: "Workflow" },
  { tool: "claude", command: "/mcp", desc: "MCP server connections / OAuth / enable-disable を管理。", category: "MCP" },
  { tool: "claude", command: "/memory", desc: "CLAUDE.md memory files や auto-memory を管理。", category: "Memory" },
  { tool: "claude", command: "/model", desc: "AI model を切り替え、default として保存可能。", category: "Model" },
  { tool: "claude", command: "/permissions, /allowed-tools", desc: "tool permission rules を管理。", category: "Permissions" },
  { tool: "claude", command: "/plan", desc: "plan mode に入る。description 付きで開始可能。", category: "Planning" },
  { tool: "claude", command: "/plugin", desc: "Claude Code plugins を管理。", category: "Plugins" },
  { tool: "claude", command: "/recap", desc: "current session の one-line summary を生成。", category: "Session" },
  { tool: "claude", command: "/release-notes", desc: "changelog を version picker で表示。", category: "Updates" },
  { tool: "claude", command: "/reload-plugins", desc: "active plugins を reload。", category: "Plugins" },
  { tool: "claude", command: "/reload-skills", desc: "skills / command directories を再 scan。", category: "Skills" },
  { tool: "claude", command: "/remote-control, /rc", desc: "current session を claude.ai remote control に公開。", category: "Remote" },
  { tool: "claude", command: "/rename", desc: "current session を rename。", category: "Session" },
  { tool: "claude", command: "/resume, /continue", desc: "conversation picker から resume。", category: "Session" },
  { tool: "claude", command: "/review", desc: "pull request を local session で review。", category: "Review" },
  { tool: "claude", command: "/rewind, /checkpoint, /undo", desc: "conversation / code を previous point に rewind。", category: "Session" },
  { tool: "claude", command: "/run", desc: "project app を起動・操作し変更を確認。", category: "Verification" },
  { tool: "claude", command: "/sandbox", desc: "sandbox mode を toggle。", category: "Permissions" },
  { tool: "claude", command: "/schedule, /routines", desc: "Anthropic-managed cloud routines を create/update/list/run。", category: "Cloud" },
  { tool: "claude", command: "/security-review", desc: "pending changes の security risk を review。", category: "Review" },
  { tool: "claude", command: "/simplify", desc: "cleanup opportunities を review し fixes を apply。", category: "Review" },
  { tool: "claude", command: "/skills", desc: "available skills を list / hide。", category: "Skills" },
  { tool: "claude", command: "/status", desc: "version、model、account、connectivity を表示。", category: "Diagnostics" },
  { tool: "claude", command: "/statusline", desc: "status line を configure。", category: "UI" },
  { tool: "claude", command: "/stop", desc: "attached background session を stop。", category: "Background" },
  { tool: "claude", command: "/tasks, /bashes", desc: "background tasks を view/manage。", category: "Background" },
  { tool: "claude", command: "/teleport, /tp", desc: "Claude Code on the web session を terminal に取り込む。", category: "Cloud" },
  { tool: "claude", command: "/theme", desc: "color theme を変更。", category: "UI" },
  { tool: "claude", command: "/tui", desc: "terminal UI renderer を default/fullscreen で切替。", category: "UI" },
  { tool: "claude", command: "/ultraplan", desc: "browser で review できる plan session を作る。", category: "Planning" },
  { tool: "claude", command: "/ultrareview", desc: "deep multi-agent cloud review。/code-review ultra が推奨。", category: "Review" },
  { tool: "claude", command: "/usage-credits", desc: "usage credits を configure。", category: "Usage" },
  { tool: "claude", command: "/verify", desc: "app を build/run/observe して変更を確認。", category: "Verification" },
  { tool: "claude", command: "/voice", desc: "voice dictation を toggle。", category: "UI" },
  { tool: "claude", command: "/web-setup", desc: "local gh credentials で Claude Code on the web と GitHub を接続。", category: "Cloud" },
  { tool: "claude", command: "/workflows", desc: "workflow progress view を開く。", category: "Workflow" }
];

const parityLabels = {
  same: "同等",
  similar: "近い",
  "codex-only": "Codex のみ",
  "claude-only": "Claude のみ"
};

const state = {
  view: "compare",
  query: "",
  tool: "all",
  parity: "all"
};

const el = {
  results: document.querySelector("#results"),
  searchInput: document.querySelector("#searchInput"),
  toolFilter: document.querySelector("#toolFilter"),
  parityFilter: document.querySelector("#parityFilter"),
  statPairs: document.querySelector("#statPairs"),
  statCodex: document.querySelector("#statCodex"),
  statClaude: document.querySelector("#statClaude"),
  statSlash: document.querySelector("#statSlash"),
  segments: [...document.querySelectorAll(".segment")]
};

function normalize(value) {
  return String(value || "").toLowerCase();
}

function matchesQuery(item) {
  if (!state.query) return true;
  return normalize(JSON.stringify(item)).includes(normalize(state.query));
}

function getDisplayCommand(row, tool) {
  const original = row[tool];
  const override = tuiOverrides[row.task]?.[tool];
  if (!override) {
    return {
      label: original.command.startsWith("/") ? "TUI" : "CLI",
      command: original.command,
      desc: original.desc,
      secondary: null
    };
  }
  return {
    label: override.label || "TUI",
    command: override.command,
    desc: override.desc || original.desc,
    secondary: override.command === original.command ? null : original.command
  };
}

function commandHtml(row, tool) {
  const label = tool === "codex" ? "Codex" : "Claude Code";
  const entry = getDisplayCommand(row, tool);
  return `
    <div class="tool-label">
      <span>${label} · ${escapeHtml(entry.label)}</span>
    </div>
    ${copyableCommandHtml(entry.command)}
    <p class="command-desc">${escapeHtml(entry.desc)}</p>
    ${
      entry.secondary
        ? `<div class="secondary-command"><span>CLI</span>${copyableCommandHtml(entry.secondary)}</div>`
        : ""
    }
  `;
}

function badgeHtml(parity) {
  return `<span class="badge ${parity}">${parityLabels[parity]}</span>`;
}

function hasTuiReference(row) {
  return Boolean(tuiOverrides[row.task]) || row.codex.command.startsWith("/") || row.claude.command.startsWith("/");
}

function renderCompare() {
  const rows = comparisonRows.filter((row) => {
    if (hiddenTuiTasks.has(row.task)) return false;
    if (!hasTuiReference(row)) return false;
    if (state.parity !== "all" && row.parity !== state.parity) return false;
    if (state.tool === "codex" && row.parity === "claude-only") return false;
    if (state.tool === "claude" && row.parity === "codex-only") return false;
    return matchesQuery(row);
  });

  return `
    ${sectionHeader("TUI コマンド対応表", `${rows.length} 件表示。CLI しかない操作は CLI 一覧に分けています。`)}
    ${rows.length ? `<div class="comparison-list">${rows.map(renderComparisonRow).join("")}</div>` : emptyState()}
  `;
}

function renderComparisonRow(row) {
  return `
    <article class="comparison-row">
      <div class="comparison-cell comparison-task">
        <h3>${escapeHtml(row.task)}</h3>
        <p>${escapeHtml(row.summary)}</p>
      </div>
      <div class="comparison-cell codex-cell">
        ${commandHtml(row, "codex")}
      </div>
      <div class="comparison-cell claude-cell">
        ${commandHtml(row, "claude")}
      </div>
      <div class="comparison-cell note-cell">
        <strong>${badgeHtml(row.parity)} ${escapeHtml(row.category)}</strong>
        <p>${escapeHtml(row.note)}</p>
      </div>
    </article>
  `;
}

function renderCli() {
  const items = cliCommands.filter((item) => {
    if (state.tool !== "all" && item.tool !== state.tool) return false;
    return matchesQuery(item);
  });
  return `
    ${sectionHeader("CLI コマンド一覧", `${items.length} 件表示。起動時 flags と subcommand の参照用です。`)}
    ${items.length ? `<div class="card-grid">${items.map(renderCommandCard).join("")}</div>` : emptyState()}
  `;
}

function renderSlash() {
  const items = slashCommands.filter((item) => {
    if (state.tool !== "all" && item.tool !== state.tool) return false;
    return matchesQuery(item);
  });
  return `
    ${sectionHeader("Slash command 一覧", `${items.length} 件表示。interactive session 内で使うコマンドです。`)}
    ${items.length ? `<div class="card-grid">${items.map(renderCommandCard).join("")}</div>` : emptyState()}
  `;
}

function renderUnique() {
  const uniqueRows = comparisonRows.filter((row) => {
    if (!["codex-only", "claude-only"].includes(row.parity)) return false;
    if (state.parity !== "all" && row.parity !== state.parity) return false;
    if (state.tool === "codex" && row.parity !== "codex-only") return false;
    if (state.tool === "claude" && row.parity !== "claude-only") return false;
    return matchesQuery(row);
  });

  const codexOriginal = slashCommands.filter((item) => item.tool === "codex" && !hasSlashPeer(item.command, "claude") && matchesQuery(item));
  const claudeOriginal = slashCommands.filter((item) => item.tool === "claude" && !hasSlashPeer(item.command, "codex") && matchesQuery(item));
  const originalCards = [
    ...(state.tool !== "claude" ? codexOriginal : []),
    ...(state.tool !== "codex" ? claudeOriginal : [])
  ];

  return `
    ${sectionHeader("片側のみ・独自コマンド", `${uniqueRows.length + originalCards.length} 件表示。`)}
    ${uniqueRows.length ? `<div class="comparison-list">${uniqueRows.map(renderComparisonRow).join("")}</div>` : ""}
    ${originalCards.length ? `<div class="card-grid" style="margin-top:12px">${originalCards.map(renderCommandCard).join("")}</div>` : ""}
    ${!uniqueRows.length && !originalCards.length ? emptyState() : ""}
  `;
}

function hasSlashPeer(command, peerTool) {
  const names = command
    .split(",")
    .map((part) => part.trim().split(" ")[0])
    .filter(Boolean);
  return slashCommands.some((item) => item.tool === peerTool && names.some((name) => item.command.includes(name)));
}

function renderCommandCard(item) {
  return `
    <article class="command-card ${item.tool}">
      ${copyableCommandHtml(item.command, "card-command")}
      <p class="command-desc">${escapeHtml(item.desc)}</p>
      <div class="card-meta">
        <span class="tag">${item.tool === "codex" ? "Codex" : "Claude Code"}</span>
        <span class="tag">${escapeHtml(item.category)}</span>
      </div>
    </article>
  `;
}

function sectionHeader(title, subtitle) {
  return `
    <div class="section-header">
      <h2>${escapeHtml(title)}</h2>
      <p>${escapeHtml(subtitle)}</p>
    </div>
  `;
}

function emptyState() {
  return `<div class="empty-state">条件に一致するコマンドはありません。</div>`;
}

function copyableCommandHtml(command, extraClass = "") {
  return `
    <div class="copy-row">
      <code class="cmd-line ${extraClass}">${escapeHtml(command)}</code>
      <button class="copy-button" type="button" data-copy="${escapeHtml(command)}">Copy</button>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function copyText(value, button) {
  try {
    let copied = false;
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(value);
        copied = true;
      } catch {
        copied = false;
      }
    }
    if (!copied) {
      const textarea = document.createElement("textarea");
      textarea.value = value;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.left = "-9999px";
      document.body.append(textarea);
      textarea.focus();
      textarea.select();
      const ok = document.execCommand("copy");
      textarea.remove();
      if (!ok) throw new Error("copy command failed");
    }
    button.classList.remove("copy-failed");
    button.classList.add("is-copied");
    button.textContent = "Copied";
    window.setTimeout(() => {
      button.classList.remove("is-copied");
      button.textContent = "Copy";
    }, 1200);
  } catch {
    button.classList.add("copy-failed");
    button.textContent = "Failed";
    window.setTimeout(() => {
      button.classList.remove("copy-failed");
      button.textContent = "Copy";
    }, 1400);
  }
}

function updateStats() {
  el.statPairs.textContent = comparisonRows.filter((row) => !hiddenTuiTasks.has(row.task) && hasTuiReference(row)).length;
  el.statCodex.textContent = cliCommands.filter((item) => item.tool === "codex").length;
  el.statClaude.textContent = cliCommands.filter((item) => item.tool === "claude").length;
  el.statSlash.textContent = slashCommands.length;
}

function render() {
  el.segments.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.view === state.view);
  });
  el.parityFilter.disabled = !["compare", "unique"].includes(state.view);

  if (state.view === "compare") el.results.innerHTML = renderCompare();
  if (state.view === "cli") el.results.innerHTML = renderCli();
  if (state.view === "slash") el.results.innerHTML = renderSlash();
  if (state.view === "unique") el.results.innerHTML = renderUnique();
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-copy]");
    if (!button) return;
    copyText(button.dataset.copy, button);
  });
  el.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
  });
  el.toolFilter.addEventListener("change", (event) => {
    state.tool = event.target.value;
    render();
  });
  el.parityFilter.addEventListener("change", (event) => {
    state.parity = event.target.value;
    render();
  });
  el.segments.forEach((button) => {
    button.addEventListener("click", () => {
      state.view = button.dataset.view;
      render();
    });
  });
}

updateStats();
bindEvents();
render();
