import { Navbar } from '@/components/landing/navbar';
import { Hero } from '@/components/landing/hero';
import { HowItWorks } from '@/components/landing/how-it-works';
import { Curriculum } from '@/components/landing/curriculum';
import { Footer } from '@/components/landing/footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Curriculum />
      <Footer />
    </>
  );
}
