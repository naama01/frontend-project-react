import React, { useState, useRef, useEffect } from 'react';
import '../css/SupportChat.css';
import { Avatar } from '@mui/material';

export default function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  const representativeResponse =
    "המוקד סגור כעת ופועל בימים א'-ה' בין השעות 08:00-16:00. אם יש לך שאלה דחופה, אנא שלח לנו הודעה ואנחנו נחזור אליך בהקדם האפשרי.";

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const repMessage = { sender: 'rep', text: representativeResponse };
      setMessages((prev) => [...prev, repMessage]);
    }, 1000);

    setInput('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-container">
      <h2 className="chat-title">צ'אט תמיכה</h2>

      <div className="chat-box">
        {messages.map((message, index) => (
          <div
            key={index}
            className="chat-message-row"
            style={{
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >

            <div
              className="chat-bubble"
              style={{
                backgroundColor: message.sender === 'user' ? '#e0f7fa' : '#fff3cd',
                alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {message.sender === 'rep' && (
                <span className="chat-sender">נציג שירות</span>
              )}
              {message.text}
              <div className="chat-time">16:45</div>
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתוב הודעה..."
          className="chat-input"
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button className="chat-send-button" onClick={handleSendMessage}>
          שלח
        </button>
      </div>
    </div>
  );
}
