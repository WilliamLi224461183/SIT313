import ArticleCard from './ArticleCard';

export default function TutorialsSection({ items }) {
    return (
        <section className="section container">
            <h2>Tutorials</h2>
            <div className="grid">
                {items.map(it => (
                    <ArticleCard key={it.id} item={it} metaLine={it.length} />
                ))}
            </div>
        </section>
    );
}
