
import React from 'react';
import { UserRole } from '../types';
import { USERS } from '../constants';

interface RolePickerProps {
  onSelect: (role: UserRole) => void;
}

const RolePicker: React.FC<RolePickerProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-white">
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Welcome Back!</h1>
        <p className="text-slate-500">Please select your name to continue</p>
      </div>

      <div className="grid w-full max-w-xs gap-4">
        {(Object.keys(USERS) as UserRole[]).map((key) => {
          const user = USERS[key];
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all active:scale-95 ${user.borderColor} bg-white hover:bg-slate-50`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full ${user.bgColor} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {user.name.charAt(0)}
                </div>
                <span className="font-semibold text-lg text-slate-700">{user.name}</span>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 ${user.borderColor} flex items-center justify-center`}>
                <div className={`w-2 h-2 rounded-full ${user.bgColor}`}></div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-16 text-slate-400 text-sm italic">
        2026也不用成为厉害的人，只要健康就好 ✨
      </div>
    </div>
  );
};

export default RolePicker;
