#!/usr/bin/env node

import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

// Configuration
const CONFIG = {
  PORTRAIT: {
    original: { width: 800, height: 1200 },
    thumbnail: { width: 267, height: 400 },
  },
  LANDSCAPE: {
    original: { width: 1200, height: 800 },
    thumbnail: { width: 400, height: 267 },
  },
  QUALITY: {
    original: 85,
    thumbnail: 90,
  },
};

/**
 * Get image orientation based on dimensions
 * @param {number} width - Image width
 * @param {number} height - Image height
 * @returns {string} 'PORTRAIT' or 'LANDSCAPE'
 */
function getOrientation(width, height) {
  return height > width ? 'PORTRAIT' : 'LANDSCAPE';
}

/**
 * Rename .JPG files to .jpg (lowercase extension)
 * @param {string} filePath - Path to the file
 * @returns {Promise<string>} New file path
 */
async function renameToLowercase(filePath) {
  const ext = path.extname(filePath);
  if (ext.toLowerCase() === '.jpg' && ext !== '.jpg') {
    const newPath = filePath.replace(ext, '.jpg');
    await fs.rename(filePath, newPath);
    console.log(`${colors.yellow}Renamed: ${path.basename(filePath)} → ${path.basename(newPath)}${colors.reset}`);
    return newPath;
  }
  return filePath;
}

/**
 * Process a single image file
 * @param {string} filePath - Path to the image file
 * @param {string} hotelDir - Hotel directory name
 * @returns {Promise<void>}
 */
async function processImage(filePath, hotelDir) {
  try {
    const filename = path.basename(filePath);

    // Skip files that already have "-thumb" in filename
    if (filename.includes('-thumb')) {
      console.log(`${colors.cyan}Skipping thumbnail: ${filename}${colors.reset}`);
      return;
    }

    console.log(`${colors.blue}Processing: ${hotelDir}/${filename}...${colors.reset}`);

    // Get image metadata
    const metadata = await sharp(filePath).metadata();
    const { width, height, orientation: exifOrientation } = metadata;

    if (!width || !height) {
      console.log(`${colors.red}Error: Could not get dimensions for ${filename}${colors.reset}`);
      return;
    }

    // Debug: Show original dimensions and EXIF orientation
    console.log(`${colors.cyan}📐 Original: ${width}×${height}${colors.reset}`);
    if (exifOrientation) {
      console.log(`${colors.cyan}🔄 EXIF Orientation: ${exifOrientation}${colors.reset}`);
    }

    const orientation = getOrientation(width, height);
    const config = CONFIG[orientation];

    // Create output paths
    const dir = path.dirname(filePath);
    const nameWithoutExt = path.parse(filename).name;
    const originalPath = path.join(dir, `${nameWithoutExt}.jpg`);
    const thumbnailPath = path.join(dir, `${nameWithoutExt}-thumb.jpg`);

    // Use temporary file for original to avoid "same file" error
    const tempOriginalPath = path.join(dir, `${nameWithoutExt}-temp.jpg`);

    // Process original image to temporary file
    await sharp(filePath)
      .resize(config.original.width, config.original.height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: CONFIG.QUALITY.original })
      .toFile(tempOriginalPath);

    // Replace original file with processed version
    await fs.unlink(filePath); // Remove original
    await fs.rename(tempOriginalPath, originalPath); // Rename temp to final

    console.log(`${colors.green}✓ Resized: ${path.basename(originalPath)} (${orientation})${colors.reset}`);

    // Process thumbnail
    await sharp(originalPath)
      .resize(config.thumbnail.width, config.thumbnail.height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: CONFIG.QUALITY.thumbnail })
      .toFile(thumbnailPath);

    console.log(`${colors.green}✓ Created: ${path.basename(thumbnailPath)}${colors.reset}`);
  }
  catch (error) {
    console.error(`${colors.red}Error processing ${path.basename(filePath)}: ${error.message}${colors.reset}`);
  }
}

/**
 * Process all images in a directory
 * @param {string} dirPath - Directory path
 * @returns {Promise<void>}
 */
async function processDirectory(dirPath) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(fullPath);
      }
      else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();

        // Process only .jpg and .JPG files
        if (ext === '.jpg' || ext === '.jpeg') {
          const hotelDir = path.basename(path.dirname(fullPath));

          // First rename to lowercase if needed
          const renamedPath = await renameToLowercase(fullPath);

          // Then process the image
          await processImage(renamedPath, hotelDir);
        }
      }
    }
  }
  catch (error) {
    console.error(`${colors.red}Error reading directory ${dirPath}: ${error.message}${colors.reset}`);
  }
}

/**
 * Parse command line arguments
 * @returns {Object} Parsed arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);
  const parsed = {
    dir: null,
    help: false,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === '--help' || arg === '-h') {
      parsed.help = true;
    }
    else if (arg.startsWith('--dir=')) {
      parsed.dir = arg.split('=')[1];
    }
    else if (arg === '--dir' && i + 1 < args.length) {
      parsed.dir = args[i + 1];
      i++; // Skip next argument as it's the value
    }
  }

  return parsed;
}

/**
 * Show help information
 */
function showHelp() {
  console.log(`${colors.bright}${colors.cyan}🏨 Hotel Image Processor${colors.reset}`);
  console.log(`${colors.cyan}================================${colors.reset}`);
  console.log('');
  console.log(`${colors.yellow}Usage:${colors.reset}`);
  console.log('  yarn process:images                   # Process all hotel directories');
  console.log('  yarn process:images --dir=hotel-name  # Process specific hotel directory');
  console.log('  yarn process:images --help            # Show this help');
  console.log('');
  console.log(`${colors.yellow}Examples:${colors.reset}`);
  console.log('  yarn process:images --dir=akshaya-palace-inn');
  console.log('  yarn process:images --dir=new-hotel');
  console.log('');
  console.log(`${colors.yellow}Description:${colors.reset}`);
  console.log('  Processes hotel images by resizing originals and creating thumbnails.');
  console.log('  Automatically detects orientation (portrait/landscape) and applies');
  console.log('  appropriate dimensions and quality settings.');
}

/**
 * Main function
 */
async function main() {
  try {
    const args = parseArgs();

    if (args.help) {
      showHelp();
      return;
    }

    console.log(`${colors.bright}${colors.cyan}🏨 Hotel Image Processor${colors.reset}`);
    console.log(`${colors.cyan}================================${colors.reset}`);

    const imagesDir = path.join(__dirname, '..', 'public', 'images');

    // Check if images directory exists
    try {
      await fs.access(imagesDir);
    }
    catch {
      console.error(`${colors.red}Error: Images directory not found at ${imagesDir}${colors.reset}`);
      process.exit(1);
    }

    if (args.dir) {
      // Process specific hotel directory
      const hotelDir = path.join(imagesDir, 'hotels', args.dir);

      try {
        await fs.access(hotelDir);
      }
      catch {
        console.error(`${colors.red}Error: Hotel directory not found: ${hotelDir}${colors.reset}`);
        console.log(`${colors.yellow}Available hotel directories:${colors.reset}`);
        try {
          const hotelsDir = path.join(imagesDir, 'hotels');
          const entries = await fs.readdir(hotelsDir, { withFileTypes: true });
          const dirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
          dirs.forEach(dir => console.log(`  - ${dir}`));
        }
        catch {
          console.log('  (No hotel directories found)');
        }
        process.exit(1);
      }

      console.log(`${colors.yellow}Processing hotel directory: ${args.dir}${colors.reset}`);
      console.log('');

      await processDirectory(hotelDir);
    }
    else {
      // Process all subdirectories
      console.log(`${colors.yellow}Processing all images in: ${imagesDir}${colors.reset}`);
      console.log('');

      await processDirectory(imagesDir);
    }

    console.log('');
    console.log(`${colors.green}${colors.bright}✅ Image processing completed!${colors.reset}`);
  }
  catch (error) {
    console.error(`${colors.red}${colors.bright}❌ Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// Run the script
main();
