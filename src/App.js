import logo from "./logo.svg";
import "./App.css";
import { Login } from "./pages/Login";
import { Router } from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
