# SDD-FV Prototype Makefile

.PHONY: help install dev build start lint clean docker-up docker-down docker-build docker-logs docker-clean

# デフォルトターゲット
help: ## ヘルプを表示
	@echo "SDD-FV Prototype - 利用可能なコマンド:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# 開発環境
install: ## 依存関係をインストール
	npm install

dev: ## 開発サーバーを起動
	npm run dev

build: ## プロダクションビルド
	npm run build

start: ## プロダクションサーバーを起動
	npm run start

lint: ## ESLintを実行
	npm run lint

clean: ## node_modules と .next を削除
	rm -rf node_modules .next

# Docker関連
docker-up: ## Docker環境を起動
	docker-compose up -d

docker-down: ## Docker環境を停止
	docker-compose down

docker-build: ## Dockerイメージをビルドして起動
	docker-compose up --build -d

docker-logs: ## Dockerコンテナのログを表示
	docker-compose logs -f

docker-clean: ## Docker環境をクリーンアップ
	docker-compose down -v
	docker system prune -f

# 開発用ショートカット
setup: install ## 初回セットアップ
	@echo "セットアップ完了！'make dev' で開発サーバーを起動してください"

restart: docker-down docker-up ## Docker環境を再起動

status: ## Docker環境の状態確認
	docker-compose ps

# データベース関連（将来拡張用）
db-reset: ## データベースをリセット（将来実装予定）
	@echo "データベースリセット機能は将来実装予定です"

# ログ関連
logs-app: ## アプリケーションのログを表示
	docker-compose logs -f app

logs-db: ## データベースのログを表示
	docker-compose logs -f db

logs-redis: ## Redisのログを表示
	docker-compose logs -f redis 