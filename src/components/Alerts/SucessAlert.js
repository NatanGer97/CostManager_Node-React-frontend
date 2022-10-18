export const SuccessAlert = (props) => {
  return (
    <div className="alert alert-primary" role="alert">
      {props.message}
    </div>
  );
};
