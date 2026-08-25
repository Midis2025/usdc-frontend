const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');
const srcDir = path.join(__dirname, '..', 'src');

// Keep track of converted files mapping
const replacements = [];

// Helper to get files recursively
function getFiles(dir, filter) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, filter));
    } else if (filter(file)) {
      results.push(filePath);
    }
  });
  return results;
}

async function convertPngToAvif() {
  console.log('Searching for PNG images in public folder...');
  const pngFiles = getFiles(publicDir, (file) => file.toLowerCase().endsWith('.png'));

  console.log(`Found ${pngFiles.length} PNG file(s) to convert.`);

  for (const pngPath of pngFiles) {
    const ext = path.extname(pngPath);
    const avifPath = pngPath.substring(0, pngPath.length - ext.length) + '.avif';

    const originalName = path.basename(pngPath);
    const newName = path.basename(avifPath);

    console.log(`Converting: ${originalName} -> ${newName}...`);

    try {
      const originalStats = fs.statSync(pngPath);
      
      // Perform AVIF conversion with high quality (90) to ensure zero visible quality loss
      await sharp(pngPath)
        .avif({ quality: 90, effort: 4 })
        .toFile(avifPath);

      const newStats = fs.statSync(avifPath);
      const savings = ((originalStats.size - newStats.size) / originalStats.size * 100).toFixed(1);
      console.log(`  Success! Size: ${(originalStats.size / 1024 / 1024).toFixed(2)}MB -> ${(newStats.size / 1024 / 1024).toFixed(2)}MB (${savings}% saved)`);

      // Add to replacements mapping
      replacements.push({
        png: originalName,
        avif: newName,
        pngEncoded: encodeURIComponent(originalName),
        avifEncoded: encodeURIComponent(newName),
      });

      // Delete the original PNG file
      fs.unlinkSync(pngPath);
      console.log(`  Deleted original PNG: ${originalName}`);
    } catch (err) {
      console.error(`  Error converting ${originalName}:`, err.message);
    }
  }

  if (replacements.length === 0) {
    console.log('No files were successfully converted. Exiting.');
    return;
  }

  console.log('\nScanning and updating code references in src/ folder...');
  const codeFiles = getFiles(srcDir, (file) => {
    const ext = path.extname(file).toLowerCase();
    return ext === '.tsx' || ext === '.ts' || ext === '.css' || ext === '.js';
  });

  let updatedCount = 0;
  for (const codePath of codeFiles) {
    let content = fs.readFileSync(codePath, 'utf8');
    let hasChanged = false;

    for (const rep of replacements) {
      // 1. Raw name check (case-insensitive replace)
      const rawRegex = new RegExp(rep.png.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
      if (rawRegex.test(content)) {
        content = content.replace(rawRegex, rep.avif);
        hasChanged = true;
      }

      // 2. URL-encoded name check
      const encodedRegex = new RegExp(rep.pngEncoded.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
      if (encodedRegex.test(content)) {
        content = content.replace(encodedRegex, rep.avifEncoded);
        hasChanged = true;
      }
    }

    if (hasChanged) {
      fs.writeFileSync(codePath, content, 'utf8');
      console.log(`  Updated references in: ${path.relative(srcDir, codePath)}`);
      updatedCount++;
    }
  }

  console.log(`\nFinished! Converted ${replacements.length} image(s) and updated references in ${updatedCount} code file(s).`);
}

convertPngToAvif();
