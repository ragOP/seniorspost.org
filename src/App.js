import { useState } from "react";
import ShowHistoryPage from "./components/ShowHistoryPage";
import AdminPanel from "./pages/admin";
import Raghib from "./pages/Raghib";
import Single from "./pages/Single";
import { ToastContainer } from "@cred/neopop-web/lib/components";

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
      <Single />
      <ToastContainer />
    </div>
  );
}

export default App;
