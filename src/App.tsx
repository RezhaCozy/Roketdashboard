import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/dashboard/LoginPage";
import CheckoutPage from "./components/dashboard/CheckoutPage";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
      </>
    </Suspense>
  );
}

export default App;
