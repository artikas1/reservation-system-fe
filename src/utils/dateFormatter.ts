import { format } from 'date-fns';

export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return format(date, 'yyyy-MM-dd HH:mm'); // Format as "year-month-day hour:minute"
};

export const formatForBackend = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};
