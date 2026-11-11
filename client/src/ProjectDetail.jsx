import { Link, useParams } from "react-router-dom";
import { ExternalLink, LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function ProjectDetail() {
  const { slug } = useParams();
  const state = useFetch(`/api/projects/${slug}`);
  const title = state.status === "ready" ? `${state.data.project.title} | Jeff Ripke` : "Project | Jeff Ripke";
  const description =
    state.status === "ready" ? state.data.project.summary : "A software project by Jeff Ripke.";
  useDocumentTitle(title, description);
  useFocusHeading(state.status !== "loading");

  if (state.status === "loading") {
    return <Loading label="Loading project." />;
  }
  if (state.status === "error") {
    return (
      <>
        <h1>Project</h1>
        <LoadError message={state.error} />
        <p>
          <Link to="/projects">Back to projects</Link>
        </p>
      </>
    );
  }

  const project = state.data.project;
  const paragraphs = project.body.split("\n\n");

  return (
    <article>
      <p className="eyebrow">{project.status}</p>
      <h1>{project.title}</h1>
      <p className="lede">{project.summary}</p>
      <ul className="stack-list" aria-label="Technologies">
        {project.stack.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {project.images.length > 0 ? (
        <ul className="shot-list">
          {project.images.map((image) => (
            <li key={image.src} className={image.phone ? "shot-phone" : undefined}>
              <figure>
                <img src={image.src} alt={image.alt} width={image.width} height={image.height} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="prose">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      {project.slug === "map-your-travels" ? (
        <p>
          <Link to="/map-your-travels/privacy">Privacy policy</Link>
        </p>
      ) : null}
      <div className="button-row">
        {project.linkUrl && project.linkLabel ? (
          <ExternalLink className="button primary" href={project.linkUrl}>
            {project.linkLabel}
          </ExternalLink>
        ) : null}
        <Link className="button secondary" to="/projects">
          All projects
        </Link>
      </div>
    </article>
  );
}
