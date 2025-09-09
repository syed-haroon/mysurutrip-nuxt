# Access Control Configuration

This document explains how the access control system works for the MysuruTrip application.

## Overview

The application implements environment-based access control with the following behavior:

- **Production**: Shows "Coming Soon" page by default, admin access via URL parameters
- **Development**: Shows normal site by default, guest access via URL parameters

## Environment Variables

Create a `.env` file in the project root with the following variables:

```bash
# Environment Configuration
NODE_ENV=development

# Admin Access Control
# Set a strong secret for production admin access
ADMIN_SECRET=your-super-secure-secret-key-here
```

## Access Control Logic

### Production Environment
- **Default**: All users see the "Coming Soon" page
- **Admin Access**: Add `?view=admin&secret=YOUR_SECRET` to any URL
- **Example**: `https://yoursite.com/?view=admin&secret=your-secret`

### Development Environment
- **Default**: All users see the normal site
- **Guest Access**: Add `?view=guest` to any URL to see "Coming Soon" page
- **Example**: `http://localhost:3000/?view=guest`

## Security Best Practices

1. **Strong Admin Secret**: Use a long, random string for `ADMIN_SECRET` in production
2. **Environment Separation**: Never use development secrets in production
3. **HTTPS**: Always use HTTPS in production to protect the admin secret
4. **Regular Rotation**: Change the admin secret periodically

## Usage Examples

### For Development Testing
```bash
# Normal development (shows full site)
http://localhost:3000/

# Test coming soon page
http://localhost:3000/?view=guest
```

### For Production Deployment
```bash
# Normal users see coming soon
https://yoursite.com/

# Admin access to full site
https://yoursite.com/?view=admin&secret=your-production-secret
```

## Implementation Details

The access control is implemented using:
- Global Nuxt middleware (`app/middleware/access-control.global.ts`)
- Runtime configuration (`nuxt.config.ts`)
- Composable for access control logic (`app/composables/useAccessControl.ts`)

## Troubleshooting

If you're having issues with access control:

1. Check that `NODE_ENV` is set correctly
2. Verify `ADMIN_SECRET` matches between environment and URL parameter
3. Ensure the middleware is properly configured
4. Check browser console for any JavaScript errors
