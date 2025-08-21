import TagInput from "./TagInput.jsx";

export default function ArticleForm({ value, onChange }) {
    const set = (patch) => onChange({ ...value, ...patch });

    return (
        <div className="form">
            <label className="label">Title</label>
            <input
                className="input"
                placeholder="Your article title"
                value={value.title}
                onChange={(e) => set({ title: e.target.value })}
                required
            />

            <label className="label">Summary</label>
            <input
                className="input"
                placeholder="One-line summary (optional)"
                value={value.summary}
                onChange={(e) => set({ summary: e.target.value })}
            />

            <label className="label">Content</label>
            <textarea
                className="textarea"
                placeholder="Write your article here..."
                value={value.body}
                onChange={(e) => set({ body: e.target.value })}
                required
            />

            <TagInput value={value.tags} onChange={(tags) => set({ tags })} />
        </div>
    );
}
