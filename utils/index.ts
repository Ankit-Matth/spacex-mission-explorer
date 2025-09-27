export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const getYearFromDate = (dateString: string): string => {
  return new Date(dateString).getFullYear().toString();
};

export const getUniqueYears = (launches: any[]): string[] => {
  const years = launches.map(launch => getYearFromDate(launch.date_utc));
  return Array.from(new Set(years)).sort((a, b) => b.localeCompare(a));
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const getStatusColor = (success: boolean | null): string => {
  if (success === null) return 'bg-gray-500';
  return success ? 'bg-green-500' : 'bg-red-500';
};

export const getStatusText = (success: boolean | null, upcoming: boolean): string => {
  if (upcoming) return 'Upcoming';
  if (success === null) return 'Unknown';
  return success ? 'Success' : 'Failed';
};