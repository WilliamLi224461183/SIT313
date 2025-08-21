import TagInput from "./TagInput.jsx";

export default function QuestionForm({ value, onChange }) {
    const set = (patch) => onChange({ ...value, ...patch });

    return (
        <div className="form">
            <label className="label">Title</label>
            <input
                className="input"
                placeholder="Briefly describe your problem"
                value={value.title}
                onChange={(e) => set({ title: e.target.value })}
                required
            />

            <label className="label">Details</label>
            <textarea
                className="textarea"
                placeholder="Explain what you tried and what you expected"
                value={value.body}
                onChange={(e) => set({ body: e.target.value })}
                required
            />

            <TagInput value={value.tags} onChange={(tags) => set({ tags })} />
        </div>
    );
}
