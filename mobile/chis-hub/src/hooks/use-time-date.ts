export function useTimeDate(timestamp?: string | null): string {
  if (!timestamp) {
    return '';
  }

  const createdAt = new Date(timestamp);
  const createdTime = createdAt.getTime();

  if (Number.isNaN(createdTime)) {
    return '';
  }

  const differenceMs = Date.now() - createdTime;
  const differenceSeconds = Math.floor(differenceMs / 1000);

  // Future date
  if (differenceSeconds < 0) {
    return 'just now';
  }

  if (differenceSeconds < 10) {
    return 'just now';
  }

  if (differenceSeconds < 60) {
    return `${differenceSeconds} seconds ago`;
  }

  const minutes = Math.floor(differenceSeconds / 60);

  if (minutes < 60) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  const days = Math.floor(hours / 24);

  if (days === 1) {
    return 'yesterday';
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  const weeks = Math.floor(days / 7);

  if (weeks < 5) {
    return `${weeks} week${weeks === 1 ? '' : 's'} ago`;
  }

  const months = Math.floor(days / 30);

  if (months < 12) {
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  const years = Math.floor(days / 365);

  return `${years} year${years === 1 ? '' : 's'} ago`;
}