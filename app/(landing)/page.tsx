import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { ProductPreviewSection } from "@/components/landing/product-preview-section";
import { Footer } from "@/components/landing/footer";
import { FeaturesSection } from "@/components/landing/features-section";

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
