export const capitalizeFirstLetter = (word: string): string => {
  if (!word) return '';
  const firstLetter = word.charAt(0).toUpperCase();
  const remainingLetters = word.slice(1);
  return firstLetter + remainingLetters;
};

export const getQuestionTileId = (category: string, level: number): string => {
  return `${category}${level}`;
};
