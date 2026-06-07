import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Component/Home/Home";
import About from "./Component/About/About";
import Portfolio from "./Component/portfolio/Portfolio";
import Contact from "./Component/Contact/Contact";
import Layout from "./Component/layout/Layout";
import Oane from "./Component/oane/oane";
import IntroVideo from "./Component/IntroVideo/IntroVideo";

// ضيف ده
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

let s = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "portfolio", element: <Portfolio /> },
      { path: "contact", element: <Contact /> },
      { path: "oane", element: <Oane /> },

      // ضيف ده
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);

function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroVideo onComplete={handleIntroComplete} />;
  }

  return (
    <>
      <RouterProvider router={s} />
    </>
  );
}

export default App;