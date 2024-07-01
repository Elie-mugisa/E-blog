import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import { Provider } from "react-redux";
import store from "./store";

const querryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <QueryClientProvider client={querryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
