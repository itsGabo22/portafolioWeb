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
import { TESTIMONIALS } from "@/data/testimonials";
import { getMediaManifest, getTestimonialAvatars } from "@/lib/media";

export default function Home() {
  // Resolved at build time: only media files that exist are ever referenced.
  const media = getMediaManifest(DEVICE_LAB_IDS);
  const avatars = getTestimonialAvatars(TESTIMONIALS.map((t) => t.id));

  return (
    <>
      <Navbar/>
      <main>
        <Hero/>
        <About/>
        <Projects media={media}/>
        <Testimonials avatars={avatars}/>
        <Experience/>
        <Contact/>
        <Skills/>
        <Beyond/>
      </main>
      <Footer/>
    </>
  );
}
