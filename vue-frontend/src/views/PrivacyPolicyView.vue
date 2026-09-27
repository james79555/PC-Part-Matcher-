<script setup>
import { RouterLink } from 'vue-router'

/**
 * Each section is an object with a heading and an array of paragraphs.
 * The optional 'link' property adds an inline RouterLink below the paragraphs.
 * This keeps all content in one place and the template simply iterates over it.
 */
const sections = [
  {
    heading: 'Who we are',
    paragraphs: [
      'PC Part Matcher is a free, independent tool that helps people find, compare, and plan PC component purchases. We are not affiliated with any retailer or manufacturer.',
      'If you have any questions about this policy, please use the Contact Us page to get in touch.'
    ]
  },
  {
    heading: 'What information we collect',
    paragraphs: [
      'PC Part Matcher does not collect personal data. We do not ask you to register an account, and we do not track your behaviour across the web.',
      'The only data stored in your browser is your current build list and your cookie consent preference, both saved to localStorage on your device. This data never leaves your browser — it is not sent to any server.'
    ]
  },
  {
    heading: 'How we use your information',
    paragraphs: [
      'Because we do not collect personal data, there is no personal information for us to use, share, or process.',
      'Data you enter into the Contact Us form (your name, email address, and message) is used solely to respond to your enquiry. This data is not stored beyond the period needed to handle your request.'
    ]
  },
  {
    heading: 'Cookies and local storage',
    paragraphs: [
      'PC Part Matcher uses browser localStorage — not traditional cookies — to save your build list and consent preference. We do not use advertising cookies, analytics cookies, or any third-party tracking technology.',
      'For full details of what is stored and how to remove it, please see our Cookie Policy.'
    ],
    link: { to: '/cookie-policy', text: 'View Cookie Policy →' }
  },
  {
    heading: 'Third-party links',
    paragraphs: [
      'Pages on PC Part Matcher include links to external retailer websites (such as Amazon, Newegg, and Overclockers). When you follow one of these links, you leave PC Part Matcher and enter a site with its own privacy policy.',
      'We are not responsible for the privacy practices of external sites. We encourage you to read the privacy policy of any site you visit.'
    ]
  },
  {
    heading: 'External services',
    paragraphs: [
      'PC Part Matcher fetches data from two external services: a WordPress REST API for the parts catalogue, and the Frankfurter API for live currency exchange rates. Neither call involves personal data — no user identifiers are sent.'
    ]
  },
  {
    heading: 'Data retention',
    paragraphs: [
      'We do not store personal data on our servers. Build data and preferences exist only in your own browser\'s localStorage and are retained until you clear them.',
      'If you submit a contact enquiry, your message may be retained for a reasonable period to allow us to respond and to maintain a record of correspondence.'
    ]
  },
  {
    heading: 'Your rights',
    paragraphs: [
      'Because we do not hold personal data about you on our systems, most data subject rights (access, rectification, erasure) are satisfied automatically — there is nothing for us to provide or delete.',
      'If you believe we hold personal data about you, or have any other concern about your privacy, please contact us and we will respond promptly.'
    ]
  },
  {
    heading: 'Changes to this policy',
    paragraphs: [
      'We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. We encourage you to check back periodically.'
    ]
  }
]

/**
 * Related links are also data-driven so adding a new card
 * only requires appending an object to this array.
 */
const relatedLinks = [
  { to: '/terms-of-service', title: 'Terms of Service →', desc: 'The rules governing your use of PC Part Matcher.' },
  { to: '/cookie-policy', title: 'Cookie Policy →', desc: 'What we store in your browser and why.' }
]
</script>

<template>
  <div class="privacy-policy">
    <!-- Top White Section -->
    <section class="privacy-policy__hero">
      <div class="privacy-policy__container">
        <div class="privacy-policy__breadcrumb">
          <RouterLink to="/" class="privacy-policy__breadcrumb-link">Home</RouterLink>
          <span class="privacy-policy__breadcrumb-separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span class="privacy-policy__breadcrumb-current">Privacy Policy</span>
        </div>

        <span class="privacy-policy__subtitle">LEGAL</span>
        <h1 class="privacy-policy__title">Privacy Policy</h1>
        <p class="privacy-policy__description">Last updated: September 2026</p>
      </div>
    </section>

    <!-- Main Grey Section -->
    <section class="privacy-policy__content">
      <div class="privacy-policy__container">

      <!-- Iterate over sections array -->
      <section
        v-for="(section, index) in sections"
        :key="index"
        class="privacy-policy__section"
      >
        <h2 class="privacy-policy__section-title">{{ section.heading }}</h2>
        <p v-for="(paragraph, pIndex) in section.paragraphs" :key="pIndex">{{ paragraph }}</p>
        <!-- Optional inline link (only renders if the section has one) -->
        <RouterLink
          v-if="section.link"
          :to="section.link.to"
          class="privacy-policy__inline-link"
        >
          {{ section.link.text }}
        </RouterLink>
      </section>

      <!-- Related links -->
      <section class="privacy-policy__related">
        <h2 class="privacy-policy__related-title">RELATED</h2>
        <div class="privacy-policy__related-grid">
          <RouterLink
            v-for="(link, index) in relatedLinks"
            :key="index"
            :to="link.to"
            class="privacy-policy__related-card"
          >
            <p class="privacy-policy__related-card-title">{{ link.title }}</p>
            <p class="privacy-policy__related-card-desc">{{ link.desc }}</p>
          </RouterLink>
        </div>
      </section>

      </div>
    </section>
  </div>
</template>

<style scoped>
/* ===== Base Layout ===== */
.privacy-policy {
  width: 100%;
}

.privacy-policy__container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* ===== Hero Section ===== */
.privacy-policy__hero {
  background-color: white;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid var(--colour-border);
}

.privacy-policy__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 3rem;
}

.privacy-policy__breadcrumb-link {
  color: var(--colour-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.privacy-policy__breadcrumb-link:hover {
  color: var(--colour-primary);
}

.privacy-policy__breadcrumb-separator {
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

.privacy-policy__breadcrumb-current {
  font-weight: 700;
  color: var(--colour-text-primary);
}

.privacy-policy__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.privacy-policy__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--colour-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.privacy-policy__description {
  font-size: 1.125rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  max-width: 650px;
  margin: 0;
}

/* ===== Page Body ===== */
.privacy-policy__content {
  background-color: #f8fafc; /* Very light grey */
  padding: 4rem 0 6rem 0;
}

/* ===== Sections ===== */
.privacy-policy__section {
  margin-bottom: 2.5rem;
  padding-bottom: 2.5rem;
  border-bottom: 1px solid var(--colour-border);
}

.privacy-policy__section-title {
  font-size: 1.1rem;
  margin-top: 0;
  margin-bottom: 1rem;
}

.privacy-policy__section p {
  line-height: 1.6;
  color: var(--colour-text-secondary);
  margin-bottom: 1rem;
}

.privacy-policy__section p:last-of-type {
  margin-bottom: 0;
}

/* Inline link within a section (e.g. View Cookie Policy) */
.privacy-policy__inline-link {
  display: inline-block;
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--colour-text-secondary);
  text-decoration: underline;
}

.privacy-policy__inline-link:hover {
  color: var(--colour-text-primary);
}

/* ===== Related Links ===== */
.privacy-policy__related {
  padding-top: 0;
}

.privacy-policy__related-title {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.privacy-policy__related-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.privacy-policy__related-card {
  display: block;
  border: 1px solid var(--colour-border);
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  background-color: var(--colour-surface);
  transition: background-color 0.15s ease;
}

.privacy-policy__related-card:hover {
  background-color: #f0f0f0;
}

.privacy-policy__related-card-title {
  font-weight: bold;
  margin: 0 0 0.4rem 0;
}

.privacy-policy__related-card-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  line-height: 1.5;
}

/* ===== Desktop ===== */
@media (min-width: 768px) {
  .privacy-policy__related-grid {
    flex-direction: row;
  }

  .privacy-policy__related-card {
    flex: 1;
  }
}
</style>
