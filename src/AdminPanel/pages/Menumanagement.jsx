import AddMenuItem from "../AddMenuItem";
import Sidebar from "../Sidebar";
export default function MenuManagement() {
  return (
    <div className="dashboard-container">    
          <Sidebar />
      <div className="main-content container-fluid">    
      <div className="mb-4">
        <h2 className="fw-bold">
          Menu Management 🍽️
        </h2>

        <p className="text-muted">
          Add, edit and manage cafe menu items
        </p>
      </div>

      <AddMenuItem />
    </div>
    </div>
  );
}