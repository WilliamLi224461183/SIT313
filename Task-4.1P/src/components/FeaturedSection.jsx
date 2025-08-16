import ArticleCard from './ArticleCard';

export default function FeaturedSection({ items }) {
    return (
        <section className="section container">
            <h2>Featured Articles</h2>
            <div className="grid">
                {items.map(it => (
                    <ArticleCard key={it.id} item={it} metaLine={`By ${it.author}`} />
                ))}
            </div>
        </section>
    );
}
