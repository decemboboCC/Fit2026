
import { WorkoutData } from '../types';

const STORAGE_KEY = 'fitfriends_workout_data';

export const storageService = {
  saveData: (data: WorkoutData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  loadData: (): WorkoutData => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  }
};
