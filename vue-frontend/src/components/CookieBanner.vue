<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

/**
 * isVisible controls whether the banner is rendered at all.
 * It starts as false so there is no flash of the banner while
 * localStorage is being checked on mount.
 */
const isVisible = ref(false)

/**
 * On mount, check if the user has already given or declined consent.
 * If the 'cookie_consent' key does not exist in localStorage,
 * the user has not yet responded so we show the banner.
 */
onMounted(() => {
  const stored = localStorage.getItem('cookie_consent')
  if (!stored) {
    isVisible.value = true
  }
})

/**
 * handleConsent is called when either button is clicked.
 * It writes the user's decision to localStorage so the banner
 * does not reappear on future visits, then hides the banner.
 *
 * @param {'accepted' | 'declined'} decision - The user's choice
 */
const handleConsent = (decision) => {
  localStorage.setItem('cookie_consent', decision)
  isVisible.value = false
}
</script>

<template>
  <!--
    v-if means the banner is completely removed from the DOM once
    the user has responded — not just hidden with CSS.
    role="dialog" and aria-label help screen readers identify it.
  -->
  <section
    v-if="isVisible"
    class="cookie-banner"
    role="dialog"
    aria-label="Cookie consent"
    aria-live="polite"
  >
    <div class="cookie-banner__content">
      <h2 class="cookie-banner__title">This site uses browser storage</h2>
      <p class="cookie-banner__description">
        We use localStorage to save your build list and remember your preferences.
        We do not use advertising or analytics cookies.
        <RouterLink to="/cookie-policy" class="cookie-banner__policy-link">Cookie Policy</RouterLink>
      </p>
    </div>
    <div class="cookie-banner__actions">
      <button
        class="cookie-banner__btn cookie-banner__btn--decline"
        @click="handleConsent('declined')"
      >
        Decline
      </button>
      <button
        class="cookie-banner__btn cookie-banner__btn--accept"
        @click="handleConsent('accepted')"
      >
        Accept
      </button>
    </div>
  </section>
</template>

<style scoped>
/* ===== Banner Container ===== */
/*
  position: fixed keeps the bar anchored to the bottom of the
  viewport regardless of scroll position. z-index: 100 ensures
  it sits above all page content.
*/
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #2a2a2a;
  color: #f0f0f0;
  padding: 1rem var(--spacing-base);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
}

/* ===== Content (left side) ===== */
.cookie-banner__title {
  font-size: 0.95rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: #ffffff;
}

.cookie-banner__description {
  font-size: 0.85rem;
  color: #cccccc;
  line-height: 1.5;
  margin: 0;
}

.cookie-banner__policy-link {
  color: #cccccc;
  text-decoration: underline;
}

.cookie-banner__policy-link:hover {
  color: #ffffff;
}

/* ===== Action Buttons ===== */
.cookie-banner__actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-shrink: 0;
}

.cookie-banner__btn {
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  border: 1px solid #888;
  transition: opacity 0.15s ease;
}

.cookie-banner__btn:hover {
  opacity: 0.85;
}

.cookie-banner__btn--decline {
  background-color: transparent;
  color: #cccccc;
}

.cookie-banner__btn--accept {
  background-color: #e0e0e0;
  color: #1a1a1a;
  border-color: #e0e0e0;
}

/* ===== Desktop — single row layout ===== */
@media (min-width: 768px) {
  .cookie-banner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
  }
}
</style>
