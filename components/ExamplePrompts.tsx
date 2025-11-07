import React from 'react';

const prompts = [
  'What is the Pythagorean theorem?',
  'Explain calculus in simple terms',
  'How do you solve a quadratic equation?',
  'What are imaginary numbers?',
];

interface ExamplePromptsProps {
  onPromptClick: (prompt: string) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onPromptClick }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 animate-fade-in">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">Or try one of these examples:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {prompts.map((prompt) => (
                <button 
                    key={prompt}
                    onClick={() => onPromptClick(prompt)}
                    className="p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <p className="font-semibold text-gray-800 dark:text-gray-200">{prompt}</p>
                </button>
            ))}
        </div>
    </div>
  );
};

export default ExamplePrompts;