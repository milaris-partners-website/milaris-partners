"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AISection from "@/components/AISection";
import InterventionSection from "@/components/InterventionSection";
import EuropePresence from "@/components/EuropePresence";
import Expertise from "@/components/Expertise";
import Testimonial from "@/components/Testimonial";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "@/hooks/useTranslation";
import Transactions from "@/components/Transactions";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const { language } = useTranslation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Démarrer le fondu du contenu dès que le loader commence à disparaître (6200ms),
    // ou immédiatement si l'animation d'ouverture a déjà été vue
    const delai = document.documentElement.dataset.intro === 'joue' ? 6200 : 0;
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delai);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.main 
        className="min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ 
          duration: 1, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.2
        }}
      >
        <SEOHead 
          pageName="home" 
          language={language} 
        />
        <Navbar />
        <Hero />
        <About />
        <Transactions />
        <AISection />
        <InterventionSection />
        <EuropePresence />
        <Expertise />
        <Testimonial />
        <section style={{ backgroundColor: '#f8f8f8' }}>
          <Footer variant="dark" />
        </section>
      </motion.main>
    </>
  );
}
