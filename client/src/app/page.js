import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import CvSection from "./components/CvSection";
import ProjectSection from "./components/ProjectSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Header />
      <AboutSection />
      <CvSection />
      <ProjectSection />
      <ContactSection />
    </>
  );
}
