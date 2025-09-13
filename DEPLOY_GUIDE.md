# 🚀 無料デプロイ手順書

## 📱 Web とスマホでアクセスできる Wordlist Generator のデプロイ方法

### 🎯 推奨デプロイ方法: Vercel

#### **なぜ Vercel が最適か？**

- ✅ Next.js 開発元の公式プラットフォーム
- ✅ 無料枠で十分な容量（100GB/月）
- ✅ 自動 SSL、CDN、高速配信
- ✅ カスタムドメイン対応
- ✅ GitHub と連携して自動デプロイ

---

## 🔧 事前準備

### 1. GitHub リポジトリの作成

```bash
# プロジェクトをGitHubにプッシュ
git add .
git commit -m "Add Vercel deployment configuration"
git branch -M main
git remote add origin https://github.com/[あなたのユーザー名]/wordlist-generator.git
git push -u origin main
```

### 2. ローカルビルドテスト

```bash
# 依存関係のインストール
npm install

# ビルドテスト
npm run build

# 本番環境での動作確認
npm run start
```

---

## 🚀 Vercel でのデプロイ手順

### Step 1: Vercel アカウント作成

1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign Up」をクリック
3. GitHub アカウントで連携ログイン

### Step 2: プロジェクトのインポート

1. Vercel ダッシュボードで「Add New...」→「Project」
2. GitHub リポジトリ「wordlist-generator」を選択
3. 「Import」をクリック

### Step 3: デプロイ設定

- **Framework Preset**: Next.js（自動検出）
- **Build Command**: `npm run build`（自動設定）
- **Output Directory**: `.next`（自動設定）
- **Install Command**: `npm install`（自動設定）

### Step 4: デプロイ実行

1. 「Deploy」ボタンをクリック
2. 約 2-3 分でデプロイ完了
3. 生成された URL でアクセス可能

---

## 📱 スマホ対応確認

### レスポンシブデザインチェック

- ✅ Tailwind CSS でレスポンシブ対応済み
- ✅ フローティングボタンがタッチ操作に最適化
- ✅ カード表示がモバイル画面に適応

### PWA（Progressive Web App）化（オプション）

必要に応じて、スマホアプリのように使用可能にできます：

```javascript
// next.config.ts に追加
const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  // 既存の設定
});
```

---

## 🔄 自動デプロイ設定

GitHub にプッシュするたびに自動デプロイされます：

```bash
# 変更をコミット・プッシュ
git add .
git commit -m "Update features"
git push origin main
# → Vercelが自動でデプロイ開始
```

---

## 🌐 カスタムドメイン設定（オプション）

### 1. 独自ドメインの追加

1. Vercel プロジェクト設定 → Domains
2. 「Add」でドメイン名を入力
3. DNS 設定を更新

### 2. 無料ドメインオプション

- `[プロジェクト名].vercel.app`（自動付与）
- `[カスタム名].vercel.app`（カスタマイズ可能）

---

## 🔧 トラブルシューティング

### ビルドエラーの場合

```bash
# ローカルでエラーチェック
npm run lint
npm run type-check
npm run build
```

### デプロイ失敗の場合

1. Vercel ダッシュボードで「Functions」タブを確認
2. ビルドログを確認
3. `vercel.json`設定を見直し

### データファイル読み込みエラー

- `data/`フォルダ内の JSON ファイルが正しく配置されているか確認
- Dynamic import 文の動作確認

---

## 🎉 デプロイ完了後

### アクセス方法

- **PC**: ブラウザで Vercel URL にアクセス
- **スマホ**: 同じ URL でアクセス（レスポンシブ対応済み）
- **ホーム画面追加**: スマホブラウザで「ホーム画面に追加」でアプリ風に使用可能

### パフォーマンス確認

- Vercel Analytics（無料）で使用状況を確認
- Google PageSpeed Insights でパフォーマンステスト

---

## 📊 無料枠の制限

### Vercel 無料プラン

- ✅ 帯域幅: 100GB/月
- ✅ ビルド実行時間: 6,000 分/月
- ✅ サーバーレス関数: 100GB-Hrs/月
- ✅ デプロイ数: 無制限

### 使用量目安

あなたの Wordlist Generator アプリなら：

- 個人使用では十分すぎる容量
- 友人・家族とシェアしても問題なし

---

## 🔮 今後の拡張アイデア

### 追加機能候補

- ユーザー認証（Firebase Auth）
- データ同期（Firebase Firestore）
- 音声読み上げ機能
- 学習進捗トラッキング
- 他言語対応

これで無料で Web とスマホ両方からアクセスできる単語帳アプリのデプロイが完了します！
