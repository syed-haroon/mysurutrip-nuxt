import { Resend } from 'resend';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validate required fields
    if (!body.tripType || !body.checkIn || !body.checkOut || !body.guestCount || !body.contactInfo) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing required fields',
      });
    }

    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Format the email content
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">
          🏰 New Quote Request - MysuruTrip
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Trip Details</h3>
          <p><strong>Trip Type:</strong> ${body.tripType}</p>
          <p><strong>Check-in Date:</strong> ${body.checkIn}</p>
          <p><strong>Check-out Date:</strong> ${body.checkOut}</p>
          <p><strong>Number of Guests:</strong> ${body.guestCount}</p>
        </div>

        ${body.foodPreferences && Object.keys(body.foodPreferences).length > 0
          ? `
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Food Preferences</h3>
          <ul>
            ${Object.entries(body.foodPreferences)
              .filter(([_key, value]) => value)
              .map(([key, _value]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)}</li>`)
              .join('')}
          </ul>
        </div>
        `
          : ''}

        ${body.addOns && Object.keys(body.addOns).length > 0
          ? `
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Add-ons & Services</h3>
          <ul>
            ${Object.entries(body.addOns)
              .filter(([_key, value]) => value)
              .map(([key, _value]) => `<li>${key.charAt(0).toUpperCase() + key.slice(1)}</li>`)
              .join('')}
          </ul>
        </div>
        `
          : ''}

        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${body.contactInfo.name}</p>
          <p><strong>Email:</strong> ${body.contactInfo.email}</p>
          <p><strong>Phone:</strong> ${body.contactInfo.phone}</p>
          <p><strong>WhatsApp Updates:</strong> ${body.contactInfo.whatsappOptIn ? 'Yes' : 'No'}</p>
        </div>

        ${body.wishlistItems && body.wishlistItems.length > 0
          ? `
        <div style="background-color: #fce7f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #374151; margin-top: 0;">🏨 Wishlist Items (${body.wishlistItems.length} selected)</h3>
          <p style="margin-bottom: 15px; color: #6b7280;">Customer is interested in getting quotes for these hotels:</p>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${body.wishlistItems.map((item: { id?: string; title?: string; displayName?: string; location?: string } | string, index: number) => {
              if (typeof item === 'object' && item.title && item.displayName) {
                return `<li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; ${index === body.wishlistItems.length - 1 ? 'border-bottom: none;' : ''}">
                  <span style="color: #f97316; font-weight: 600;">${index + 1}.</span>
                  <span style="color: #374151; font-weight: 500;">${item.displayName}</span>
                  <span style="color: #dc2626; font-size: 12px; margin-left: 8px; background: #fef2f2; padding: 2px 6px; border-radius: 4px; border: 1px solid #fecaca;">REAL: ${item.title}</span>
                  ${item.location ? `<span style="color: #6b7280; font-size: 14px; margin-left: 8px;">(${item.location})</span>` : ''}
                </li>`;
              }
              return `<li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; ${index === body.wishlistItems.length - 1 ? 'border-bottom: none;' : ''}">
                <span style="color: #f97316; font-weight: 600;">${index + 1}.</span>
                <span style="color: #374151; font-weight: 500;">${typeof item === 'object' ? item.title || item.id : item}</span>
                ${typeof item === 'object' && item.location ? `<span style="color: #6b7280; font-size: 14px; margin-left: 8px;">(${item.location})</span>` : ''}
              </li>`;
            }).join('')}
          </ul>
        </div>
        `
          : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            This quote request was submitted from the MysuruTrip website.<br>
            Please respond to the customer within 24 hours.
          </p>
        </div>
      </div>
    `;

    // Send email
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'MysoreTrip <noreply@mysurutrip.com>',
      to: [process.env.TO_EMAIL || 'seek.syed@gmail.com'],
      subject: `New Quote Request - ${body.contactInfo.name} (${body.tripType})`,
      html: emailHtml,
      replyTo: process.env.REPLY_TO_EMAIL || 'syed.haroon.009@gmail.com',
    });

    if (error) {
      console.error('Resend error:', error);
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to send email',
      });
    }

    return {
      success: true,
      message: 'Quote request submitted successfully',
      emailId: data?.id,
    };
  }
  catch (error: unknown) {
    console.error('Quote submission error:', error);

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error;
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error',
    });
  }
});
