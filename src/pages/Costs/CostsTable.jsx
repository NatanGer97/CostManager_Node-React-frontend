import { useState } from "react";
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import CostRowItem from "./CostRowItem";

function CostsTable(props) {
  
  useEffect(() => {}, []);



  return (
    <div className="container rounded">
      <Table striped bordered hover className="text-center shadow rounded">
        <thead>
          
          <tr>
            <th>#</th>
            <th>description</th>
            <th>category</th>
            <th>sum</th>
            <th>created at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className=''>
          {props.costs &&
            props.costs.map((cost, index) => (
              <CostRowItem cost={cost} index={index}/>
           
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default CostsTable;
