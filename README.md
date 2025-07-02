# SDD-FV Prototype

アニメ作品のバズ検知・AI 相談システムのプロトタイプ

## 概要

このプロトタイプは、アニメ作品のマーケティング担当者向けに、SNS やランキングサイトでのバズ検知と AI による施策提案を行うシステムです。

## 主要機能

### 🎬 作品管理

- 作品の登録・編集・削除（CRUD）
- 作品ごとの SNS アカウント・ハッシュタグ管理
- 放送/配信開始日の管理

### 🔥 バズ検知・アラート

- SNS mentions、動画再生数、ランキングのスパイク検知
- 前日比・週次比での変化率監視
- 重要度別のアラート表示

### 🤖 AI 相談チャット

- 作品別の施策提案
- マーケティング戦略の相談
- ナレッジベースからの推薦

### 📊 ダッシュボード

- 作品一覧とアラート履歴
- メトリクス可視化
- チャット履歴管理

## 技術スタック

- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Container**: Docker & Docker Compose
- **Database**: PostgreSQL (予定)
- **Cache**: Redis (予定)

## セットアップ

### 📋 Make コマンドを使用（推奨）

```bash
# ヘルプ表示（利用可能なコマンド一覧）
make help

# 初回セットアップ
make setup

# 開発サーバーの起動
make dev

# Docker環境の起動
make docker-up

# Docker環境でビルド＆起動
make docker-build
```

### 🛠 直接コマンドを使用する場合

#### 開発環境の起動

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

#### Docker を使用する場合

```bash
# Docker Compose でサービス起動
docker-compose up --build

# バックグラウンドで起動する場合
docker-compose up -d --build
```

### 🔧 よく使う Make コマンド

| コマンド            | 説明                                     |
| ------------------- | ---------------------------------------- |
| `make help`         | 利用可能なコマンド一覧を表示             |
| `make setup`        | 初回セットアップ（依存関係インストール） |
| `make dev`          | 開発サーバー起動                         |
| `make docker-up`    | Docker 環境をバックグラウンドで起動      |
| `make docker-build` | Docker イメージをビルドして起動          |
| `make docker-logs`  | 全コンテナのログを表示                   |
| `make logs-app`     | アプリケーションのログのみ表示           |
| `make restart`      | Docker 環境を再起動                      |
| `make docker-clean` | Docker 環境の完全クリーンアップ          |
| `make status`       | Docker 環境の状態確認                    |

## プロトタイプの制限事項

現在のプロトタイプでは以下の機能は実装されていません：

- 実際の SNS API 連携（モックデータを使用）
- AI との実際の連携（固定レスポンスを返却）
- データベースへの永続化（メモリ上のデータ）
- 認証・認可機能
- 実際の通知機能

## ページ構成

- `/` - ホーム（ダッシュボード）
- `/works` - 作品一覧
- `/alerts` - アラート一覧
- `/chat` - AI 相談チャット

## 今後の拡張予定

1. **データ収集基盤**

   - Twitter API v2, TikTok API, YouTube Data API 連携
   - MyAnimeList/AniList ランキング取得
   - Google トレンド連携

2. **バズ判定アルゴリズム**

   - 3σ 超過判定
   - 機械学習による異常検知

3. **AI 機能**

   - GPT + RAG による施策提案
   - 社内ナレッジベース検索
   - 実行可能な施策プランの生成

4. **通知基盤**
   - SendGrid を使ったメール通知
   - Slack/Teams 連携
   - Deep Link による作品コンテキスト連携

## 開発者向け情報

### プロジェクト構造

```
src/
├── app/          # Next.js App Router ページ
├── components/   # 再利用可能なコンポーネント
├── lib/          # ユーティリティ・モックデータ
├── styles/       # グローバルスタイル
└── types/        # TypeScript 型定義
```

### 主要なモックデータ

- `src/lib/mockData.ts` - 作品、アラート、施策のサンプルデータ
- `src/types/index.ts` - アプリケーション全体の型定義

### 開発ワークフロー

```bash
# 1. プロジェクトのクローン後
make setup

# 2. 開発サーバー起動
make dev

# 3. Docker環境での動作確認
make docker-build

# 4. ログ確認
make docker-logs

# 5. 環境のクリーンアップ
make docker-clean
```

## ライセンス

このプロジェクトは開発用プロトタイプです。
