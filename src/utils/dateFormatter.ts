import { format } from 'date-fns';

export const formatDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return format(date, 'yyyy-MM-dd HH:mm'); // Format as "year-month-day hour:minute"
};
