import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import "@radix-ui/themes/styles.css";
import "./App.css";
import { Detail } from "./pages/detail";
import { Recommendation } from "./pages/recommend";
import { RandomMenu } from "./pages/random";
import { History } from "./pages/history";
import { Nutrition } from "./pages/nutrition";

function App() {
  const url = import.meta.env.VITE_API_URL;
  return (
    <BrowserRouter basename="/souschef">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail url={url}/>} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/random" element={<RandomMenu url={url}/>} />
        <Route path="/history" element={<History />} />
        <Route path="/nutrition" element={<Nutrition/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
