export default function ArticleCard({ item, metaLine }) {
    return (
        <div className="card">
            <img src={item.image} alt={item.title} />
            <div className="content">
                <h3 className="title">{item.title}</h3>
                {metaLine && <div className="meta">{metaLine}</div>}
            </div>
        </div>
    );
}
