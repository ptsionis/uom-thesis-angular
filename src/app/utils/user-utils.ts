export const getFirstName = (name: string): string => {
  if (!name) return '';
  const firstName = name.split(' ');
  return firstName[0];
};

export const getRank = (score: number): string => {
  if (score < 500) return 'amateur';
  if (score < 1000) return 'beginner';
  if (score < 1500) return 'pro';
  if (score < 2000) return 'master';
  if (score < 2500) return 'virtuoso';
  if (score < 3000) return 'grandmaster';
  return 'legend';
};

export const getGoalScore = (score: number): number => {
  if (score < 500) return 500;
  if (score < 1000) return 1000;
  if (score < 1500) return 1500;
  if (score < 2000) return 2000;
  if (score < 2500) return 2500;
  if (score < 3000) return 3000;
  return 0;
};

export const getWinrate = (amountWon: number, amountPlayed: number): number => {
  if (amountPlayed === 0) return 0;
  return Math.round((amountWon / amountPlayed) * 100);
};

export const getJoinedDate = (createdAt: string): string => {
  if (!createdAt) return '';
  return createdAt.split('T')[0];
};
