export type WordMeaning = {
  ja: string;
  en: string;
  note?: string; // 任意
};

export type WordExample = {
  de: string;
  ja: string;
};

export type WordVariant = {
  form: string;
  gender: string;
  plural?: string;
};

export type Conjugation = {
  infinitive: string;
  preterite: string;
  pastParticiple: string;
  auxiliary?: "haben" | "sein";
};

export type EtymologyComponent = {
  form: string;
  meaning: {
    ja: string;
    en: string;
  };
  partOfSpeech: string;
};

export type Etymology = {
  type: "compound" | "separable-verb" | "derived-noun" | "other";
  components: EtymologyComponent[];
};

export type WordEntry = {
  id: string;
  word: string;
  partOfSpeech: string;
  gender?: string;
  plural?: string;
  variants?: WordVariant[];
  meanings: WordMeaning[];
  examples?: WordExample[];
  conjugation?: Conjugation;
  etymology?: Etymology;
  tags?: string[];
};
