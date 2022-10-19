import Row from "react-bootstrap/esm/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import "./NewCategoryForm.css";

function NewCategoryForm() {
  return (
    <div className="container">
      <form className="new-cost-form">
        <h4 className="text-center pb-2">New Category</h4>
        <FloatingLabel
          controlId="floatingInput"
          label="Category "
          className="mb-3"
        >
          <Form.Control type="text" />
        </FloatingLabel>
        <Row>
        <button className="btn-grad ">Create</button>

        </Row>
      </form>
    </div>
  );
}

export default NewCategoryForm;
