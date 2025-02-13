import { useState } from "react";
import ShowHistoryPage from "./components/ShowHistoryPage";
import AdminPanel from "./pages/admin";

function App() {
  const [isShowingPanel, setIsShowingPanel] = useState(false);

  const onShowHistory = () => {
    setIsShowingPanel(true);
  };

  return (
    <div>
      {!isShowingPanel && <ShowHistoryPage onClick={onShowHistory} />}
      {isShowingPanel && <AdminPanel />}
      </div>
  );
}

export default App;
