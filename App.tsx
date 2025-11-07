import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message } from './types';
import { streamBotResponse } from './services/geminiService';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import ExamplePrompts from './components/ExamplePrompts';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm your friendly math explainer bot. What concept can I help you with today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = useCallback(async (userInput: string) => {
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: Message = { role: 'user', content: userInput };
    const historyForAPI = [...messages, newUserMessage];
    
    // Add user message and an empty bot message for streaming into.
    setMessages(prevMessages => [...prevMessages, newUserMessage, { role: 'model', content: '' }]);
    setIsLoading(true);
    setError(null);

    try {
      const stream = streamBotResponse(historyForAPI);
      for await (const chunk of stream) {
        setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          const lastMessage = newMessages[newMessages.length - 1];
          lastMessage.content += chunk;
          return newMessages;
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong. Please try again. Error: ${errorMessage}`);
      // Replace the empty streaming message with an error message.
      setMessages(prevMessages => {
          const newMessages = [...prevMessages];
          newMessages[newMessages.length - 1].content = `Sorry, I encountered an error. Please try again.`;
          return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  return (
    <div className="h-screen w-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-900">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {messages.length === 1 && !isLoading && <ExamplePrompts onPromptClick={handleSendMessage} />}
        <div ref={chatEndRef} />
      </main>
      {error && <div className="p-4 text-center text-red-500 bg-red-100 dark:bg-red-900/20 dark:text-red-400">{error}</div>}
      <MessageInput onSend={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default App;