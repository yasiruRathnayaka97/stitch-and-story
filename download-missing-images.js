const fs = require('fs');
const https = require('https');
const path = require('path');

// Missing images to download with alternative URLs
const missingImages = {
  'products/sweater-1-alt.jpg': 'https://images.unsplash.com/photo-1584736286279-4edcf5b64fb1?q=80&w=800&auto=format&fit=crop',
  'products/pajama-1-alt.jpg': 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=800&auto=format&fit=crop',
  'products/beanie-1-alt.jpg': 'https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?q=80&w=800&auto=format&fit=crop',
  'products/blanket-1.jpg': 'https://images.unsplash.com/photo-1600369671236-e74521d4b6ad?q=80&w=800&auto=format&fit=crop',
  'products/blanket-1-alt.jpg': 'https://images.unsplash.com/photo-1613336026275-d6d473084e85?q=80&w=800&auto=format&fit=crop',
  'categories/outerwear.jpg': 'https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop',
};

// Function to download an image
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const file = fs.createWriteStream(filepath);
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        reject(`Failed to download ${url}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      reject(`Error downloading ${url}: ${err.message}`);
    });
  });
};

// Download all missing images
const downloadMissingImages = async () => {
  console.log('Starting to download missing images...');
  for (const [relativePath, url] of Object.entries(missingImages)) {
    const filepath = path.join('./public/images', relativePath);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
  console.log('All missing images downloaded successfully!');
};

downloadMissingImages();
