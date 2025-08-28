import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { loginUser } from "../services/auth";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState(null);
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    async function handleSubmit(e) {
        e.preventDefault();
        setBusy(true);
        setMsg(null);
        try {
            const user = await loginUser(db, { email, password });
            localStorage.setItem("user", JSON.stringify(user));
            navigate(from, { replace: true });
        } catch (err) {
            setMsg(err.message || "Login failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <h1>Login</h1>

                <label>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                {msg && <p className="error">{msg}</p>}
                <button disabled={busy}>{busy ? "Signing in..." : "Login"}</button>
                <p className="muted">No account? <Link to="/signup">Sign up</Link></p>
            </form>
        </div>
    );
}
