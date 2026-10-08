"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { getAssetPath } from "@/utils/getAssetPath";

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [stage, setStage] = useState<'logo-rising' | 'cities' | 'fade-out'>('logo-rising');
  const [currentCity, setCurrentCity] = useState(0);
  
  const cities = ['Paris', 'Milan', 'Berlin'];

  useEffect(() => {
    // Animation déjà vue lors d'une visite précédente : ne rien afficher
    if (document.documentElement.dataset.intro !== 'joue') {
      setVisible(false);
      window.dispatchEvent(new Event('showNavbarLogo'));
      return;
    }

    // Empêcher le scroll pendant le chargement
    document.body.style.overflow = 'hidden';


    // 1. Logo monte du bas vers le centre et grossit (0-2000ms) - écran blanc à partir de 1000ms
    const citiesTimer = setTimeout(() => {
      setStage('cities');
    }, 2000);

    // 2. Affichage des villes (2000-6500ms)
    // Paris: 2000-3200ms (1.2s)
    const parisTimer = setTimeout(() => {
      setCurrentCity(0);
    }, 2000);

    // Milan: 3200-4700ms (1.5s)
    const milanTimer = setTimeout(() => {
      setCurrentCity(1);
    }, 3200);

    // Berlin: 4700-6200ms (1.5s)
    const berlinTimer = setTimeout(() => {
      setCurrentCity(2);
    }, 4700);

    // 3. Démarrer le fondu progressif (6200ms)
    const fadeOutTimer = setTimeout(() => {
      setStage('fade-out');
    }, 6200);

    // 4. Afficher le logo de la navbar dès le début du fondu (6200ms)
    const showNavbarLogoTimer = setTimeout(() => {
      document.documentElement.dataset.intro = 'vue';
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('showNavbarLogo'));
      }
    }, 6200);

    // 5. Faire disparaître complètement le loader (7200ms)
    const hideTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = 'unset';
    }, 7200);

    return () => {
      clearTimeout(citiesTimer);
      clearTimeout(parisTimer);
      clearTimeout(milanTimer);
      clearTimeout(berlinTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(showNavbarLogoTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="intro-loader fixed inset-0 z-[9999] overflow-hidden bg-white"
        animate={{
          opacity: stage === 'fade-out' ? 0 : 1
        }}
        transition={{
          duration: 1,
          ease: [0.22, 1, 0.36, 1]
        }}
      >
        {/* Fond sombre initial - disparaît pendant logo-rising */}
        <motion.div
          className="absolute inset-0 bg-[#0b062b] z-10"
          initial={{ opacity: 1 }}
          animate={{
            opacity: stage === 'logo-rising' ? 0 : 0
          }}
          transition={{ 
            duration: 1,
            delay: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        {/* Fond blanc - apparaît à mi-chemin de la montée du logo, disparaît après Berlin */}
        <motion.div
          className="absolute inset-0 bg-white z-20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: stage === 'logo-rising' || stage === 'cities'
              ? 1
              : 0
          }}
          transition={{ 
            duration: stage === 'logo-rising'
              ? 1
              : stage === 'fade-out'
              ? 1
              : 0.5,
            delay: stage === 'logo-rising' ? 1 : 0,
            ease: [0.22, 1, 0.36, 1]
          }}
        />

        {/* Logo visible pendant tous les stages */}
        <motion.div
          className="absolute z-30"
          initial={{ 
            left: '50%',
            top: '200vh', // Starts from even further below
            x: '-50%',
            y: 0,
            scale: 0.3, // Starts much smaller
            opacity: 0
          }}
          animate={{
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
            scale: stage === 'logo-rising' || stage === 'cities' ? 2.5 : 1,
            opacity: stage === 'cities' || stage === 'fade-out' ? 0 : 1
          }}
          transition={{
            left: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            top: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            x: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            y: { duration: 2, ease: [0.22, 1, 0.36, 1] },
            scale: { 
              duration: stage === 'logo-rising' ? 2 : 0, 
              ease: [0.16, 1, 0.3, 1]
            },
            opacity: { 
              duration: stage === 'cities' ? 0.5 : 1, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          {/* Logo blanc sur fond sombre, blanc sur site */}
          <Image
            src={getAssetPath("/logo-white.png")}
            alt="Milaris Partners"
            width={220}
            height={44}
            className="h-11 w-auto"
            style={{ objectFit: 'contain' }}
            priority
          />
        </motion.div>

        {/* Affichage des villes */}
        <AnimatePresence>
          {stage === 'cities' && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="text-center">
                <AnimatePresence mode="wait">
                  {cities.map((city, index) => (
                    currentCity === index && (
                      <motion.h1
                        key={city}
                        initial={{ 
                          opacity: 0, 
                          y: 50,
                          scale: 0.85,
                          filter: 'blur(15px)'
                        }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          scale: 1,
                          filter: 'blur(0px)'
                        }}
                        exit={{ 
                          opacity: 0, 
                          y: -50,
                          scale: 0.85,
                          filter: 'blur(15px)'
                        }}
                        transition={{ 
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#0001ff] tracking-tight"
                      >
                        {city}
                      </motion.h1>
                    )
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default Loader; 