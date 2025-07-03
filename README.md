# genai-mama-members

## プロジェクト概要

このリポジトリは、GitHub初心者向けのチュートリアルとして活用できるプルリクエスト練習場です。Fork → Clone → 自己紹介追加 → プルリクエストという基本的なGitHubワークフローを体験できます。

## 参加手順

1. **Fork**  
   このリポジトリを自分のアカウントにForkしてください。

2. **Clone**  
   Forkしたリポジトリを自分のローカル環境にCloneします。
   ```bash
   git clone https://github.com/[あなたのアカウント名]/genai-mama-members.git
   cd genai-mama-members
   ```

3. **自己紹介ファイルの作成**  
   `members/` ディレクトリに、`[あなたのGitHubアカウント名].md` というファイルを作成してください。  
   フォーマットは以下のとおりです：
   ```yaml
   ---
   name: なつみかん
   account: https://x.com/natsu_00056
   ---
   ```

4. **ブランチ作成＆コミット＆プッシュ**  
   ```bash
   # 新しいブランチを作成して切り替え
   git checkout -b add-[あなたのGitHubアカウント名]
   
   # ファイルをステージング
   git add members/[あなたのGitHubアカウント名].md
   
   # コミット
   git commit -m "Add [あなたのGitHubアカウント名]'s introduction"
   
   # 作成したブランチをプッシュ
   git push origin add-[あなたのGitHubアカウント名]
   ```

5. **プルリクエスト**  
   GitHubのウェブサイトから、あなたのForkしたリポジトリの`add-[あなたのGitHubアカウント名]`ブランチから、元のリポジトリの`main`ブランチへプルリクエストを作成してください。

## メンバー一覧

以下のメンバー一覧は、`scripts/build_readme.ts` によって自動生成されます。

<!-- MEMBERS_LIST_START -->
| Name | Account |
|------|---------|
<!-- MEMBERS_LIST_END -->

## 技術スタック

- TypeScript（Node.js v18以上）
- GitHub Actions
- Markdown / YAML

## ライセンス

MIT License