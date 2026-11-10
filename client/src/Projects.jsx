import { Link } from "react-router-dom";
import { LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function Projects() {
  useDocumentTitle("Projects | Jeff Ripke");
  const state = useFetch("/api/projects");
  useFocusHeading(state.status !== "loading");

  if (state.status === "loading") {
    return <Loading label="Loading projects." />;
  }
  if (state.status === "error") {
    return <LoadError message={state.error} />;
  }

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p className="lede prose">
          Software I am building, including Ripke Media. Each card opens a short
          explanation of what the project does.
        </p>
      </header>
      <div className="card-list section">
        {state.data.projects.map((project) => (
          <article className="card" key={project.slug}>
            <p className="status">{project.status}</p>
            <h2>
              <Link to={`/projects/${project.slug}`}>{project.title}</Link>
            </h2>
            <p>{project.summary}</p>
            <ul className="stack-list" aria-label={`${project.title} technologies`}>
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </>
  );
}
