import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import Beyond from "@/components/Beyond";
import Footer from "@/components/Footer";
import { DEVICE_LAB_IDS } from "@/data/projects";
import { getMediaManifest } from "@/lib/media";

export default function Home() {
  // Resolved at build time: only media files that exist are ever referenced.
  const media = getMediaManifest(DEVICE_LAB_IDS);

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Projects media={media}/>
        <Testimonials/>
        <Experience/>
        <Contact/>
        <Skills/>
        <Beyond/>
      </main>
      <Footer/>
    </>
  );
}
