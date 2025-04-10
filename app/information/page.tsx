'use client'

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Camera, Box, Calendar, Mail } from 'lucide-react';

export default function Information() {
  const router = useRouter();

  return (
    <>
      <Header />
      <main className="p-8 space-y-10 max-w-4xl mx-auto text-gray-800">
        <section>
          <h2 className="text-2xl font-bold mb-3">How the Ordering Process Works</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-2">
            <p>
              <strong>We lend out marketing gadgets to all subsidiaries of the Tele Radio Group.</strong> You can place an order through this platform.
            </p>
            <p>
              <strong>We cover the shipping costs to your address.</strong> You are only responsible for paying the return shipping costs.
            </p>
            <p>
              Once you place an order, you’ll receive a confirmation email along with tracking information. Orders are usually shipped within 1–3 business days.
            </p>
            <p>
              <strong>You can track the status of your order anytime through your account.</strong> Once your order is shipped, you will receive a notification with tracking information. If there are any delays, you will be notified, and the expected delivery date will be updated in your account.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Returning Items</h2>
          <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-2">
            <p>
              Please return all borrowed items <strong>as soon as possible after your event</strong>. Others may want to use the same items, so quick returns help keep everything available for the next team.
            </p>
            <p>
              All items are delivered in a sturdy, equipment-style box. <strong>Please reuse this box</strong> to return the items — no need to repack or find new packaging.
            </p>
            <p>
              You can choose any shipping provider, but make sure the return is <strong>trackable</strong>.
            </p>
            <p>
              <strong>Return Address:</strong><br />
              International Marketing Allgon<br />
              Jadestraat 9<br />
              2665 NS Bleiswijk<br />
              Netherlands
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Tips for a Smooth Experience</h2>
          <ul className="list-disc pl-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-2">
            <li>
              <Camera className="inline-block w-5 h-5 text-gray-500 mr-2" />
              <strong>Take pictures</strong> of the package and contents when it arrives, in case anything is damaged.
            </li>
            <li>
              <Box className="inline-block w-5 h-5 text-gray-500 mr-2" />
              <strong>Photograph the items again before returning</strong> them — this can help with insurance or damage disputes.
            </li>
            <li>
              <Calendar className="inline-block w-5 h-5 text-gray-500 mr-2" />
              <strong>Send back items promptly</strong> after your event — ideally the next working day.
            </li>
            <li>
              <Mail className="inline-block w-5 h-5 text-gray-500 mr-2" />
              Always use a <strong>trackable shipping service</strong> to ensure safe return.
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
