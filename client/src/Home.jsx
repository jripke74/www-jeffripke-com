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

  const { profile, interests } = state.data;

  return (
    <>
      <section className="hero">
        <p className="eyebrow">{profile.location}</p>
        <h1>{profile.fullName}</h1>
        <p className="lede">{profile.headline}</p>
        <p className="prose">{profile.summary}</p>
        <div className="button-row">
          <Link className="button primary" to="/work">
            Work history
          </Link>
          <Link className="button secondary" to="/projects">
            Projects
          </Link>
          <ExternalLink className="button secondary" href={profile.mediaUrl}>
            Ripke Media
          </ExternalLink>
        </div>
      </section>

      <section className="section" aria-labelledby="interests-heading">
        <h2 id="interests-heading">Away from the job</h2>
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
