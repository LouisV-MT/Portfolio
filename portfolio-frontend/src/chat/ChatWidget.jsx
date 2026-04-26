import React, { useState } from 'react';

export default function ChatWidget() {
  const [activeProject, setActiveProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const projects = [
    { id: 'SupplyMind-Backend', name: 'SupplyMind (Backend)', desc: 'Java Spring Boot supply chain API' },
    { id: 'SupplyMind-Frontend', name: 'SupplyMind (Frontend)', desc: 'React inventory dashboard' },
    { id: 'YouView', name: 'YouView', desc: 'AI-powered video streaming platform' },
    { id: 'Pollarity-Backend', name: 'Pollarity (Backend)', desc: 'AI survey platform API' },
    { id: 'Pollarity-Frontend', name: 'Pollarity (Frontend)', desc: 'AI survey platform UI' },
    { id: 'n8n-AI-Finance', name: 'Finance Tracker', desc: 'WhatsApp-based finance assistant' },
    { id: 'VenueFLow', name: 'Venue Flow', desc: 'Desktop WPF app for wedding venues' },
    { id: 'group2project', name: 'E-Commerce Shop', desc: 'PHP/MySQL online store' },
    { id: 'projectprograming3', name: 'Recipe App', desc: 'Spring Boot recipe manager' }
  ];

  const triggerAPI = async (userText, projectId) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText, project_filter: projectId }),
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        content: "Connection error. Please ensure the local backend is running." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectProject = (project) => {
    setActiveProject(project);
    setMessages([]); 
    
    // Auto-fire the first question
    const introPrompt = `Tell me about the architecture and technologies used in this project.`;
    setMessages([{ role: 'user', content: introPrompt }]);
    triggerAPI(introPrompt, project.id);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setMessages((prev) => [...prev, { role: 'user', content: inputValue }]);
    triggerAPI(inputValue, activeProject.id);
    setInputValue('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto border border-gray-200 rounded-lg shadow-lg flex flex-col bg-white h-[700px] overflow-hidden">
      
      {/* Header */}
      <div className="bg-slate-900 text-white p-4">
        <h2 className="text-xl font-bold">Louis's Interactive Portfolio</h2>
        <p className="text-sm text-slate-300">Select a project to explore the codebase.</p>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar: Project Selection */}
        <div className="w-1/3 bg-slate-50 border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-700 mb-3 uppercase text-xs tracking-wider">Select Project</h3>
          <div className="space-y-2">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p)}
                className={`w-full text-left p-3 rounded-md transition-all ${
                  activeProject?.id === p.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-400'
                }`}
              >
                <div className="font-medium text-sm">{p.name}</div>
                <div className={`text-xs mt-1 ${activeProject?.id === p.id ? 'text-blue-100' : 'text-gray-500'}`}>
                  {p.desc}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Area: Chat Interface */}
        <div className="w-2/3 flex flex-col">
          {!activeProject ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 p-8 text-center bg-gray-50">
              <div className="max-w-sm">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <p>Click a project on the left to start analyzing Louis's code.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat History */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className={`p-3 rounded-lg max-w-[90%] ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-800'}`}>
                      <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.content}</p>
                    </div>
                    {msg.role === 'ai' && msg.sources?.length > 0 && (
                      <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-2 items-center">
                        <span className="bg-slate-800 text-white px-2 py-0.5 rounded shadow-sm">{msg.model}</span>
                        {msg.sources.map((s, i) => (
                          <span key={i} className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded shadow-sm">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 font-medium px-2 py-4">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing {activeProject.name} repository...
                  </div>
                )}
              </div>

              {/* Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 bg-slate-50 flex gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Ask about ${activeProject.name}...`}
                  className="flex-1 border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !inputValue.trim()} 
                  className="bg-blue-600 text-white px-6 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-sm"
                >
                  Ask
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}