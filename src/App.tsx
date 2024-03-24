import { BrowserRouter as Router } from "react-router-dom";
import AppContent from "./AppContent";
import { AppContextProvider } from "./context/AppContext";

const App = () => {
  return (
    <Router>
      <AppContextProvider>
        <AppContent />
      </AppContextProvider>
    </Router>
  );
};

export default App;
