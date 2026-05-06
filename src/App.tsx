import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import "./App.css";
import { Detail } from "./pages/detail";
import { Recommendation } from "./pages/recommend";
import { RandomMenu } from "./pages/random";
import { History } from "./pages/history";
import { Nutrition } from "./pages/nutrition";
import { ChatHistoryProvider } from "./components/useHistory";

function App() {
  const url = import.meta.env.VITE_API_URL;
  return (
    <BrowserRouter basename="/souschef">
      <ChatHistoryProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail url={url}/>} />
          <Route path="/recommendation" element={<Recommendation />} />
          <Route path="/random" element={<RandomMenu url={url}/>} />
          <Route path="/history" element={<History />} />
          <Route path="/nutrition" element={<Nutrition/>}/>
        </Routes>
      </ChatHistoryProvider>
    </BrowserRouter>
  );
}

export default App;
