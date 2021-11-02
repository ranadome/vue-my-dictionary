export interface DictionaryItem {
  wordId: number | null;
  word: string;
  wordKana: string;
  wordMeaning: string;
  link: string;
  existenceFlag: number | null;
  insertDate: Date | null;
  updateDate: Date | null;
}

export interface newDictionaryItem {
  word: string;
  wordKana: string;
  wordMeaning: string;
  link: string;
}
