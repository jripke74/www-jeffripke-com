import { Link } from "react-router-dom";
import { ExternalLink, LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function Home() {
  useDocumentTitle("Jeff Ripke");
  const state = useFetch("/api/profile");
  useFocusHeading(state.status !== "loading");

  if (state.status === "loading") {
    return <Loading label="Loading introduction." />;
  }
  if (state.status === "error") {
    return <LoadError message={state.error} />;
  }

  const { profile, interests, credentials } = state.data;

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

      <section className="section" aria-labelledby="interests-heading">
        <h2 id="interests-heading">Other interests</h2>
        <div className="card-list two">
          {interests.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
