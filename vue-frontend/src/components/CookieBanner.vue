<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isVisible = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('cookie_consent')
  if (!stored) {
    isVisible.value = true
  }
})

const handleConsent = (decision) => {
  localStorage.setItem('cookie_consent', decision)
  isVisible.value = false
}
</script>

<template>
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
        class="cookie-banner__btn cookie-banner__btn--secondary"
        @click="handleConsent('declined')"
      >
        Decline
      </button>
      <button
        class="cookie-banner__btn cookie-banner__btn--primary"
        @click="handleConsent('accepted')"
      >
        Accept
      </button>
    </div>
  </section>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  background-color: var(--colour-secondary);
  color: white;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 100;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(12, 25, 56, 0.4);
  max-width: 1200px;
  margin: 0 auto;
}

.cookie-banner__title {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  margin-top: 0;
  margin-bottom: 0.25rem;
  color: white;
}

.cookie-banner__description {
  font-size: 0.9rem;
  color: #94a3b8;
  line-height: 1.4;
  margin: 0;
}

.cookie-banner__policy-link {
  color: white;
  text-decoration: underline;
  margin-left: 0.25rem;
}

.cookie-banner__policy-link:hover {
  color: var(--colour-primary);
}

.cookie-banner__actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  flex-shrink: 0;
  width: 100%;
}

.cookie-banner__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1.25rem;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  border: none;
}

.cookie-banner__btn--primary {
  background-color: var(--colour-primary);
  color: white;
}

.cookie-banner__btn--primary:hover {
  background-color: var(--colour-primary-hover);
  transform: translateY(-2px);
}

.cookie-banner__btn--secondary {
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.cookie-banner__btn--secondary:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

@media (min-width: 768px) {
  .cookie-banner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 2rem;
    gap: 2rem;
  }
  
  .cookie-banner__actions {
    flex-direction: row;
    width: auto;
  }

  .cookie-banner__btn {
    width: auto;
    min-width: 120px;
  }
}
</style>
