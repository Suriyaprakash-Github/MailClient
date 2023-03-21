import "./App.css";
// import Header from "./components/Layout/Header/Header";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" exact element={<Login />}></Route>
        <Route path="/" exact element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
