import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
// import { store } from "./store"
import { setupStore } from "./store"
import { Provider } from "react-redux"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <Provider store={setupStore()}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
)
