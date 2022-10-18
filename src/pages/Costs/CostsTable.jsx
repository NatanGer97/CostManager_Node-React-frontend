import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../../components/LoadingSpinner";

function CostsTable(props) {
  const [costs, setCosts] = useState([]);
  const items = useSelector((state) => state.entities);
  useEffect(() => {}, []);

  return (
    <div className="container">
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>#</th>
            <th>description</th>
            <th>category</th>
            <th>sum</th>
            <th>created at</th>
          </tr>
        </thead>
        <tbody>
          {props.costs &&
            props.costs.map((cost, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{cost.description}</td>
                <td>{cost.category.name}</td>
                <td>{cost.sum}</td>
                <td>{new Date(cost.createdAt).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CostsTable;
