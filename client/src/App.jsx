import { Route, Routes } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Work from "./Work.jsx";
import Projects from "./Projects.jsx";
import ProjectDetail from "./ProjectDetail.jsx";
import Contact from "./Contact.jsx";
import { useDocumentTitle, useFocusHeading } from "./ui.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </Layout>
  );
}

function Missing() {
  useDocumentTitle("Page not found | Jeff Ripke");
  useFocusHeading(true);
  return (
    <>
      <h1>Page not found</h1>
      <p>That address is not part of this site.</p>
    </>
  );
}
