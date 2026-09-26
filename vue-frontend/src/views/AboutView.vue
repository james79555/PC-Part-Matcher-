<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="about">
    <!-- Breadcrumbs -->
    <nav class="about__breadcrumbs" aria-label="breadcrumb">
      <RouterLink to="/" class="about__breadcrumb-link">Home</RouterLink>
      <span class="about__breadcrumb-separator">›</span>
      <span class="about__breadcrumb-current">About Us</span>
    </nav>

    <!-- Header Section -->
    <section class="about__header">
      <div class="about__header-content">
        <span class="about__section-subtitle">ABOUT US</span>
        <h1 class="about__header-title">We help builders, not just buyers.</h1>
        <p class="about__header-description">
          PC Part Matcher was built to take the confusion out of PC building — giving everyone from first-timers to enthusiasts the tools to make smart, confident hardware decisions.
        </p>
      </div>
    </section>

    <!-- Mission & Image Section -->
    <section class="about__mission">
      <div class="about__mission-card">
        <span class="about__section-subtitle">OUR MISSION</span>
        <p class="about__mission-text">
          Building a PC should be exciting — not a minefield of incompatible sockets, mismatched memory standards, and confusing spec sheets. We created PC Part Matcher to give every builder a single, reliable place to find, filter, and compare components with confidence.
        </p>
        <p class="about__mission-text">
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
      <div class="about__stats-card">
        <div class="about__stat-item">
          <span class="about__stat-value">2026</span>
          <span class="about__stat-label">Founded</span>
        </div>
        <div class="about__stat-item">
          <span class="about__stat-value">3</span>
          <span class="about__stat-label">Retailer integrations</span>
        </div>
        <div class="about__stat-item">
          <span class="about__stat-value">Free</span>
          <span class="about__stat-label">Always, for everyone</span>
        </div>
        <div class="about__stat-item">
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
      <RouterLink to="/contact" class="about__contact-btn">Contact us &rarr;</RouterLink>
    </section>
  </main>
</template>

<style scoped>
/* Base Styles */
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

.about__section-subtitle {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--colour-primary);
  display: block;
  margin-bottom: 1rem;
}

/* Breadcrumbs */
.about__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
}

.about__breadcrumb-link {
  color: var(--colour-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.about__breadcrumb-link:hover {
  color: var(--colour-primary);
}

x {
  color: var(--colour-text-primary);
  font-weight: 500;
}

/* Header Section */
.about__header {
  padding: 2rem 0 4rem;
}

.about__header-content {
  max-width: 800px;
}

.about__header-title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  color: var(--colour-secondary);
  line-height: 1.1;
  margin-top: 0;
  margin-bottom: 1.25rem;
}

.about__header-description {
  font-size: clamp(1.1rem, 2vw, 1.25rem);
  color: var(--colour-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Mission Section */
.about__mission {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 4rem;
}

.about__mission-card {
  flex: 1.2;
  background-color: var(--colour-surface);
  border: 1px solid var(--colour-border);
  border-radius: 16px;
  padding: 2rem 2.5rem;
}

.about__mission-text {
  font-size: 1.05rem;
  line-height: 1.6;
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: var(--colour-text-secondary);
}

.about__mission-text:last-child {
  margin-bottom: 0;
}

.about__mission-image-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.about__mission-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.about__mission-image-credit {
  margin-top: 1rem;
  font-size: 0.75rem;
  color: var(--colour-text-secondary);
  text-align: center;
}

.about__mission-image-credit a {
  color: inherit;
  text-decoration: underline;
}

/* By The Numbers Section */
.about__stats {
  margin-bottom: 4rem;
}

.about__stats-card {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  background-color: var(--colour-surface);
  border: 1px solid var(--colour-border);
  border-radius: 16px;
  padding: 3rem;
}

.about__stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.about__stat-value {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 3vw, 2.5rem);
  font-weight: 800;
  color: var(--colour-secondary);
  margin-bottom: 0.5rem;
}

.about__stat-label {
  font-size: 0.95rem;
  color: var(--colour-text-secondary);
}

/* Contact CTA Banner */
.about__contact-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  padding: 3rem;
  margin-bottom: 6rem;
  background-color: #f8fafc;
  border: 1px solid var(--colour-border);
  border-radius: 16px;
}

.about__contact-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--colour-secondary);
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.about__contact-description {
  color: var(--colour-text-secondary);
  margin: 0;
  font-size: 1.05rem;
}

.about__contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  background-color: var(--colour-primary);
  color: white;
  font-family: var(--font-heading);
  font-weight: 700;
  text-decoration: none;
  border-radius: 100px;
  transition: all 0.2s ease;
  min-width: 160px;
}

.about__contact-btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

/* Desktop Responsive Layout */
@media (min-width: 768px) {
  .about__breadcrumbs {
    padding: 2rem 0;
  }

  .about__mission {
    flex-direction: row;
    align-items: center;
  }

  .about__stats-card {
    grid-template-columns: repeat(4, 1fr);
    padding: 4rem 2rem;
  }

  .about__contact-cta {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
    padding: 3rem 4rem;
  }
}
</style>