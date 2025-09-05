<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Terms of Service
        </h1>
        <p class="text-lg text-gray-600">
          Last updated: {{ new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
        </p>
      </div>

      <!-- Content -->
      <div class="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
        <div class="space-y-8">
          <!-- Introduction -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Introduction
            </h2>
            <p class="text-gray-700 leading-relaxed">
              These Terms of Service ("Terms") govern your use of the Mysuru Tours website and services. By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of these terms, you may not access our services.
            </p>
          </section>

          <!-- Services Description -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Services Description
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Mysuru Tours provides tourism and travel services including but not limited to:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Hotel and accommodation bookings</li>
              <li>Tour packages and activities</li>
              <li>Travel planning and consultation</li>
              <li>Transportation services</li>
              <li>Cultural and heritage experiences</li>
            </ul>
          </section>

          <!-- User Accounts -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              User Accounts and Registration
            </h2>
            <div class="space-y-4">
              <p class="text-gray-700 leading-relaxed">
                When you create an account with us, you must provide accurate and complete information. You are responsible for:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
                <li>Ensuring your account information is up to date</li>
              </ul>
            </div>
          </section>

          <!-- Booking and Reservations -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Booking and Reservations
            </h2>
            <div class="space-y-4">
              <p class="text-gray-700 leading-relaxed mb-4">
                All bookings are subject to availability and confirmation. By making a booking, you:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Confirm that all information provided is accurate</li>
                <li>Agree to pay the specified amount for services</li>
                <li>Accept our cancellation and refund policies</li>
                <li>Understand that prices may be subject to change</li>
                <li>Agree to comply with local laws and regulations</li>
              </ul>
            </div>
          </section>

          <!-- Payment Terms -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Payment Terms
            </h2>
            <div class="space-y-4">
              <p class="text-gray-700 leading-relaxed mb-4">
                Payment terms and conditions:
              </p>
              <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Full payment may be required at the time of booking</li>
                <li>We accept major credit cards and digital payment methods</li>
                <li>Prices are quoted in Indian Rupees (INR) unless otherwise stated</li>
                <li>Additional taxes and fees may apply</li>
                <li>Payment processing is handled by secure third-party providers</li>
              </ul>
            </div>
          </section>

          <!-- Cancellation and Refunds -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Cancellation and Refunds
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Cancellation policies vary by service type and provider. Generally:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Free cancellation up to 24 hours before the service date</li>
              <li>Partial refunds may be available for cancellations within 24 hours</li>
              <li>No refunds for same-day cancellations or no-shows</li>
              <li>Force majeure events may result in full refunds</li>
              <li>Refund processing may take 5-10 business days</li>
            </ul>
          </section>

          <!-- User Conduct -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              User Conduct and Responsibilities
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Users must not:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Use our services for illegal or unauthorized purposes</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with other users' enjoyment of our services</li>
            </ul>
          </section>

          <!-- Intellectual Property -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Intellectual Property Rights
            </h2>
            <p class="text-gray-700 leading-relaxed">
              All content on our website, including text, graphics, logos, images, and software, is the property of Mysuru Tours or its licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
            </p>
          </section>

          <!-- Limitation of Liability -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Limitation of Liability
            </h2>
            <p class="text-gray-700 leading-relaxed">
              To the maximum extent permitted by law, Mysuru Tours shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or use, arising out of or relating to your use of our services.
            </p>
          </section>

          <!-- Indemnification -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Indemnification
            </h2>
            <p class="text-gray-700 leading-relaxed">
              You agree to indemnify and hold harmless Mysuru Tours, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from your use of our services or violation of these Terms.
            </p>
          </section>

          <!-- Privacy and Data -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Privacy and Data Protection
            </h2>
            <p class="text-gray-700 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <!-- Third-Party Services -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Third-Party Services and Links
            </h2>
            <p class="text-gray-700 leading-relaxed">
              Our services may contain links to third-party websites or services. We are not responsible for the content, privacy policies, or practices of any third-party services. Your use of such services is at your own risk.
            </p>
          </section>

          <!-- Force Majeure -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Force Majeure
            </h2>
            <p class="text-gray-700 leading-relaxed">
              We shall not be liable for any failure to perform our obligations due to circumstances beyond our reasonable control, including but not limited to natural disasters, government actions, war, terrorism, or other unforeseeable events.
            </p>
          </section>

          <!-- Governing Law -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Governing Law and Dispute Resolution
            </h2>
            <p class="text-gray-700 leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these Terms or your use of our services shall be resolved through binding arbitration in Mysuru, Karnataka, India.
            </p>
          </section>

          <!-- Changes to Terms -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Changes to These Terms
            </h2>
            <p class="text-gray-700 leading-relaxed">
              We reserve the right to modify or replace these Terms at any time. We will notify users of any material changes by posting the new Terms on our website. Your continued use of our services after such changes constitutes acceptance of the new Terms.
            </p>
          </section>

          <!-- Contact Information -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700">
                <strong>Email:</strong> legal@mysurutrip.com
              </p>
              <p class="text-gray-700">
                <strong>Phone:</strong> +91 ‭98454 48902‬
              </p>
              <p class="text-gray-700">
                <strong>Address:</strong> Mysuru Palace Road, Mysuru, Karnataka 570001, India
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
  title: 'Terms of Service - Mysuru Tours',
  meta: [
    {
      name: 'description',
      content: 'Read the terms and conditions for using Mysuru Tours services. Understand your rights, responsibilities, and our service policies.',
    },
    {
      name: 'keywords',
      content: 'terms of service, terms and conditions, service agreement, Mysuru Tours, tourism terms',
    },
    {
      property: 'og:title',
      content: 'Terms of Service - Mysuru Tours',
    },
    {
      property: 'og:description',
      content: 'Read the terms and conditions for using Mysuru Tours services.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
});
</script>
