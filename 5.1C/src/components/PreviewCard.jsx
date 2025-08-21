export default function PreviewCard({ postType, question, article }) {
    const data = postType === "question" ? question : article;

    return (
        <div className="preview">
            <h3>{postType === "question" ? "Question Preview" : "Article Preview"}</h3>
            <h4>{data.title || "(No title yet)"}</h4>
            {postType === "article" && data.summary ? (
                <p className="muted">{data.summary}</p>
            ) : null}
            <p className="pre">{data.body || "(Start typing content...)"}</p>

            {data.tags?.length > 0 && (
                <>
                    <h5>Tags</h5>
                    <div className="tags">
                        {data.tags.map((t) => (
                            <span key={t} className="tag">#{t}</span>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
