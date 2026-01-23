import React from 'react';
import { UserRole } from '../types';
import { USERS } from '../constants';

interface RolePickerProps {
  onSelect: (role: UserRole) => void;
}

const RolePicker: React.FC<RolePickerProps> = ({ onSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-white font-sans">
      {/* Header Area */}
      <div className="mb-16 text-center">
        <h1 className="text-[32px] font-semibold tracking-tight text-black mb-3">FitFriends</h1>
        <p className="text-[15px] text-slate-400 font-medium">Please select your name to continue</p>
      </div>

      {/* Selection Area */}
      <div className="flex flex-col w-full max-w-[280px] space-y-3">
        {(Object.keys(USERS) as UserRole[]).map((key) => {
          const user = USERS[key];
          return (
            <button
              key={key}
              onClick={() => onSelect(key)}
              className="group flex items-center p-4 rounded-2xl border-[1px] border-slate-100 bg-white transition-all active:opacity-60 hover:border-slate-200"
            >
              <div className="flex items-center space-x-4">
                {/* Avatar: Flat design, no shadow */}
                <div className={`w-10 h-10 rounded-full ${user.bgColor} flex items-center justify-center text-white font-semibold text-base`}>
                  {user.name.charAt(0)}
                </div>
                {/* Name: Clean and simple */}
                <span className="text-[16px] font-medium text-slate-900">{user.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer: Minimalist italic text */}
      <div className="mt-24 text-slate-300 text-[13px] font-medium tracking-wide italic">
        Be healthy. That's enough.
      </div>
    </div>
  );
};

export default RolePicker;
