import { motion } from "framer-motion";
import "../styles/typing-indicator.css";

export function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="typing-indicator"
        >
            <div style={{
                height: "40px",
                width: "40px",
                backgroundColor: "#fff",
                borderRadius: "50%",
                padding: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}>
                <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-brEWB5crLa89CpN2HQMiTFJpnuNTud.png"
                    alt="Assistant avatar"
                    style={{
                        height: "100%", width: "100%", borderRadius: "50%"
                    }}
                // className="avatar"
                />
            </div>
            <div className="typing-bubble">
                <motion.div />
                <motion.div />
                <motion.div />
            </div>
        </motion.div >
    );
}
