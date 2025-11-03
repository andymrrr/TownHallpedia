export const formatNumber = (num?: number): string => {
  if (num == null) return 'N/A';
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return `${num}`;
};

export const formatTimeHours = (hours?: number): string => {
  if (hours == null) return 'N/A';
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    const remainingHours = hours % 24;
    if (remainingHours === 0) return `${days}d`;
    return `${days}d ${remainingHours}h`;
  }
  return `${hours}h`;
};

export const getLevelColor = (nivel: number): string => {
  if (nivel <= 5) return '#4A90E2';
  if (nivel <= 10) return '#FF6B35';
  return '#FFD700';
};
