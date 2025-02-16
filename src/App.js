import { useState } from "react";
import ShowHistoryPage from "./components/ShowHistoryPage";
import AdminPanel from "./pages/admin";
import Raghib from "./pages/Raghib";
import Single from "./pages/Single";
import { ToastContainer } from "@cred/neopop-web/lib/components";
import ChatApp from "./pages/ChatApp";
import { Footer } from "./pages/Footer";
import { Header } from "./pages/Header";

function App() {
  const [isShowingPanel, setIsShowingPanel] = useState(false);

  const onShowHistory = () => {
    setIsShowingPanel(true);
  };

  return (
    <div>
      {/* {!isShowingPanel && <ShowHistoryPage onClick={onShowHistory} />}
      {isShowingPanel && <AdminPanel />} */}
      {/* <Raghib /> */}
      {/* <Single /> */}
      <ToastContainer />

      <Header />
      <ChatApp />
      <Footer />
    </div>
  );
}

export default App;
