# 🤖 LLM 向けドイツ語語彙データ生成ガイド

## 🎯 概要

このガイドは、LLM（大規模言語モデル）がドイツ語 B2 レベルの高品質な語彙データを JSON 形式で生成するための簡潔な手順書です。

## 📊 JSON データ仕様

### 基本構造

```typescript
interface WordEntry {
  id: string; // 一意識別子（単語名）
  word: string; // 単語（分離動詞は | で区切り）
  partOfSpeech: string; // 品詞（verb, noun, adjective, adverb, preposition, phrase, filler）
  gender?: string; // 名詞の性（der/die/das）
  plural?: string; // 複数形
  variants?: WordVariant[]; // 語形変化
  meanings: WordMeaning[]; // 意味（日英対訳）
  examples: WordExample[]; // 使用例文（必須、最低2つ）
  conjugation?: Conjugation; // 動詞活用
  etymology?: Etymology; // 語源情報（学習に役立つ場合のみ）
  tags?: string[]; // カテゴリタグ
  usageNotes?: string; // 使用上の注意点
}
```

### 詳細フィールド

```typescript
// 意味定義
interface WordMeaning {
  ja: string; // 日本語意味
  en: string; // 英語意味
  note?: string; // 補足説明
}

// 例文（必須）
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

// 語源情報（学習に役立つ場合のみ）
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
  meaning: { ja: string; en: string }; // 要素の意味
  partOfSpeech: string; // 要素の品詞
}
```

## 🎯 LLM プロンプト

### 基本生成プロンプト

```
ドイツ語の単語「[WORD]」について、以下のJSON形式でデータを生成してください。

**必須参照**: https://www.dwds.de/wb/[WORD] の情報を活用してください。

**要求仕様**:
1. B2レベル学習者向けの教育的価値を重視
2. 日本語と英語の対訳を含む
3. **例文は必須**（日常・ビジネス・学術文脈の実用的な例文を最低2つ）
4. 正確な文法情報（活用、性、複数形等）
5. **動詞語順**: 再帰動詞・前置詞動詞は辞書的語順で記録（例: `sich3 vor etw3 ekeln`）
6. **語源情報**: 学習に役立つ場合のみ追加（複合語の構成要素、派生語の関係、接頭辞・接尾辞の意味）

**出力形式**: 上記のTypeScriptインターフェースに準拠

**品質基準**:
- **例文は必須**（最低2つ、自然で教育的価値が高いこと）
- **語源情報は学習に役立つ場合のみ**（複合語の構成要素、派生語の関係、接頭辞・接尾辞の意味）
- 歴史的語源ではなく、現代ドイツ語の語形成パターンを重視
- タグ付けは意味領域と使用文脈を適切に分類すること
```

## 📋 品質管理ガイドライン

### ✅ 必須チェックポイント

1. **DWDS 参照確認**

   - 全単語で DWDS URL が存在し、アクセス可能か
   - 品詞分類が DWDS と一致しているか

2. **文法正確性**

   - 動詞活用形（不定詞、過去形、過去分詞、助動詞）
   - **動詞語順**: 再帰動詞・前置詞動詞は辞書的語順（`sich3 vor etw3 ekeln`形式）
   - 格変化の正確な表記（sich3, etw3, jdn4 等）
   - 名詞の性（der/die/das）と複数形

3. **例文品質（必須項目）**

   - **例文は最低 2 つ必須**
   - 文法的に正しいドイツ語
   - B2 レベルに適した語彙と構文
   - 日本語訳の自然さ

4. **語源情報の品質**
   - **学習に役立つ場合のみ追加**
   - 複合語の構成要素、派生語の関係
   - 現代ドイツ語の語形成パターンを重視
   - 自己参照的な説明の回避

### 🚫 避けるべき要素

- 古語や方言（B2 レベルに不適切）
- **例文不足**（最低 2 つは必須）
- 不自然な例文や翻訳調表現
- **学習価値の低い語源情報**（歴史的語源のみ、自己参照的説明）
- 重複や類似の例文

## 🏷️ タグシステム

語彙をカテゴリ別に分類：

- `action` - 行動・動作
- `submission` - 提出・申請
- `speaking` - 会話
- `hesitation` - 躊躇・間投詞
- `b2` - B2 レベル語彙
- `approximation` - 近似表現

## 📝 見出し語の標準化ルール

**テキストから見出し語への変換**：

- **過去分詞 → 不定形**: `gegeben` → `geben`
- **複数形 → 単数形**: `Sachen` → `Sache`, `Lücken` → `Lücke`
- **不要な単語の削除**: 文脈に依存する修飾語は削除
- **よく出てくる形への変更**: より一般的な語形を採用

**分離動詞の表記ルール**：

- **分離動詞**: `|` で区切り（例: `ab|geben`, `auf|stehen`）
- **非分離動詞**: `|` は不要（例: `entsagen`, `verstehen`）

## 🔍 語源情報の追加基準

**追加すべき場合**：

1. **複合語（compound）**: 構成要素の意味が理解を助ける

   - `Tiefpunkt` = `tief`（深い）+ `Punkt`（点）

2. **派生名詞（derived-noun）**: 元の動詞・形容詞との関係

   - `Jagd` ← `jagen`（狩る）

3. **分離動詞（separable-verb）**: 接頭辞と動詞の組み合わせ

   - `auf|tauchen` = `auf`（上へ）+ `tauchen`（潜る）

4. **接頭辞・接尾辞の説明**: 語形成のパターン理解
   - `ver-`（完了・変化）、`be-`（完了）、`ent-`（取り除く）

**追加しない場合**：

- 歴史的語源のみ（ラテン語、古高ドイツ語等）
- 自己参照的な説明（「X は X から来る」）
- B2 レベルを超える専門的語源
- 学習価値が低い語源情報

## 📊 生成例

### 基本単語例

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

### 語源情報なしの例

```json
{
  "id": "schön",
  "word": "schön",
  "partOfSpeech": "adjective",
  "meanings": [
    {
      "ja": "美しい、きれいな",
      "en": "beautiful, pretty"
    }
  ],
  "examples": [
    {
      "de": "Das ist ein sehr schönes Bild.",
      "ja": "それはとても美しい絵です。"
    },
    {
      "de": "Sie hat schöne Augen.",
      "ja": "彼女は美しい目をしている。"
    }
  ],
  "tags": ["b2"]
}
```

## 🎯 品質評価基準

- **A**: 完璧（DWDS 完全準拠、必須例文 2 つ以上、適切な語源情報）
- **B**: 良好（軽微な改善の余地）
- **C**: 要改善（明らかな問題あり）
- **D**: 不合格（例文不足、再生成必要）

このガイドに従って、高品質なドイツ語学習データセットを生成してください。
