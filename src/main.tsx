import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/auth-context";
import Loading from "./components/Commons/Loading/Loading";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <UserProvider>
                    <Suspense fallback={<Loading />}>
                        <App />
                    </Suspense>
                </UserProvider>
            </Router>
        </Provider>
    </React.StrictMode>
);
