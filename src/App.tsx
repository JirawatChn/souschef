import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/home";
import "@radix-ui/themes/styles.css";
import "./App.css";
import { Detail } from "./pages/detail";
import { Recommendation } from "./pages/recommend";
import { RandomMenu } from "./pages/random";

function App() {
  const url = import.meta.env.VITE_API_URL;
  return (
    <BrowserRouter basename="souschef">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail url={url}/>} />
        <Route path="/recommendation" element={<Recommendation />} />
        <Route path="/random" element={<RandomMenu url={url}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
