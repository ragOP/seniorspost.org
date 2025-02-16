import { useState, useEffect, useRef } from "react";
import '../styles/chat-styles.css'
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";

const messages = [
  {
    id: "initial-1",
    content: "Hey there! 👋 Need help with bills?",
    role: "assistant",
    delay: 600,
  },
  {
    id: "initial-2",
    content:
      "I'm Emily, your virtual assistant, and I've got great news about a special health plan that could save you serious cash! 💰",
    role: "assistant",
    delay: 800,
  },
  {
    id: "initial-3",
    content:
      "Want to see if you qualify for a $0 health plan AND a $500 rewards card for groceries and gas? It only takes 2 minutes! Tap 'Yes' to get started! 🚀",
    role: "assistant",
    delay: 1000,
  },
];

export default function ChatApp() {
  const buttonsRef = useRef(null)
  const chatsRef = useRef(null)

  const [chat, setChat] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let timeoutIds = [];
    setIsTyping(true);
    messages.forEach((msg, index) => {
      const timeoutId = setTimeout(() => {
        setChat((prev) => [...prev, msg]);
        setVisibleMessages(messages.length - 1);
        if (index === messages.length - 1) {
          setShowButton(true);
          setIsTyping(false);
        }
      }, messages.slice(0, index + 1).reduce((acc, m) => acc + m.delay, 0));

      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, []);

  const handleClick = () => {
    setIsTyping(true);
    setChat((prev) => [...prev, { id: "user-1", content: "Yes", role: "user" }]);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-4", content: "Awesome! Let's get you those savings ASAP. I just need to ask you a couple quick questions.", role: "assistant" }]);
      setIsTyping(false);
    }, 1000);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-5", content: "First up: Are you currently on Medicaid or Medicare?", role: "assistant" }]);
      setVisibleMessages(messages.length - 1);
      setShowOptions(true);
    }, 2000);

    setShowButton(false);
  };

  const handleMedicaidClick = () => {
    setIsTyping(true);
    setChat((prev) => [...prev, { id: "user-2", content: "Medicaid", role: "user" }]);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-6", content: "🎉 Fantastic news! You're one step closer to major savings!", role: "assistant" }]);
      setIsTyping(false);
    }, 1000);

    setTimeout(() => {
      setChat((prev) => [...prev, { id: "assistant-7", content: "Based on what you've told me, you might qualify for a $0 health plan AND a $500 spending card for essentials like groceries, gas, and rent. That's real money back in your pocket!", role: "assistant" }]);
    }, 2000);

    setTimeout(() => {
      const newMessages = [{ id: "assistant-8", content: "Don't miss out on this opportunity! Call now to lock in your benefits. It only takes a few minutes, and you could start saving today!", role: "assistant" }];
      setChat((prev) => [...prev, ...newMessages || []]);
      setShowFinalOptions(true);
    }, 3000);

    setShowOptions(false);
  };

  const isFirstInGroup = (index) => {
    if (index === 0) return true;
    const currentMessage = chat[index];
    const previousMessage = chat[index - 1];
    return currentMessage.role !== previousMessage.role;
  };

  const isLastInGroup = (index) => {
    if (index === chat.length - 1) return true;
    const currentMessage = chat[index];
    const nextMessage = chat[index + 1];
    return currentMessage.role !== nextMessage.role;
  };


  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((message, index) => (
          <ChatMessage
            key={index}
            message={message}
            isFirstInGroup={isFirstInGroup(index)}
            isLastInGroup={isLastInGroup(index)}
            index={index}
            visibleMessages={chat.length - 1}
          />
        ))}
        {isTyping && <TypingIndicator />}
      </div>

      <div ref={buttonsRef} className="button-container">
        {showButton && <button className="button1" onClick={handleClick}>Yes, Show Me How to Save!</button>}
        {showOptions && (
          <div className="chat-options">
            <button className="chat-option" onClick={handleMedicaidClick}>Medicaid</button>
            <button className="chat-option">Medicare</button>
            <button className="chat-option">Neither</button>
          </div>
        )}
        {showFinalOptions && (
          <div className="chat-options">
            <button className="chat-option">Raghib</button>
            <button className="chat-option">Taazeem</button>
          </div>
        )}
      </div>
    </div>
  );
}