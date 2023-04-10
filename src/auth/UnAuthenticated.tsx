import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home/HomePage";
import Layout from "../components/Layout/Layout";
import NotFoundPage from "../pages/errors/NotFoundPage";

export default function UnAuthenticatedApp(): JSX.Element {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='*' element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
