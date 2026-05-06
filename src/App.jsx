import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
// ... import your other pages/components

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Keep all your <Route /> definitions here */}
          <Route path="/" element={<Home />} />
          {/* ... etc */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
