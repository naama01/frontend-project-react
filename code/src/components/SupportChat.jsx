import React, { useState } from 'react';

export default function SupportChat() {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [input, setInput] = useState(''); // State to store the user's input

  // Predefined response from the representative
  const representativeResponse = "המוקד סגור כעת ופועל בימים א'-ה' בין השעות 08:00-16:00. אם יש לך שאלה דחופה, אנא שלח לנו הודעה ואנחנו נחזור אליך בהקדם האפשרי.";
  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim() === '') return; // Prevent sending empty messages

    // Add the user's message to the chat
    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Add the representative's response to the chat
    const repMessage = { sender: 'rep', text: representativeResponse };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, repMessage]);
    }, 1000); // Simulate a delay for the representative's response

    // Clear the input field
    setInput('');
  };

  return (
    <div style={{ width: '400px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center' }}>צ'אט תמיכה</h2>
      <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px', padding: '10px', marginBottom: '10px', backgroundColor: '#fff' }}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === 'user' ? 'right' : 'left',
              margin: '5px 0',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: message.sender === 'user' ? '#d1e7dd' : '#f8d7da',
                color: '#000',
                maxWidth: '80%',
                wordWrap: 'break-word',
              }}
            >
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="כתוב הודעה..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={handleSendMessage}
          style={{
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#4CAF50',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          שלח
        </button>
      </div>
    </div>
  );
}
