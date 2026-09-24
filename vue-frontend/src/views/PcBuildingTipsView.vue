<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * The page is divided into 4 phases, each with a set of tips.
 * Structuring the data this way means the template stays clean
 * and future content changes only require editing this array.
 */
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

/**
 * activePhase tracks which phase tab is currently selected.
 * Clicking a tab in the navigation scrolls to and highlights that section.
 */
const activePhase = ref('01')

const scrollToPhase = (number) => {
  activePhase.value = number
  const el = document.getElementById(`phase-${number}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <main class="tips">
    <!-- Breadcrumb -->
    <RouterLink to="/" class="tips__back">&larr; Back to Home</RouterLink>

    <!-- Page Header -->
    <header class="tips__header">
      <span class="tips__header-subtitle">RESOURCE</span>
      <h1 class="tips__header-title">PC Building Tips</h1>
      <p class="tips__header-description">
        Practical advice organised by build phase — from planning your budget through to first boot. Suitable for first-time builders and those who want a reliable checklist.
      </p>
    </header>

    <!-- Phase Navigation Tabs -->
    <nav class="tips__phase-nav" aria-label="Phase navigation">
      <button
        v-for="phase in phases"
        :key="phase.number"
        class="tips__phase-tab"
        :class="{ 'tips__phase-tab--active': activePhase === phase.number }"
        @click="scrollToPhase(phase.number)"
      >
        {{ phase.number }} &nbsp; {{ phase.title }}
      </button>
    </nav>

    <!-- Phase Sections -->
    <section
      v-for="phase in phases"
      :key="phase.number"
      :id="`phase-${phase.number}`"
      class="tips__phase"
    >
      <!-- Phase heading with number badge -->
      <h2 class="tips__phase-title">
        <span class="tips__phase-number">{{ phase.number }}</span>
        {{ phase.title }}
      </h2>

      <!-- Tip cards -->
      <div class="tips__tip-card" v-for="(tip, i) in phase.tips" :key="i">
        <p class="tips__tip-heading">{{ tip.heading }}</p>
        <p class="tips__tip-body">{{ tip.body }}</p>
      </div>
    </section>

    <!-- Related Resources -->
    <section class="tips__related">
      <h2 class="tips__related-title">RELATED RESOURCES</h2>
      <div class="tips__related-grid">
        <RouterLink to="/compatibility-guide" class="tips__related-card">
          <p class="tips__related-card-title">Compatibility Guide &rarr;</p>
          <p class="tips__related-card-desc">Understand socket, memory, and storage compatibility rules in detail.</p>
        </RouterLink>
        <RouterLink to="/faq" class="tips__related-card">
          <p class="tips__related-card-title">FAQ &rarr;</p>
          <p class="tips__related-card-desc">Answers to the most common questions about using PC Part Matcher.</p>
        </RouterLink>
        <RouterLink to="/browse" class="tips__related-card">
          <p class="tips__related-card-title">Browse Parts &rarr;</p>
          <p class="tips__related-card-desc">Find the components you need once your plan is in place.</p>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* ===== Base Layout ===== */
.tips {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 var(--spacing-base, 1rem);
  color: var(--colour-text-primary, #333);
}

/* ===== Breadcrumb ===== */
.tips__back {
  display: inline-block;
  margin-top: 1.5rem;
  margin-bottom: var(--spacing-base);
  font-size: 0.875rem;
  color: var(--colour-text-secondary, #666);
  text-decoration: none;
}

.tips__back:hover {
  text-decoration: underline;
}

/* ===== Page Header ===== */
.tips__header {
  margin-bottom: 2rem;
}

.tips__header-subtitle {
  display: block;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary, #666);
  margin-bottom: 0.5rem;
}

.tips__header-title {
  font-size: 2rem;
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.tips__header-description {
  font-size: 1rem;
  color: var(--colour-text-secondary, #666);
  line-height: 1.5;
  max-width: 560px;
  margin: 0;
}

/* ===== Phase Navigation Tabs ===== */
.tips__phase-nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 3rem;
  border: 1px solid var(--colour-border, #ddd);
}

.tips__phase-tab {
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background-color: #f5f5f5;
  border: none;
  border-bottom: 1px solid var(--colour-border, #ddd);
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--colour-text-primary, #333);
  transition: background-color 0.15s ease;
}

.tips__phase-tab:last-child {
  border-bottom: none;
}

.tips__phase-tab:hover {
  background-color: #e8e8e8;
}

.tips__phase-tab--active {
  background-color: #dcdcdc;
  font-weight: bold;
}

/* ===== Phase Sections ===== */
.tips__phase {
  margin-bottom: 3.5rem;
  /* Scroll offset so the sticky header doesn't cover the heading */
  scroll-margin-top: 1rem;
}

.tips__phase-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.25rem;
  margin-top: 0;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--colour-border, #ddd);
}

.tips__phase-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  height: 2rem;
  background-color: #dcdcdc;
  border: 1px solid #aaa;
  font-size: 0.85rem;
  font-weight: bold;
  padding: 0 0.4rem;
}

/* ===== Tip Cards ===== */
.tips__tip-card {
  border: 1px solid var(--colour-border, #ddd);
  padding: 1.25rem;
  margin-bottom: 0.75rem;
  background-color: var(--colour-surface, #fff);
}

.tips__tip-heading {
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
}

.tips__tip-body {
  margin: 0;
  line-height: 1.6;
  color: var(--colour-text-secondary, #555);
  font-size: 0.9rem;
}

/* ===== Related Resources ===== */
.tips__related {
  border-top: 1px solid var(--colour-border, #ddd);
  padding-top: 2rem;
  margin-bottom: 4rem;
}

.tips__related-title {
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--colour-text-secondary, #666);
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.tips__related-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tips__related-card {
  display: block;
  border: 1px solid var(--colour-border, #ddd);
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  background-color: var(--colour-surface, #fff);
  transition: background-color 0.15s ease;
}

.tips__related-card:hover {
  background-color: #f5f5f5;
}

.tips__related-card-title {
  font-weight: bold;
  margin: 0 0 0.4rem 0;
}

.tips__related-card-desc {
  margin: 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary, #666);
  line-height: 1.5;
}

/* ===== Desktop Layout ===== */
@media (min-width: 768px) {
  .tips__header-title {
    font-size: 2.5rem;
  }

  /* Tabs become a single horizontal row */
  .tips__phase-nav {
    flex-direction: row;
    gap: 0;
    border: none;
  }

  .tips__phase-tab {
    flex: 1;
    border: 1px solid var(--colour-border, #ddd);
    border-right: none;
    text-align: center;
    font-size: 0.85rem;
  }

  .tips__phase-tab:last-child {
    border-right: 1px solid var(--colour-border, #ddd);
    border-bottom: 1px solid var(--colour-border, #ddd);
  }

  /* Related resources become a 3-column grid */
  .tips__related-grid {
    flex-direction: row;
  }

  .tips__related-card {
    flex: 1;
  }
}
</style>
