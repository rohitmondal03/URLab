import dynamic from "next/dynamic";
import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";

const ProductPreviewSection = dynamic(() => import("@/components/landing/product-preview-section")
  .then(mod => mod.ProductPreviewSection));
const FeaturesSection = dynamic(() => import("@/components/landing/features-section")
  .then(mod => mod.FeaturesSection));
const Footer = dynamic(() => import("@/components/landing/footer")
  .then(mod => mod.Footer));

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background selection:bg-primary/10">
      {/* Navbar */}
      <Navbar />

      <main className="flex-1 w-full max-w-6xl px-6 md:px-12 flex flex-col items-center">
        {/* Hero Section */}
        <HeroSection />

        {/* Product Preview Section */}
        <ProductPreviewSection />

        {/* Features Section */}
        <FeaturesSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
