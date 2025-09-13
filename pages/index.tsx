import { useState, useEffect } from "react";
import { WordEntry } from "@/types/word";
import WordCard from "@/components/WordCard";

// 利用可能な単語ファイルの定義
const AVAILABLE_WORDLISTS = [
  {
    id: "words_2505",
    name: "基本単語 (2505語)",
    filename: "words_2505.json",
  },
  {
    id: "words_b2_german",
    name: "ドイツ語B2レベル",
    filename: "words_b2_german.json",
  },
];

// 配列をシャッフルするユーティリティ関数
const shuffleArray = (array: WordEntry[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export default function Home() {
  // 📂 選択された単語帳のstate
  const [selectedWordlist, setSelectedWordlist] =
    useState<string>("words_2505");

  // 📚 読み込まれた単語データのstate
  const [wordsData, setWordsData] = useState<WordEntry[]>([]);

  // ⏳ ローディング状態のstate
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 🔧 各カードの表示状態を管理する配列（key: id, value: boolean）
  const [shownStates, setShownStates] = useState<Record<string, boolean>>({});

  // ⭐️ フィルターの状態を管理するstate
  const [showStarredOnly, setShowStarredOnly] = useState<boolean>(false);

  // 🔀 現在表示されている単語リストの順序を管理するstate
  const [displayEntries, setDisplayEntries] = useState<WordEntry[]>([]);

  // 📂 単語ファイルを動的に読み込む関数
  const loadWordlist = async (wordlistId: string) => {
    setIsLoading(true);
    try {
      const wordlist = AVAILABLE_WORDLISTS.find((w) => w.id === wordlistId);
      if (!wordlist) {
        throw new Error(`Wordlist not found: ${wordlistId}`);
      }

      // 動的にJSONファイルをインポート
      const response = await import(`../data/${wordlist.filename}`);
      const data = response.default as WordEntry[];

      setWordsData(data);

      // 表示状態を初期化
      const initialStates = Object.fromEntries(data.map((e) => [e.id, true]));
      setShownStates(initialStates);

      // フィルターをリセット
      setShowStarredOnly(false);
    } catch (error) {
      console.error("Failed to load wordlist:", error);
      alert(`単語ファイルの読み込みに失敗しました: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 📂 単語帳選択時の処理
  const handleWordlistChange = (wordlistId: string) => {
    setSelectedWordlist(wordlistId);
    loadWordlist(wordlistId);
  };

  // 🔘 全カードを非表示にする関数
  const hideAllMeanings = () => {
    const updatedStates = Object.fromEntries(
      wordsData.map((e) => [e.id, false])
    );
    setShownStates(updatedStates);
  };

  // 🔘 個別カードの表示トグルを処理する関数
  const toggleMeaning = (id: string) => {
    setShownStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // ⭐️ フィルターを切り替える関数
  const toggleShowStarredOnly = () => {
    setShowStarredOnly((prev) => !prev);
  };

  // 🔀 シャッフル機能
  const shuffleWords = () => {
    setDisplayEntries(shuffleArray(displayEntries)); // 現在表示されている単語リストをシャッフル
  };

  // 🔀 元の順序に戻す機能
  const resetOrder = () => {
    // フィルターが適用されている場合は、フィルターを解除してから元の順序に戻す
    setShowStarredOnly(false); // フィルターを解除
    setDisplayEntries(wordsData); // 元の順序に戻す
  };

  // 🚀 初期データ読み込み
  useEffect(() => {
    loadWordlist(selectedWordlist);
  }, [selectedWordlist]);

  // ⭐️ フィルターされた単語リストの更新（showStarredOnly または wordsData が変更された場合）
  useEffect(() => {
    const filtered = showStarredOnly
      ? wordsData.filter((entry) => {
          const IS_NOCH_NICHT_GELERNT_KEY = `nochNichtGelernt_${entry.word}`;
          const storedIsNochNichtGelernt = localStorage.getItem(
            IS_NOCH_NICHT_GELERNT_KEY
          );
          return storedIsNochNichtGelernt === "true";
        })
      : wordsData;
    setDisplayEntries(filtered); // フィルター結果を displayEntries にセット
  }, [showStarredOnly, wordsData]); // 依存配列に showStarredOnly と wordsData を追加

  if (isLoading) {
    return (
      <div className="main max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">📘 単語帳</h1>
        <div className="text-center">
          <p>単語データを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="main max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📘 単語帳</h1>

      {/* 📂 単語帳選択セクション */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <label
          htmlFor="wordlist-select"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          📂 単語帳を選択:
        </label>
        <select
          id="wordlist-select"
          value={selectedWordlist}
          onChange={(e) => handleWordlistChange(e.target.value)}
          className="block w-full max-w-md px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {AVAILABLE_WORDLISTS.map((wordlist) => (
            <option key={wordlist.id} value={wordlist.id}>
              {wordlist.name}
            </option>
          ))}
        </select>
        <p className="mt-1 text-sm text-gray-500">
          現在の単語数: {wordsData.length}語
        </p>
      </div>

      <div className="floatbutton-container">
        <button className="floatbutton" onClick={hideAllMeanings}>
          すべての意味を隠す
        </button>

        {/* ⭐️ フィルターボタン */}
        <button
          className="floatbutton"
          onClick={toggleShowStarredOnly}
          style={{
            backgroundColor: showStarredOnly ? "#4CAF50" : "#f0f0f0",
            color: showStarredOnly ? "white" : "black",
            border: "1px solid #ccc",
          }}
        >
          {showStarredOnly ? "全単語を表示" : "⭐️付きのみ表示"}
        </button>

        {/* 🔀 シャッフルボタン */}
        <button className="floatbutton" onClick={shuffleWords}>
          シャッフル
        </button>

        {/* 🔀 元に戻すボタン */}
        <button className="floatbutton" onClick={resetOrder}>
          元の順序に戻す
        </button>
      </div>

      <div className="vocabulary-section space-y-6 mt-6">
        {displayEntries.map((entry) => (
          <WordCard
            key={entry.id}
            entry={entry}
            showMeaning={shownStates[entry.id]}
            toggleShowMeaning={() => toggleMeaning(entry.id)}
          />
        ))}
      </div>
    </div>
  );
}
