const GeneralAlert = (props) => {
    return (
      
      <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <h4 class="alert-heading">Error</h4>
        <p>{props.error}</p>
    <hr></hr>
  
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
          onClick={props.onClose}
        ></button>
      </div>
    );{
    
    }
  };
  
  export default GeneralAlert;
  