
export type UserRole = 'A' | 'B' | 'C';

export interface UserProfile {
  id: UserRole;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface WorkoutData {
  [date: string]: UserRole[]; // date format: YYYY-MM-DD
}

export interface AppState {
  currentUser: UserRole | null;
  workoutData: WorkoutData;
  filter: UserRole | 'ALL';
}
