import { useState } from "react";

export default function TagInput({ value = [], onChange }) {
    const [input, setInput] = useState("");

    const add = () => {
        const t = input.trim();
        if (!t) return;
        if (!value.includes(t)) onChange([...value, t]);
        setInput("");
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            add();
        }
    };

    const remove = (t) => onChange(value.filter((x) => x !== t));

    return (
        <>
            <label className="label">
                Tags <span className="muted">(press Enter to add)</span>
            </label>
            <input
                className="input"
                placeholder="e.g., react, hooks"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
            />
            <div className="chips">
                {value.map((t) => (
                    <span key={t} className="chip">
                        #{t}
                        <button className="chip-x" onClick={() => remove(t)} aria-label={`remove ${t}`}>
                            ×
                        </button>
                    </span>
                ))}
            </div>
        </>
    );
}
