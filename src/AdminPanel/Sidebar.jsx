import { useNavigate } from "react-router-dom";

import {
    House,
    CalendarCheckFill,
    Clipboard,
    Heart,
    ChatSquareText,
    BoxArrowRight,
} from "react-bootstrap-icons";

export default function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin-login");
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
                  icon={<CalendarCheckFill/>}
                  label="Reservation"
                  onClick={() => navigate("/ReservationManagement")}
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
            </div>
            </div>

            <div className="logout">
                <BoxArrowRight />
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                > Logout
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