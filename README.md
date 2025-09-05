# Mysuru Tourism - Lead Capture MVP

A modern, SEO-friendly tourism website for Mysuru that drives organic traffic and captures high-intent leads through a dynamic trip request form.

## 🚀 Features

- **Static Site Generation (SSG)** using Nuxt 4 and @nuxt/content
- **Wishlist System** - Users can save up to 3 items (hotels/activities)
- **Dynamic Trip Form** - Comprehensive lead capture with trip preferences
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **State Management** - Pinia stores with persistent localStorage
- **Modern UI Components** - Built with shadcn/ui components
- **SEO Optimized** - Meta tags, structured content, and fast loading

## 🏗️ Architecture

- **Frontend**: Nuxt 4 (Vue 3) with TypeScript
- **Styling**: Tailwind CSS 4
- **Components**: shadcn/ui with custom styling
- **State**: Pinia with persistent storage
- **Content**: Markdown files via @nuxt/content
- **Icons**: Lucide Vue Next
- **Build**: Static Site Generation (SSG)

## 📁 Project Structure

```
app/
├── components/          # Reusable Vue components
│   ├── ui/             # shadcn/ui components
│   ├── HotelCard.vue   # Hotel display component
│   ├── ActivityCard.vue # Activity display component
│   ├── MainNavigation.vue  # Main navigation
│   ├── WishlistSummary.vue # Floating wishlist
│   ├── FeaturedHotels.vue  # Featured hotels section
│   └── FeaturedActivities.vue # Featured activities section
├── content/            # Content files (Markdown)
│   ├── hotels/         # Hotel listings
│   └── activities/     # Activity listings
├── pages/              # Page components
│   ├── index.vue       # Home page
│   ├── hotels/         # Hotel listings
│   ├── activities/     # Activity listings
│   └── get-quote.vue   # Lead capture form
├── stores/             # Pinia stores
│   ├── wishlist.ts     # Wishlist state management
│   └── leads.ts        # Lead management
└── assets/             # Static assets
    └── css/            # Tailwind CSS
```

## 🛠️ Setup & Development

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Start development server**:
   ```bash
   yarn dev
   ```

3. **Build for production**:
   ```bash
   yarn build
   ```

4. **Generate static site**:
   ```bash
   yarn generate
   ```

## 🎯 User Flow

1. **Discovery**: Users browse hotels and activities
2. **Wishlist**: Add up to 3 items to personal wishlist
3. **Lead Capture**: Fill out comprehensive trip request form
4. **Quote Request**: Submit form with wishlist items included
5. **Follow-up**: Admin receives lead details for personalized quoting

## 🔧 Configuration

- **Nuxt Config**: Configured for SSG with content module
- **Tailwind**: Custom color scheme and responsive utilities
- **shadcn/ui**: Component library with consistent design system
- **Pinia**: Persistent state management with localStorage

## 📱 Responsive Design

- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- High contrast color schemes
- Screen reader friendly

## 🚀 Performance

- Static site generation
- Optimized images and assets
- Lazy loading components
- Minimal JavaScript bundle
- Fast page loads

## 📊 Lead Capture Features

- **Trip Types**: Honeymoon, Family, Business, Friends, Solo
- **Preferences**: Dates, guest count, food preferences
- **Add-ons**: Campfire, Spa, Transport, Guide, Photography
- **Contact**: Name, email, phone, WhatsApp opt-in
- **Wishlist Integration**: Automatically includes saved items

## 🔮 Future Enhancements

- WhatsApp Business API integration
- Google Sheets/Airtable integration
- Admin dashboard for lead management
- Multi-language support
- Payment gateway integration
- Real-time availability checking

## 📄 License

This project is built for educational and commercial purposes.
