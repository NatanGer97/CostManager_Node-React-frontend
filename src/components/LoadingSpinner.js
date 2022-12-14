import './LoadingSpinner.css'
export const LoadingSpinner = (props) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};
