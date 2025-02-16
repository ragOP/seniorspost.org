import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import '../styles/chat-message.css'

export function ChatMessage({ message, isFirstInGroup, isLastInGroup, index, visibleMessages }) {
  const isAssistant = message.role === "assistant";
  const isVisible = index <= visibleMessages;
console.log(">>", isAssistant, isLastInGroup)
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: isAssistant ? -20 : 20, height: 0 }}
          animate={{ opacity: 1, x: 0, height: "auto" }}
          exit={{ opacity: 0, x: isAssistant ? -20 : 20, height: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`chat-message ${isAssistant ? "assistant" : "user"} ${isLastInGroup ? "last" : ""}`}
        >
          {isAssistant && isLastInGroup && (
            <div className="avatar assistant-avatar">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-brEWB5crLa89CpN2HQMiTFJpnuNTud.png"
                alt="Assistant avatar"
              />
            </div>
          )}
          {!isAssistant && isLastInGroup && (
            <div className="avatar user-avatar">
              <div className="user-icon">
                <User className="icon" />
              </div>
            </div>
          )}
          <div className={`message-bubble ${isAssistant ? "assistant-bubble" : "user-bubble"}`}>
            {message.content}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
