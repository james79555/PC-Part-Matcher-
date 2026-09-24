<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="home">
    <!-- Hero Section -->
    <section class="home__hero">
      <div class="home__hero-content">
        <span class="home__hero-subtitle">PC PART MATCHER</span>
        <h1 class="home__hero-title">Build your perfect PC.<br>No guesswork.</h1>
        <p class="home__hero-description">
          Browse thousands of components, check compatibility in real time, and compare prices across top retailers — all in one place.
        </p>
        <RouterLink to="/browse" class="home__hero-btn">Browse Parts &rarr;</RouterLink>
      </div>
      <div class="home__hero-image-wrapper">
        <img src="/home-image.jpg" alt="Computer Processor" class="home__hero-image" />
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
          <h3 class="home__feature-title">Smart Filtering</h3>
          <p class="home__feature-description">Filter by socket, form factor, storage interface and more</p>
        </div>
      </div>
      <div class="home__feature">
        <div class="home__feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <div class="home__feature-text">
          <h3 class="home__feature-title">Retailer Links</h3>
          <p class="home__feature-description">Compare prices on Amazon, Newegg, Scan and more</p>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section class="home__steps">
      <h2 class="home__section-title">HOW IT WORKS</h2>
      <div class="home__steps-grid">
        <div class="home__step-card">
          <span class="home__step-number">01</span>
          <h3 class="home__step-title">Browse & Filter</h3>
          <p class="home__step-description">Search the parts database and narrow results by category, socket type, form factor, or storage interface.</p>
        </div>
        <div class="home__step-card">
          <span class="home__step-number">02</span>
          <h3 class="home__step-title">Build Your List</h3>
          <p class="home__step-description">Add components to your build. PC Part Matcher flags any compatibility issues between your selected parts.</p>
        </div>
        <div class="home__step-card">
          <span class="home__step-number">03</span>
          <h3 class="home__step-title">Buy with Confidence</h3>
          <p class="home__step-description">Click through to Amazon, Newegg or Scan to purchase — each link is pre-populated with the exact part name.</p>
        </div>
      </div>
    </section>

    <!-- Browse By Category -->
    <section class="home__categories">
      <div class="home__categories-header">
        <h2 class="home__section-title">BROWSE BY CATEGORY</h2>
        <RouterLink to="/browse" class="home__categories-link">View all &rarr;</RouterLink>
      </div>
      <div class="home__categories-grid">
        <RouterLink to="/browse?category=CPU" class="home__category-card">
          <span class="home__category-name">CPU</span>
        </RouterLink>
        <RouterLink to="/browse?category=GPU" class="home__category-card">
          <span class="home__category-name">GPU</span>
        </RouterLink>
        <RouterLink to="/browse?category=Motherboard" class="home__category-card">
          <span class="home__category-name">Motherboard</span>
        </RouterLink>
        <RouterLink to="/browse?category=Memory" class="home__category-card">
          <span class="home__category-name">Memory</span>
        </RouterLink>
        <RouterLink to="/browse?category=Storage" class="home__category-card">
          <span class="home__category-name">Storage</span>
        </RouterLink>
        <RouterLink to="/browse?category=PSU" class="home__category-card">
          <span class="home__category-name">PSU</span>
        </RouterLink>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="home__cta">
      <div class="home__cta-content">
        <h2 class="home__cta-title">Ready to start building?</h2>
        <p class="home__cta-description">Your ideal PC is a few clicks away.</p>
      </div>
      <div class="home__cta-actions">
        <RouterLink to="/browse" class="home__cta-btn">Browse Parts</RouterLink>
        <RouterLink to="/about" class="home__cta-btn home__cta-btn--secondary">About Us</RouterLink>
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
  color: var(--colour-text-primary);
}

.home__section-title {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-bottom: 1.5rem;
}

/* Hero Section */
.home__hero {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem 0;
}

.home__hero-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.home__hero-subtitle {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-bottom: 1rem;
}

.home__hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.home__hero-description {
  font-size: 1.1rem;
  color: var(--colour-text-secondary);
  margin-bottom: 2rem;
  max-width: 500px;
}

.home__hero-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #dcdcdc; /* Low fidelity grey */
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #aaa;
}

.home__hero-image-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  padding: 1rem;
  border: 1px solid #ddd;
}

.home__hero-image {
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
}

.home__hero-image-credit {
  margin: 0.5rem 0 0 0;
  font: 13.0px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
}

.home__hero-image-credit a {
  color: #666;
  text-decoration: underline;
}

/* Features Bar */
.home__features {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  border-top: 1px solid var(--colour-border);
  border-bottom: 1px solid var(--colour-border);
  margin-bottom: 3rem;
}

.home__feature {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.home__feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.home__feature-title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  margin-top: 0;
}

.home__feature-description {
  font-size: 0.9rem;
  color: var(--colour-text-secondary);
  margin: 0;
}

/* How It Works Section */
.home__steps {
  margin-bottom: 4rem;
}

.home__steps-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.home__step-card {
  border: 1px solid var(--colour-border);
  padding: 2rem;
  background-color: var(--colour-surface);
}

.home__step-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #ccc;
  display: block;
  margin-bottom: 1rem;
}

.home__step-title {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.home__step-description {
  color: var(--colour-text-secondary);
  line-height: 1.5;
  margin: 0;
}

/* Browse Categories Section */
.home__categories {
  margin-bottom: 4rem;
}

.home__categories-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.home__categories-header .home__section-title {
  margin-bottom: 0;
}

.home__categories-link {
  color: #333;
  text-decoration: underline;
  font-size: 0.9rem;
}

.home__categories-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.home__category-card {
  border: 1px solid var(--colour-border);
  padding: 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--colour-surface);
  text-decoration: none;
  color: inherit;
  transition: background-color 0.2s ease;
}

.home__category-card:hover {
  background-color: #f0f0f0;
}



.home__category-name {
  font-weight: bold;
}

/* CTA Section */
.home__cta {
  background-color: #eee;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  margin-bottom: 3rem;
  border: 1px solid #ddd;
}

.home__cta-title {
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.home__cta-description {
  color: var(--colour-text-secondary);
  margin: 0;
}

.home__cta-actions {
  display: flex;
  gap: 1rem;
}

.home__cta-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #dcdcdc;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #aaa;
}

.home__cta-btn--secondary {
  background-color: transparent;
}

/* Desktop Responsive Layout */
@media (min-width: 768px) {
  .home__hero {
    flex-direction: row;
    padding: 5rem 0;
  }

  .home__hero-content, .home__hero-image-wrapper {
    flex: 1;
  }
  
  .home__hero-image-wrapper {
    order: 2;
  }
  
  .home__hero-content {
    order: 1;
  }

  .home__hero-title {
    font-size: 3.5rem;
  }

  .home__features {
    flex-direction: row;
    padding: 3rem 0;
  }

  .home__feature {
    flex: 1;
    justify-content: center;
  }
  
  .home__feature:first-child {
    border-right: 1px solid var(--colour-border);
  }

  .home__steps-grid {
    flex-direction: row;
  }

  .home__step-card {
    flex: 1;
  }

  .home__categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .home__cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
  
  .home__cta-content {
    text-align: left;
  }
}
</style>
