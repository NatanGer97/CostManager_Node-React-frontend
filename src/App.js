import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./components/LoginSection/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import IndexPage from "./pages/IndexPage";
import AuthVerify from "./components/AuthVerify";
import UserPage from "./pages/UserPage";
import CostsPage from "./pages/Costs/CostPage";
import CostsTable from "./pages/Costs/CostsTable";
import NewCostForm from "./pages/Costs/NewCostForm";
import CostsManagementPanel from "./pages/CostsManagerPanel";
import { costsReducer } from "./store/costsSlice";
import Cost from "./pages/Costs/Cost";

function App() {
  return (
    <div>
      <div className="container-fluid">
        {/* <AppBar /> */}
        <Routes>
          <Route index element={<IndexPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage title={"Home"} />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/all-costs" element={<CostsPage />}/>
            <Route path="/new-cost" element={<NewCostForm />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/costs" element={<CostsManagementPanel />} >
            <Route path=":costId" element={<Cost />} />
            <Route path=":costId/edit" element={<NewCostForm />} />
            </Route>
          </Route>


          <Route path="/login" element={<LoginPage title={"Login"} />} />
          <Route path="/register" element={<LoginPage title={"Register"} />} />
        </Routes>
      </div>
    </div>
  );
}
{
}
export default App;
