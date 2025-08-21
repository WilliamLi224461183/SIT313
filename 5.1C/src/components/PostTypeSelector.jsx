export default function PostTypeSelector({ value, onChange }) {
    return (
        <div className="row">
            <label>
                <input
                    type="radio"
                    name="ptype"
                    checked={value === "question"}
                    onChange={() => onChange("question")}
                />{" "}
                Question
            </label>
            <label>
                <input
                    type="radio"
                    name="ptype"
                    checked={value === "article"}
                    onChange={() => onChange("article")}
                />{" "}
                Article
            </label>
        </div>
    );
}
