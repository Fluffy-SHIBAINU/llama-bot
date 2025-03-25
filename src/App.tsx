import { useEffect, useRef, useState } from 'react';
import './App.css';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const agentPresets = {
  'llama': {
    label: '🦙 라마봇',
    prompt: `너는 귀엽고 말 많은 라마야 🦙
말투는 유쾌하고 장난스럽고, 종종 농담을 섞어.
사람이 뭐라 해도 항상 라마처럼 받아쳐줘.
예의는 갖추지만 말 끝에 "ㅋㅋ", "음메~", "람람!" 같은 것도 자주 써.
EN: You are a silly and friendly llama. Your tone is playful and humorous. Add fun endings like "hehe", "mehhh~", or "lam-lam!" in your speech.`
  },
  'professor': {
    label: '🎓 교수봇',
    prompt: `너는 엄청 똑똑한 교수야. 복잡한 개념도 차분하고 정확하게 설명해줘.
EN: You are a wise professor who explains complex topics clearly and logically.`
  },
  'joker': {
    label: '🤡 개그봇',
    prompt: `너는 유쾌한 개그맨이야. 항상 농담을 섞고, 상대방을 웃기려고 해.
EN: You are a jokester who always adds humor and silly responses.`
  },
  'coder': {
    label: '👨‍💻 코딩봇',
    prompt: `너는 똑똑한 개발자야. 프로그래밍 관련 질문에 정확하고 간결하게 답해줘.
EN: You are a smart coding assistant. Answer clearly and with code examples when possible.`
  }
};

function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('fluffy_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState('mistral');
  const [agent, setAgent] = useState('llama');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { role: 'user', content: input };

    const fullMessages = [
      { role: 'system', content: agentPresets[agent].prompt },
      { role: 'user', content: input }
    ];

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:11434/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: fullMessages,
          stream: false
        })
      });

      const data = await res.json();
      const reply = data.message?.content || '🤖 No response';
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: reply
      };

      const updatedMessages = [...messages, userMessage, aiMessage];
      setMessages(updatedMessages);
    } catch (err) {
      const errorMessage = {
        role: 'assistant',
        content: '⚠️ 에러가 발생했습니다.'
      };
      const updatedMessages = [...messages, userMessage, errorMessage];
      setMessages(updatedMessages);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([]);
    localStorage.removeItem('fluffy_chat');
  };

  useEffect(() => {
    localStorage.setItem('fluffy_chat', JSON.stringify(messages));
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!loading) handleSend(); // ✅ prevent duplicate send
    }
  };

  const renderContent = (msg: ChatMessage) => {
    if (msg.content.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i)) {
      return <img src={msg.content} alt="img" className="chat-image" />;
    }
    return msg.content;
  };

  return (
    <div className="app">
      <div className="header">
        <h2>Llama Bot 🦙</h2>
        <div className="controls">
          <select value={model} onChange={e => setModel(e.target.value)}>
            {['mistral', 'llama2', 'phi', 'codellama', 'llava'].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={agent} onChange={e => setAgent(e.target.value)}>
            {Object.entries(agentPresets).map(([key, val]) => (
              <option key={key} value={key}>{val.label}</option>
            ))}
          </select>
          <button className="clear-btn" onClick={handleClear}>🗑 Clear</button>
        </div>
      </div>

      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.role}`}>
            <div className="bubble">{renderContent(msg)}</div>
          </div>
        ))}
        {loading && <div className="message assistant"><div className="bubble">🤖 ...</div></div>}
        <div ref={chatEndRef} />
      </div>

      <div className="input-area">
        <textarea
          placeholder="Type something..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyUp={handleKeyDown}
        />
        <button onClick={handleSend} disabled={loading}>Send</button>
      </div>
    </div>
  );
}

export default App;
