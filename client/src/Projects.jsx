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
          Open a project for the description and screenshots.
        </p>
      </header>
      <ul className="project-index">
        {state.data.projects.map((project, index) => (
          <li key={project.slug}>
            <article className={index === 0 ? "project-card project-card-feature" : "project-card"}>
              {project.cover ? (
                <img className="project-cover" src={project.cover} alt="" />
              ) : (
                <div className="project-cover project-cover-plain" aria-hidden="true">
                  <span>Portfolio</span>
                </div>
              )}
              <div className="project-copy">
                <p className="project-kicker">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <span className="status">{project.status}</span>
                </p>
                <h2>
                  <Link className="project-link" to={`/projects/${project.slug}`}>
                    {project.title}
                    <span className="visually-hidden">. View project</span>
                  </Link>
                </h2>
                <p>{project.summary}</p>
                <ul className="stack-list" aria-label={`${project.title} technologies`}>
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="project-more" aria-hidden="true">
                  View project
                </p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
