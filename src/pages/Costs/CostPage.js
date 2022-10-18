import { useEffect, useState } from "react";
import "./CostsPage.css";
import CostsTable from "./CostsTable";
import { useDispatch, useSelector } from "react-redux";
import { getCosts } from "../../store/costsSlice";
import AuthService from "../../services/authService";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { NavLink, Outlet } from "react-router-dom";

const CostsPage = () => {
  const [costs, setCosts] = useState([]);
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.costs);

  useEffect(() => {
    const userId = AuthService.getIdFromToken();
    dispatch(getCosts({ userId: userId }));
    setCosts(entities.costs);
  }, [dispatch, entities.costs]);



  return (
    <div className="container">
      <div className="d-flex justify-content-evenly header">
        <span>#</span>
        <span>Costs</span>
        <a href="/new-cost">New Cost</a>
        
      </div>
      {loading ? <LoadingSpinner /> : <CostsTable costs={entities.expenses} />}
      {/* <CostsTable costs={entities.expenses} /> */}

    </div>
  );
};

export default CostsPage;
