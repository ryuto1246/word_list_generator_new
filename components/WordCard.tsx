import { WordEntry } from "@/types/word";

import { useState, useEffect, useRef } from "react";

type WordCardProps = {
  entry: WordEntry;
  showMeaning: boolean;
  toggleShowMeaning: () => void;
  onStarredChange?: () => void; // 星つき状態変更時のコールバック
};

export default function WordCard({
  entry,
  showMeaning,
  toggleShowMeaning,
  onStarredChange,
}: WordCardProps) {
  const IS_NOCH_NICHT_GELERNT_KEY = `nochNichtGelernt_${entry.word}`;
  // const SHOW_MEANING_KEY = `showMeaning_${entry.word}`; // 今回の修正では不要なためコメントアウト

  const [isNochNichtGelernt, setIsnochNichtGelernt] = useState<boolean>(() => {
    // 初期値をlocalStorageから直接読み込む
    try {
      const stored = localStorage.getItem(`nochNichtGelernt_${entry.word}`);
      return stored === "true";
    } catch {
      return false;
    }
  });
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const onStarredChangeRef = useRef(onStarredChange);

  // onStarredChangeが変更されたらrefを更新
  useEffect(() => {
    onStarredChangeRef.current = onStarredChange;
  }, [onStarredChange]);

  useEffect(() => {
    // コンポーネントがマウントされたら初期化完了をマーク
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    try {
      // showMeaningはindex.tsxで管理されているため、WordCardでのlocalStorage保存は不要
      // localStorage.setItem(SHOW_MEANING_KEY, String(showMeaning));
    } catch (error) {
      console.error("Error saving showMeaning to localStorage:", error);
    }
  }, [showMeaning /*, entry.word, SHOW_MEANING_KEY */]); // ⭐️ 依存配列をshowMeaningのみにするか、このuseEffect自体を削除

  useEffect(() => {
    // 初期化完了後のみ保存処理を実行
    if (isInitialized) {
      try {
        localStorage.setItem(
          IS_NOCH_NICHT_GELERNT_KEY,
          String(isNochNichtGelernt)
        );
      } catch (error) {
        console.error(
          "Error saving isNochNichtGelernt to localStorage:",
          error
        );
      }
    }
  }, [isNochNichtGelernt, IS_NOCH_NICHT_GELERNT_KEY, isInitialized]);

  // 初期値を保持して変更を検知
  const initialValueRef = useRef(isNochNichtGelernt);

  // 星つき状態変更時のコールバックを別のuseEffectで処理（実際の変更のみ）
  useEffect(() => {
    if (
      isInitialized &&
      isNochNichtGelernt !== initialValueRef.current &&
      onStarredChangeRef.current
    ) {
      onStarredChangeRef.current();
      initialValueRef.current = isNochNichtGelernt; // 現在の値を記録
    }
  }, [isNochNichtGelernt, isInitialized]); // refを使用するため、onStarredChangeは依存配列から除外

  const genderClass =
    entry.gender === "masculine"
      ? "gender-m"
      : entry.gender === "feminine"
      ? "gender-f"
      : entry.gender === "neuter"
      ? "gender-n"
      : entry.gender === "plural"
      ? "gender-p"
      : "";

  const variants = entry.variants;
  const components = entry.etymology?.components;

  return (
    <div className="vocabulary-entry">
      {/* 左側：単語表示 */}
      <div
        className="word"
        onClick={() => setIsnochNichtGelernt(!isNochNichtGelernt)}
        title="クリックで星をつける"
      >
        <span className={genderClass}>
          {isNochNichtGelernt ? "⭐️" : ""}
          {entry.word}
        </span>

        {entry.plural && <div className="plural">{entry.plural}</div>}
        {/* 三基本形（動詞） */}
        {entry.conjugation && (
          <div className="example">
            {entry.conjugation.infinitive} / {entry.conjugation.preterite} /{" "}
            <span>
              {entry.conjugation.pastParticiple}
              {entry.conjugation.auxiliary && (
                <> {entry.conjugation.auxiliary}</>
              )}
            </span>
          </div>
        )}

        {variants && variants.length > 0 && (
          <div className="plural">
            {variants.map((v, i) => (
              <div key={i}>
                {v.form}
                {v.gender && ` (${v.gender})`}
                {v.plural && ` / ${v.plural}`} {/* 三基本形（動詞） */}
                {/* ここはWordCardのentry.conjugationを参照すべき */}
                {entry.conjugation && (
                  <div className="example">
                    {entry.conjugation.infinitive} /{" "}
                    {entry.conjugation.preterite} /{" "}
                    <span>
                      {entry.conjugation.pastParticiple}
                      {entry.conjugation.auxiliary && (
                        <> {entry.conjugation.auxiliary}</>
                      )}
                    </span>
                  </div>
                )}
                {i < variants.length - 1 && ", "}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 右側：意味・例文など */}
      <div
        className="details"
        onClick={toggleShowMeaning}
        title="クリックで意味を表示/非表示"
      >
        {/* 意味 */}
        <div className={"meaning" + (showMeaning ? "" : " meaning-hidden")}>
          {entry.meanings.map((m, i) => (
            <div key={i}>
              {m.ja} / {m.en}
              {m.note && <p className="note">{m.note}</p>}
            </div>
          ))}
        </div>

        {/* 例文 */}
        {entry.examples && entry.examples.length > 0 && (
          <div className="example-block">
            {entry.examples.map((ex, i) => (
              <div key={i} className="example">
                {ex.de}
                <div className="example-translation">{ex.ja}</div>
              </div>
            ))}
          </div>
        )}

        {/* 語源 */}
        {components && components.length > 0 && (
          <div className="example prefix-meaning">
            {components.map((c, i) => (
              <span key={i}>
                {c.form}（{c.meaning.ja} / {c.meaning.en}, {c.partOfSpeech}）
                {i < components.length - 1 && " + "}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
