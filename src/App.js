import { useEffect, useState } from "react";
import ShowHistoryPage from "./components/ShowHistoryPage";
import AdminPanel from "./pages/admin";
import Raghib from "./pages/Raghib";
import Single from "./pages/Single";
import { ToastContainer } from "@cred/neopop-web/lib/components";
import ChatApp from "./pages/ChatApp";
import ChatApp2 from "./pages/ChatApp2";
import { Footer } from "./pages/Footer";
import { Header } from "./pages/Header";

function App() {
  const [isShowingPanel, setIsShowingPanel] = useState(false);

  const onShowHistory = () => {
    setIsShowingPanel(true);
  };

  const [hasPassed530ET, setHasPassed530ET] = useState(false);

  useEffect(() => {
    // Get current time in Eastern Time (ET)
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );

    const hours = estTime.getHours();
    const minutes = estTime.getMinutes();

    // Check if the time has passed 5:30 PM ET
    if (hours > 17 || (hours === 17 && minutes >= 30)) {
      console.log("✅ The time has passed 5:30 PM ET.");
      setHasPassed530ET(true);
    } else {
      console.log("❌ The time has NOT passed 5:30 PM ET.");
      setHasPassed530ET(false);
    }
  }, []);

  return (
    <div>
      {/* {!isShowingPanel && <ShowHistoryPage onClick={onShowHistory} />}
      {isShowingPanel && <AdminPanel />} */}
      {/* <Raghib /> */}
      {/* <Single /> */}
      <ToastContainer />

      <Header />
      {hasPassed530ET ? <ChatApp /> : <ChatApp2 />}
      <Footer />
    </div>
  );
}

export default App;
