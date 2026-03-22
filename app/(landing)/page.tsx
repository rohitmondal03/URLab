import dynamic from "next/dynamic";
import { HeroSection } from "@/components/landing/hero-section";

const ProductPreviewSection = dynamic(() => import("@/components/landing/product-preview-section")
  .then(mod => mod.ProductPreviewSection));
const FeaturesSection = dynamic(() => import("@/components/landing/features-section")
  .then(mod => mod.FeaturesSection));

export default function LandingPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Product Preview Section */}
      <ProductPreviewSection />

      {/* Features Section */}
      <FeaturesSection />
    </>
  );
}
