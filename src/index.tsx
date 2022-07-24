import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { store } from "./store"
// import { setupStore } from "./store";
// import { Provider } from "react-redux";
import { AppProvider } from "./context/appContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <Provider store={setupStore()}>
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
  // </Provider>
);
