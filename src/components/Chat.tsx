"use client";

import { useState, useRef, useEffect } from 'react';

const imgSendIcon = "/figma-assets/69c24e85d79d3eabfbfab9f689212f27b3490225.svg";

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatProps {
  onColorChange?: (color: string) => void;
}

export default function Chat({ onColorChange }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const decoder = new TextDecoder();
      let assistantContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              // Finalize the assistant message
              const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                content: assistantContent,
                role: 'assistant',
                timestamp: new Date(),
              };
              setMessages(prev => [...prev, assistantMessage]);
              setStreamingMessage('');
              break;
            }
            
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setStreamingMessage(assistantContent);
              }
              // Handle color change
              if (parsed.colorChange && onColorChange) {
                onColorChange(parsed.colorChange);
              }
            } catch (e) {
              // Ignore parsing errors for malformed chunks
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-[#17191c] box-border content-stretch flex gap-2.5 items-center justify-center p-6 relative w-full h-full" data-name="UI" data-node-id="6:2">
      <div className="bg-[#252b33] box-border content-stretch flex flex-col h-[641px] items-end justify-between overflow-clip px-3 py-6 relative rounded-[16px] shrink-0 w-[410px]" data-name="Chat Container" data-node-id="6:3">
        <div className="content-stretch flex items-center justify-end relative shrink-0 w-full" data-name="Header" data-node-id="6:16">
          <div className="relative shrink-0 w-[229px] h-[65.512px] flex items-center justify-between" data-name="Inner" data-node-id="6:21">
            <div className="rounded-full bg-[#006dff]" style={{ width: "65.512px", height: "65.512px" }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden data-name="Expand" data-node-id="6:13">
              <path d="M12.306 16.593L12.271 18.593L5.272 18.471L5.395 11.471L7.395 11.507L7.332 15.092L15.226 7.468L11.694 7.407L11.729 5.407L18.728 5.529L18.605 12.529L16.605 12.493L16.669 8.855L8.721 16.531L12.306 16.593Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className="box-border content-stretch flex flex-col gap-6 h-[416px] items-start justify-start overflow-y-auto p-[12px] relative shrink-0 w-full custom-scrollbar" data-name="Message Container" data-node-id="6:19">
          {messages.length === 0 && !streamingMessage && (
            <div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-full opacity-50" data-name="Welcome Message">
              <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#b0bed1] text-[16px]">
                <p className="leading-[1.592]">Welcome! Send a message to start chatting with AI.</p>
              </div>
            </div>
          )}
          
          {messages.map((message) => (
            <div key={message.id} className={`content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-full ${
              message.role === 'user' 
                ? 'bg-[#006dff] box-border overflow-clip pl-4 pr-1 py-3 rounded-[12px]' 
                : ''
            }`} data-name={message.role === 'user' ? 'User Message' : 'AI Message'}>
              <div className={`basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[16px] ${
                message.role === 'user' ? 'text-white' : 'text-[#b0bed1]'
              }`}>
                <p className="leading-[1.592] whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}

          {streamingMessage && (
            <div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0 w-full" data-name="AI Message">
              <div className="basis-0 font-['Inter:Regular',_sans-serif] font-normal grow leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#b0bed1] text-[16px]">
                <p className="leading-[1.592] whitespace-pre-wrap">{streamingMessage}<span className="animate-pulse">|</span></p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        <div className="content-stretch flex gap-3 items-center justify-start relative shrink-0 w-full" data-name="Response Container" data-node-id="6:18">
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isLoading ? "AI is thinking..." : "Type a message..."} 
            disabled={isLoading}
            className="basis-0 bg-[#303843] grow h-[54px] min-h-px min-w-px rounded-[12px] shrink-0 px-4 text-white placeholder-gray-400 border-none outline-none disabled:opacity-50" 
            data-name="Response Textfield" 
            data-node-id="6:9" 
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputValue.trim()}
            className="bg-[#006dff] box-border content-stretch flex gap-3 items-center justify-center overflow-clip p-[16px] relative rounded-[10px] shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0056cc] transition-colors" 
            data-name="Send CTA" 
            data-node-id="6:10"
          >
            <div className="flex h-[0px] items-center justify-center relative shrink-0 w-[0px]">
              <div className="flex-none rotate-[270deg]">
                <div className="relative size-6" data-name="Send Icon" data-node-id="6:11">
                  <img alt="Send" className="block max-w-none size-full" src={imgSendIcon} />
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}


