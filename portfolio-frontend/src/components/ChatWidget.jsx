import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function ChatWidget({ projectTitle, repoName }) {
  const { t } = useTranslation();

  const [messages, setMessages] = useState([
    { 
      role: 'ai', 
      content: t('chat.greeting', { projectTitle }) 
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { role: 'user', content: inputValue };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Pulls the Azure Variable in production, falls back to localhost for local dev
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      
      const response = await fetch(`${apiUrl}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.content, project_filter: repoName }),
      });

      if (!response.ok) throw new Error('Network error');
      const data = await response.json();

      setMessages((prev) => [...prev, {
        role: 'ai',
        content: data.reply,
        sources: data.sources,
        model: data.model
      }]);
    } catch (error) {
      console.error("Chat API Error:", error);
      setMessages((prev) => [...prev, { 
        role: 'ai', 
        content: t('chat.error')
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[55vh] min-h-[350px] md:h-[400px] border border-gray-200 rounded-xl bg-gray-50 shadow-inner overflow-hidden mt-8">
      {/* Chat Header */}
      <div className="bg-dark-slate text-white px-4 py-3 flex justify-between items-center shadow-md z-10">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-beige" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM9 9V5a1 1 0 112 0v4a1 1 0 11-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
          <h4 className="font-semibold text-sm">{t('chat.title')}</h4>
        </div>
        <span className="text-[10px] bg-white/20 px-2 py-1 rounded text-white tracking-wider uppercase font-mono">
          {repoName}
        </span>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-dark-slate text-white rounded-br-none' : 'bg-white border border-gray-200 text-dark-slate rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.content}</p>
            </div>
            
            {/* Metadata (Sources & Model) */}
            {msg.role === 'ai' && msg.sources && msg.sources.length > 0 && (
              <div className="mt-2 text-[10px] text-mid-slate flex flex-wrap gap-1.5 items-center pl-1">
                <span className="bg-gray-200 px-1.5 py-0.5 rounded font-medium border border-gray-300">{msg.model}</span>
                {msg.sources.map((source, sIdx) => (
                  <span key={sIdx} className="bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded">
                    {source}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-mid-slate font-medium px-2 animate-pulse">
            <svg className="animate-spin h-3.5 w-3.5 text-dark-slate" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('chat.analyzing', { repoName })}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={t('chat.placeholder', { projectTitle })}
          className="flex-1 border border-gray-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-dark-slate transition-shadow bg-gray-50 focus:bg-white"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          disabled={isLoading || !inputValue.trim()}
          className="shrink-0 bg-dark-slate text-white px-4 md:px-5 rounded-lg font-medium hover:bg-mid-slate disabled:opacity-50 transition-colors shadow-sm"
        >
          {t('chat.send')}
        </button>
      </form>
    </div>
  );
}