<script setup>
import { RouterLink } from 'vue-router'
const basePath = window.wpThemeUrl ? `${window.wpThemeUrl}/dist/` : '/'
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="home__hero">
      <div class="home__hero-content">
        <span class="home__hero-subtitle">PC PART MATCHER</span>
        <h1 class="home__hero-title">Build your perfect PC.<br><span class="home__hero-title--accent">Zero guesswork.</span></h1>
        <p class="home__hero-description">
          Browse thousands of components, verify compatibility as you go, and compare live prices across top retailers — all in one place.
        </p>
        <RouterLink to="/browse" class="home__hero-btn">Build your PC &rarr;</RouterLink>
      </div>
      <div class="home__hero-image-wrapper">
        <img :src="`${basePath}home-image.jpg`" alt="Computer Processor" class="home__hero-image" />
        <p class="home__hero-image-credit">
          <a href="https://www.pexels.com/photo/computer-processor-2582935/" target="_blank" rel="noopener noreferrer">Image by Athena Sandrini</a>
        </p>
      </div>
    </section>

    <!-- Features Bar -->
    <section class="home__features">
      <div class="home__feature">
        <div class="home__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
        <div class="home__feature-text">
          <h3 class="home__feature-title">Smart filtering</h3>
          <p class="home__feature-description">Filter by socket, form factor, and storage interface.</p>
        </div>
      </div>
      <div class="home__feature">
        <div class="home__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <div class="home__feature-text">
          <h3 class="home__feature-title">Live compatibility</h3>
          <p class="home__feature-description">Every part is checked against your build instantly.</p>
        </div>
      </div>
      <div class="home__feature">
        <div class="home__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        </div>
        <div class="home__feature-text">
          <h3 class="home__feature-title">Retailer links</h3>
          <p class="home__feature-description">Compare prices across Amazon, Newegg & Overclockers.</p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="home__steps">
      <div class="home__steps-header">
        <span class="home__section-subtitle">HOW IT WORKS</span>
        <h2 class="home__section-title">Three steps from idea to finished rig.</h2>
      </div>
      <div class="home__steps-grid">
        <div class="home__step-card">
          <span class="home__step-number">01</span>
          <h3 class="home__step-title">Browse & filter</h3>
          <p class="home__step-description">Search the parts database and narrow results by category, socket type, form factor, or storage interface.</p>
        </div>
        <div class="home__step-card">
          <span class="home__step-number">02</span>
          <h3 class="home__step-title">Build your list</h3>
          <p class="home__step-description">Add components to your build. PC Part Matcher flags any compatibility issues between your selected parts.</p>
        </div>
        <div class="home__step-card">
          <span class="home__step-number">03</span>
          <h3 class="home__step-title">Buy with confidence</h3>
          <p class="home__step-description">Click through to Amazon, Newegg or Overclockers — each link is pre-populated with the exact part name.</p>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="home__cta">
      <div class="home__cta-content">
        <h2 class="home__cta-title">Ready to start building?</h2>
        <p class="home__cta-description">Your ideal PC is a few clicks away — and it is completely free.</p>
      </div>
      <div class="home__cta-actions">
        <RouterLink to="/browse" class="home__cta-btn home__cta-btn--primary">Build your PC &rarr;</RouterLink>
        <RouterLink to="/about" class="home__cta-btn home__cta-btn--secondary">About us</RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* Base Styles */
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* Hero Section */
.home__hero {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 4rem 0;
}

.home__hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.home__hero-subtitle {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-primary);
  margin-bottom: 1rem;
  background-color: rgba(27, 75, 241, 0.1);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
}

.home__hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  margin-bottom: 1.5rem;
  color: var(--colour-secondary);
}

.home__hero-title--accent {
  color: var(--colour-primary);
}

.home__hero-description {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--colour-text-secondary);
  margin-bottom: 2.5rem;
  max-width: 550px;
  line-height: 1.6;
}

.home__hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  background-color: var(--colour-primary);
  color: white;
  text-decoration: none;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 100px; /* Fully rounded to match wireframe */
  transition: background-color 0.2s ease, transform 0.1s ease;
  min-width: 320px; /* Made the button wider as requested */
}

.home__hero-btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

.home__hero-image-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.home__hero-image {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.home__hero-image-credit {
  margin-top: 1rem;
  font: 12px var(--font-primary);
  text-align: center;
}

.home__hero-image-credit a {
  color: var(--colour-text-secondary);
  text-decoration: underline;
}

/* Features Bar */
.home__features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
  border-top: 1px solid var(--colour-border);
  border-bottom: 1px solid var(--colour-border);
  margin-bottom: 4rem;
}

.home__feature {
  display: flex;
  align-items: flex-start;
  gap: 1.25rem;
}

.home__feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--colour-primary);
  background-color: rgba(27, 75, 241, 0.05);
  padding: 1rem;
  border-radius: 50%;
  flex-shrink: 0;
}

.home__feature-title {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--colour-secondary);
}

.home__feature-description {
  font-size: 1rem;
  color: var(--colour-text-secondary);
  margin: 0;
  line-height: 1.5;
}

/* How It Works Section */
.home__steps {
  margin-bottom: 5rem;
}

.home__steps-header {
  text-align: center;
  margin-bottom: 3rem;
}

.home__section-subtitle {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-primary);
  display: block;
  margin-bottom: 1rem;
}

.home__section-title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  color: var(--colour-secondary);
  margin: 0;
}

.home__steps-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.home__step-card {
  border: 1px solid var(--colour-border);
  padding: 2.5rem;
  background-color: var(--colour-surface);
  border-radius: 16px;
  transition: box-shadow 0.3s ease;
}

.home__step-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.home__step-number {
  font-size: 3.5rem;
  font-family: var(--font-heading);
  font-weight: 800;
  color: #f1f5f9; /* Very light grey */
  display: block;
  margin-bottom: 1rem;
  line-height: 1;
}

.home__step-title {
  font-size: 1.5rem;
  color: var(--colour-secondary);
  margin-top: 0;
  margin-bottom: 1rem;
}

.home__step-description {
  color: var(--colour-text-secondary);
  line-height: 1.6;
  margin: 0;
  font-size: 1.05rem;
}

/* CTA Section */
.home__cta {
  background-color: var(--colour-secondary);
  color: white;
  padding: 4rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 2rem;
  margin-bottom: 4rem;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(12, 25, 56, 0.2);
}

.home__cta-title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin-top: 0;
  margin-bottom: 1rem;
  color: white;
}

.home__cta-description {
  color: #94a3b8;
  margin: 0;
  font-size: 1.1rem;
}

.home__cta-actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
}

.home__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 1.5rem;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  text-decoration: none;
  border-radius: 100px;
  transition: all 0.2s ease;
  width: 100%;
}

.home__cta-btn--primary {
  background-color: var(--colour-primary);
  color: white;
}

.home__cta-btn--primary:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

.home__cta-btn--secondary {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.home__cta-btn--secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Desktop Responsive Layout */
@media (min-width: 768px) {
  .home__hero {
    flex-direction: row;
    padding: 6rem 0;
    align-items: center;
  }

  .home__hero-content {
    flex: 1;
    padding-right: 2rem;
  }
  
  .home__hero-image-wrapper {
    flex: 1;
  }

  .home__features {
    flex-direction: row;
    padding: 4rem 0;
  }

  .home__feature {
    flex: 1;
  }

  .home__steps-grid {
    flex-direction: row;
  }

  .home__step-card {
    flex: 1;
  }

  .home__cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 5rem 4rem;
  }
  
  .home__cta-content {
    text-align: left;
    flex: 1;
  }

  .home__cta-actions {
    flex-direction: row;
    width: auto;
    max-width: none;
  }

  .home__cta-btn {
    width: auto;
    min-width: 180px;
  }
}
</style>
