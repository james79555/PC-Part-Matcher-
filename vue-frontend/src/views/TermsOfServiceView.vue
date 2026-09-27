<script setup>
import { RouterLink } from 'vue-router'

/**
 * Each section has a heading and an array of paragraphs.
 * The template iterates over this array with v-for,
 * keeping all content in one manageable place.
 */
const sections = [
  {
    heading: 'Acceptance of terms',
    paragraphs: [
      'By accessing or using PC Part Matcher, you agree to be bound by these Terms of Service. If you do not agree, please do not use the site.',
      'We may update these terms from time to time. Continued use of the site after changes are posted constitutes acceptance of the revised terms.'
    ]
  },
  {
    heading: 'What PC Part Matcher is',
    paragraphs: [
      'PC Part Matcher is an informational tool that helps users browse, filter, and compare PC components. It is provided free of charge and requires no account or registration.',
      'PC Part Matcher does not sell components. Links to retailer websites are provided for convenience — any purchase you make is a transaction between you and that retailer, not PC Part Matcher.'
    ]
  },
  {
    heading: 'Accuracy of information',
    paragraphs: [
      'We make reasonable efforts to ensure the parts data shown on PC Part Matcher is accurate and up to date. However, we cannot guarantee that all specifications, prices, or availability information are correct at all times.',
      'Always verify component specifications with the manufacturer and retailer before making a purchase. PC Part Matcher accepts no liability for purchases made on the basis of information displayed on this site.'
    ]
  },
  {
    heading: 'Retailer links',
    paragraphs: [
      'PC Part Matcher includes links to third-party retailer websites. These links open in a new tab and take you to sites that are outside our control. We are not responsible for the content, availability, or practices of external sites.',
      'PC Part Matcher does not earn commission or affiliate fees from retailer links at this time.'
    ]
  },
  {
    heading: 'Intellectual property',
    paragraphs: [
      'The text, design, and code of PC Part Matcher are the property of its creators. You may not reproduce, copy, or distribute any part of the site without permission.',
      'Component names, brand names, and trademarks mentioned on the site belong to their respective owners. Their use is for identification purposes only and does not imply endorsement.'
    ]
  },
  {
    heading: 'Disclaimer of warranties',
    paragraphs: [
      'PC Part Matcher is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components.'
    ]
  },
  {
    heading: 'Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, PC Part Matcher and its creators shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or from purchases made following links on the site.'
    ]
  },
  {
    heading: 'Governing law',
    paragraphs: [
      'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.'
    ]
  },
  {
    heading: 'Contact',
    paragraphs: [
      'If you have any questions about these Terms of Service, please use the Contact Us page.'
    ]
  }
]

/**
 * Related links rendered as cards at the bottom of the page.
 */
const relatedLinks = [
  { to: '/privacy-policy', title: 'Privacy Policy →', desc: 'How we handle your data and protect your privacy.' },
  { to: '/cookie-policy', title: 'Cookie Policy →', desc: 'What we store in your browser and why.' }
]
</script>

<template>
  <div class="terms">
    <!-- Top White Section -->
    <section class="terms__hero">
      <div class="terms__container">
        <div class="terms__breadcrumb">
          <RouterLink to="/" class="terms__breadcrumb-link">Home</RouterLink>
          <span class="terms__breadcrumb-separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span class="terms__breadcrumb-current">Terms of Service</span>
        </div>

        <span class="terms__subtitle">LEGAL</span>
        <h1 class="terms__title">Terms of Service</h1>
        <p class="terms__description">Last updated: September 2026</p>
      </div>
    </section>

    <!-- Main Grey Section -->
    <section class="terms__content">
      <div class="terms__container">

      <!-- Iterate over sections array -->
      <section
        v-for="(section, index) in sections"
        :key="index"
        class="terms__section"
      >
        <h2 class="terms__section-title">{{ section.heading }}</h2>
        <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
      </section>

      <!-- Related links -->
      <section class="terms__related">
        <h2 class="terms__related-title">RELATED</h2>
        <div class="terms__related-grid">
          <RouterLink
            v-for="(link, index) in relatedLinks"
            :key="index"
            :to="link.to"
            class="terms__related-card"
          >
            <p class="terms__related-card-title">{{ link.title }}</p>
            <p class="terms__related-card-desc">{{ link.desc }}</p>
          </RouterLink>
        </div>
      </section>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Base Layout ===== */
.terms {
  width: 100%;
}

.terms__container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* ===== Hero Section ===== */
.terms__hero {
  background-color: white;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid var(--colour-border);
}

.terms__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 3rem;
}

.terms__breadcrumb-link {
  color: var(--colour-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.terms__breadcrumb-link:hover {
  color: var(--colour-primary);
}

.terms__breadcrumb-separator {
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

.terms__breadcrumb-current {
  font-weight: 700;
  color: var(--colour-text-primary);
}

.terms__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.terms__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--colour-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.terms__description {
  font-size: 1.125rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  max-width: 650px;
  margin: 0;
}

/* ===== Page Body ===== */
.terms__content {
  background-color: #f8fafc; /* Very light grey */
  padding: 4rem 0 6rem 0;
}

/* ===== Sections ===== */
.terms__section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--colour-border);
}

.terms__section-title {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.terms__section p {
  line-height: 1.6;
  color: var(--colour-text-secondary);
  margin-bottom: 1rem;
}

.terms__section p:last-of-type {
  margin-bottom: 0;
}

/* ===== Related Links ===== */
.terms__related {
  padding-top: 0;
}

.terms__related-title {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.terms__related-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.terms__related-card {
  display: block;
  border: 1px solid var(--colour-border);
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  background-color: var(--colour-surface);
  transition: background-color 0.15s ease;
}

.terms__related-card:hover {
  background-color: #f0f0f0;
}

.terms__related-card-title {
  font-weight: bold;
  margin: 0 0 0.4rem 0;
}

.terms__related-card-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  line-height: 1.5;
}

/* ===== Desktop ===== */
@media (min-width: 768px) {
  .terms__related-grid {
    flex-direction: row;
  }

  .terms__related-card {
    flex: 1;
  }
}
</style>
