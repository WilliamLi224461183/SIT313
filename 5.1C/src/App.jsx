import { useState, useMemo } from "react";
import "./App.css";
import PostTypeSelector from "./components/PostTypeSelector.jsx";
import QuestionForm from "./components/QuestionForm.jsx";
import ArticleForm from "./components/ArticleForm.jsx";
import PreviewCard from "./components/PreviewCard.jsx";

export default function App() {
  const [postType, setPostType] = useState("question");
  const [question, setQuestion] = useState({ title: "", body: "", tags: [] });
  const [article, setArticle] = useState({ title: "", summary: "", body: "", tags: [] });

  const canPost = useMemo(() => {
    if (postType === "question") return question.title.trim() && question.body.trim();
    return article.title.trim() && article.body.trim();
  }, [postType, question, article]);

  const handlePost = () => {
    const payload = postType === "question" ? { type: postType, ...question } : { type: postType, ...article };
    alert("POST (mock):\n\n" + JSON.stringify(payload, null, 2));
  };

  return (
    <div className="container">
      <h2>New Post</h2>
      <p className="sub">Create a Question or an Article</p>

      <section className="card">
        <h4>Post Type</h4>
        <PostTypeSelector value={postType} onChange={setPostType} />
      </section>

      <section className="card">
        {postType === "question" ? (
          <QuestionForm value={question} onChange={setQuestion} />
        ) : (
          <ArticleForm value={article} onChange={setArticle} />
        )}
      </section>

      <section>
        <h4>Preview</h4>
        <PreviewCard postType={postType} question={question} article={article} />
      </section>

      <button className="primary" disabled={!canPost} onClick={handlePost}>Post</button>
      {!canPost && <p className="hint">Fill the required fields (title & body) to enable posting.</p>}
    </div>
  );
}
