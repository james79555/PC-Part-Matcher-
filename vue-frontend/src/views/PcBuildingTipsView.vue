<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const phases = [
  {
    number: '01',
    title: 'Plan before you buy',
    tips: [
      {
        heading: 'Set a budget first',
        body: 'Decide your total spend before looking at parts. The GPU and CPU typically consume the largest share. Rough split for a gaming build: 35% GPU, 20% CPU, 15% motherboard, 10% RAM, 10% storage, 10% case + PSU + cooling.'
      },
      {
        heading: 'Know your use case',
        body: 'Gaming prioritises GPU. Video editing and 3D rendering benefit from high core-count CPUs and fast NVMe storage. Workstations need ECC RAM support. Light office builds are CPU-bound far less than people assume.'
      },
      {
        heading: 'Check the compatibility guide',
        body: 'Before finalising any combination of CPU, motherboard, and RAM, confirm socket and DDR generation match. One mismatch can cascade into replacing two components.'
      }
    ]
  },
  {
    number: '02',
    title: 'Prepare your workspace',
    tips: [
      {
        heading: 'Use a static-safe surface',
        body: 'Work on a hard, non-carpeted surface. Touch a metal part of the case regularly to discharge static. An anti-static wrist strap is inexpensive and eliminates the risk entirely.'
      },
      {
        heading: 'Keep the manual open',
        body: 'Every motherboard manual shows the correct RAM slot population order, front panel header pin layout, and M.2 slot restrictions. It is the most useful document you have during a build.'
      },
      {
        heading: 'Sort your screws',
        body: 'Cases ship with several different screw types. Sort them into groups before you start. Standoff screws, fan screws, drive screws, and panel screws are all different sizes.'
      }
    ]
  },
  {
    number: '03',
    title: 'Installing components',
    tips: [
      {
        heading: 'CPU goes in first',
        body: 'Install the CPU into the motherboard before placing the board in the case. It is far easier to handle at a workbench. Align the triangle marker on the CPU with the socket marker. Do not force it.'
      },
      {
        heading: 'Install RAM before the cooler',
        body: 'Fit RAM sticks before mounting the CPU cooler, especially if you are using a large tower cooler that may overhang the DIMM slots.'
      },
      {
        heading: 'Apply thermal paste correctly',
        body: 'A pea-sized dot in the centre of the IHS is sufficient for most coolers. The pressure of mounting will spread it. Spreading it manually risks air pockets and uneven coverage.'
      },
      {
        heading: 'Route cables before closing the case',
        body: 'Plan your cable routing with the side panel off. Route cables behind the motherboard tray where possible. Good airflow matters more than aesthetics, but tidy cables help both.'
      }
    ]
  },
  {
    number: '04',
    title: 'First boot checklist',
    tips: [
      {
        heading: 'Double-check connections before powering on',
        body: 'Verify the 24-pin ATX, CPU 4/8-pin, GPU PCIe power, front panel headers, and SATA/NVMe data connections are all seated firmly. A loose front panel header is a very common cause of a build that does not POST.'
      },
      {
        heading: 'POST before installing the OS',
        body: 'Boot into BIOS first. Verify the CPU, RAM (speed and capacity), and storage are all recognised correctly before loading the OS. Resolve any issues at this stage.'
      },
      {
        heading: 'Enable XMP / EXPO in BIOS',
        body: 'RAM defaults to its base JEDEC speed (often 2133 or 3200 MHz). Enable XMP (Intel) or EXPO (AMD) in the BIOS memory settings to run at the rated advertised speed.'
      },
      {
        heading: 'Run a stress test',
        body: 'Use a CPU stress tool (e.g. Prime95) and a GPU stress tool (e.g. FurMark) to confirm temperatures are within acceptable ranges under load before calling the build done.'
      }
    ]
  }
]

const scrollToPhase = (number) => {
  const el = document.getElementById(`phase-${number}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <div class="tips-page">
    <!-- Top White Section -->
    <section class="tips-page__hero">
      <div class="tips-page__container">
        <RouterLink to="/" class="tips-page__back">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Home
        </RouterLink>

        <span class="tips-page__subtitle">RESOURCE</span>
        <h1 class="tips-page__title">PC Building Tips</h1>
        <p class="tips-page__description">
          Practical advice organised by build phase — from planning your budget through to first boot. Suitable for first-time builders and seasoned enthusiasts alike.
        </p>
      </div>
    </section>

    <!-- Main Grey Section -->
    <section class="tips-page__content">
      <div class="tips-page__container">

        <!-- Phase Navigation Pills -->
        <nav class="tips-page__nav" aria-label="Phase navigation">
          <button
            v-for="phase in phases"
            :key="phase.number"
            class="tips-page__nav-pill"
            @click="scrollToPhase(phase.number)"
          >
            <span class="tips-page__nav-number">{{ phase.number }}</span>
            <span class="tips-page__nav-text">{{ phase.title }}</span>
          </button>
        </nav>

        <!-- Phase Sections -->
        <div class="tips-page__sections">
          <section
            v-for="phase in phases"
            :key="phase.number"
            :id="`phase-${phase.number}`"
            class="tips-page__phase"
          >
            
            <!-- Phase Header (with line) -->
            <div class="tips-page__phase-header">
              <div class="tips-page__phase-badge">{{ phase.number }}</div>
              <h2 class="tips-page__phase-title">{{ phase.title }}</h2>
              <div class="tips-page__phase-line"></div>
            </div>

            <!-- Tip Cards Grid -->
            <div class="tips-page__grid">
              <div class="tips-page__card" v-for="(tip, i) in phase.tips" :key="i">
                <h3 class="tips-page__card-heading">{{ tip.heading }}</h3>
                <p class="tips-page__card-body">{{ tip.body }}</p>
              </div>
            </div>

          </section>
        </div>

        <!-- Related Resources -->
        <section class="tips-page__related">
          <h2 class="tips-page__related-title">RELATED RESOURCES</h2>
          <div class="tips-page__related-grid">
            <RouterLink to="/compatibility-guide" class="tips-page__related-card">
              <h3 class="tips-page__related-card-title">Compatibility Guide <span class="tips-page__arrow">&rarr;</span></h3>
              <p class="tips-page__related-card-desc">Socket, memory, and storage rules in detail.</p>
            </RouterLink>
            <RouterLink to="/faq" class="tips-page__related-card">
              <h3 class="tips-page__related-card-title">FAQ <span class="tips-page__arrow">&rarr;</span></h3>
              <p class="tips-page__related-card-desc">Common questions about using PC Part Matcher.</p>
            </RouterLink>
            <RouterLink to="/browse" class="tips-page__related-card">
              <h3 class="tips-page__related-card-title">Browse Parts <span class="tips-page__arrow">&rarr;</span></h3>
              <p class="tips-page__related-card-desc">Find the components you need once your plan is set.</p>
            </RouterLink>
          </div>
        </section>

      </div>
    </section>
  </div>
</template>

<style scoped>
.tips-page {
  width: 100%;
}

.tips-page__container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 var(--spacing-base);
}

/* ===== Hero Section ===== */
.tips-page__hero {
  background-color: white;
  padding: 2rem 0 4rem 0;
  border-bottom: 1px solid var(--colour-border);
}

.tips-page__back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
  text-decoration: none;
  margin-bottom: 2.5rem;
  transition: color 0.2s;
}

.tips-page__back:hover {
  color: var(--colour-primary);
}

.tips-page__subtitle {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.tips-page__title {
  font-family: var(--font-heading);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: var(--colour-secondary);
  margin: 0 0 1rem 0;
  line-height: 1.1;
}

.tips-page__description {
  font-size: 1.125rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  max-width: 650px;
  margin: 0;
}

/* ===== Main Content Area ===== */
.tips-page__content {
  background-color: #f8fafc; /* Very light grey */
  padding: 3rem 0 5rem 0;
}

/* Navigation Pills */
.tips-page__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  justify-content: center;
}

.tips-page__nav-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: white;
  border: 1px solid var(--colour-border);
  border-radius: 100px;
  padding: 0.5rem 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.tips-page__nav-pill:hover {
  border-color: #cbd5e1;
  background-color: #f1f5f9;
  transform: translateY(-2px);
}

.tips-page__nav-number {
  color: var(--colour-primary);
  font-weight: 700;
  font-size: 0.875rem;
}

.tips-page__nav-text {
  color: var(--colour-text-primary);
  font-size: 0.95rem;
  font-weight: 500;
}

/* Sections */
.tips-page__sections {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  margin-bottom: 5rem;
}

.tips-page__phase {
  scroll-margin-top: 2rem;
}

.tips-page__phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.tips-page__phase-badge {
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

.tips-page__phase-title {
  font-family: var(--font-heading);
  font-size: 1.75rem;
  color: var(--colour-secondary);
  margin: 0;
  white-space: nowrap;
}

.tips-page__phase-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--colour-border);
}

/* Tip Cards Grid */
.tips-page__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.tips-page__card {
  background-color: white;
  border: 1px solid var(--colour-border);
  border-radius: 12px;
  padding: 2rem;
  transition: box-shadow 0.2s ease;
}

.tips-page__card:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

.tips-page__card-heading {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--colour-text-primary);
  margin: 0 0 0.75rem 0;
}

.tips-page__card-body {
  font-size: 1rem;
  color: var(--colour-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* Related Resources */
.tips-page__related {
  margin-top: 2rem;
}

.tips-page__related-title {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--colour-primary);
  text-transform: uppercase;
  margin: 0 0 1.5rem 0;
}

.tips-page__related-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.tips-page__related-card {
  display: block;
  background-color: white;
  border: 1px solid var(--colour-border);
  border-radius: 12px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.tips-page__related-card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transform: translateY(-2px);
}

.tips-page__related-card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--colour-text-primary);
  margin: 0 0 0.5rem 0;
}

.tips-page__arrow {
  color: var(--colour-primary);
  font-weight: 400;
}

.tips-page__related-card-desc {
  font-size: 0.95rem;
  color: var(--colour-text-secondary);
  line-height: 1.5;
  margin: 0;
}

@media (min-width: 768px) {
  .tips-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tips-page__related-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
