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
      <h2 className="text-center">Costs</h2>
      <div className="d-flex justify-content-around mb-3">
        <a href="/new-category" className="btn btn btn-outline-primary">
          <i class="bi bi-plus-circle"></i> <span>New Category</span>
        </a>
        <a href="/new-cost" className="btn btn btn-outline-primary">
          <i class="bi bi-plus-circle"></i> <span>New Cost</span>
        </a>
      </div>
      {loading ? <LoadingSpinner /> : <CostsTable costs={entities.expenses} />}
    </div>
  );
};

export default CostsPage;
