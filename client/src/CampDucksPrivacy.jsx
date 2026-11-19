import { Link } from "react-router-dom";
import pageMeta from "./page-meta.json";
import { useDocumentTitle, useFocusHeading } from "./ui.jsx";

export default function CampDucksPrivacy() {
  useDocumentTitle(
    pageMeta["/camp-ducks/privacy"].title,
    pageMeta["/camp-ducks/privacy"].description
  );
  useFocusHeading(true);

  return (
    <article className="prose">
      <p className="eyebrow">Camp Ducks</p>
      <h1>Privacy policy</h1>
      <p>Last updated November 19, 2026.</p>
      <p>
        Camp Ducks does not collect, store, or share personal information. The app
        does not require an account, and it does not use analytics, advertising, or
        tracking.
      </p>
      <p>
        Stickers stay on the phone. A sticker is sent only when you choose to send
        one in Messages.
      </p>
      <p>
        Questions about this policy can be sent from the{" "}
        <Link to="/contact">contact page</Link>.
      </p>
    </article>
  );
}
