
import { createClient } from '@supabase/supabase-js';
import { UserRole, WorkoutData } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const storageService = {
  // Save a single toggle action
  toggleWorkout: async (date: string, role: UserRole, isAdding: boolean) => {
    if (isAdding) {
      const { error } = await supabase
        .from('workouts')
        .insert([{ date, user_role: role }]);
      if (error) console.error('Error adding workout:', error);
    } else {
      const { error } = await supabase
        .from('workouts')
        .delete()
        .match({ date, user_role: role });
      if (error) console.error('Error removing workout:', error);
    }
  },

  // Load all data
  loadAllData: async (): Promise<WorkoutData> => {
    const { data, error } = await supabase
      .from('workouts')
      .select('date, user_role');

    if (error) {
      console.error('Error loading workouts:', error);
      return {};
    }

    const workoutData: WorkoutData = {};
    data.forEach((row: any) => {
      if (!workoutData[row.date]) {
        workoutData[row.date] = [];
      }
      workoutData[row.date].push(row.user_role as UserRole);
    });

    return workoutData;
  }
};
