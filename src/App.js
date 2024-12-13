import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Router } from "./routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router />
        <ToastContainer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
