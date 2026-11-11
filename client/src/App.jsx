import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Projects from "./Projects.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import Contact from "./Contact.jsx";
import MapYourTravelsPrivacy from "./MapYourTravelsPrivacy.jsx";
import { useDocumentTitle, useFocusHeading } from "./ui.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/map-your-travels/privacy" element={<MapYourTravelsPrivacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Layout>
  );
}

function Missing() {
  useDocumentTitle("Page not found | Jeff Ripke", "That address is not part of this site.");
  useFocusHeading(true);
  return (
    <>
      <h1>Page not found</h1>
      <p>That address is not part of this site.</p>
    </>
  );
}
