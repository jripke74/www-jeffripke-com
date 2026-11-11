import { Link } from "react-router-dom";
import pageMeta from "./page-meta.json";
import { useDocumentTitle, useFocusHeading } from "./ui.jsx";

export default function MapYourTravelsPrivacy() {
  useDocumentTitle(
    pageMeta["/map-your-travels/privacy"].title,
    pageMeta["/map-your-travels/privacy"].description
  );
  useFocusHeading(true);

  return (
    <article className="prose">
      <p className="eyebrow">Map Your Travels</p>
      <h1>Privacy policy</h1>
      <p>Last updated November 10, 2026.</p>
      <p>
        Map Your Travels records precise location while a trip is running, including
        after the phone is locked, so it can save the route, distance, time, and
        turns. The route stays on the phone.
      </p>
      <p>
        You type the email address. You tap Send in Mail. The Mail app on your phone
        sends the trip to the address you entered. Jeff Ripke does not receive your
        trips.
      </p>
      <p>
        The app has no account. It does not upload your route to jeffripke.com or
        ripkemedia.com. To name a street, the phone may send that turn’s coordinates
        to Apple’s map service. Apple’s handling of that lookup is covered by
        Apple’s privacy policy.
      </p>
      <p>
        Questions about this policy can be sent from the{" "}
        <Link to="/contact">contact page</Link>.
      </p>
    </article>
  );
}
