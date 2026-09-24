<script setup>
import { RouterLink } from 'vue-router'

/**
 * Each section in the Compatibility Guide covers one component pairing.
 * The data is structured so the template can loop through it,
 * keeping the markup DRY and making future edits simple.
 */
const sections = [
  {
    icon: '🔧',
    title: 'CPU & Motherboard',
    summary: 'The CPU and motherboard must be compatible with each other. The easiest way to check is to look at the socket type — it needs to be the same on both.',
    whatToCheck: 'Every CPU has a socket type listed in its specs. Your motherboard must have the same socket. If they do not match, the CPU will not fit.',
    whyItMatters: 'There is no adapter or workaround for a socket mismatch. Getting this wrong means returning one or both parts.'
  },
  {
    icon: '🧩',
    title: 'RAM & Motherboard',
    summary: 'RAM comes in different generations — the most common are DDR4 and DDR5. Your motherboard only supports one of them, so you need to buy the right type.',
    whatToCheck: 'Look at the RAM type listed in your motherboard\'s specs (e.g. DDR4 or DDR5). Buy RAM that matches that generation.',
    whyItMatters: 'DDR4 and DDR5 sticks are physically different shapes and will not fit in the wrong slot. Speed and capacity also need to be within the board\'s supported range.'
  },
  {
    icon: '💾',
    title: 'Storage & Motherboard',
    summary: 'Most modern SSDs use an M.2 slot on the motherboard. You just need to confirm your board has a free M.2 slot and that it supports the drive\'s interface type.',
    whatToCheck: 'Check whether your motherboard has an M.2 slot and whether it supports NVMe or SATA drives (or both). Most modern boards support NVMe.',
    whyItMatters: 'A drive that uses a different interface than what the slot supports will not work, even if it physically fits.'
  },
  {
    icon: '🖥️',
    title: 'GPU & Case',
    summary: 'Graphics cards vary significantly in physical size. Before buying, check that the card will actually fit inside your chosen case.',
    whatToCheck: 'Look up the GPU\'s length in its specs and compare it to the maximum GPU length listed for your case.',
    whyItMatters: 'A card that is too long will not fit in the case, or may block drive bays. Larger cases give you more flexibility.'
  },
  {
    icon: '⚡',
    title: 'Power Supply (PSU)',
    summary: 'Your power supply needs to provide enough wattage to run all your components. It also needs the right cables to connect to your GPU.',
    whatToCheck: 'Add up the power draw of your CPU and GPU — these are the biggest consumers. Add a bit of extra headroom on top of that total when choosing a PSU.',
    whyItMatters: 'An underpowered PSU can cause crashes or prevent the system from booting. When in doubt, go slightly higher on wattage.'
  }
]
</script>

<template>
  <main class="compat-guide">
    <!-- Breadcrumb -->
    <RouterLink to="/" class="compat-guide__back">&larr; Back to Home</RouterLink>

    <!-- Page Header -->
    <header class="compat-guide__header">
      <span class="compat-guide__header-subtitle">RESOURCE</span>
      <h1 class="compat-guide__header-title">Compatibility Guide</h1>
      <p class="compat-guide__header-description">
        A simple overview of what to check before buying PC components. No jargon — just the key things that need to match.
      </p>
    </header>

    <!-- How to use this guide -->
    <div class="compat-guide__usage-box">
      <p class="compat-guide__usage-title">How to use this guide</p>
      <p class="compat-guide__usage-text">
        Each section covers one component pairing. The summary tells you the main rule to follow. The details below explain what to look at and why it matters.
      </p>
    </div>

    <!-- Compatibility Sections (loop through data) -->
    <section
      v-for="(section, index) in sections"
      :key="index"
      class="compat-guide__section"
    >
      <h2 class="compat-guide__section-title">
        <span class="compat-guide__section-icon">{{ section.icon }}</span>
        {{ section.title }}
      </h2>

      <!-- Summary box -->
      <div class="compat-guide__section-summary">
        <p>{{ section.summary }}</p>
      </div>

      <!-- What to check / Why it matters table -->
      <div class="compat-guide__detail-row">
        <span class="compat-guide__detail-label">What to check</span>
        <p class="compat-guide__detail-value">{{ section.whatToCheck }}</p>
      </div>
      <div class="compat-guide__detail-row">
        <span class="compat-guide__detail-label">Why it matters</span>
        <p class="compat-guide__detail-value">{{ section.whyItMatters }}</p>
      </div>
    </section>

    <!-- Bottom CTA -->
    <section class="compat-guide__cta">
      <div class="compat-guide__cta-content">
        <p class="compat-guide__cta-title">Ready to start building?</p>
        <p class="compat-guide__cta-description">
          Use the filters in Browse Parts to narrow down components that fit your socket, form factor, and storage requirements.
        </p>
      </div>
      <RouterLink to="/browse" class="compat-guide__cta-btn">Browse Parts &rarr;</RouterLink>
    </section>
  </main>
</template>

<style scoped>
/* ===== Base Layout ===== */
.compat-guide {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
  color: var(--colour-text-primary);
}

/* ===== Breadcrumb ===== */
.compat-guide__back {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: var(--spacing-base);
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  text-decoration: none;
}

.compat-guide__back:hover {
  text-decoration: underline;
}

/* ===== Page Header ===== */
.compat-guide__header {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
}

.compat-guide__header-subtitle {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary);
  margin-bottom: 0.5rem;
}

.compat-guide__header-title {
  font-size: 2rem;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.compat-guide__header-description {
  font-size: 1rem;
  color: var(--colour-text-secondary);
  line-height: 1.5;
  max-width: 520px;
  margin: 0;
}

/* ===== Usage Box ===== */
.compat-guide__usage-box {
  background-color: #f5f5f5;
  border: 1px solid var(--colour-border);
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.compat-guide__usage-title {
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.compat-guide__usage-text {
  margin: 0;
  color: var(--colour-text-secondary);
  line-height: 1.5;
}

/* ===== Compatibility Sections ===== */
.compat-guide__section {
  margin-bottom: 3rem;
}

.compat-guide__section-title {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--colour-border);
  margin-top: 0;
  margin-bottom: 1rem;
}

.compat-guide__section-icon {
  font-size: 1.25rem;
}

/* Summary paragraph box */
.compat-guide__section-summary {
  background-color: #f9f9f9;
  border: 1px solid var(--colour-border);
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.compat-guide__section-summary p {
  margin: 0;
  line-height: 1.5;
}

/* Detail rows (What to check / Why it matters) */
.compat-guide__detail-row {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--colour-border);
  margin-bottom: 0.5rem;
}

.compat-guide__detail-label {
  font-weight: bold;
  font-size: 0.85rem;
  padding: 0.75rem 1rem;
  background-color: #f0f0f0;
  border-bottom: 1px solid var(--colour-border);
}

.compat-guide__detail-value {
  padding: 0.75rem 1rem;
  margin: 0;
  line-height: 1.5;
  color: var(--colour-text-secondary);
}

/* ===== Bottom CTA ===== */
.compat-guide__cta {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  background-color: #f5f5f5;
  border: 1px solid var(--colour-border);
  margin-bottom: 4rem;
}

.compat-guide__cta-title {
  font-weight: bold;
  margin: 0 0 0.5rem 0;
}

.compat-guide__cta-description {
  margin: 0;
  color: var(--colour-text-secondary);
  line-height: 1.5;
}

.compat-guide__cta-btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #dcdcdc;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #aaa;
  align-self: flex-start;
}

/* ===== Desktop Layout ===== */
@media (min-width: 768px) {
  .compat-guide__header-title {
    font-size: 2.5rem;
  }

  /* Detail rows become side-by-side label | value */
  .compat-guide__detail-row {
    flex-direction: row;
    align-items: stretch;
  }

  .compat-guide__detail-label {
    min-width: 140px;
    max-width: 140px;
    display: flex;
    align-items: center;
    border-bottom: none;
    border-right: 1px solid var(--colour-border);
  }

  .compat-guide__detail-value {
    flex: 1;
  }

  /* CTA row layout */
  .compat-guide__cta {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .compat-guide__cta-btn {
    align-self: center;
    white-space: nowrap;
  }
}
</style>
