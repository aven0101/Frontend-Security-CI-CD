'use client';
import ContactCards from "@/components/contact-us/ConactCards";
import ContactForm from "@/components/contact-us/ContactForm";
import ContactSupport from "@/components/contact-us/ContactSupport";
import ContactHeading from "@/components/contact-us/heading";

export default function ContactUs() {
  return (
    <>
      {/* Heading Section */}
      <ContactHeading />

      {/* Contact Cards Section */}
      <ContactCards />

      {/* Contact Form */}
      <ContactForm />
      {/* Support Page */}
      <ContactSupport />

    </>
  );
}
