# 📚 Wordlist Generator

ドイツ語学習用語彙データを LLM で効率的に生成・管理するためのプロジェクトです。Next.js + TypeScript + Tailwind CSS で構築された単語帳アプリケーションと、高品質な語彙データセットの自動生成システムを提供します。

> **🤖 LLM によるデータ生成について**: 詳細な生成手順とプロンプト例は [`LLM_GUIDE.md`](./LLM_GUIDE.md) をご参照ください。

## 🎯 概要

このプロジェクトは、**LLM（大規模言語モデル）を活用してドイツ語 B2 レベルの高品質な語彙データベースを構築**することを目的としています。[DWDS（Digitales Wörterbuch der deutschen Sprache）](https://www.dwds.de/wb/)を主要参考リソースとして、正確で教育的価値の高い語彙データの自動生成を実現します。

### 🤖 LLM データ生成機能

- **📖 DWDS 連携**: [DWDS](https://www.dwds.de/wb/) の豊富な言語学的データを活用
- **🎯 B2 レベル特化**: 中上級学習者向けに最適化された語彙選定
- **📝 自動例文生成**: 文脈に応じた自然な使用例の作成
- **🔍 語源解析**: 単語の成り立ちと語族関係の詳細分析
- **📊 品詞別最適化**: 動詞活用、名詞の性・複数形等の文法情報完備
- **🏷️ インテリジェントタグ付け**: 意味領域とレベル別の自動分類

### 🚀 アプリケーション機能

- **📱 レスポンシブデザイン**: PC・スマートフォン両対応
- **🎴 フリップカード**: ワンクリックで単語の意味・例文を表示
- **🎯 フィルタリング**: 品詞別・タグ別での絞り込み表示
- **🔄 ランダム表示**: 学習効果を高めるシャッフル機能
- **⚡ 高速表示**: Next.js 最適化による快適な操作性

### 📋 開発ロードマップ

- [ ] **LLM 自動生成パイプライン**の構築
- [ ] **DWDS API 連携**による語彙データ拡充
- [ ] **品質管理システム**の実装
- [ ] **多言語対応**（英語、フランス語等）
- [ ] **学習進捗トラッキング**機能

## 🤖 LLM データ生成システム

このプロジェクトは、LLM（大規模言語モデル）を活用して高品質なドイツ語語彙データを自動生成するシステムを提供します。

### 🎯 主要機能

- **📖 DWDS 連携**: [DWDS](https://www.dwds.de/wb/) の豊富な言語学的データを活用
- **🎯 B2 レベル特化**: 中上級学習者向けに最適化された語彙選定
- **📝 自動例文生成**: 文脈に応じた自然な使用例の作成
- **🔍 語源解析**: 単語の成り立ちと語族関係の詳細分析
- **📊 品詞別最適化**: 動詞活用、名詞の性・複数形等の文法情報完備
- **🏷️ インテリジェントタグ付け**: 意味領域とレベル別の自動分類

### 📋 生成ワークフロー

1. **語彙リスト準備**: B2 レベル対象語彙の基本リスト作成
2. **DWDS 参照**: `https://www.dwds.de/wb/[単語]` で詳細情報取得
3. **LLM プロンプト実行**: 構造化された JSON データ生成
4. **品質検証**: 文法・意味・例文の正確性チェック
5. **データ統合**: 既存データベースへの追加・更新

> **詳細な生成手順**: [`LLM_GUIDE.md`](./LLM_GUIDE.md) で具体的なプロンプト例と品質管理ガイドラインを確認できます。

## 🗂️ データ構造

### ファイル構成

プロジェクトは以下の JSON データファイルを使用しています：

- **`data/words_b2_lesen.json`** - 読解用語彙データ
- **`data/words_b2_missing_vocabulary_202509.json`** - 2025 年 9 月版不足語彙
- **`data/words_b2_missing_vocabulary_202510.json`** - 2025 年 10 月版不足語彙
- **`data/words_b2_sprechen_fillers.json`** - 会話フィラー語データ

### 📊 データスキーマ概要

各単語エントリーは以下の基本構造を持ちます：

```typescript
interface WordEntry {
  id: string; // 一意識別子
  word: string; // 単語（分離動詞は | で区切り）
  partOfSpeech: string; // 品詞
  gender?: string; // 名詞の性（der/die/das）
  plural?: string; // 複数形
  meanings: WordMeaning[]; // 意味（日英対訳）
  examples: WordExample[]; // 使用例文（必須、最低2つ）
  conjugation?: Conjugation; // 動詞活用
  etymology?: Etymology; // 語源情報（学習に役立つ場合のみ）
  tags?: string[]; // カテゴリタグ
  usageNotes?: string; // 使用上の注意点
}
```

> **詳細なスキーマ定義**: [`LLM_GUIDE.md`](./LLM_GUIDE.md) で完全な TypeScript インターフェースとフィールド仕様を確認できます。

## 📋 品質管理

### データ品質基準

生成される語彙データは以下の基準で品質管理されています：

- **A**: 完璧（DWDS 完全準拠、必須例文 2 つ以上、適切な語源情報）
- **B**: 良好（軽微な改善の余地）
- **C**: 要改善（明らかな問題あり）
- **D**: 不合格（例文不足、再生成必要）

### 検証項目

- **DWDS 参照確認**: 全単語で DWDS URL が存在し、アクセス可能か
- **文法正確性**: 動詞活用、名詞の性・複数形、格変化の正確な表記
- **例文品質**: 最低 2 つの自然で教育的価値の高い例文
- **語源情報**: 学習に役立つ場合のみ追加（複合語、派生語、接頭辞・接尾辞）

> **詳細な品質管理ガイドライン**: [`LLM_GUIDE.md`](./LLM_GUIDE.md) で具体的な検証項目とプロンプト例を確認できます。

## 🚀 開発開始

### 環境要件

- Node.js 22.x 以上
- npm または yarn

### インストール

```bash
# リポジトリクローン
git clone https://github.com/[username]/wordlist-generator.git
cd wordlist-generator

# 依存関係インストール
npm install
```

### LLM データ生成環境

```bash
# Python 環境（データ生成用）
pip install requests beautifulsoup4 pandas

# JSON 検証ツール
npm install -g ajv-cli

# データ品質チェック
python scripts/validate_dwds_references.py
```

> **LLM 生成手順**: [`LLM_GUIDE.md`](./LLM_GUIDE.md) で詳細な生成手順とプロンプト例を確認できます。

### 開発サーバー起動

```bash
npm run dev
# または
yarn dev
# または
pnpm dev
# または
bun dev
```

[http://localhost:3000](http://localhost:3000) でアプリケーションにアクセス可能です。

### ビルド・本番環境

```bash
# 本番ビルド
npm run build

# 本番サーバー起動
npm run start

# 型チェック
npm run type-check

# リンターチェック
npm run lint
```

## 🏗️ プロジェクト構造

```
wordlist-generator/
├── components/          # React コンポーネント
│   └── WordCard.tsx    # 単語カードコンポーネント
├── data/               # 語彙データ（LLM 生成）
│   ├── words_b2_lesen.json                    # 読解用語彙データ
│   ├── words_b2_missing_vocabulary_202509.json # 2025年9月版不足語彙
│   ├── words_b2_missing_vocabulary_202510.json # 2025年10月版不足語彙
│   └── words_b2_sprechen_fillers.json         # 会話フィラー語データ
├── pages/              # Next.js ページ
│   ├── _app.tsx       # アプリケーション設定
│   ├── index.tsx      # メインページ
│   └── api/           # API ルート
├── styles/             # CSS スタイル
├── types/              # TypeScript 型定義
│   └── word.ts        # 単語データ型定義
├── public/             # 静的アセット
├── LLM_GUIDE.md        # LLM 生成詳細ガイド
├── DEPLOY_GUIDE.md     # デプロイ手順書
└── README.md          # プロジェクト概要
```

## 🎨 技術スタック

### アプリケーション

- **Frontend**: Next.js 15.3, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Build**: Turbopack
- **Deploy**: Vercel (推奨)

### データ生成

- **LLM**: Claude 3.5, GPT-4, Gemini Pro
- **参照源**: [DWDS](https://www.dwds.de/wb/) - ドイツ語デジタル辞書
- **検証**: Python (requests, BeautifulSoup4)
- **フォーマット**: 静的 JSON + TypeScript 型定義

## 📱 デプロイ

詳細なデプロイ手順は [`DEPLOY_GUIDE.md`](./DEPLOY_GUIDE.md) をご参照ください。

### 推奨: Vercel

```bash
# Vercel CLI使用
npm i -g vercel
vercel --prod
```

### GitHub 連携デプロイ

1. GitHub リポジトリ作成・プッシュ
2. [Vercel](https://vercel.com)で GitHub 連携
3. 自動デプロイ設定完了

## 🤝 コントリビューション

1. Fork
2. Feature branch 作成 (`git checkout -b feature/amazing-feature`)
3. Commit (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Pull Request 作成

## 📄 ライセンス

[MIT License](./LICENSE)

## 🔗 関連リンク

### 開発リソース

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Vercel Platform](https://vercel.com)

### 言語学習・辞書リソース

- **[DWDS - Digitales Wörterbuch der deutschen Sprache](https://www.dwds.de/wb/)** - メイン参照辞書
- [Etymologisches Wörterbuch des Deutschen](https://www.dwds.de/wb/) - 語源情報
- [OpenThesaurus](https://www.openthesaurus.de/) - 類義語辞典
- [Wortgeschichte digital](https://www.dwds.de/d/wb-wgd) - 語史研究

### LLM・AI リソース

- [OpenAI GPT-4](https://openai.com/gpt-4)
- [Anthropic Claude](https://www.anthropic.com/claude)
- [Google Gemini](https://deepmind.google/technologies/gemini/)

---

## 📊 使用例

### 生成データ例

**単語**: `abgeben` (分離動詞)

```json
{
  "id": "abgeben",
  "word": "ab|geben",
  "partOfSpeech": "verb",
  "conjugation": {
    "infinitive": "abgeben",
    "preterite": "gab ab",
    "pastParticiple": "abgegeben",
    "auxiliary": "haben"
  },
  "meanings": [
    {
      "ja": "提出する、手渡す；放出する",
      "en": "to hand in, to submit; to emit, to give off"
    }
  ],
  "examples": [
    {
      "de": "Bitte geben Sie Ihre Arbeit bis Montag ab.",
      "ja": "月曜日までに課題を提出してください。"
    },
    {
      "de": "Die Fabrik gibt schädliche Gase ab.",
      "ja": "工場は有害なガスを放出している。"
    }
  ],
  "etymology": {
    "type": "separable-verb",
    "components": [
      {
        "form": "ab",
        "meaning": { "ja": "離れて、取り除いて", "en": "away, off, down" },
        "partOfSpeech": "prefix"
      },
      {
        "form": "geben",
        "meaning": { "ja": "与える、渡す", "en": "to give, to hand over" },
        "partOfSpeech": "verb"
      }
    ]
  },
  "tags": ["action", "submission", "b2"]
}
```

> **詳細な生成例とプロンプト**: [`LLM_GUIDE.md`](./LLM_GUIDE.md) で語源タイプ別の例と具体的なプロンプト例を確認できます。
