import React, { useState, useEffect } from 'react';
import './FloatingChatbot.css';

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi, how are you??' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const questions = [
    "What is your name?",
    "What is your mobile number?",
    "What is your email id?",
    "Our team will reach you soon. Thank you! ✅"
  ];

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const validateInput = () => {
    if (step === 1) {
      // Mobile number validation: 10 digits only
      const regex = /^\d{10}$/;
      return regex.test(userInput.trim());
    }
    if (step === 2) {
      // Email validation
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(userInput.trim());
    }
    return true; // For other steps, no validation
  };

  const handleSend = () => {
    if (!userInput.trim()) return;

    if (!validateInput()) {
      const newMessages = [...messages, { from: 'user', text: userInput }, { from: 'bot', text: 'Please enter the right information.' }];
      setMessages(newMessages);
      setUserInput('');
      return;
    }

    const newMessages = [...messages, { from: 'user', text: userInput }];

    let nextStep = step + 1;

    if (nextStep < questions.length) {
      newMessages.push({ from: 'bot', text: 'thinking...', temp: true });
      setMessages(newMessages);
      setUserInput('');
      setIsThinking(true);

      setTimeout(() => {
        const updatedMessages = newMessages.filter(msg => !msg.temp);
        updatedMessages.push({ from: 'bot', text: questions[nextStep] });

        setMessages(updatedMessages);
        setStep(nextStep);
        setIsThinking(false);
      }, 300);
    } else {
      setMessages(newMessages);
      setUserInput('');
      setStep(nextStep);
    }
  };

  useEffect(() => {
    const container = document.querySelector('.chatbot-messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="chatbot-icon" onClick={toggleChat}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/4712/4712039.png"
          alt="Bot Icon"
          className="bot-img"
        />
      </div>

      {isOpen && (
        <div className="chatbot-popup">
          <div className="chatbot-header">
            🤖 Chat with us
            <button onClick={toggleChat}>×</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-message-wrapper ${msg.from === 'user' ? 'user-wrapper' : 'bot-wrapper'}`}
              >
                {msg.from === 'bot' && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4712/4712039.png"
                    alt="Bot"
                    className="msg-icon"
                  />
                )}
                <div
                  className={`chatbot-message ${msg.from === 'user' ? 'user-msg' : 'bot-msg'}`}
                >
                  {msg.text}
                </div>
                {msg.from === 'user' && (
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    alt="User"
                    className="msg-icon"
                  />
                )}
              </div>
            ))}
          </div>

          {step < questions.length - 1 && (
            <div className="chatbot-input">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type your answer..."
                disabled={isThinking}
              />
              <button onClick={handleSend} disabled={isThinking}>Send</button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingChatbot;
