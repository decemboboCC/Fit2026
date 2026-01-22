
import { UserRole, UserProfile } from './types';

export const USERS: Record<UserRole, UserProfile> = {
  A: {
    id: 'A',
    name: '木南',
    color: 'rgb(99, 102, 241)', // Indigo 500
    bgColor: 'bg-indigo-500',
    borderColor: 'border-indigo-500',
  },
  B: {
    id: 'B',
    name: '夹心',
    color: 'rgb(16, 185, 129)', // Emerald 500
    bgColor: 'bg-emerald-500',
    borderColor: 'border-emerald-500',
  },
  C: {
    id: 'C',
    name: '蹭蹭',
    color: 'rgb(245, 158, 11)', // Amber 500
    bgColor: 'bg-amber-500',
    borderColor: 'border-amber-500',
  },
};

export const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * 2026 Chinese Statutory Holidays (Approximate based on lunar calendar)
 * Format: YYYY-MM-DD
 */
export const CHINESE_HOLIDAYS_2026: Set<string> = new Set([
  '2026-01-01', // New Year's Day
  // Spring Festival (Lunar New Year) - Feb 17 to Feb 24 (8 days)
  '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20', '2026-02-21', '2026-02-22', '2026-02-23', '2026-02-24',
  // Qingming Festival - Apr 4 to Apr 6
  '2026-04-04', '2026-04-05', '2026-04-06',
  // Labor Day - May 1 to May 5
  '2026-05-01', '2026-05-02', '2026-05-03', '2026-05-04', '2026-05-05',
  // Dragon Boat Festival - Jun 19 to Jun 21
  '2026-06-19', '2026-06-20', '2026-06-21',
  // Mid-Autumn Festival - Sep 25 to Sep 27
  '2026-09-25', '2026-09-26', '2026-09-27',
  // National Day - Oct 1 to Oct 7
  '2026-10-01', '2026-10-02', '2026-10-03', '2026-10-04', '2026-10-05', '2026-10-06', '2026-10-07'
]);
