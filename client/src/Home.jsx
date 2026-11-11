import { ProjectIndex } from "./Projects.jsx";
import pageMeta from "./page-meta.json";
import { ExternalLink, LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function Home() {
  useDocumentTitle(pageMeta["/"].title, pageMeta["/"].description);
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
        <div className="hero-intro">
          <img
            className="portrait"
            src="/jeff-ripke.jpg"
            width="509"
            height="640"
            alt="Portrait of Jeff Ripke"
          />
          <div className="hero-intro-copy">
            <p className="eyebrow">{profile.location}</p>
            <h1>{profile.fullName}</h1>
            <p className="lede">{profile.headline}</p>
          </div>
        </div>
        <p className="prose">{profile.summary}</p>
        <div className="button-row">
          <a className="button primary" href="#projects">
            Projects
          </a>
          <ExternalLink className="button secondary" href={profile.mediaUrl}>
            Ripke Media
          </ExternalLink>
        </div>
      </section>

      <section className="section home-section" id="projects" aria-labelledby="projects-heading">
        <h2 id="projects-heading">Projects</h2>
        <p className="section-note">Software I am building.</p>
        <ProjectIndex projects={projectState.data.projects} titleLevel="h3" />
      </section>

      <section className="section home-section" aria-labelledby="training-heading">
        <h2 id="training-heading">Training</h2>
        <ol className="credential-list">
          {credentials.map((item) => (
            <li key={item.title}>
              <p className="credential-when">{item.dates}</p>
              <div>
                <h3>{item.title}</h3>
                <p className="meta">{item.provider}</p>
                {item.detail ? <p>{item.detail}</p> : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
