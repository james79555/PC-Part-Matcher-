<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about">
    <!-- Header Section -->
    <section class="about__header">
      <div class="about__header-content">
        <span class="about__header-subtitle">ABOUT US</span>
        <h1 class="about__header-title">We help builders, not just buyers.</h1>
        <p class="about__header-description">
          PC Part Matcher was built to take the confusion out of PC building — giving everyone from first-timers to enthusiasts the tools to make smart, confident hardware decisions.
        </p>
      </div>
    </section>

    <!-- Mission & Image Section -->
    <section class="about__mission">
      <div class="about__mission-text">
        <h2 class="about__section-title">OUR MISSION</h2>
        <p>
          Building a PC should be exciting — not a minefield of incompatible sockets, mismatched memory standards, and confusing spec sheets. We created PC Part Matcher to give every builder a single, reliable place to find, filter, and compare components with confidence.
        </p>
        <p>
          Whether you are putting together your first budget gaming rig or speccing out a high-end workstation, our goal is to make the process straightforward, transparent, and free.
        </p>
      </div>
      <div class="about__mission-image-wrapper">
        <img src="/aboutUs-image.jpg" alt="Team / Office Photo" class="about__mission-image" />
        <p class="about__mission-image-credit">
          <a href="https://www.pexels.com/photo/person-in-teal-long-sleeve-shirt-holding-white-and-black-chess-piece-4705628/" target="_blank" rel="noopener noreferrer">Image by cottonbro studio</a>
        </p>
      </div>
    </section>

    <!-- By The Numbers Section -->
    <section class="about__stats">
      <h2 class="about__section-title about__section-title--centered">BY THE NUMBERS</h2>
      <div class="about__stats-grid">
        <div class="about__stat-card">
          <span class="about__stat-value">2026</span>
          <span class="about__stat-label">Founded</span>
        </div>
        <div class="about__stat-card">
          <span class="about__stat-value">3</span>
          <span class="about__stat-label">Retailer integrations</span>
        </div>
        <div class="about__stat-card">
          <span class="about__stat-value">Free</span>
          <span class="about__stat-label">Always, for everyone</span>
        </div>
        <div class="about__stat-card">
          <span class="about__stat-value">50,000+</span>
          <span class="about__stat-label">Builders & counting</span>
        </div>
      </div>
    </section>

    <!-- Contact CTA Banner -->
    <section class="about__contact-cta">
      <div class="about__contact-content">
        <h3 class="about__contact-title">Want to get in touch?</h3>
        <p class="about__contact-description">Questions, feedback, or partnership enquiries — we would love to hear from you.</p>
      </div>
      <RouterLink to="/contact" class="about__contact-btn">Contact Us &rarr;</RouterLink>
    </section>
  </main>
</template>

<style scoped>
/* Base Styles */
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-base, 1rem);
  color: var(--colour-text-primary, #333);
}

.about__section-title {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-text-secondary, #666);
  margin-bottom: 1.5rem;
}

.about__section-title--centered {
  text-align: center;
}

/* Header Section */
.about__header {
  background-color: #e9e9e9; /* Low fidelity grey band */
  padding: 4rem 2rem;
  margin: 0 calc(-50vw + 50%); /* Full width bleed trick */
  display: flex;
  justify-content: center;
}

.about__header-content {
  max-width: 1200px;
  width: 100%;
}

.about__header-subtitle {
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-text-secondary, #666);
  margin-bottom: 1rem;
  display: block;
}

.about__header-title {
  font-size: 2.5rem;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 1rem;
}

.about__header-description {
  font-size: 1.1rem;
  color: var(--colour-text-secondary, #666);
  margin: 0;
  max-width: 600px;
  line-height: 1.5;
}

/* Mission Section */
.about__mission {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 4rem 0;
  border-bottom: 1px solid var(--colour-border, #ddd);
}

.about__mission-text {
  flex: 1;
}

.about__mission-text p {
  line-height: 1.6;
  margin-bottom: 1rem;
  color: var(--colour-text-secondary, #555);
}

.about__mission-image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #eee;
  padding: 1rem;
  border: 1px solid #ddd;
}

.about__mission-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
}

.about__mission-image-credit {
  margin: 0.5rem 0 0 0;
  font: 13.0px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  text-align: center;
}

.about__mission-image-credit a {
  color: #666;
  text-decoration: underline;
}

/* By The Numbers Section */
.about__stats {
  padding: 4rem 0;
}

.about__stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  border: 1px solid var(--colour-border, #ddd);
  background-color: var(--colour-surface, #fff);
}

.about__stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid var(--colour-border, #ddd);
}

.about__stat-card:last-child {
  border-bottom: none;
}

.about__stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: var(--colour-text-primary, #333);
}

.about__stat-label {
  font-size: 0.9rem;
  color: var(--colour-text-secondary, #666);
}

/* Contact CTA Banner */
.about__contact-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 4rem;
  border: 2px dashed #aaa;
  background-color: #fafafa;
}

.about__contact-title {
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.about__contact-description {
  color: var(--colour-text-secondary, #666);
  margin: 0;
}

.about__contact-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #dcdcdc; /* Low fidelity grey */
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #aaa;
}

/* Desktop Responsive Layout */
@media (min-width: 768px) {
  .about__header-title {
    font-size: 3.5rem;
  }

  .about__mission {
    flex-direction: row;
    align-items: center;
    border-bottom: none;
  }

  .about__stats {
    background-color: #eee;
    padding: 3rem 2rem;
    margin: 0 calc(-50vw + 50%); /* Full width bleed trick */
    margin-bottom: 4rem;
  }
  
  .about__stats-grid {
    grid-template-columns: repeat(4, 1fr);
    max-width: 1200px;
    margin: 0 auto;
    border: none;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    background-color: transparent;
  }
  
  .about__stat-card {
    border-bottom: none;
    border-right: 1px solid #ccc;
  }

  .about__stat-card:last-child {
    border-right: none;
  }

  .about__contact-cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .about__contact-content {
    text-align: left;
  }
}
</style>