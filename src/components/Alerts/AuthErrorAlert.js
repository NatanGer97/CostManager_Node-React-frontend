const AuthErrorAlert = (props) => {
  return (
    
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <h4 class="alert-heading">{props.alert['status-text']} - {props.alert['error-code']}</h4>
      <p>{props.alert.message}</p>
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
    /* title: errorMessage,
    message: data,
    "error-code": statusCode,
    "status-text": statusText, */
  }
};

export default AuthErrorAlert;
