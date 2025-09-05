<template>
  <div class="min-h-screen bg-gray-50">
    <div class="max-w-4xl mx-auto px-4 py-12">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Cancellation Policy
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
              At Mysuru Tours, we understand that travel plans can change due to various circumstances. This cancellation policy outlines the terms and conditions for cancelling or modifying your travel arrangements and enquiries with us.
            </p>
          </section>

          <!-- Enquiry and Booking Process -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Enquiry and Booking Process
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Our services operate on an enquiry-based system:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>You submit an enquiry through our website or contact us directly</li>
              <li>We provide you with a custom quote based on your requirements</li>
              <li>All pricing is customized and subject to availability</li>
              <li>No upfront payment is required for initial enquiries</li>
              <li>Bookings are confirmed only after mutual agreement and advance payment</li>
            </ul>
          </section>

          <!-- Cancellation Before Confirmation -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Cancellation Before Confirmation
            </h2>
            <p class="text-gray-700 leading-relaxed">
              If you need to cancel your enquiry or request before we provide a quote or before booking confirmation:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>No cancellation fees apply</li>
              <li>Simply inform us via email or phone</li>
              <li>We will close your enquiry file</li>
              <li>You can submit a new enquiry at any time</li>
            </ul>
          </section>

          <!-- Cancellation After Confirmation -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Cancellation After Confirmation
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              Once your booking is confirmed and advance payment is made, the following cancellation policy applies:
            </p>
            <div class="bg-gray-50 p-6 rounded-lg">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">
                Cancellation Timeline and Refunds:
              </h3>
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">30+ days before travel date</span>
                  <span class="text-green-600 font-semibold">90% refund</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">15-29 days before travel date</span>
                  <span class="text-yellow-600 font-semibold">75% refund</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">7-14 days before travel date</span>
                  <span class="text-orange-600 font-semibold">50% refund</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">3-6 days before travel date</span>
                  <span class="text-red-600 font-semibold">25% refund</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-700">Less than 3 days or no-show</span>
                  <span class="text-red-600 font-semibold">No refund</span>
                </div>
              </div>
            </div>
          </section>

          <!-- Modification Requests -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Modification Requests
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              We understand that you may need to modify your travel plans. Modification requests are subject to:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Availability of alternative dates or services</li>
              <li>Price adjustments based on new requirements</li>
              <li>Service provider policies and availability</li>
              <li>Administrative fees may apply for major changes</li>
              <li>All modifications must be requested in writing</li>
            </ul>
          </section>

          <!-- Force Majeure and Special Circumstances -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Force Majeure and Special Circumstances
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              In cases of force majeure or circumstances beyond anyone's control, we offer flexible options:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Natural disasters or extreme weather conditions</li>
              <li>Government restrictions or travel bans</li>
              <li>Health emergencies or pandemics</li>
              <li>Political unrest or security concerns</li>
              <li>Transportation strikes or major disruptions</li>
            </ul>
            <p class="text-gray-700 leading-relaxed mt-4">
              In such cases, we will work with you to reschedule your trip or provide a full refund, subject to service provider policies.
            </p>
          </section>

          <!-- Refund Process -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Refund Process
            </h2>
            <div class="space-y-4">
              <p class="text-gray-700 leading-relaxed">
                Refund processing follows these steps:
              </p>
              <ol class="list-decimal list-inside text-gray-700 space-y-1 ml-4">
                <li>Submit cancellation request in writing</li>
                <li>We review and confirm cancellation eligibility</li>
                <li>Calculate refund amount based on policy</li>
                <li>Process refund through original payment method</li>
                <li>Send confirmation email with refund details</li>
              </ol>
              <p class="text-gray-700 leading-relaxed">
                <strong>Processing Time:</strong> Refunds are typically processed within 5-10 business days, depending on your bank or payment provider.
              </p>
            </div>
          </section>

          <!-- Non-Refundable Items -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Non-Refundable Items
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              The following items are typically non-refundable:
            </p>
            <ul class="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Administrative and processing fees</li>
              <li>Third-party service charges</li>
              <li>Special permits or licenses already obtained</li>
              <li>Customized services with non-cancellable commitments</li>
              <li>Gift cards or promotional vouchers</li>
            </ul>
          </section>

          <!-- How to Cancel -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              How to Cancel
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              To cancel your enquiry or booking, please contact us through one of these methods:
            </p>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-800 mb-2">
                  Email Cancellation
                </h3>
                <p class="text-gray-700 text-sm">
                  Send email to: cancellations@mysurutrip.com
                </p>
                <p class="text-gray-700 text-sm">
                  Include your enquiry/booking reference number
                </p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-semibold text-gray-800 mb-2">
                  Phone Cancellation
                </h3>
                <p class="text-gray-700 text-sm">
                  Call: +91 ‭98454 48902‬
                </p>
                <p class="text-gray-700 text-sm">
                  Available during business hours
                </p>
              </div>
            </div>
          </section>

          <!-- Contact Information -->
          <section>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">
              Contact Information
            </h2>
            <p class="text-gray-700 leading-relaxed mb-4">
              For questions about our cancellation policy or to request a cancellation:
            </p>
            <div class="bg-gray-50 p-4 rounded-lg">
              <p class="text-gray-700">
                <strong>General Inquiries:</strong> info@mysurutrip.com
              </p>
              <p class="text-gray-700">
                <strong>Cancellations:</strong> cancellations@mysurutrip.com
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
  title: 'Cancellation Policy - Mysuru Tours',
  meta: [
    {
      name: 'description',
      content: 'Understand our cancellation policy for custom travel packages and enquiries. Learn about refund terms, modification options, and cancellation procedures.',
    },
    {
      name: 'keywords',
      content: 'cancellation policy, travel cancellation, refund policy, Mysuru Tours, tourism cancellation',
    },
    {
      property: 'og:title',
      content: 'Cancellation Policy - Mysuru Tours',
    },
    {
      property: 'og:description',
      content: 'Understand our cancellation policy for custom travel packages and enquiries.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
});
</script>
