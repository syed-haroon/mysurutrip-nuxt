# Hotel Onboarding Prompt Template

Use this prompt template when you need to onboard a new hotel to the system.

---

## Prompt Template:

```
I have onboarded a new hotel and here are the photos and details for the property:

Images: @[hotel-folder-name]

title: '[Real Hotel Name]'
id: '[hotel-id]'
displayName: "[Display Name]"

[If multiple hotels, repeat the above structure for each]

You need to create content like @content/hotels/mth-api.md @content/hotels/mth-pv.md @content/hotels/mth-wp.md 

The content should be made up (near to real but not real - we will update to real in future) for '[Hotel Name]' as mentioned above. You can use the photos from these properties here @[hotel-folder-name] to understand what amenities, room types, and features are available.

Requirements:
- Follow the exact same structure as the reference files
- Include ALL images from the folder with proper paths
- Create realistic but made-up content (descriptions, amenities, features)
- Set appropriate price ranges based on the property type
- Assign appropriate category (luxury/mid-range/budget) based on images
- Include proper image metadata (isFeatured, type, alt text)
- Ensure all room types are categorized (room-deluxe, room-standard, room-budget, room-suite, etc.)
- Include amenities and features that match what's visible in the images
- Use similar tone and style as the reference files
```

---

## Example Usage:

```
I have onboarded a new hotel and here are the photos and details for the property:

Images: @mth-cbh

title: 'Calvert Boarding Home'
id: 'mth-cbh'
displayName: "MTH-CBH"

Images: @mth-sc 

title: 'Surabhi Comforts'
id: 'mth-sc'
displayName: "MTH-SC"

You need to create content like @content/hotels/mth-api.md @content/hotels/mth-pv.md @content/hotels/mth-wp.md 

The content should be made up (near to real but not real - we will update to real in future) for 'Surabhi Comforts' and 'Calvert Boarding Home' as mentioned above. You can use the photos from these properties here @mth-cbh @mth-sc to understand what amenities, room types, and features are available.
```

---

## Key Points to Include:

1. **Always attach the image folder** using @[folder-name]
2. **Provide the three key identifiers**: title (real name), id (URL slug), displayName (customer-facing name)
3. **Reference existing content files** as examples using @content/hotels/[filename].md
4. **Specify that content should be made-up but realistic** - this is important for the AI to understand
5. **Mention using photos to determine amenities** - helps AI analyze what's available

---

## What the AI Will Do:

- Analyze all images in the provided folder
- Create a markdown file at `content/hotels/[id].md`
- Include all images with proper paths and metadata
- Generate realistic but fictional content matching the structure
- Set appropriate pricing, category, and rating based on property type
- Create comprehensive descriptions, amenities, features, and room types
- Follow the exact YAML frontmatter structure from reference files

---

## Tips:

- If you have multiple hotels, list them all in one prompt
- The AI will automatically categorize rooms based on naming (room-a, room-b, room-c typically map to deluxe, standard, budget)
- You can specify additional requirements like "make it more budget-friendly" or "position as luxury" if needed
- After creation, you can always ask to update specific sections with real information later

