import React, { useState, useEffect, useRef } from 'react';
import './EmployeeChatBox.css';
import { Send, User, Bot, MessageSquare, Plus, Menu, Settings, Sparkles, X, Edit3, Search } from 'lucide-react';

const EmployeeChatBox = () => {
  // Embedded questions data
  const questionsData = {
    "questions": [
      "What is my current performance rating?",
      "When did I join the company?",
      "Can I see my pay slip for this month?",
      "How many leaves do I have remaining?",
      "Who is my reporting manager?",
      "What is my employee ID?",
      "What is my department?",
      "What are my project assignments?",
      "When is my next appraisal?",
      "What are my attendance details?",
      "Can I update my personal information?",
      "How do I apply for leave?",
      "What is the company holiday list?",
      "What is my current salary structure?",
      "What are my training schedules?",
      "What is my shift timing?",
      "How can I request a transfer?",
      "Can I see my bonus history?",
      "What is my probation status?",
      "What documents are required for KYC?"
    ]
  };

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [frequentQuestions, setFrequentQuestions] = useState([
    "What is my current performance rating?",
    "How many leaves do I have remaining?",
    "Who is my reporting manager?",
    "What is my department?",
    "When is my next appraisal?",
    "What are my training schedules?",
     "What is my current performance rating?",
      "When did I join the company?",
      "Can I see my pay slip for this month?",
      "How many leaves do I have remaining?",
      "Who is my reporting manager?",
      "What is my employee ID?",
      "What is my department?",
      "What are my project assignments?",
      "When is my next appraisal?",
      "What are my attendance details?",
      "Can I update my personal information?",
      "How do I apply for leave?",
      "What is the company holiday list?",
      "What is my current salary structure?",
      "What are my training schedules?",
      "What is my shift timing?",
      "How can I request a transfer?",
      "Can I see my bonus history?",
      "What is my probation status?",
      "What documents are required for KYC?"
  ]);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Filter questions based on search query
  const filteredQuestions = frequentQuestions.filter(question =>
    question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleQuestionClick = (question) => {
    handleSendMessage(question);
  };

  const handleSendMessage = (messageText = inputText) => {
    if (!messageText.trim() || isThinking) return;

    const newMessages = [...messages, { from: 'user', text: messageText, timestamp: new Date() }];
    setMessages(newMessages);
    setInputText('');
    setIsThinking(true);
    setShowWelcome(false);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate bot thinking with typing effect
    setTimeout(() => {
      const response = getBotResponse(messageText);
      setMessages([...newMessages, { from: 'bot', text: response, timestamp: new Date() }]);
      setIsThinking(false);
    }, 1000 + Math.random() * 1000);
  };

  const getBotResponse = (question) => {
    // Static responses based on questions
    switch (question) {
      case "What is my current performance rating?":
        return "Your current performance rating is **4.5/5.0** ⭐️\n\nThis puts you in the 'Exceeds Expectations' category. Great work! Your next review is scheduled for January 2025.";
      case "When did I join the company?":
        return "You joined our company on **July 12, 2021**.\n\nThat means you've been with us for over 3 years now! 🎉";
      case "Can I see my pay slip for this month?":
        return "I've sent your current month's pay slip to your registered email address.\n\n📧 **Email:** john.doe@company.com\n\nIf you don't see it in your inbox, please check your spam folder or contact HR.";
      case "How many leaves do I have remaining?":
        return "Here's your current leave balance:\n\n🏖️ **Annual Leave:** 12 days\n🏥 **Sick Leave:** 8 days\n👨‍👩‍👧‍👦 **Personal Leave:** 3 days\n\nTotal: 23 days remaining for this year.";
      case "Who is my reporting manager?":
        return "Your reporting manager is **Mr. Raj Thakkar**\n\n📧 Email: raj.thakkar@company.com\n📞 Ext: 2847\n🏢 Office: 4th Floor, Room 401";
      case "What is my employee ID?":
        return "Your employee ID is **EMP5672**\n\nThis ID is used for all company systems and should be included in any HR-related communications.";
      case "What is my department?":
        return "You are part of the **Engineering Department** 👨‍💻\n\n**Team:** Product Development\n**Floor:** 3rd Floor\n**Head of Department:** Sarah Chen";
      case "What are my project assignments?":
        return "You are currently assigned to:\n\n🚀 **Project Phoenix** (Primary)\n- Role: Senior Developer\n- Deadline: Sept 2025\n\n🌟 **Project Atlas** (Secondary)\n- Role: Technical Consultant\n- Deadline: Nov 2025";
      case "When is my next appraisal?":
        return "Your next performance appraisal is scheduled for **January 15, 2025** 📅\n\nYour manager will send you a calendar invite closer to the date. Start preparing your self-assessment!";
      case "What are my attendance details?":
        return "Here's your attendance summary:\n\n✅ **This Year:** 95% attendance\n📅 **This Month:** 22/23 days present\n🎯 **Status:** Excellent!\n\nKeep up the great work! 👏";
      case "Can I update my personal information?":
        return "Yes! You can update your personal information through:\n\n🌐 **Employee Portal:** Go to Profile → Personal Details\n📧 **Email HR:** hr@company.com\n🏢 **Visit HR:** 2nd Floor, Room 201\n\nRemember to provide supporting documents for major changes.";
      case "How do I apply for leave?":
        return "To apply for leave:\n\n1. 🌐 Log into Employee Portal\n2. 📅 Go to 'Leave Management'\n3. ✍️ Fill out leave application\n4. 📤 Submit for manager approval\n\nFor urgent leave, call HR at ext. 1234.";
      case "What is the company holiday list?":
        return "You can find the complete holiday list at:\n\n🌐 **Employee Portal:** Resources → Holiday Calendar\n📧 **Email:** holidays@company.com\n📋 **Notice Board:** 1st Floor Lobby\n\n**Upcoming Holidays:**\n- Independence Day: Aug 15\n- Gandhi Jayanti: Oct 2";
      case "What is my current salary structure?":
        return "Your current compensation details:\n\n💰 **Gross CTC:** ₹12,00,000 per annum\n📊 **Basic:** ₹7,20,000\n🏠 **HRA:** ₹2,88,000\n💼 **Other Allowances:** ₹1,92,000\n\nFor detailed breakdown, check your pay slip.";
      case "What are my training schedules?":
        return "Your upcoming training sessions:\n\n📚 **Next Training:** August 5, 2025\n⏰ **Time:** 10:00 AM - 12:00 PM\n📍 **Venue:** Training Room A, 5th Floor\n🎯 **Topic:** Advanced React Development\n\n**Trainer:** Ms. Priya Sharma";
      case "What is my shift timing?":
        return "Your current shift details:\n\n⏰ **Shift:** 10:00 AM - 7:00 PM\n🍽️ **Lunch Break:** 1:00 PM - 2:00 PM\n📅 **Working Days:** Monday - Friday\n🏠 **Work Model:** Hybrid (3 days office, 2 days WFH)";
      case "How can I request a transfer?":
        return "To request a department/location transfer:\n\n1. 📋 Fill Transfer Request Form\n2. 📝 Get current manager's approval\n3. 📤 Submit to HR\n4. 📞 Schedule transfer interview\n\n**Form Available:** HR Portal → Career → Transfer Request";
      case "Can I see my bonus history?":
        return "Your bonus history is available in:\n\n🌐 **Employee Portal:** Payroll → Bonus History\n💰 **Last Bonus:** ₹50,000 (Performance Bonus - March 2025)\n📊 **This Year Total:** ₹75,000\n\nFor detailed breakdown, contact payroll@company.com";
      case "What is my probation status?":
        return "✅ **Probation Status:** Successfully Completed!\n\n📅 **Completion Date:** January 12, 2022\n⭐ **Final Rating:** Exceeds Expectations\n🎉 **Confirmation Date:** January 15, 2022\n\nCongratulations on your successful completion! 🎊";
      case "What documents are required for KYC?":
        return "Required KYC documents:\n\n**Mandatory:**\n🆔 Aadhaar Card (copy)\n🏛️ PAN Card (copy)\n🏠 Address Proof (utility bill/rent agreement)\n\n**Additional:**\n📸 Passport size photos (2)\n🏦 Bank account details\n📞 Emergency contact information";
      default:
        return "I apologize, but I don't have specific information about that query. Please try one of the suggested questions or contact HR directly for assistance.\n\n📧 **HR Email:** hr@company.com\n📞 **HR Phone:** +91-XXXX-XXXX";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const autoResizeTextarea = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 200) + 'px';
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const addFrequentQuestion = () => {
    if (newQuestion.trim() && !frequentQuestions.includes(newQuestion.trim())) {
      setFrequentQuestions([...frequentQuestions, newQuestion.trim()]);
      setNewQuestion('');
      setShowAddQuestion(false);
    }
  };

  const removeFrequentQuestion = (questionToRemove) => {
    setFrequentQuestions(frequentQuestions.filter(q => q !== questionToRemove));
  };

  const handleAddQuestionKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addFrequentQuestion();
    }
    if (e.key === 'Escape') {
      setShowAddQuestion(false);
      setNewQuestion('');
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // If there's an exact match or only one result, click it
      if (filteredQuestions.length === 1) {
        handleQuestionClick(filteredQuestions[0]);
        setSearchQuery('');
      }
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  return (
    <div className="chatgpt-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="search-container">
            <div className="search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleSearchKeyPress}
                placeholder="Search questions..."
                className="search-input"
              />
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={clearSearch}
                  title="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="chat-history">
          <div className="chat-history-item active">
            <MessageSquare size={16} />
            <span>Employee Assistant</span>
          </div>
          
          {/* Frequently Asked Questions Section */}
          <div className="faq-section">
            <div className="faq-header">
              <h3>
                {searchQuery ? `Search Results (${filteredQuestions.length})` : 'Frequently Asked'}
              </h3>
              <button 
                className="add-question-btn"
                onClick={() => setShowAddQuestion(true)}
                title="Add new question"
              >
                <Plus size={14} />
              </button>
            </div>
            
            {showAddQuestion && (
              <div className="add-question-form">
                <input
                  type="text"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  onKeyDown={handleAddQuestionKeyPress}
                  placeholder="Add new question..."
                  className="question-input"
                  autoFocus
                />
                <div className="question-actions">
                  <button 
                    className="save-question-btn"
                    onClick={addFrequentQuestion}
                    disabled={!newQuestion.trim()}
                  >
                    Add
                  </button>
                  <button 
                    className="cancel-question-btn"
                    onClick={() => {setShowAddQuestion(false); setNewQuestion('');}}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
            
            <div className="faq-list">
              {filteredQuestions.length === 0 && searchQuery ? (
                <div className="no-results">
                  <p>No questions found matching "{searchQuery}"</p>
                  <p className="no-results-hint">Try a different search term</p>
                </div>
              ) : (
                filteredQuestions.map((question, idx) => (
                  <div key={idx} className="faq-item">
                    <button
                      className="faq-question"
                      onClick={() => handleQuestionClick(question)}
                      disabled={isThinking}
                      title={question}
                    >
                      <span className="faq-text">
                        {searchQuery ? (
                          // Highlight search term in results
                          question.replace(
                            new RegExp(`(${searchQuery})`, 'gi'),
                            '<mark>$1</mark>'
                          )
                        ) : (
                          question
                        )}
                      </span>
                    </button>
                    <button
                      className="remove-question-btn"
                      onClick={() => removeFrequentQuestion(question)}
                      title="Remove question"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="user-avatar">
              <User size={16} />
            </div>
            <span>Sunny Vaishnav</span>
            <Settings size={16} className="settings-icon" />
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat">
        {/* Header */}
        <div className="chat-header">
          <button 
            className="menu-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
          </button>
          <div className="header-title">
            <Bot size={20} className="bot-icon" />
            <span>Employee Assistant</span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="messages-container">
          {showWelcome && (
            <div className="welcome-screen">
              <div className="welcome-content">
                <div className="welcome-icon">
                  <Sparkles size={48} />
                </div>
                <h1>How can I help you today?</h1>
                <p>Ask me anything about your employment details, benefits, or company policies.</p>
                
                <div className="suggestion-cards">
                  {frequentQuestions.slice(0, 4).map((question, idx) => (
                    <button
                      key={idx}
                      className="suggestion-card"
                      onClick={() => handleQuestionClick(question)}
                      disabled={isThinking}
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.from}`}>
              <div className="message-content">
                <div className="message-avatar">
                  {msg.from === 'user' ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>
                <div className="message-text">
                  {msg.text.split('\n').map((line, i) => (
                    <div key={i}>
                      {line.includes('**') ? (
                        <span dangerouslySetInnerHTML={{
                          __html: line
                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        }} />
                      ) : (
                        line
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="message-wrapper bot">
              <div className="message-content">
                <div className="message-avatar">
                  <Bot size={20} />
                </div>
                <div className="message-text">
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <div className="input-wrapper">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onInput={autoResizeTextarea}
              onKeyPress={handleKeyPress}
              placeholder="Message Employee Assistant..."
              className="message-input"
              disabled={isThinking}
              rows="1"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isThinking}
              className="send-button"
            >
                submit
              <Send size={38} />
            </button>
          </div>
          <p className="input-disclaimer">
            Employee Assistant can make mistakes. Please verify important information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeChatBox;