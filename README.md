# 📚 Wordlist Generator - LLM JSON データ生成ガイド

ドイツ語学習用語彙データを LLM で効率的に生成・管理するためのプロジェクトです。Next.js + TypeScript + Tailwind CSS で構築された単語帳アプリケーションのデータセット作成に特化したガイドラインを提供します。

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

## 🤖 LLM による JSON データ生成

### 🎯 生成ワークフロー

1. **語彙リスト準備**: B2 レベル対象語彙の基本リスト作成
2. **DWDS 参照**: `https://www.dwds.de/wb/[単語]` で詳細情報取得
3. **LLM プロンプト実行**: 構造化された JSON データ生成
4. **品質検証**: 文法・意味・例文の正確性チェック
5. **データ統合**: 既存データベースへの追加・更新

### 📖 DWDS 活用ガイドライン

**必須参照項目**：

- **語法情報**: 正しい用法と注意点
- **語源（Etymologie）**: 単語の成り立ちと歴史的変遷
- **品詞分類**: 正確な文法カテゴリ
- **活用形**: 動詞活用、名詞変化等
- **例文（Beispiele）**: 実際の使用文脈

**DWDS URL フォーマット**: `https://www.dwds.de/wb/[単語名]`

例：

- `https://www.dwds.de/wb/abgeben` （動詞 abgeben の詳細）
- `https://www.dwds.de/wb/Abstimmung` （名詞 Abstimmung の詳細）

## 🗂️ JSON データ仕様

### ファイル構造

プロジェクトは以下の JSON データファイルを使用しています：

#### `data/words_b2_german.json`

メインの語彙データベース（10,000 語以上）

#### `data/words_b2_sprechen_fillers.json`

ドイツ語会話で使用される繋ぎ語・フィラー語のデータセット

### 📊 データスキーマ

各単語エントリーは以下の構造を持ちます：

```typescript
interface WordEntry {
  id: string; // 一意識別子
  word: string; // 単語（分離動詞は | で区切り）
  partOfSpeech: string; // 品詞
  gender?: string; // 名詞の性（der/die/das）
  plural?: string; // 複数形
  variants?: WordVariant[]; // 語形変化
  meanings: WordMeaning[]; // 意味（日英対訳）
  examples?: WordExample[]; // 使用例文
  conjugation?: Conjugation; // 動詞活用
  etymology?: Etymology; // 語源情報
  tags?: string[]; // カテゴリタグ
  usageNotes?: string; // 使用上の注意点
}
```

#### 詳細フィールド仕様

```typescript
// 意味定義
interface WordMeaning {
  ja: string; // 日本語意味
  en: string; // 英語意味
  note?: string; // 補足説明
}

// 例文
interface WordExample {
  de: string; // ドイツ語例文
  ja: string; // 日本語訳
}

// 動詞活用
interface Conjugation {
  infinitive: string; // 不定詞
  preterite: string; // 過去形
  pastParticiple: string; // 過去分詞
  auxiliary?: "haben" | "sein"; // 助動詞
}

// 語源情報
interface Etymology {
  type:
    | "compound"
    | "separable-verb"
    | "derived-noun"
    | "past-participle"
    | "other";
  components: EtymologyComponent[];
}

interface EtymologyComponent {
  form: string; // 語源要素
  meaning: {
    // 要素の意味
    ja: string;
    en: string;
  };
  partOfSpeech: string; // 要素の品詞
}
```

#### 品詞分類

- `verb` - 動詞
- `noun` - 名詞
- `adjective` - 形容詞
- `adverb` - 副詞
- `preposition` - 前置詞
- `phrase` - 成句・慣用表現
- `filler` - 繋ぎ語・フィラー語

#### 動詞の語順ガイドライン

**再帰動詞・前置詞動詞の標準形式**：

再帰動詞や前置詞動詞は、辞書的な不定形の語順で記録します：

- ✅ **推奨**: `sich3 vor etw3 ekeln` （再帰代名詞＋前置詞＋目的語＋動詞）
- ❌ **非推奨**: `sich ekeln vor` （動詞＋前置詞の語順）

**格変化の表記**：

- `sich3` = 再帰代名詞 3 格（Dativ）
- `etw3` = etwas（何か）+ 3 格（Dativ）
- `jdn4` = jemanden（誰か）+ 4 格（Akkusativ）

**例**：

- `sich3 vor etw3 ekeln` → "〜に嫌悪感を抱く"
- `jdm3 bei etw3 helfen` → "（誰かの）〜を手伝う"
- `sich4 für etw4 interessieren` → "〜に興味を持つ"

この形式により、ドイツ語学習者は正しい格変化と語順を同時に学習できます。

#### タグシステム

語彙をカテゴリ別に分類：

- `action` - 行動・動作
- `submission` - 提出・申請
- `speaking` - 会話
- `hesitation` - 躊躇・間投詞
- `b2` - B2 レベル語彙
- `approximation` - 近似表現

## 🤖 LLM プロンプト例

### 基本生成プロンプト

```
ドイツ語の単語「[WORD]」について、以下の JSON 形式でデータを生成してください。

**必須参照**: https://www.dwds.de/wb/[WORD] の情報を活用し、特に語法上の注意点と語源情報を正確に反映してください。

**要求仕様**:
1. B2 レベル学習者向けの教育的価値を重視
2. 日本語と英語の対訳を含む
3. 実用的な例文（日常・ビジネス・学術文脈）
4. 正確な文法情報（活用、性、複数形等）
5. 語源・成り立ちの詳細説明
6. **動詞語順**: 再帰動詞・前置詞動詞は辞書的語順で記録（例: `sich3 vor etw3 ekeln`）

**出力形式**: 以下の TypeScript インターフェースに準拠
[WordEntry 型定義を挿入]

**品質基準**:
- 例文は自然で教育的価値が高いこと
- 語源情報は学習理解を深めるものであること
- タグ付けは意味領域と使用文脈を適切に分類すること
```

### 語源重視プロンプト

```
ドイツ語単語「[WORD]」の語源と成り立ちに特化したデータ生成を行ってください。

**DWDS 参照**: https://www.dwds.de/wb/[WORD] の Etymology セクションを必ず確認

**重点項目**:
1. 語源の正確な分類（compound, separable-verb, derived-noun 等）
2. 構成要素の詳細分析
3. 歴史的言語変化の説明
4. 関連語族との関係性

**Etymology オブジェクト**:
- type: 語源タイプの正確な分類
- components: 各構成要素の意味と品詞
- 学習者の理解を深める説明

例: "abgeben" = "ab"（離れる）+ "geben"（与える）
```

### フィラー語専用プロンプト

```
ドイツ語の会話フィラー語「[WORD]」のデータを生成してください。

**特化要求**:
1. 会話での実際の使用場面
2. ニュアンスと使い分け
3. B2 レベルでの自然な会話への組み込み方
4. 日本語話者が注意すべきポイント

**usageNotes フィールド**: 会話での効果的な使用法を詳述
**tags**: ["filler", "speaking", "b2"] を必須含有
```

## ✅ 品質管理ガイドライン

### 生成データの検証項目

#### 🔍 必須チェックポイント

1. **DWDS 参照確認**

   - 全単語で DWDS URL が存在し、アクセス可能か
   - 品詞分類が DWDS と一致しているか
   - 語源情報が正確に反映されているか

2. **文法正確性**

   - 動詞活用形（不定詞、過去形、過去分詞、助動詞）
   - **動詞語順**: 再帰動詞・前置詞動詞は辞書的語順（`sich3 vor etw3 ekeln`形式）
   - 格変化の正確な表記（sich3, etw3, jdn4 等）
   - 名詞の性（der/die/das）と複数形
   - 形容詞の語尾変化情報

3. **例文品質**

   - 文法的に正しいドイツ語
   - B2 レベルに適した語彙と構文
   - 日本語訳の自然さ

4. **教育的価値**
   - 学習効果の高い文脈設定
   - 実際のコミュニケーションで有用
   - 記憶定着を促進する関連性

#### 🚫 避けるべき要素

- 古語や方言（B2 レベルに不適切）
- 不自然な例文や翻訳調表現
- 不正確な語源情報
- 重複や類似の例文
- 文化的に不適切な内容

### データ品質スコア

各エントリーに以下の評価基準を適用：

- **A**: 完璧（DWDS 完全準拠、高品質例文、正確な文法情報）
- **B**: 良好（軽微な改善の余地）
- **C**: 要改善（明らかな問題あり）
- **D**: 不合格（再生成必要）

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
│   ├── words_b2_german.json      # メイン語彙データベース
│   └── words_b2_sprechen_fillers.json # フィラー語データ
├── scripts/            # データ生成・検証スクリプト
│   ├── generate_wordlist.py      # LLM による JSON 生成
│   ├── validate_dwds_references.py # DWDS 参照検証
│   └── quality_check.js          # データ品質チェック
├── prompts/            # LLM プロンプトテンプレート
│   ├── basic_word.txt            # 基本単語生成
│   ├── etymology_focus.txt       # 語源重視生成
│   └── filler_words.txt          # フィラー語生成
├── pages/              # Next.js ページ
│   ├── _app.tsx       # アプリケーション設定
│   ├── index.tsx      # メインページ
│   └── api/           # API ルート
├── styles/             # CSS スタイル
├── types/              # TypeScript 型定義
│   └── word.ts        # 単語データ型定義
├── public/             # 静的アセット
├── schemas/            # JSON スキーマ定義
│   └── word-entry.json # WordEntry 検証スキーマ
└── docs/               # ドキュメント
    ├── DEPLOY_GUIDE.md # デプロイ手順書
    └── LLM_GUIDE.md    # LLM 生成詳細ガイド
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

### DWDS 参照による単語生成例

**単語**: `abgeben`
**DWDS URL**: `https://www.dwds.de/wb/abgeben`

生成される JSON データ例：

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

### 語源タイプ別の例

#### 派生名詞（derived-noun）の例

```json
{
  "id": "gewerbe",
  "word": "Gewerbe",
  "partOfSpeech": "noun",
  "gender": "neuter",
  "plural": "Gewerbe",
  "meanings": [
    {
      "ja": "営業、商売、職業",
      "en": "trade, business, commerce"
    }
  ],
  "etymology": {
    "type": "derived-noun",
    "components": [
      {
        "form": "werben",
        "meaning": {
          "ja": "勧誘する、求める、活動する",
          "en": "to recruit, to seek, to be active"
        },
        "partOfSpeech": "verb"
      }
    ]
  }
}
```

このガイドに従って、LLM を活用した高品質なドイツ語学習データセットを構築してください。
