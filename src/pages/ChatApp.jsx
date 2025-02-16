import { useState, useEffect, useRef } from "react";
import '../styles/chat-styles.css'
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { Grid } from "lucide-react";
import { Grid2, TextField } from "@mui/material";

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

const fullGrid = { lg: 12, md: 12, sm: 12, xs: 12 };
const halfGrid = { lg: 6, md: 6, sm: 6, xs: 12 };

export const medicaidOptions = {
  creditCardDebt: [
    { id: "m_o_1_1", value: "yes", label: "Yes", goToStep: 2, gridValues: halfGrid },
    { id: "m_o_1_2", value: "no", label: "No", goToStep: 3, gridValues: halfGrid },
  ],
  debtRange: [
    { id: "m_o_2_1", value: "over", label: "Over $15,000", goToStep: 4, gridValues: halfGrid },
    { id: "m_o_2_2", value: "under", label: "Under $15,000", goToStep: 5, gridValues: halfGrid },
  ],
  personalLoan: [
    { id: "m_o_3_1", value: "yes", label: "Yes", goToStep: 6, gridValues: halfGrid },
    { id: "m_o_3_2", value: "no", label: "No", goToStep: 7, gridValues: halfGrid },
  ],
  debtSpecificRange: [
    { id: "m_o_4_1", value: "15-20k", label: "15-20k", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_4_2", value: "20-25k", label: "20-25k", goToStep: 9, gridValues: fullGrid },
    { id: "m_o_4_3", value: "25k+", label: "25k+", goToStep: 10, gridValues: fullGrid },
  ],
  loanAmount: [
    { id: "m_o_6_1", label: "$100-1700", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$1700-3300", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$3300-4900", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$4900-6500", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$6500-8100", goToStep: 14, gridValues: fullGrid },
    { id: "m_o_6_2", label: "$8100-10000", goToStep: 14, gridValues: fullGrid },
  ],
  creditScore: [
    { id: "m_o_7_1", label: "Excellent (700+)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_2", label: "Good (650-700)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_3", label: "Fair (550-650)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_4", label: "Poor (550 or lower)", goToStep: 8, gridValues: fullGrid },
    { id: "m_o_7_5", label: "No credit", goToStep: 8, gridValues: fullGrid },

  ],
  nameInput: [{ id: "m_o_8_1", type: "input", label: "Type your response here", gridValues: fullGrid }],
  emailInput: [{ id: "m_o_8_1", type: "input", label: "Type your response here", gridValues: fullGrid }],
  phoneInput: [{ id: "m_o_8_1", type: "input", label: "Type your response here", gridValues: fullGrid }],
  zipInput: [{ id: "m_o_8_1", type: "input", label: "Type your response here", gridValues: fullGrid }],
};

export const medicaidFlow = {
  1: {
    assistant_messages: [
      "I see you're on Medicaid. While you may not qualify for the ACA benefits, we might have other options that could help you.",
      "Let me ask you a few more questions. Are you currently in credit card debt?"
    ],
    options: medicaidOptions.creditCardDebt,
  },
  2: {
    assistant_messages: ["I understand. Is your credit card debt over or under $15,000?"],
    options: medicaidOptions.debtRange,
  },
  3: {
    assistant_messages: ["Alright, thanks for letting me know. Are you looking for a personal loan?"],
    options: medicaidOptions.personalLoan,
  },
  4: {
    assistant_messages: ["I see. Could you please specify the range of your debt?"],
    options: medicaidOptions.debtSpecificRange,
  },
  5: {
    assistant_messages: ["Thank you for sharing that. Are you looking for a personal loan?"],
    options: medicaidOptions.personalLoan,
  },
  6: {
    assistant_messages: ["Great! How much would you like to borrow?"],
    options: medicaidOptions.loanAmount,
  },
  7: {
    assistant_messages: ["I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."],
  },
  8: {
    assistant_messages: [
      "Thank you for providing that information. Now, let's collect some details so we can help you further.",
      "What's your name?"
    ],
    options: medicaidOptions.nameInput,
  },
  9: {
    assistant_messages: [
      "What's your email?"
    ],
    options: medicaidOptions.emailInput,
  },
  10: {
    assistant_messages: [
      "What's your phone number?"
    ],
    options: medicaidOptions.phoneInput,
  },
  11: {
    assistant_messages: [
      "What's your zip code?"
    ],
    options: medicaidOptions.zipInput,
  },
  12: {
    assistant_messages: [
      "Thank you for providing that information. We'll be in touch shortly."
    ],
  },
  13: {
    assistant_messages: [
      "I understand. Thank you for your time. If you need any assistance in the future, please don't hesitate to reach out!."
    ],
  },
  14: {
    assistant_messages: [
      "Thank you. What's your credit score range?"
    ],
    options: medicaidOptions.creditScore,
  }
};



const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const appendMessagesWithDelay = async (updateChat, messages, delayMs) => {
  for (const message of messages) {
    const messageObj = { id: "assistant-6", content: message, role: "assistant" }
    await delay(delayMs);
    updateChat((prev) => [...prev || [], messageObj]);
  }
};

export default function ChatApp() {
  const buttonsRef = useRef(null)
  const chatsRef = useRef(null)

  const [chat, setChat] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showFinalOptions, setShowFinalOptions] = useState(false);
  const [visibleMessages, setVisibleMessages] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const [mediacaidStep, setMedicaidStep] = useState(1);
  const [medicaidOptions, setMedicaidOptions] = useState(null);

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

  const handleMedicaidClick = async () => {

    setShowOptions(false);

    setIsTyping(true);
    setChat((prev) => [...prev, { id: `user-${mediacaidStep}`, content: "Medicaid", role: "user" }]);

    const currentStep = medicaidFlow[mediacaidStep];

    if (currentStep) {
      await appendMessagesWithDelay(setChat, currentStep.assistant_messages, 1000);
      setMedicaidStep((prev) => prev + 1);

      const options = currentStep.options;
      setMedicaidOptions(options)
    }

    setIsTyping(false);
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

  const handleOptionClick = async (option) => {
    setIsTyping(true);
    setMedicaidOptions(null)
    setChat((prev) => [...prev, { id: `user-${mediacaidStep}`, content: option.label, role: "user" }]);

    const currentStep = medicaidFlow[option.goToStep];

    if (currentStep) {
      await appendMessagesWithDelay(setChat, currentStep.assistant_messages, 1000);
      setMedicaidStep(option.goToStep);

      const options = currentStep.options;
      setMedicaidOptions(options);
    }

    setIsTyping(false);
  };

  const handleInsuranceClick = () => {
    setIsTyping(true);
    setChat((prev) => [...prev, { id: "user-2", content: "None", role: "user" }]);

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
  }

  const handleSubmit = () => { }
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
            <button className="chat-option" onClick={handleInsuranceClick}>No Insurance</button>
            <button className="chat-option">Medicare</button>
            <button className="chat-option" onClick={handleMedicaidClick}>Medicaid</button>
          </div>
        )}
        {showFinalOptions && (
          <div className="chat-options">
            <div className="chat-notification">
              <p className="chat-notification-message">
                🎉 Great news! You're pre-qualified for amazing benefits!
              </p>
            </div>
            <button className="chat-option">Raghib</button>
            <button className="button1">Call 8889823536 Now!</button>
            <div id="phone-number">
              <a href="tel:+18889823536" class="call-button">
                Call (888) 982-3536 Now!
              </a>
            </div>
            <div class="info-text">
              <div>TTY: 711</div>
              <div class="availability">Friendly Agents Available: M-F 9am-6pm EST</div>
            </div>
          </div>
        )}
        {medicaidOptions && (
          <Grid2 container spacing={2}>
            {medicaidOptions.map((option, index) => (
              <Grid2 item size={{ ...option.gridValues }} key={index}>
                {option.type === "input" ? (
                  <input
                    type="text"
                    placeholder="Type your response here..."
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      outline: 'none',
                      boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.5)',
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit()
                      }
                    }}
                  />
                ) :
                  <button key={index} className="chat-option" onClick={() => handleOptionClick(option)}>{option.label}</button>
                }
              </Grid2>
            ))}
          </Grid2>
        )}

      </div>
    </div >
  );
}