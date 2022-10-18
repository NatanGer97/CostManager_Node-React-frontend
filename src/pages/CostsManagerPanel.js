import { Outlet } from "react-router-dom"

const CostsManagementPanel = (props) =>
{
    return (
        <div className="container">
        <Outlet />

        </div>
    );
}

export default CostsManagementPanel;