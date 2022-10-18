import { useNavigate } from "react-router-dom";
import CostsService from "../../services/CostsService";
import "./CostItemRow.css";
const CostRowItem = (props) => {
  const costItem = props.cost;
  const deleteHandler = async (props) => {
    try {
      CostsService.deleteCost(costItem._id).then(() =>
        window.location.reload()
      );
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <tr key={props.index} style={{ lineHeight: "30px" }}>
      <td>{props.index + 1}</td>
      <td>{costItem.description}</td>
      <td>{costItem.category.name}</td>
      <td>{costItem.sum}</td>
      <td>{new Date(costItem.createdAt).toLocaleString()}</td>
      <td>
        <div class="d-flex justify-content-around">
          <a
            className="action-btn btn btn btn-outline-primary bi bi-eye"
            href={`costs/${costItem._id}`}
          ></a>
          <a
            className="action-btn btn btn btn-outline-secondary bi bi-pencil"
            href={`costs/${costItem._id}/edit`}
          ></a>

          <button
            className="action-btn btn btn btn-outline-danger bi bi-trash"
            onClick={deleteHandler}
          ></button>
        </div>
      </td>
    </tr>
  );
};

export default CostRowItem;
