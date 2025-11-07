import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Message } from '../types';
import { BotIcon } from './icons/BotIcon';
import { UserIcon } from './icons/UserIcon';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'model';

  const containerClasses = `flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`;
  
  const bubbleClasses = `max-w-xl xl:max-w-2xl rounded-2xl p-4 text-base ${
    isBot 
      ? 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-tl-none' 
      : 'bg-blue-600 text-white dark:bg-blue-500 rounded-tr-none'
  }`;

  return (
    <div className={containerClasses}>
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white">
        {isBot ? <BotIcon /> : <UserIcon />}
      </div>
      <div className={bubbleClasses}>
        {message.content ? (
          <ReactMarkdown
            className="prose prose-sm dark:prose-invert max-w-none prose-p:my-2 prose-pre:bg-slate-800/80 prose-pre:p-3 prose-pre:rounded-md"
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {message.content}
          </ReactMarkdown>
        ) : (
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;