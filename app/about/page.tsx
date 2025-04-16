'use client';

import Image from 'next/image';
import Link from 'next/link';
import './about.css';

export default function AboutPage() {
  return (
    <div className="about-container-modern">
      <section className="about-hero-section">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="about-header-modern">About Stitch and Story</h1>
          <p className="about-subtitle-modern">Crafting quality textiles with passion since 2015</p>
        </div>
      </section>

      <section className="our-story-section-modern">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="story-content-modern">
              <span className="section-eyebrow">Our Journey</span>
              <h2 className="section-title-modern">Our Story</h2>
              <div className="section-divider"></div>
              <p className="section-text-modern">
                Stitch and Story began with a simple idea: to create beautiful, high-quality textiles that tell a story. 
                Founded by textile enthusiasts with a passion for craftsmanship, we've grown from a small workshop 
                into a brand recognized for exceptional quality and timeless design.
              </p>
              <p className="section-text-modern">
                Every piece in our collection is thoughtfully designed and meticulously crafted, 
                combining traditional techniques with contemporary aesthetics. We believe in creating 
                products that not only look beautiful but also stand the test of time.
              </p>
              <p className="section-text-modern">
                Our commitment to quality extends beyond our products to every aspect of our business, 
                from sustainable sourcing to ethical manufacturing practices.
              </p>
            </div>
            <div className="story-image-modern">
              <div className="image-container-modern">
                <Image 
                  src="/images/about-image.jpg" 
                  alt="Our workshop" 
                  width={600} 
                  height={700}
                  className="about-img-modern"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="values-section-modern">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="text-center mb-12">
            <span className="section-eyebrow">What We Stand For</span>
            <h2 className="section-title-modern">Our Values</h2>
            <div className="section-divider mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="value-card-modern">
              <div className="value-icon-modern">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0 0 12 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 0 1-2.031.352 5.988 5.988 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971Zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0 2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 0 1-2.031.352 5.989 5.989 0 0 1-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971Z" />
                </svg>
              </div>
              <h3 className="value-title-modern">Quality</h3>
              <p className="value-text-modern">
                We never compromise on quality. From selecting the finest materials to perfecting every stitch, 
                excellence is at the heart of everything we create.
              </p>
            </div>
            <div className="value-card-modern">
              <div className="value-icon-modern">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 0 0-8.862 12.872M12.75 3.031a9 9 0 0 1 6.69 14.036m0 0-.177-.529A2.25 2.25 0 0 0 17.128 15H16.5l-.324-.324a1.453 1.453 0 0 0-2.328.377l-.036.073a1.586 1.586 0 0 1-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 0 1-5.276 3.67m0 0a9 9 0 0 1-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                </svg>
              </div>
              <h3 className="value-title-modern">Sustainability</h3>
              <p className="value-text-modern">
                We're committed to responsible practices that minimize our environmental impact. 
                From sourcing sustainable materials to reducing waste, we strive to protect our planet.
              </p>
            </div>
            <div className="value-card-modern">
              <div className="value-icon-modern">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="value-title-modern">Innovation</h3>
              <p className="value-text-modern">
                While respecting traditional craftsmanship, we embrace innovation to create products 
                that meet the evolving needs of our customers and push the boundaries of textile design.
              </p>
            </div>
          </div>
        </div>
      </section>



      <section className="cta-section-modern">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="cta-content-modern text-center">
            <h2 className="cta-title-modern">Join Our Story</h2>
            <p className="cta-text-modern">
              Discover our collection and become part of the Stitch and Story community.
            </p>
            <Link href="/products" className="cta-button-modern">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
