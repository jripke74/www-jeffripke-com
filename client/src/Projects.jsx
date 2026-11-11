import { Link } from "react-router-dom";
import pageMeta from "./page-meta.json";
import { LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export function ProjectIndex({ projects, titleLevel = "h2" }) {
  const Title = titleLevel;
  return (
    <ul className="work-list">
      {projects.map((project) => (
        <li key={project.slug}>
          <article className={project.coverPhone ? "work-row work-row-phone" : "work-row"}>
            <div className="work-copy">
              <p className="work-status">{project.status}</p>
              <Title>
                <Link className="work-link" to={`/projects/${project.slug}`}>
                  {project.title}
                  <span className="visually-hidden">. View project</span>
                </Link>
              </Title>
              <p>{project.summary}</p>
              <ul className="stack-list" aria-label={`${project.title} technologies`}>
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            {project.cover ? (
              <div className={project.coverPhone ? "work-shot work-shot-phone" : "work-shot"}>
                <img src={project.cover} alt="" />
              </div>
            ) : null}
          </article>
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  useDocumentTitle(pageMeta["/projects"].title, pageMeta["/projects"].description);
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
        <p className="lede prose">Software I am building.</p>
      </header>
      <ProjectIndex projects={state.data.projects} />
    </>
  );
}
