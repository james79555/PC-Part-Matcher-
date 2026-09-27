<script setup>
import { RouterLink } from 'vue-router'

const faqCategories = [
  {
    title: "Getting Started",
    items: [
      {
        question: "What is PC Part Matcher?",
        answer: "PC Part Matcher is a free tool that helps you find and compare PC components, check compatibility between parts, and build a complete system. You can browse parts, filter by socket type, form factor, and storage interface, and save your build for reference."
      },
      {
        question: "Is PC Part Matcher free to use?",
        answer: "Yes, PC Part Matcher is completely free. You can browse parts and create builds without creating an account."
      },
      {
        question: "Do I need an account to save my build?",
        answer: "Currently you can build and browse without an account. Account functionality for saving and sharing builds across sessions is planned for a future update."
      }
    ]
  },
  {
    title: "Parts & Data",
    items: [
      {
        question: "How often is the parts database updated?",
        answer: "We aim to update the parts database regularly as new components are released. If you notice a missing or incorrect part, please use the Contact Us form to report it and our team will investigate."
      },
      {
        question: "Can I suggest a part that is missing from the database?",
        answer: 'Yes, head to the Contact Us page and select "Missing Parts / Data" as your subject. Include the part name, manufacturer, and any specifications you have and we will add it as soon as possible.'
      },
      {
        question: "Why does a part show a different price than the retailer?",
        answer: "Prices shown are indicative and sourced periodically. Retailer prices change frequently so always confirm the final price on the retailer's website before purchasing."
      }
    ]
  },
  {
    title: "Builds & Sharing",
    items: [
      {
        question: "How do I share my build with someone?",
        answer: "On the My Build page, use the Share Build Link button to generate a shareable URL. Anyone with the link can view your build and its components."
      },
      {
        question: "Can I have more than one build at a time?",
        answer: "Multiple build support is on our roadmap. Currently the tool supports one active build at a time. You can clear your build and start a new one at any point."
      }
    ]
  }
]
</script>

<template>
  <div class="faq-page">
    <!-- Top White Section -->
    <section class="faq-page__hero">
      <div class="faq-page__container">
        <div class="faq-page__breadcrumb">
          <RouterLink to="/" class="faq-page__breadcrumb-link">Home</RouterLink>
          <span class="faq-page__breadcrumb-separator">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </span>
          <span class="faq-page__breadcrumb-current">FAQ</span>
        </div>

        <span class="faq-page__subtitle">SUPPORT</span>
        <h1 class="faq-page__title">Frequently asked questions</h1>
        <p class="faq-page__description">
          Everything you need to know about finding parts, checking compatibility, and building with confidence.
        </p>
      </div>
    </section>

    <!-- Main Grey Section -->
    <section class="faq-page__content">
      <div class="faq-page__container">
        
        <div class="faq-page__categories">
          <section v-for="category in faqCategories" :key="category.title" class="faq-page__category">
            
            <div class="faq-page__category-header">
              <h2 class="faq-page__category-title">{{ category.title }}</h2>
              <div class="faq-page__category-line"></div>
            </div>

            <div class="faq-page__accordion">
              <details v-for="item in category.items" :key="item.question" class="faq-page__item">
                <summary class="faq-page__question">
                  {{ item.question }}
                  <span class="faq-page__icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                </summary>
                <div class="faq-page__answer">
                  <p>{{ item.answer }}</p>
                </div>
              </details>
            </div>
            
          </section>
        </div>

        <!-- Contact CTA -->
        <section class="faq-page__contact">
          <div class="faq-page__contact-content">
            <h2 class="faq-page__contact-title">Still need help?</h2>
            <p class="faq-page__contact-desc">Our team typically responds within 2 business days.</p>
          </div>
          <RouterLink to="/contact" class="faq-page__contact-btn">
            Contact us
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </RouterLink>
        </section>

      </div>
    </section>
  </div>
</template>

<style scoped>
.faq-page {
  width: 100%;
}

.faq-page__container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* ===== Hero Section ===== */
.faq-page__hero {
  background-color: white;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid var(--colour-border);
}

.faq-page__breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  margin-bottom: 3rem;
}

.faq-page__breadcrumb-link {
  color: var(--colour-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.faq-page__breadcrumb-link:hover {
  color: var(--colour-primary);
}

.faq-page__breadcrumb-separator {
  color: #cbd5e1;
  display: flex;
  align-items: center;
}

.faq-page__breadcrumb-current {
  font-weight: 700;
  color: var(--colour-text-primary);
}

.faq-page__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.faq-page__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--colour-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.faq-page__description {
  font-size: 1.125rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  max-width: 650px;
  margin: 0;
}

/* ===== Main Content Area ===== */
.faq-page__content {
  background-color: #f8fafc; /* Very light grey */
  padding: 4rem 0 6rem 0;
}

.faq-page__categories {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  margin-bottom: 4rem;
}

.faq-page__category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.faq-page__category-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--colour-text-primary);
  margin: 0;
}

.faq-page__category-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--colour-border);
}

/* Accordion */
.faq-page__accordion {
  background-color: white;
  border: 1px solid var(--colour-border);
  border-radius: 12px;
  overflow: hidden;
}

.faq-page__item {
  border-bottom: 1px solid var(--colour-border);
}

.faq-page__item:last-child {
  border-bottom: none;
}

.faq-page__question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  font-weight: 600;
  font-size: 1.05rem;
  color: var(--colour-text-primary);
  cursor: pointer;
  list-style: none; /* removes default arrow in some browsers */
  user-select: none;
  background-color: white;
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Hide default marker in webkit */
.faq-page__question::-webkit-details-marker {
  display: none;
}

.faq-page__question:hover {
  background-color: #f8fafc;
}

/* When details is open, the question title stays black but gets a grey background */
.faq-page__item[open] .faq-page__question {
  background-color: #f8fafc;
}

.faq-page__icon {
  color: #94a3b8;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

/* Rotate icon when details is open */
.faq-page__item[open] .faq-page__icon {
  transform: rotate(180deg);
  color: var(--colour-primary);
}

.faq-page__answer {
  padding: 0 1.5rem 1.5rem 1.5rem;
  background-color: #f8fafc; /* Match the open question background */
  color: var(--colour-text-secondary);
  line-height: 1.6;
  font-size: 1rem;
}

.faq-page__answer p {
  margin: 0;
}

/* ===== Contact CTA ===== */
.faq-page__contact {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #f1f5f9; /* Very light slate */
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  align-items: center;
}

.faq-page__contact-content {
  max-width: 500px;
}

.faq-page__contact-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--colour-text-primary);
  margin: 0 0 0.5rem 0;
}

.faq-page__contact-desc {
  font-size: 1rem;
  color: var(--colour-text-secondary);
  margin: 0;
}

.faq-page__contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--colour-primary);
  color: white;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  padding: 0.875rem 1.5rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.faq-page__contact-btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

@media (min-width: 640px) {
  .faq-page__contact {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    padding: 2.5rem 3rem;
  }
}
</style>
