# カードマスター

ブラウザで遊ぶカードゲームです（CPU対戦／1対1の通信対戦）。

## 遊び方
公開したURL（GitHub Pages）を開くだけです。
- CPU対戦：「CPU対戦」
- 通信対戦：「通信対戦」→ 1人が「部屋を作る」で合言葉を出し、もう1人が合言葉を入れて「入る」

通信対戦は、2人の端末を直接つなぐ方式（WebRTC／PeerJS）です。インターネット接続が必要です。回線によってはつながらないことがあります（Wi-Fiとモバイルを切り替えると改善する場合があります）。

## 公開手順（GitHub Pages）
1. GitHubで新しいリポジトリを作る（Public）
2. このフォルダの中身（`index.html`・`.nojekyll`・`README.md`）をアップロードする
3. リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にして保存
4. しばらくして表示される `https://ユーザー名.github.io/リポジトリ名/` を、身内に共有する
