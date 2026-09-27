<script setup>
import { RouterLink } from 'vue-router'

const sections = [
  {
    number: '01',
    title: 'CPU & Motherboard',
    summary: 'The CPU and motherboard must be compatible with each other. The easiest way to check is to look at the socket type — it needs to be the same on both.',
    whatToCheck: 'Every CPU has a socket type listed in its specs. Your motherboard must have the same socket. If they do not match, the CPU will not fit.',
    whyItMatters: 'There is no adapter or workaround for a socket mismatch. Getting this wrong means returning one or both parts.'
  },
  {
    number: '02',
    title: 'RAM & Motherboard',
    summary: 'RAM comes in different generations — the most common are DDR4 and DDR5. Your motherboard only supports one of them, so you need to buy the right type.',
    whatToCheck: 'Look at the RAM type listed in your motherboard\'s specs (e.g. DDR4 or DDR5). Buy RAM that matches that generation.',
    whyItMatters: 'DDR4 and DDR5 sticks are physically different shapes and will not fit in the wrong slot. Speed and capacity also need to be within the board\'s supported range.'
  },
  {
    number: '03',
    title: 'Storage & Motherboard',
    summary: 'Most modern SSDs use an M.2 slot on the motherboard. You just need to confirm your board has a free M.2 slot and that it supports the drive\'s interface type.',
    whatToCheck: 'Check whether your motherboard has an M.2 slot and whether it supports NVMe or SATA drives (or both). Most modern boards support NVMe.',
    whyItMatters: 'A drive that uses a different interface than what the slot supports will not work, even if it physically fits.'
  },
  {
    number: '04',
    title: 'GPU & Case',
    summary: 'Graphics cards vary significantly in physical size. Before buying, check that the card will actually fit inside your chosen case.',
    whatToCheck: 'Look up the GPU\'s length in its specs and compare it to the maximum GPU length listed for your case.',
    whyItMatters: 'A card that is too long will not fit in the case, or may block drive bays. Larger cases give you more flexibility.'
  },
  {
    number: '05',
    title: 'Power Supply (PSU)',
    summary: 'Your power supply needs to provide enough wattage to run all your components. It also needs the right cables to connect to your GPU.',
    whatToCheck: 'Add up the power draw of your CPU and GPU — these are the biggest consumers. Add a bit of extra headroom on top of that total when choosing a PSU.',
    whyItMatters: 'An underpowered PSU can cause crashes or prevent the system from booting. When in doubt, go slightly higher on wattage.'
  }
]
</script>

<template>
  <div class="compat-guide">
    <!-- Top White Section -->
    <section class="compat-guide__hero">
      <div class="compat-guide__container">
        <RouterLink to="/" class="compat-guide__back">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </RouterLink>

        <span class="compat-guide__subtitle">RESOURCE</span>
        <h1 class="compat-guide__title">Compatibility Guide</h1>
        <p class="compat-guide__description">
          A simple overview of what to check before buying PC components. No jargon — just the key things that need to match.
        </p>
      </div>
    </section>

    <!-- Main Grey Section -->
    <section class="compat-guide__content">
      <div class="compat-guide__container">
        
        <!-- Usage Box -->
        <div class="compat-guide__usage-box">
          <svg class="compat-guide__usage-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <div class="compat-guide__usage-text-wrapper">
            <h2 class="compat-guide__usage-title">How to use this guide</h2>
            <p class="compat-guide__usage-text">
              Each section covers one component pairing. The summary tells you the main rule to follow. The details below explain what to look at and why it matters.
            </p>
          </div>
        </div>

        <!-- Sections -->
        <div class="compat-guide__sections">
          <article v-for="(section, index) in sections" :key="index" class="compat-guide__section">
            
            <!-- Section Header (with line) -->
            <div class="compat-guide__section-header">
              <div class="compat-guide__section-number">{{ section.number }}</div>
              <h2 class="compat-guide__section-title">{{ section.title }}</h2>
              <div class="compat-guide__section-line"></div>
            </div>

            <!-- Summary Box -->
            <div class="compat-guide__box compat-guide__box--summary">
              <p>{{ section.summary }}</p>
            </div>

            <!-- Grid for Check/Why -->
            <div class="compat-guide__details-grid">
              <div class="compat-guide__box compat-guide__box--detail">
                <h3 class="compat-guide__detail-title">What to check</h3>
                <p class="compat-guide__detail-text">{{ section.whatToCheck }}</p>
              </div>
              <div class="compat-guide__box compat-guide__box--detail">
                <h3 class="compat-guide__detail-title">Why it matters</h3>
                <p class="compat-guide__detail-text">{{ section.whyItMatters }}</p>
              </div>
            </div>

          </article>
        </div>

        <!-- CTA Box -->
        <div class="compat-guide__cta">
          <div class="compat-guide__cta-content">
            <h2 class="compat-guide__cta-title">Ready to start building?</h2>
            <p class="compat-guide__cta-description">
              Use the filters in Browse Parts to narrow down components that fit your requirements.
            </p>
          </div>
          <RouterLink to="/browse" class="compat-guide__cta-btn">
            Browse Parts
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </RouterLink>
        </div>

      </div>
    </section>
  </div>
</template>

<style scoped>
.compat-guide {
  width: 100%;
}

.compat-guide__container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* ===== Hero Section ===== */
.compat-guide__hero {
  background-color: white;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid var(--colour-border);
}

.compat-guide__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: color 0.2s;
}

.compat-guide__back:hover {
  color: var(--colour-primary);
}

.compat-guide__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.compat-guide__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--colour-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.compat-guide__description {
  font-size: 1.125rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  max-width: 600px;
  margin: 0;
}

/* ===== Main Content Area ===== */
.compat-guide__content {
  background-color: #f8fafc; /* Very light grey */
  padding: 4rem 0;
}

/* Usage Box */
.compat-guide__usage-box {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background-color: #eff6ff; /* Light blue tint */
  border: 1px solid #bfdbfe;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 4rem;
}

.compat-guide__usage-icon {
  color: var(--colour-primary);
  flex-shrink: 0;
  margin-top: 0.25rem;
}

.compat-guide__usage-title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--colour-secondary);
  margin: 0 0 0.5rem 0;
}

.compat-guide__usage-text {
  font-size: 1.05rem;
  color: var(--colour-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* Sections */
.compat-guide__sections {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  margin-bottom: 4rem;
}

.compat-guide__section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.compat-guide__section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.compat-guide__section-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--colour-primary);
  color: white;
  border-radius: 50%;
  font-weight: 700;
  font-family: var(--font-heading);
  flex-shrink: 0;
}

.compat-guide__section-title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--colour-secondary);
  margin: 0;
  white-space: nowrap;
}

.compat-guide__section-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--colour-border);
}

.compat-guide__box {
  background-color: white;
  border: 1px solid var(--colour-border);
  border-radius: 12px;
  padding: 2rem;
}

.compat-guide__box--summary {
  font-size: 1.1rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
}

.compat-guide__box--summary p {
  margin: 0;
}

.compat-guide__details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.compat-guide__detail-title {
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--colour-primary);
  margin: 0 0 1rem 0;
}

.compat-guide__detail-text {
  font-size: 1rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* CTA */
.compat-guide__cta {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--colour-secondary);
  border-radius: 16px;
  padding: 3rem;
  text-align: center;
  align-items: center;
}

.compat-guide__cta-content {
  max-width: 500px;
}

.compat-guide__cta-title {
  font-family: var(--font-heading);
  font-size: 2rem;
  color: white;
  margin: 0 0 1rem 0;
}

.compat-guide__cta-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.5;
}

.compat-guide__cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background-color: var(--colour-primary);
  color: white;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.compat-guide__cta-btn:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .compat-guide__details-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .compat-guide__cta {
    flex-direction: row;
    text-align: left;
    justify-content: space-between;
    padding: 3rem 4rem;
  }
}
</style>
