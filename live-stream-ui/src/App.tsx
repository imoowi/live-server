import { lazy, useState } from "react";
// import { QRCode } from "antd";
import { Routes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
const Home = lazy(() => import("./views/Home"));
const Login = lazy(() => import("./views/Login"));
const NotFound = lazy(() => import("./views/NotFound"));
const Event = lazy(() => import("./views/Event"));
const App = () => {
  // const [showQr, setShowQr] = useState(false);
  const location = useLocation();
  return (
    <ErrorBoundary>
      <div className="App">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/event" element={<Event />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ErrorBoundary>
  );
};

export default App;
