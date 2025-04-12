const fs = require('fs');
const https = require('https');
const path = require('path');

// Final missing image
const finalImage = {
  'products/sweater-1-alt.jpg': 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
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

// Download final image
const downloadFinalImage = async () => {
  console.log('Downloading final missing image...');
  for (const [relativePath, url] of Object.entries(finalImage)) {
    const filepath = path.join('./public/images', relativePath);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
  console.log('Final image downloaded successfully!');
};

downloadFinalImage();
