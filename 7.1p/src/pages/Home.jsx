import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    function logout() { localStorage.removeItem("user"); navigate("/login"); }

    return (
        <div className="container">
            <div className="card">
                <h1>Welcome {user?.firstName || "User"}</h1>
                <p>You are now logged in.</p>
                <button onClick={logout}>Logout</button>
            </div>
        </div>
    );
}
