import { BrowserRouter } from "react-router-dom";
import "./App.css";
import TodoApp from "./TodoApp";

function App() {
  return (
    <BrowserRouter>
      <TodoApp></TodoApp>
    </BrowserRouter>
  );
}

export default App;
