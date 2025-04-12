const fs = require('fs');
const https = require('https');
const path = require('path');

// Create directories if they don't exist
const dirs = [
  './public/images',
  './public/images/products',
  './public/images/categories',
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

// Image URLs for products (from Unsplash - free to use commercially)
const productImages = {
  'sweater-1.jpg': 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
  'sweater-1-alt.jpg': 'https://images.unsplash.com/photo-1599447292180-45d25ed7eb34?q=80&w=800&auto=format&fit=crop',
  'shirt-1.jpg': 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop',
  'shirt-1-alt.jpg': 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?q=80&w=800&auto=format&fit=crop',
  'scarf-1.jpg': 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop',
  'scarf-1-alt.jpg': 'https://images.unsplash.com/photo-1601379327928-bedfaf9da2d0?q=80&w=800&auto=format&fit=crop',
  'tshirt-1.jpg': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop',
  'tshirt-1-alt.jpg': 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?q=80&w=800&auto=format&fit=crop',
  'coat-1.jpg': 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?q=80&w=800&auto=format&fit=crop',
  'coat-1-alt.jpg': 'https://images.unsplash.com/photo-1548126032-079a0fb0099d?q=80&w=800&auto=format&fit=crop',
  'pajama-1.jpg': 'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=800&auto=format&fit=crop',
  'pajama-1-alt.jpg': 'https://images.unsplash.com/photo-1586105449897-20b5d42a15c6?q=80&w=800&auto=format&fit=crop',
  'beanie-1.jpg': 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?q=80&w=800&auto=format&fit=crop',
  'beanie-1-alt.jpg': 'https://images.unsplash.com/photo-1470161050798-7107e4b5d7c6?q=80&w=800&auto=format&fit=crop',
  'dress-1.jpg': 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=800&auto=format&fit=crop',
  'dress-1-alt.jpg': 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=800&auto=format&fit=crop',
  'jacket-1.jpg': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',
  'jacket-1-alt.jpg': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop',
  'blanket-1.jpg': 'https://images.unsplash.com/photo-1580301762395-83dcf0c06c1a?q=80&w=800&auto=format&fit=crop',
  'blanket-1-alt.jpg': 'https://images.unsplash.com/photo-1631862260978-9e28b2a6f4be?q=80&w=800&auto=format&fit=crop',
  'socks-1.jpg': 'https://images.unsplash.com/photo-1582966772680-860e372bb558?q=80&w=800&auto=format&fit=crop',
  'socks-1-alt.jpg': 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=800&auto=format&fit=crop',
  'tablerunner-1.jpg': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop',
  'tablerunner-1-alt.jpg': 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=800&auto=format&fit=crop',
};

// Image URLs for categories
const categoryImages = {
  'sweaters.jpg': 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?q=80&w=800&auto=format&fit=crop',
  'shirts.jpg': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=800&auto=format&fit=crop',
  't-shirts.jpg': 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
  'accessories.jpg': 'https://images.unsplash.com/photo-1556905200-279565513a2d?q=80&w=800&auto=format&fit=crop',
  'outerwear.jpg': 'https://images.unsplash.com/photo-1578948856697-db91d246b7b8?q=80&w=800&auto=format&fit=crop',
  'sleepwear.jpg': 'https://images.unsplash.com/photo-1631947430066-48c30d57b943?q=80&w=800&auto=format&fit=crop',
};

// Additional website images
const otherImages = {
  'hero-bg.jpg': 'https://images.unsplash.com/photo-1612722432474-b971cdcea546?q=80&w=1200&auto=format&fit=crop',
  'about-image.jpg': 'https://images.unsplash.com/photo-1605086998852-18371cfd9b2e?q=80&w=800&auto=format&fit=crop',
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

// Download all product images
const downloadProductImages = async () => {
  for (const [filename, url] of Object.entries(productImages)) {
    const filepath = path.join('./public/images/products', filename);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
};

// Download all category images
const downloadCategoryImages = async () => {
  for (const [filename, url] of Object.entries(categoryImages)) {
    const filepath = path.join('./public/images/categories', filename);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
};

// Download other website images
const downloadOtherImages = async () => {
  for (const [filename, url] of Object.entries(otherImages)) {
    const filepath = path.join('./public/images', filename);
    try {
      await downloadImage(url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
};

// Run all downloads
const downloadAllImages = async () => {
  console.log('Starting image downloads...');
  await downloadProductImages();
  await downloadCategoryImages();
  await downloadOtherImages();
  console.log('All images downloaded successfully!');
};

downloadAllImages();
