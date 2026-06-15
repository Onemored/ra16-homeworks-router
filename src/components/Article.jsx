export default function Article({ title, children }) {
  return (
    <article className="article">
      <h1 className="article__title">{title}</h1>
      <div className="article__content">{children}</div>
    </article>
  );
}
