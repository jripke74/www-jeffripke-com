import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useDocumentTitle(title, description) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("robots", title.startsWith("Page not found") ? "noindex" : "");
  }, [title, description]);
}

function setMeta(name, content) {
  const current = document.querySelector(`meta[name="${name}"]`);
  if (!content) {
    current?.remove();
    return;
  }
  if (current) {
    current.setAttribute("content", content);
    return;
  }
  const created = document.createElement("meta");
  created.name = name;
  created.content = content;
  document.head.appendChild(created);
}

let passedInitialLoad = false;

export function useFocusHeading(ready) {
  const location = useLocation();

  useEffect(() => {
    if (!ready) {
      return;
    }
    if (!passedInitialLoad) {
      passedInitialLoad = true;
      return;
    }
    const heading = document.querySelector("#main h1");
    if (!heading) {
      return;
    }
    heading.tabIndex = -1;
    heading.focus();
  }, [ready, location.pathname]);
}

export function useFetch(path) {
  const [state, setState] = useState({ status: "loading", data: null, error: "" });

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: "loading", data: null, error: "" });

    fetch(path, { signal: controller.signal, headers: { Accept: "application/json" } })
      .then(async (response) => {
        const body = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(body.error || "The server could not load this page.");
        }
        return body;
      })
      .then((data) => setState({ status: "ready", data, error: "" }))
      .catch((error) => {
        if (error.name === "AbortError") {
          return;
        }
        setState({
          status: "error",
          data: null,
          error: error.message || "The server could not load this page.",
        });
      });

    return () => controller.abort();
  }, [path]);

  return state;
}

export function Loading({ label }) {
  return (
    <p role="status" className="notice">
      {label}
    </p>
  );
}

export function LoadError({ message }) {
  return (
    <p role="alert" className="notice error">
      {message}
    </p>
  );
}

export function ExternalLink({ href, className, children }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}
