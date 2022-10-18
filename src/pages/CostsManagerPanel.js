import { Outlet } from "react-router-dom"

const CostsManagementPanel = () =>
{
    return (
        <div className="container-fluid">
            <Outlet />
        </div>
    );
}

export default CostsManagementPanel;