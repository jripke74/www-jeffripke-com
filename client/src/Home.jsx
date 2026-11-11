import { Link } from "react-router-dom";
import { ProjectIndex } from "./Projects.jsx";
import { ExternalLink, LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function Home() {
  useDocumentTitle("Jeff Ripke");
  const profileState = useFetch("/api/profile");
  const projectState = useFetch("/api/projects");
  const loading = profileState.status === "loading" || projectState.status === "loading";
  useFocusHeading(!loading);

  if (loading) {
    return <Loading label="Loading introduction." />;
  }
  if (profileState.status === "error") {
    return <LoadError message={profileState.error} />;
  }
  if (projectState.status === "error") {
    return <LoadError message={projectState.error} />;
  }

  const { profile, credentials } = profileState.data;

  return (
    <>
      <section className="hero hero-layout">
        <img
          className="portrait"
          src="/jeff-ripke.jpg"
          width="512"
          height="551"
          alt="Portrait of Jeff Ripke"
        />
        <div className="hero-copy">
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.fullName}</h1>
          <p className="lede">{profile.headline}</p>
          <p className="prose">{profile.summary}</p>
          <div className="button-row">
            <Link className="button primary" to="/projects">
              Projects
            </Link>
            <ExternalLink className="button secondary" href={profile.mediaUrl}>
              Ripke Media
            </ExternalLink>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="training-heading">
        <h2 id="training-heading">Training</h2>
        <div className="card-list">
          {credentials.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="meta">
                {item.provider}
                {item.dates ? ` · ${item.dates}` : ""}
              </p>
              {item.detail ? <p>{item.detail}</p> : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <ProjectIndex projects={projectState.data.projects} titleLevel="h3" />
      </section>
    </>
  );
}
