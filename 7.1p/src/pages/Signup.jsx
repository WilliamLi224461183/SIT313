import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { registerUser } from "../services/auth";

export default function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [msg, setMsg] = useState(null);
    const [busy, setBusy] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setMsg(null);
        if (password.length < 6) return setMsg("Password must be at least 6 characters.");
        if (password !== confirm) return setMsg("Passwords do not match.");
        setBusy(true);
        try {
            await registerUser(db, { firstName, lastName, email, password });
            navigate("/login");
        } catch (err) {
            setMsg(err.message || "Sign-up failed");
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="container">
            <form className="card" onSubmit={handleSubmit}>
                <h1>Create account</h1>

                <label>First name</label>
                <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} />

                <label>Last name</label>
                <input required value={lastName} onChange={(e) => setLastName(e.target.value)} />

                <label>Email</label>
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Password</label>
                <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />

                <label>Confirm password</label>
                <input type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} />

                {msg && <p className="error">{msg}</p>}
                <button disabled={busy}>{busy ? "Creating..." : "Sign up"}</button>
                <p className="muted">Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    );
}
