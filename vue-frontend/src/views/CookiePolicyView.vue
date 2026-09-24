<script setup>
import { RouterLink } from 'vue-router'

/**
 * The two storage items the app currently uses.
 * Structured as data so the table can be rendered via v-for,
 * making future additions easy without changing the template.
 */
const storageItems = [
  {
    key: 'build',
    type: 'localStorage',
    description: 'Saves your current build list so it persists between page refreshes. Without it, your build would be lost every time you navigate away.',
    duration: 'Persistent — until you clear your browser storage or remove parts from your build.'
  },
  {
    key: 'cookie_consent',
    type: 'localStorage (planned)',
    description: 'Will store your cookie consent preference (accepted or rejected) so the consent banner does not reappear on every visit.',
    duration: 'Persistent — until you clear your browser storage.'
  }
]
</script>

<template>
  <main class="cookie-policy">
    <!-- Breadcrumb -->
    <RouterLink to="/" class="cookie-policy__back">&larr; Back to Home</RouterLink>

    <!-- Page Header -->
    <header class="cookie-policy__header">
      <span class="cookie-policy__header-label">LEGAL</span>
      <h1 class="cookie-policy__header-title">Cookie &amp; Storage Policy</h1>
      <p class="cookie-policy__header-date">Last updated: September 2026</p>
    </header>

    <div class="cookie-policy__body">

      <!-- Section: What is a cookie -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">What is a cookie?</h2>
        <p>A cookie is a small text file that a website stores on your device when you visit. Cookies are widely used to make websites work more efficiently and to remember your preferences between visits.</p>
        <p>Some sites also use cookies for analytics and advertising. PC Part Matcher does not — our use of browser storage is limited to what is strictly necessary to keep the site working.</p>
      </section>

      <!-- Section: What we store -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">What we store</h2>
        <p>PC Part Matcher uses <strong>localStorage</strong> — a browser storage mechanism — rather than traditional cookies. The two items we store are both strictly necessary:</p>

        <!-- Storage items table -->
        <div class="cookie-policy__table">
          <div
            v-for="item in storageItems"
            :key="item.key"
            class="cookie-policy__table-row"
          >
            <div class="cookie-policy__table-key">
              <code class="cookie-policy__table-code">{{ item.key }}</code>
              <span class="cookie-policy__table-type">{{ item.type }}</span>
            </div>
            <div class="cookie-policy__table-info">
              <p class="cookie-policy__table-desc">{{ item.description }}</p>
              <p class="cookie-policy__table-duration">{{ item.duration }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: What we do not do -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">What we do not do</h2>
        <p>PC Part Matcher does not use cookies or storage for any of the following:</p>
        <ul class="cookie-policy__list">
          <li class="cookie-policy__list-item">Analytics or usage tracking</li>
          <li class="cookie-policy__list-item">Advertising or retargeting</li>
          <li class="cookie-policy__list-item">Third-party tracking cookies of any kind</li>
          <li class="cookie-policy__list-item">Selling or sharing your data with any third party</li>
          <li class="cookie-policy__list-item">Identifying you personally in any way</li>
        </ul>
      </section>

      <!-- Section: Third-party links -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">Third-party links</h2>
        <p>PC Part Matcher includes links to retailer websites — including Amazon, Newegg, and Scan — which open in a new tab. These links take you to external sites that have their own cookie and privacy policies. We have no control over cookies set by those sites, and clicking a retailer link does not set any cookie on the PC Part Matcher domain.</p>
      </section>

      <!-- Section: External services -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">External services we call</h2>
        <p>PC Part Matcher fetches data from two external APIs to power its features. Neither call involves personal data:</p>
        <ul class="cookie-policy__list">
          <li class="cookie-policy__list-item"><strong>WordPress REST API</strong> — Fetches the parts catalogue. No personal data is sent.</li>
          <li class="cookie-policy__list-item"><strong>Frankfurter API</strong> — Fetches live currency exchange rates for the currency selector. No personal data is sent.</li>
        </ul>
      </section>

      <!-- Section: How to clear -->
      <section class="cookie-policy__section">
        <h2 class="cookie-policy__section-title">How to clear your stored data</h2>
        <p>You can remove anything PC Part Matcher has stored in your browser at any time. The steps vary slightly by browser:</p>
        <ul class="cookie-policy__list">
          <li class="cookie-policy__list-item"><strong>Chrome / Edge:</strong> Settings &rarr; Privacy and security &rarr; Clear browsing data &rarr; Cookies and other site data</li>
          <li class="cookie-policy__list-item"><strong>Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data &rarr; Clear Data</li>
          <li class="cookie-policy__list-item"><strong>Safari:</strong> Settings &rarr; Safari &rarr; Clear History and Website Data</li>
        </ul>
        <p class="cookie-policy__clear-note">Clearing site data will remove your saved build and consent preference. Your build will be empty the next time you visit.</p>
      </section>

      <!-- Bottom CTA -->
      <section class="cookie-policy__cta">
        <div class="cookie-policy__cta-content">
          <p class="cookie-policy__cta-title">Questions about this policy?</p>
          <p class="cookie-policy__cta-desc">Get in touch with the PC Part Matcher team and we will be happy to help.</p>
        </div>
        <RouterLink to="/contact" class="cookie-policy__cta-btn">Contact Us &rarr;</RouterLink>
      </section>

    </div>
  </main>
</template>

<style scoped>
/* ===== Base Layout ===== */
.cookie-policy {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
  color: var(--colour-text-primary);
}

/* ===== Breadcrumb ===== */
.cookie-policy__back {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: var(--spacing-base);
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  text-decoration: none;
}

.cookie-policy__back:hover {
  text-decoration: underline;
}

/* ===== Page Header ===== */
.cookie-policy__header {
  background-color: #e9e9e9;
  padding: 2rem var(--spacing-base);
  margin-bottom: 3rem;
}

.cookie-policy__header-label {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-bottom: 0.5rem;
}

.cookie-policy__header-title {
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
}

.cookie-policy__header-date {
  margin: 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
}

/* ===== Page Body ===== */
.cookie-policy__body {
  padding-bottom: 4rem;
}

/* ===== Sections ===== */
.cookie-policy__section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--colour-border);
}

.cookie-policy__section:last-of-type {
  border-bottom: none;
}

.cookie-policy__section-title {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.cookie-policy__section p {
  line-height: 1.6;
  color: var(--colour-text-secondary);
  margin-bottom: 1rem;
}

.cookie-policy__section p:last-child {
  margin-bottom: 0;
}

/* ===== Storage Items Table ===== */
.cookie-policy__table {
  margin-top: 1.5rem;
  border: 1px solid var(--colour-border);
}

.cookie-policy__table-row {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--colour-border);
}

.cookie-policy__table-row:last-child {
  border-bottom: none;
}

.cookie-policy__table-key {
  padding: 1rem;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  border-bottom: 1px solid var(--colour-border);
}

.cookie-policy__table-code {
  font-family: monospace;
  font-weight: bold;
  font-size: 0.9rem;
  color: #333;
}

.cookie-policy__table-type {
  font-size: 0.8rem;
  color: var(--colour-text-secondary);
}

.cookie-policy__table-info {
  padding: 1rem;
}

.cookie-policy__table-desc {
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
  color: var(--colour-text-secondary);
}

.cookie-policy__table-duration {
  margin: 0;
  font-size: 0.8rem;
  color: var(--colour-text-secondary);
}

/* ===== Lists ===== */
.cookie-policy__list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cookie-policy__list-item {
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.5;
  color: var(--colour-text-secondary);
  font-size: 0.95rem;
}

/* Custom dash bullet to match the wireframe */
.cookie-policy__list-item::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #999;
}

.cookie-policy__section .cookie-policy__clear-note {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
  font-style: italic;
}

/* ===== Bottom CTA ===== */
.cookie-policy__cta {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border: 2px dashed #aaa;
  margin-top: 3rem;
}

.cookie-policy__cta-title {
  font-weight: bold;
  margin: 0 0 0.4rem 0;
  color: var(--colour-text-primary);
}

.cookie-policy__cta-desc {
  margin: 0;
  color: var(--colour-text-secondary);
}

.cookie-policy__cta-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #dcdcdc;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #aaa;
  align-self: flex-start;
}

/* ===== Desktop ===== */
@media (min-width: 768px) {
  .cookie-policy__header {
    padding: 3rem 2rem;
  }
  
  .cookie-policy__header-title {
    font-size: 2.5rem;
  }

  /* Storage table becomes 2-column side by side */
  .cookie-policy__table-row {
    flex-direction: row;
    align-items: stretch;
  }

  .cookie-policy__table-key {
    min-width: 180px;
    max-width: 180px;
    border-bottom: none;
    border-right: 1px solid var(--colour-border);
    justify-content: center;
  }

  /* CTA becomes row layout */
  .cookie-policy__cta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .cookie-policy__cta-btn {
    align-self: center;
    white-space: nowrap;
  }
}
</style>
