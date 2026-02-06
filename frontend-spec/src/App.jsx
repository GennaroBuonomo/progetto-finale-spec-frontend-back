import { Routers, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import ComparatorPage from "./pages/ComparatorPage";
import './App.css';


function App() {
  return(
    <>S
    <Navbar />

    <Routers>
      <Route path="/" element={<HomePage />}/>
      <Route path="/details/:id" element={<DetailPage />}/>
      <Route path="/comparator" element={<ComparatorPage />}/>
    </Routers>
    </>
  )
}

export default App;
