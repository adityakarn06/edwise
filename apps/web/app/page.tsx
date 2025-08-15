"use client"

import React from 'react';
import NavComponent from '@/components/landing/NavComponent';
import HeroSection from '@/components/landing/HeroSection';
import HeroImage from '@/components/landing/HeroImage';
import FeatureComponent from '@/components/landing/FeatureComponent';
import BenefitComponent from '@/components/landing/Benefit';
import CTA from '@/components/landing/CTA';
import Footer from '@/components/landing/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <NavComponent />
      <HeroSection />
      <HeroImage />
      <FeatureComponent />
      <BenefitComponent />
      <CTA />
      <Footer />
    </div>
  );
}