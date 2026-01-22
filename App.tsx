
import React, { useState, useEffect } from 'react';
import { UserRole, WorkoutData } from './types';
import { USERS } from './constants';
import { storageService } from './services/storageService';
import RolePicker from './components/RolePicker';
import Calendar from './components/Calendar';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserRole | null>(null);
  const [workoutData, setWorkoutData] = useState<WorkoutData>({});
  const [filter, setFilter] = useState<UserRole | 'ALL'>('ALL');

  // Load initial data
  useEffect(() => {
    const fetchData = async () => {
      const savedData = await storageService.loadAllData();
      setWorkoutData(savedData);
    };
    fetchData();
  }, []);

  const handleToggleWorkout = async (date: string) => {
    if (!currentUser) return;

    const currentUsers = workoutData[date] || [];
    const isAlreadyLogged = currentUsers.includes(currentUser);
    
    // Optimistic UI update
    setWorkoutData(prev => {
      const users = prev[date] || [];
      let newUsers;
      if (isAlreadyLogged) {
        newUsers = users.filter(u => u !== currentUser);
      } else {
        newUsers = [...users, currentUser];
      }

      const newData = { ...prev };
      if (newUsers.length === 0) {
        delete newData[date];
      } else {
        newData[date] = newUsers;
      }
      return newData;
    });

    // Sync with Supabase
    await storageService.toggleWorkout(date, currentUser, !isAlreadyLogged);
  };

  if (!currentUser) {
    return <RolePicker onSelect={setCurrentUser} />;
  }

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-black overflow-hidden">
      {/* Header Area */}
      <header className="px-6 pt-12 pb-8 flex items-center justify-between">
        {/* User Profile Trigger */}
        <button 
          onClick={() => setCurrentUser(null)}
          className={`w-12 h-12 rounded-full ${USERS[currentUser].bgColor} flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-white/5 active:scale-95 transition-all`}
        >
          {USERS[currentUser].name.charAt(0)}
        </button>
        
        {/* Filter Pill */}
        <div className="flex items-center space-x-1 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/5">
          <button 
            onClick={() => setFilter('ALL')}
            className={`px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-tight transition-all ${filter === 'ALL' ? 'bg-white text-black' : 'text-white/40 hover:text-white/60'}`}
          >
            All
          </button>
          {(Object.keys(USERS) as UserRole[]).map(key => (
            <button 
              key={key}
              onClick={() => setFilter(key)}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${filter === key ? `${USERS[key].bgColor} text-white` : 'bg-transparent text-white/20 hover:text-white/40'}`}
            >
              {USERS[key].name.charAt(0)}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content: The White Card */}
      <main className="flex-1 flex flex-col px-4 pb-4">
        <div className="bg-white flex-1 rounded-[40px] px-6 py-12">
          <Calendar 
            currentUser={currentUser}
            workoutData={workoutData}
            filter={filter}
            onToggleWorkout={handleToggleWorkout}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
