import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-white shadow-md p-4">
      <div className="max-w-4xl mx-auto flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold text-xl ring-2 ring-white/50">
          ∫
        </div>
        <div>
          <h1 className="text-xl font-bold">Maths Explainer Bot</h1>
          <p className="text-sm opacity-90">Your AI-powered math tutor</p>
        </div>
      </div>
    </header>
  );
};

export default Header;