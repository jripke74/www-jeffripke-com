import { useState } from "react";
import { useDocumentTitle, useFocusHeading } from "./ui.jsx";

const TOPICS = [
  { value: "general", label: "General" },
  { value: "media", label: "Ripke Media" },
  { value: "other", label: "Something else" },
];

export default function Contact() {
  useDocumentTitle("Contact | Jeff Ripke");
  useFocusHeading(true);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [field, setField] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    setError("");
    setField("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) {
        setStatus("idle");
        setError(body.error || "The note could not be sent.");
        setField(body.field || "");
        return;
      }
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("The note could not be sent. Check the connection and try again.");
    }
  }

  return (
    <>
      <header className="hero">
        <p className="eyebrow">Spokane, Washington</p>
        <h1>Contact</h1>
        <p className="lede prose">
          Send a note about a project or Ripke Media. It is emailed to me
          and saved here. This form is not support for an iOS app.
        </p>
      </header>

      {status === "sent" ? (
        <p className="banner" role="status">
          Thanks. Your note was sent.
        </p>
      ) : null}

      <form className="form section" onSubmit={onSubmit} noValidate>
        <div className="honeypot" aria-hidden="true">
          <label htmlFor="companyWebsite">Company website</label>
          <input id="companyWebsite" name="companyWebsite" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={80}
            aria-invalid={field === "name"}
            aria-describedby={field === "name" ? "form-error" : undefined}
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            aria-invalid={field === "email"}
            aria-describedby={field === "email" ? "form-error" : undefined}
          />
        </div>

        <div className="field">
          <label htmlFor="topic">Topic</label>
          <select id="topic" name="topic" defaultValue="general">
            {TOPICS.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="body">Note</label>
          <textarea
            id="body"
            name="body"
            required
            minLength={10}
            maxLength={2000}
            aria-invalid={field === "body"}
            aria-describedby={field === "body" ? "form-error" : undefined}
          />
        </div>

        {error ? (
          <p id="form-error" className="error" role="alert">
            {error}
          </p>
        ) : null}

        <button className="button primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send note"}
        </button>
      </form>
    </>
  );
}
