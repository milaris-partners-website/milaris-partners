"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAssetPath } from "@/utils/getAssetPath";
import { useTranslation } from "@/hooks/useTranslation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExpertisesOpen, setIsExpertisesOpen] = useState(false);
  const [hideNavbarLogo, setHideNavbarLogo] = useState(true);
  const [pathname, setPathname] = useState('/');
  const { t, language, setLanguage } = useTranslation();
  
  // Détecter si on est sur la page d'accueil
  const isHomePage = pathname === '/';

  useEffect(() => {
    setPathname(window.location.pathname);
  }, []);

  const calendlyLink = language === 'IT' 
    ? 'https://calendly.com/matteo-milarispartners'
    : 'https://calendly.com/paul-milarispartners/30min';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Vérifier si le loader est actif
    const checkLoader = () => {
      if (typeof window !== 'undefined') {
        setHideNavbarLogo(document.documentElement.dataset.intro === 'joue');
      }
    };

    // Vérifier au montage
    checkLoader();

    // Écouter l'événement pour afficher le logo de la navbar
    const handleShowNavbarLogo = () => {
      setHideNavbarLogo(false);
    };

    window.addEventListener('showNavbarLogo', handleShowNavbarLogo);

    return () => {
      window.removeEventListener('showNavbarLogo', handleShowNavbarLogo);
    };
  }, []);

  const expertises = [
    { label: t("navbar.businessSale"), href: "/cession-entreprise" },
    { label: t("navbar.businessAcquisition"), href: "/acquisition-entreprise" },
    { label: t("navbar.financing"), href: "/financement" },
  ];

  const languages = ["FR", "EN", "IT", "DE"] as const;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Navbar normale (non scrollée) */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full top-4 z-50 transition-all duration-300 ${
          isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="w-full px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo agrandi et positionné à gauche */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: hideNavbarLogo ? 0 : 1, x: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="ml-12"
              style={{ pointerEvents: hideNavbarLogo ? 'none' : 'auto' }}
            >
              <Link href="/" className="flex items-center">
                <Image 
                  src={getAssetPath(isHomePage ? "/logo-white.png" : "/logo-dark.png")}
                  alt="Milaris Partners"
                  width={180}
                  height={36}
                  className="h-9 w-auto overflow-visible rounded-none"
                  style={{ objectFit: 'contain', borderRadius: 0 }}
                  priority
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <motion.div 
              className="hidden lg:flex items-center space-x-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href="/"
                className={`transition-all duration-300 font-medium text-base ${
                  isHomePage 
                    ? "text-white hover:text-white/80 drop-shadow-lg" 
                    : "text-gray-700 hover:text-[#0001ff]"
                }`}
              >
                {t("navbar.about")}
              </Link>
              
              {/* Expertises Dropdown */}
              <div className="relative group">
                <button 
                  className={`flex items-center space-x-1 transition-all duration-300 font-medium text-base ${
                    isHomePage 
                      ? "text-white hover:text-white/80 drop-shadow-lg" 
                      : "text-gray-700 hover:text-[#0001ff]"
                  }`}
                  onMouseEnter={() => setIsExpertisesOpen(true)}
                  onMouseLeave={() => setIsExpertisesOpen(false)}
                >
                  <span>{t("navbar.expertises")}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpertisesOpen ? 'rotate-180' : ''}`} />
                </button>
                <div 
                  className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-soft border border-gray-100 transition-all duration-300 ${
                    isExpertisesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                  }`}
                  onMouseEnter={() => setIsExpertisesOpen(true)}
                  onMouseLeave={() => setIsExpertisesOpen(false)}
                >
                  {expertises.map((expertise) => (
                    <Link
                      key={expertise.href}
                      href={expertise.href}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                    >
                      {expertise.label}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                href="/equipe"
                className={`transition-all duration-300 font-medium text-base ${
                  isHomePage 
                    ? "text-white hover:text-white/80 drop-shadow-lg" 
                    : "text-gray-700 hover:text-[#0001ff]"
                }`}
              >
                {t("navbar.team")}
              </Link>
              
              <Link
                href="/transactions"
                className={`transition-all duration-300 font-medium text-base ${
                  isHomePage 
                    ? "text-white hover:text-white/80 drop-shadow-lg" 
                    : "text-gray-700 hover:text-[#0001ff]"
                }`}
              >
                {t("navbar.transactions")}
              </Link>
              
              <Link
                href="/carrieres"
                className={`transition-all duration-300 font-medium text-base ${
                  isHomePage 
                    ? "text-white hover:text-white/80 drop-shadow-lg" 
                    : "text-gray-700 hover:text-[#0001ff]"
                }`}
              >
                {t("navbar.career")}
              </Link>
              
              {/* Language Selector */}
              <div className="relative group">
                <button className={`flex items-center space-x-1 transition-all duration-300 font-medium text-base ${
                  isHomePage 
                    ? "text-white hover:text-white/80 drop-shadow-lg" 
                    : "text-gray-700 hover:text-[#0001ff]"
                }`}>
                  <span>{language}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                <div className="absolute right-0 mt-2 w-16 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`block w-full px-3 py-2 text-left hover:bg-[#0001ff]/10 transition-colors duration-300 text-sm ${
                        lang === language ? "text-[#0001ff] font-semibold" : "text-gray-700"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <a
                href={calendlyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0001ff] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#0b062b] transition-all duration-300 mr-12 shadow-xl"
              >
                {t("navbar.contact")}
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                isHomePage ? "hover:bg-white/20" : "hover:bg-gray-100"
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isHomePage ? "text-white" : "text-gray-700"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isHomePage ? "text-white" : "text-gray-700"}`} />
              )}
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white rounded-lg shadow-soft mt-2 py-4 border border-gray-100"
            >
              <Link
                href="/"
                className="block px-6 py-3 text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.about")}
              </Link>
              
              {/* Mobile Expertises */}
              <div className="px-6 py-3">
                <p className="text-base font-medium text-gray-700 mb-2">{t("navbar.expertises")}</p>
                {expertises.map((expertise) => (
                  <Link
                    key={expertise.label}
                    href={expertise.href}
                    className="block pl-4 py-2 text-gray-600 hover:text-[#0001ff] transition-colors duration-300 text-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {expertise.label}
                  </Link>
                ))}
              </div>
              
              <Link
                href="/equipe"
                className="block px-6 py-3 text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.team")}
              </Link>
              
              <Link
                href="/transactions"
                className="block px-6 py-3 text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.transactions")}
              </Link>
              
              <Link
                href="/carrieres"
                className="block px-6 py-3 text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navbar.career")}
              </Link>
              
              <div className="px-6 py-3 border-t border-gray-100 mt-2">
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                        lang === language
                          ? "bg-[#0001ff] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="px-6 pt-3">
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-[#0001ff] text-white px-6 py-2.5 rounded-lg text-base font-medium hover:bg-[#0b062b] transition-all duration-300"
                >
                  {t("navbar.contact")}
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Navbar en forme de pilule quand on scroll */}
      <AnimatePresence>
        {isScrolled && (
          <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-md rounded-full px-6 py-2.5 shadow-lg border border-gray-100 flex items-center justify-between max-w-4xl w-full hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              {/* Logo cliquable pour retourner en haut */}
              <button
                onClick={scrollToTop}
                className="flex items-center hover:opacity-80 transition-all duration-300 ml-4"
                style={{ 
                  opacity: hideNavbarLogo ? 0 : 1, 
                  pointerEvents: hideNavbarLogo ? 'none' : 'auto',
                  transition: 'opacity 0.3s cubic-bezier(0.22, 1, 0.36, 1)'
                }}
              >
                <Image 
                  src={getAssetPath("/logo-dark.png")}
                  alt="Milaris Partners"
                  width={150}
                  height={30}
                  className="h-7 w-auto"
                  style={{ objectFit: 'contain' }}
                />
              </button>

              {/* Menu items */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300"
                >
                  {t("navbar.about")}
                </Link>
                
                {/* Expertises Dropdown */}
                <div className="relative group">
                  <button 
                    className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300"
                    onMouseEnter={() => setIsExpertisesOpen(true)}
                    onMouseLeave={() => setIsExpertisesOpen(false)}
                  >
                    <span>{t("navbar.expertises")}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isExpertisesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div 
                    className={`absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300 ${
                      isExpertisesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
                    onMouseEnter={() => setIsExpertisesOpen(true)}
                    onMouseLeave={() => setIsExpertisesOpen(false)}
                  >
                    {expertises.map((expertise) => (
                      <Link
                        key={expertise.label}
                        href={expertise.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {expertise.label}
                      </Link>
                    ))}
                  </div>
                </div>
                
                <Link
                  href="/equipe"
                  className="text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300"
                >
                  {t("navbar.team")}
                </Link>
                
                <Link
                  href="/transactions"
                  className="text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300"
                >
                  {t("navbar.transactions")}
                </Link>
                
                <Link
                  href="/carrieres"
                  className="text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300"
                >
                  {t("navbar.career")}
                </Link>
                
                {/* Language Selector */}
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-[#0001ff] transition-colors duration-300">
                    <span>{language}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  <div className="absolute right-0 mt-2 w-16 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 overflow-hidden">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`block w-full px-3 py-2 text-left hover:bg-[#0001ff]/10 transition-colors duration-300 text-sm ${
                          lang === language ? "text-[#0001ff] font-semibold" : "text-gray-700"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={calendlyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#0001ff] text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#0b062b] transition-all duration-300"
                >
                  {t("navbar.contact")}
                </a>
              </div>

              {/* Mobile menu button pour la navbar scrollée */}
              <button
                className="md:hidden p-1 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-4 h-4 text-gray-700" />
                ) : (
                  <Menu className="w-4 h-4 text-gray-700" />
                )}
              </button>
            </motion.div>

            {/* Mobile menu pour la navbar scrollée */}
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 py-4"
              >
                <Link
                  href="/"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.about")}
                </Link>
                
                <div className="px-4 py-2">
                  <p className="text-base font-medium text-gray-700 mb-1">{t("navbar.expertises")}</p>
                  {expertises.map((expertise) => (
                    <Link
                      key={expertise.label}
                      href={expertise.href}
                      className="block pl-3 py-1 text-sm text-gray-600 hover:text-[#0001ff] transition-colors duration-300"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {expertise.label}
                    </Link>
                  ))}
                </div>
                
                <Link
                  href="/equipe"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.team")}
                </Link>
                
                <Link
                  href="/transactions"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.transactions")}
                </Link>
                
                <Link
                  href="/carrieres"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#0001ff]/10 hover:text-[#0001ff] transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("navbar.career")}
                </Link>
                
                <div className="px-4 py-2 border-t border-gray-100 mt-2">
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setLanguage(lang)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all duration-300 ${
                          lang === language
                            ? "bg-[#0001ff] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="px-4 pt-2">
                  <a
                    href={calendlyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-[#0001ff] text-white px-4 py-2 rounded-lg text-base font-medium hover:bg-[#0b062b] transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("navbar.contact")}
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar; 