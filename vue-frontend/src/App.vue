<script setup>
  import { RouterLink, RouterView } from 'vue-router'
  import { ref } from 'vue'
  import { usePcPartsStore } from './stores/pcParts'
  import { useBuildStore } from './stores/buildStore'
  import CookieBanner from './components/CookieBanner.vue'

  const store = usePcPartsStore()
  const buildStore = useBuildStore()
  const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="pc-header">
    <div class="pc-header__left">
      <button class="pc-header__burger" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle navigation menu">
        <svg viewBox="0 0 100 80" width="20" height="20">
          <rect width="100" height="20" rx="8"></rect>
          <rect y="30" width="100" height="20" rx="8"></rect>
          <rect y="60" width="100" height="20" rx="8"></rect>
        </svg>
      </button> 
      <RouterLink to="/" class="pc-header__logo-link">
        <h1 class="pc-header__title">PC Part <span class="pc-header__title--accent">Matcher</span></h1>
      </RouterLink>
    </div>

    <nav class="pc-header__nav" :class="{'pc-header__nav--open' : isMobileMenuOpen}">
      <RouterLink class="pc-header__nav-link" to="/" active-class="pc-header__nav-link--active" @click="isMobileMenuOpen = false">Home</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/about" active-class="pc-header__nav-link--active" @click="isMobileMenuOpen = false">About Us</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/browse" active-class="pc-header__nav-link--active" @click="isMobileMenuOpen = false">Browse Parts</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/build" active-class="pc-header__nav-link--active" @click="isMobileMenuOpen = false">My Build</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/contact" active-class="pc-header__nav-link--active" @click="isMobileMenuOpen = false">Contact Us</RouterLink>
    </nav>
    
    <div class="pc-header__actions">
      <select class="pc-header__currency" :value="store.currency" @change="store.updateCurrency($event.target.value)">
        <option value="GBP">£ GBP</option>
        <option value="USD">$ USD</option>
        <option value="EUR">€ EUR</option>
      </select>
      
      <RouterLink to="/build" class="pc-header__cart" aria-label="View My Build">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
        <span class="pc-header__cart-badge" v-if="buildStore.parts.length > 0">{{ buildStore.parts.length }}</span>
      </RouterLink>
    </div>
  </header>

  <CookieBanner />
  
  <div class="page-container">
    <RouterView />
  </div>

  <footer class="pc-footer">
    <div class="pc-footer__container">
      <div class="pc-footer__top">
        <div class="pc-footer__brand">
          <div class="pc-footer__logo">
            <div class="pc-footer__logo-icon">
              <!-- simple chip icon placeholder -->
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
            </div>
            <h2 class="pc-footer__title">PC Part <span class="pc-footer__title--accent">Matcher</span></h2>
          </div>
          <p class="pc-footer__desc">Find compatible components and build your ideal PC with confidence.</p>
        </div>
        
        <div class="pc-footer__links-grid">
          <div class="pc-footer__col">
            <h3 class="pc-footer__header">NAVIGATION</h3>
            <ul class="pc-footer__nav">
              <li><RouterLink class="pc-footer__link" to="/">Home</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/about">About Us</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/browse">Browse Parts</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/build">My Build</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/contact">Contact Us</RouterLink></li>
            </ul>
          </div>
          <div class="pc-footer__col">
            <h3 class="pc-footer__header">RESOURCES</h3>
            <ul class="pc-footer__nav">
              <li><RouterLink class="pc-footer__link" to="/compatibility-guide">Compatibility Guide</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/pc-building-tips">PC Building Tips</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/faq">FAQ</RouterLink></li>
            </ul>
          </div>
          <div class="pc-footer__col">
            <h3 class="pc-footer__header">LEGAL</h3>
            <ul class="pc-footer__nav">
              <li><RouterLink class="pc-footer__link" to="/privacy-policy">Privacy Policy</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/terms-of-service">Terms of Service</RouterLink></li>
              <li><RouterLink class="pc-footer__link" to="/cookie-policy">Cookie Policy</RouterLink></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div class="pc-footer__bottom">
        <p>&copy; 2026 PC Part Matcher. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Header */
.pc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem var(--spacing-base);
  background-color: var(--colour-surface);
  border-bottom: 1px solid var(--colour-border);
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
}

.pc-header__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pc-header__logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: inherit;
}

.pc-header__title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0;
  color: var(--colour-text-primary);
}

.pc-header__title--accent {
  color: var(--colour-primary);
}

.pc-header__burger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
}

.pc-header__nav {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--colour-surface);
  border-bottom: 1px solid var(--colour-border);
  flex-direction: column;
  z-index: 100;
}

.pc-header__nav--open {
  display: flex;
}

.pc-header__nav-link {
  text-decoration: none;
  padding: 1rem var(--spacing-base);
  color: var(--colour-text-primary);
  font-size: 1rem;
  font-weight: 500;
  border-top: 1px solid var(--colour-border);
}

.pc-header__nav-link:hover,
.pc-header__nav-link--active {
  color: var(--colour-primary);
}

.pc-header__actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.pc-header__currency {
  padding: 0.5rem;
  border-radius: var(--border-radius);
  border: 1px solid var(--colour-border);
  background-color: white;
  font-size: 0.875rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
}

.pc-header__cart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--colour-border);
  border-radius: var(--border-radius);
  color: var(--colour-text-primary);
  text-decoration: none;
  position: relative;
  transition: border-color 0.2s;
}

.pc-header__cart:hover {
  border-color: var(--colour-primary);
  color: var(--colour-primary);
}

.pc-header__cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--colour-primary);
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-container {
  min-height: calc(100vh - 350px);
}

/* Footer */
.pc-footer {
  background-color: var(--colour-secondary);
  color: white;
  padding: 4rem var(--spacing-base) 2rem;
}

.pc-footer__container {
  max-width: 1200px;
  margin: 0 auto;
}

.pc-footer__top {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.pc-footer__brand {
  max-width: 300px;
}

.pc-footer__logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.pc-footer__logo-icon {
  background-color: var(--colour-primary);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pc-footer__logo-icon svg {
  width: 20px;
  height: 20px;
}

.pc-footer__title {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0;
}

.pc-footer__title--accent {
  color: var(--colour-primary);
}

.pc-footer__desc {
  color: #94a3b8;
  line-height: 1.5;
  margin: 0;
}

.pc-footer__links-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.pc-footer__header {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #94a3b8;
  margin-bottom: 1.5rem;
}

.pc-footer__nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pc-footer__link {
  color: white;
  text-decoration: none;
  transition: color 0.2s;
}

.pc-footer__link:hover {
  color: var(--colour-primary);
}

.pc-footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  text-align: center;
}

/* Desktop Styles */
@media (min-width: 768px) {
  .pc-header {
    padding: 1rem 2rem;
  }

  .pc-header__burger {
    display: none;
  }

  .pc-header__nav {
    display: flex;
    position: static;
    flex-direction: row;
    border: none;
    gap: 2rem;
    align-items: center;
  }

  .pc-header__nav-link {
    border: none;
    padding: 0;
    position: relative;
  }

  .pc-header__nav-link::after {
    content: '';
    position: absolute;
    bottom: -1.75rem; /* align with bottom of header */
    left: 0;
    width: 100%;
    height: 3px;
    background-color: var(--colour-primary);
    transform: scaleX(0);
    transition: transform 0.2s ease;
  }

  .pc-header__nav-link--active::after,
  .pc-header__nav-link:hover::after {
    transform: scaleX(1);
  }

  .pc-footer__top {
    flex-direction: row;
    justify-content: space-between;
  }

  .pc-footer__links-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 4rem;
  }

  .pc-footer__bottom {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
}
</style>
