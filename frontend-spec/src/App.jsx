import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ComparatorPage from "./pages/ComparatorPage";
import "./App.css";


function App() {
  return(
    <BrowserRouter>
     <Navbar />

     <Routes>
       <Route path="/" element={<HomePage />}/>
       <Route path="/detail/:id" element={<DetailPage />}/>
       <Route path="/comparator" element={<ComparatorPage />}/>
     </Routes>
    </BrowserRouter>
  )
}

export default App;
