import { PublicCTA, PublicFooter, PublicNavbar } from "../../../shared/components";
import ContactFAQ from "../components/ContactFAQ";
import ContactFormSection from "../components/ContactFormSection";
import ContactHero from "../components/ContactHero";
import ContactInfoRow from "../components/ContactInfoRow";

const Contact = () => {
  return (
    <main className="min-h-screen bg-[#fbfdfc] text-[#17233f]">
      <PublicNavbar activePage="Contact Us" />
      <ContactHero />
      <ContactInfoRow />
      <ContactFormSection />
      <ContactFAQ />
      <PublicCTA
        heading="Need help finding the right product?"
        subtitle="Explore thousands of quality products from trusted sellers on ShopEase."
        buttonLabel="Explore Marketplace"
      />
      <PublicFooter />
    </main>
  );
};

export default Contact;
