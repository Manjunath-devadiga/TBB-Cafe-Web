import { useNavigate } from "react-router-dom";

import {
    House,
    Cart3,
    Clipboard,
    Heart,
    CreditCard,
    Gear,
    BoxArrowRight,
} from "react-bootstrap-icons";

export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="sidebar">
            <div>
            <h2 className="logo">THE OG CAFE</h2>
            <div className="menu">
                <MenuItem
                  icon={<House />}
                  label="Home"
                  onClick={() => navigate("/dashboard")}
                />
                <MenuItem
                  icon={<Cart3 />}
                  label="Shopping"
                />

                <MenuItem
                  icon={<Clipboard />}
                  label="Orders"
                  onClick={() => navigate("/orders")}/>

                <MenuItem
                  icon={<Heart />}
                  label="MenuManagement"
                  onClick={() => navigate("/Menumanagement")}
                />

                <MenuItem
                  icon={<CreditCard />}
                  label="Payments"
                />

                <MenuItem
                   icon={<Gear />}
                   label="Settings"
                />

            </div>
            </div>

            <div className="logout">
                <BoxArrowRight />

                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

/* MENU ITEM */
function MenuItem({ icon, label, onClick }) {

    return (
        <div
            className="menu-item"
            onClick={onClick}
            style={{ cursor: "pointer" }}
        >
            {icon}
            <span>{label}</span>
        </div>
    );
}