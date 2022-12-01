import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./App.css";
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainpage from './pages/Mainpage';
import Washpage from './pages/Washpage';
import Dashboardpage from './pages/Dashboardpage';
import Listpage from './pages/Listpage';
import Jobspage from './pages/staff/jobspage';
import Loginpage from './pages/auth/loginpage'
//User
import CreateUserPage from "./pages/admin/users/CreateUserPage";
import EditUserPage from "./pages/admin/users/EditUserPage";
import ListUserPage from "./pages/admin/users/ListUserPage";

import ActivitiesJobspage from "./pages/staff/activitiesjobpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainpage />}></Route>
        <Route path="/washpage" element={<Washpage />}></Route>
        <Route path="/dashboardpage" element={<Dashboardpage />}></Route>
        <Route path="/listpage" element={<Listpage />}></Route>
        <Route path="/staff/jobspage" element={<Jobspage />}></Route>
        <Route path="/login" element={<Loginpage />}></Route>

        <Route path="/admin/user/create" element={<CreateUserPage />}></Route>
        <Route path="/admin/user/edit/:id" element={<EditUserPage />}></Route>
        <Route path="/admin/user/list" element={<ListUserPage />}></Route>
        <Route
          path="/staff/activitiesjob/:id"
          element={<ActivitiesJobspage />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
