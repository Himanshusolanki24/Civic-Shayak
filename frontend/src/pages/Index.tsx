import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSection from '@/components/ProblemSection';
import WhyDifferentSection from '@/components/WhyDifferentSection';
import HowItHelpsSection from '@/components/HowItHelpsSection';
import Footer from '@/components/Footer';
import ChatWidget from '@/components/ChatWidget';
import { useLanguage } from '@/contexts/LanguageContext';

const Index = () => {
  const { language } = useLanguage();

  return (
    <>
      <Helmet>
        <title>Civic Sahayak - Making Government Accessible | सरकारी सेवाएं सुलभ</title>
        <meta 
          name="description" 
          content="Civic Sahayak simplifies government schemes, notices, and eligibility into clear, human language. Find schemes you qualify for in Hindi and English." 
        />
        <meta name="keywords" content="government schemes, sarkari yojana, eligibility checker, PM schemes, Indian government services" />
        <link rel="canonical" href="https://civicsahayak.in" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        
        <main>
          <HeroSection />
          <ProblemSection />
          <WhyDifferentSection />
          <HowItHelpsSection />
        </main>

        <Footer />
        <ChatWidget />
      </div>
    </>
  );
};

export default Index;
