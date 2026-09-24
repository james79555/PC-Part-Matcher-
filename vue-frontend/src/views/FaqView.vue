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
        question: "Is PC Part Matcher Free to Use?",
        answer: "Yes, PC Part Matcher is completely free. You can browse parts and create builds without creating an account."
      },
      {
        question: "Do i need an account to save my build?",
        answer: "Currently you can build and browse without an account. Account functionality for saving and sharing builds across sessions is planned for a future update."
      }
    ]
  },
  {
    title: "Parts & Data",
    items: [
      {
        question: "How Often Is The Parts Database Updated?",
        answer: "We aim to update the parts database regularly as new components are released. If you notice a missing or incorrect part, please use the Contact Us form to report it and our team will investigate."
      },
      {
        question: "Can i suggest a part that is missing from the database?",
        answer: 'Yes, head to the Contact Us page and select "Missing Parts / Data" as your subject. Include the part name, manufacturer, and any specifications you have and we will add it as soon as possible.'
      },
      {
        question: "Why Does a Part Show a Different Price Than The Retailer?",
        answer: "Prices shown are indicative and sourced periodically. Retailer prices change frequently so always confirm the final price on the retailer's website before purchasing."
      }
    ]
  },
  {
    title: "Builds & Sharing",
    items: [
      {
        question: "How Do i Share My Build With Someone?",
        answer: "On the My Build page, use the Share Build Link button to generate a shareable URL. Anyone with the link can view your build and its components."
      },
      {
        question: "Can i Have More Than One Build At a Time?",
        answer: "Multiple build support is on our roadmap. Currently the tool supports one active build at a time. You can clear your build and start a new one at any point."
      }
    ]
  }
]
</script>

<template>
  <main class="faq-page">
    <header class="faq-page__header">
      <h1>Frequently Asked Questions</h1>
      <p>Find answers to common questions about PC Part Matcher below.</p>
    </header>

    <div class="faq-page__content">
      <section v-for="category in faqCategories" :key="category.title" class="faq-page__category">
        <h2>{{ category.title }}</h2>
        <div class="faq-page__accordion">
          <!-- We use the native HTML <details> and <summary> tags which provide accessible accordion behavior out of the box -->
          <details v-for="item in category.items" :key="item.question" class="faq-page__item">
            <summary class="faq-page__question">
              {{ item.question }}
              <span class="faq-page__icon">▼</span>
            </summary>
            <div class="faq-page__answer">
              <p>{{ item.answer }}</p>
            </div>
          </details>
        </div>
      </section>
    </div>

    <section class="faq-page__contact">
      <h2>Still need help?</h2>
      <p>If you couldn't find the answer to your question, our support team is here to help.</p>
      <RouterLink to="/contact" class="faq-page__contact-btn">Contact Us</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.faq-page {
  padding: var(--spacing-base);
  max-width: 800px;
  margin: 0 auto;
}

.faq-page__header {
  text-align: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--colour-border);
}

.faq-page__header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.faq-page__header p {
  color: var(--colour-text-secondary);
  font-size: 1.1rem;
}

.faq-page__category {
  margin-bottom: 2.5rem;
}

.faq-page__category h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--colour-text-primary);
}

.faq-page__accordion {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-page__item {
  background: var(--colour-surface);
  border: 1px solid var(--colour-border);
  border-radius: var(--border-radius);
  overflow: hidden;
}

.faq-page__question {
  padding: 1rem 1.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  list-style: none; /* removes default arrow in some browsers */
  user-select: none;
  background-color: #f9f9f9;
  transition: background-color 0.2s ease;
}

/* Hide default marker in webkit */
.faq-page__question::-webkit-details-marker {
  display: none;
}

.faq-page__question:hover {
  background-color: #f0f0f0;
}

.faq-page__icon {
  font-size: 0.8rem;
  transition: transform 0.3s ease;
  color: #666;
}

/* Rotate icon when details is open */
.faq-page__item[open] .faq-page__icon {
  transform: rotate(180deg);
}

.faq-page__answer {
  padding: 1rem 1.5rem;
  border-top: 1px solid var(--colour-border);
  background-color: white;
  color: var(--colour-text-secondary);
  line-height: 1.5;
}

.faq-page__answer p {
  margin: 0;
}

.faq-page__contact {
  text-align: center;
  margin-top: 3rem;
  padding: 2.5rem;
  background-color: #f8f9fa;
  border-radius: var(--border-radius);
  border: 1px solid var(--colour-border);
}

.faq-page__contact h2 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.faq-page__contact p {
  color: var(--colour-text-secondary);
  margin-bottom: 1.5rem;
}

.faq-page__contact-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  font-weight: bold;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.faq-page__contact-btn:hover {
  background-color: #0056b3;
}
</style>
