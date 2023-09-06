import "./App.css";
import Menu from "./component/Menu";
import Main from "./component/Page/Main";
import Check from "./component/Page/Check";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Menu />
        <div className="content-container" style={{ background: "#F2F2F2" }}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/check" element={<Check />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
