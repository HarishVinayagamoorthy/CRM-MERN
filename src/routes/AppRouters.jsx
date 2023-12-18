import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/signin/SignIn.jsx";
import Slider from "../components/slider/Slider";
import Dashboard from "../components/Dashboard/AdminDashboard/Dashboard.jsx";
import Create from "../pages/Tickets/Create.jsx";
import TicketsDashboard from "../components/Dashboard/AdminDashboard/TicketsDashboard.jsx";
import UserDashboard from "../components/Dashboard/UserDashbooard/UserDashboard.jsx";
import Home from "../pages/Users/Home.jsx";
import Register from "../pages/Users/Register.jsx";
import Edit from "../pages/Users/Edit.jsx";
import Details from "../pages/Users/Details.jsx";
import Tickets from "../pages/Tickets/Tickets.jsx";
import Task from "../pages/TASK/Task.jsx";
import UserTask from "../pages/User Task/TaskPage.jsx";
import TaskSubmittingPage from "../pages/User Task/TaskSubmissionForm.jsx";
import SubmittedTaskPage from "../pages/TASK/SubmittedTaskPage.jsx";
import UserTasklistpage from "../pages/User Task/TaskList.jsx";
import Frogotpassword from "../pages/Password/ForgotPassword.jsx";
import ResetPassword from "../pages/Password/Resetpassword.jsx";
import TicketsCards from "../components/Dashboard/Dashboard Cards/TicketsCard.jsx";
import ResolvedTickets from "../components/Dashboard/Dashboard Cards/RessolvedTickets.jsx";
import ApprovedTickets from "../components/Dashboard/Dashboard Cards/ApprovedTickets.jsx";
import PendingTickets from "../components/Dashboard/Dashboard Cards/PendingTickets.jsx";

export const AppRouters = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <SignIn />
          </>
        }
      />
      <Route
        path="/Forgotpassword"
        element={
          <>
            <Frogotpassword />
          </>
        }
      />
      <Route
        path="/resetpassword"
        element={
          <>
            <ResetPassword />
          </>
        }
      />

      <Route
        path="/home"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Home />
            </div>
          </>
        }
      />
      <Route
        path="/register"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Register />
            </div>
          </>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Edit />
            </div>
          </>
        }
      />
      <Route
        path="/view/:id"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Details />
            </div>
          </>
        }
      />

      <Route
        path="/create"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Create />
            </div>
          </>
        }
      />
      <Route
        path="/tickets"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <TicketsDashboard />
            </div>
          </>
        }
      />
      <Route
        path="/ticket/:id"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Tickets />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Dashboard />
            </div>
          </>
        }
      />
      <Route
        path="/userdash"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <UserDashboard />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard/all"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <TicketsCards />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard/approved"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <ApprovedTickets />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard/resolved"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <ResolvedTickets />
            </div>
          </>
        }
      />
      <Route
        path="/dashboard/pending"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <PendingTickets />
            </div>
          </>
        }
      />

      <Route
        path="/createTask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <Task />
            </div>
          </>
        }
      />
      <Route
        path="/Submitedtask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <SubmittedTaskPage />
            </div>
          </>
        }
      />

      <Route
        path="/userTask"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <UserTask />
            </div>
          </>
        }
      />
      <Route
        path="/task/:taskId"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <TaskSubmittingPage />
            </div>
          </>
        }
      />
      <Route
        path="/submitedByuser"
        element={
          <>
            <div className="d-flex">
              <Slider />
              <UserTasklistpage />
            </div>
          </>
        }
      />

      {/* <Route path='/*' element={<Navigate to = '/'/>}/> */}
    </Routes>
  );
};

export default AppRouters;
