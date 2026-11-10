import { LoadError, Loading, useDocumentTitle, useFetch, useFocusHeading } from "./ui.jsx";

export default function Work() {
  useDocumentTitle("Work | Jeff Ripke");
  const state = useFetch("/api/experience");
  useFocusHeading(state.status !== "loading");

  if (state.status === "loading") {
    return <Loading label="Loading work history." />;
  }
  if (state.status === "error") {
    return <LoadError message={state.error} />;
  }

  const { experiences, credentials } = state.data;

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Work and training</p>
        <h1>What I do</h1>
        <p className="lede prose">
          I build web applications and iOS apps, and this site is where I keep
          that work.
        </p>
      </header>

      <section className="section" aria-labelledby="career-heading">
        <h2 id="career-heading">Career</h2>
        {experiences.map((job) => (
          <article className="job" key={`${job.role}-${job.dates}`}>
            <div className="job-head">
              <div>
                <h3>{job.role}</h3>
                <p className="meta">
                  {job.organization}
                  {job.location ? ` · ${job.location}` : ""}
                </p>
              </div>
              <p className="meta">{job.dates}</p>
            </div>
            <ul>
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
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
    </>
  );
}
