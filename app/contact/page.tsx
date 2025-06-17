"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<string>("");

  // useEffect(() => {
  //   const user = localStorage.getItem('user');
  //   if (!user) {
  //     // If no user is found in localStorage, redirect to login page
  //     router.push('/');
  //   }
  // }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await fetch("/api/send_email/contact_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send the message.");
      }
    } catch (error) {
      console.error(error);
      setStatus("An error occurred.");
    }
  };

  return (
    <>
      <Header />
      <main className="container mx-auto p-8 min-h-screen flex flex-col">
        <div className="flex justify-between mb-8">
          {/* Contact Info Section */}
          <div className="w-1/3 p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Contact Info</h2>
            <p className="mb-2">
              Attn:{" "}
              <a className="text-blue-500">International Marketing Allgon</a>
            </p>
            <p className="mb-2">
              Email:{" "}
              <a href="mailto:marketing@allgon.com" className="text-blue-500">
                marketing@allgon.com
              </a>
            </p>
            <p className="mb-2">
              Phone:{" "}
              <a href="tel:+31704194127" className="text-blue-500">
                +31 (0)70-41 94 127
              </a>
            </p>
            <p className="mb-2">
              Address:{" "}
              <a
                href="https://www.google.com/maps?q=Jadestraat+9,+2665+NS+Bleiswijk"
                target="_blank"
                className="text-blue-500"
              >
                Jadestraat 9 - 2665 NS Bleiswijk
              </a>
            </p>

            {/* Google Maps Embed */}
            <div className="mt-4">
              <iframe
                className="w-full h-64 pt-2"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2433.235221387949!2d4.526721076537157!3d52.009554471930996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5d9742a108d5d%3A0x8b2eaf6f20f5b6fa!2sJadestraat%209%2C%202665%20NS%20Bleiswijk%2C%20Netherlands!5e0!3m2!1sen!2s!4v1712064845432!5m2!1sen!2s"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="w-2/3 p-4 bg-white rounded-lg shadow-lg ml-4">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Send Message
                </button>
              </div>
            </form>

            {/* Status Message */}
            {status && <p className="text-sm mt-4">{status}</p>}
          </div>
        </div>

        {/* Ensure Footer stays at the bottom */}
        <div className="flex-grow" />

        <Footer />
      </main>
    </>
  );
}
