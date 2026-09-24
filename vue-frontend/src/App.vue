<script setup>
  import {RouterLink, RouterView} from 'vue-router'
  import {ref} from 'vue'
  import { usePcPartsStore } from './stores/pcParts';

  const store = usePcPartsStore();
  const isMobileMenuOpen = ref(false)
</script>

<template>
  <header class="pc-header">
    <button class="pc-header__burger" @click="isMobileMenuOpen = !isMobileMenuOpen" aria-label="Toggle navigation menu">
      <svg viewBox="0 0 100 80" width="20" height="20">
        <rect width="100" height="20" rx="8"></rect>
        <rect y="30" width="100" height="20" rx="8"></rect>
        <rect y="60" width="100" height="20" rx="8"></rect>
      </svg>
    </button> 
    <h1 class="pc-header__title">PC Parts Matcher</h1>  
    <nav class="pc-header__nav" :class="{'pc-header__nav--open' : isMobileMenuOpen}">
      <RouterLink class="pc-header__nav-link" to="/">Home</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/about">About Us</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/browse">Browse Parts</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/build">My Build</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/contact">Contact Us</RouterLink>
    </nav>
    <div class="pc-header__actions">
      <select class="pc-header__actions-currency" :value="store.currency" @change="store.updateCurrency($event.target.value)">
        <option value="GBP" selcted>£</option>
        <option value="USD">$</option>
        <option value="EUR">€</option>
      </select>

      <button class="pc-header__actions-cart">
        <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </button>
    </div>
  </header>

  <RouterView />

  <footer class="pc-footer">
    <div class="pc-footer__top">
      <div class="pc-footer__top-col1">
        <h2 class="pc-footer__top-header">PC Parts Matcher</h2>
        <p>Find compatible components and build your ideal PC with confidence.</p>
      </div>
      <div class="pc-footer__top-col2">
        <h3 class="pc-footer__top-header">Navigation</h3>
        <ul class="pc-footer__top-nav">
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">Home</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link"  to="/about">About Us</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link"  to="/browse">Browse Parts</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link"  to="/build">My Build</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link"  to="/contact">Contact Us</RouterLink></li>
        </ul>
      </div>
      <div class="pc-footer__top-col3">
        <h3 class="pc-footer__top-header">Resources</h3>
        <ul class="pc-footer__top-nav">
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/compatibility-guide">Compatibility Guide</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/pc-building-tips">PC Building Tips</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/faq">FAQ</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="pc-footer__bottom">
      <p>&copy; 2026 PC Parts Matcher. All rights reserved.</p>
      <div class="pc-footer__bottom-policy">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <RouterLink class="pc-footer__bottom-link" to="/cookie-policy">Cookies Policy</RouterLink>
      </div>
    </div>
      
    
  </footer>

</template>

<style scoped>
  .pc-header {
    display: flex; 
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    background-color: var(--colour-surface);
    border-bottom: 1px solid var(--colour-border);
    margin-bottom: var(--spacing-base);
  }
  .pc-header__title {
    font-size: clamp(1rem, 1.25rem,1.5rem);
    flex: 1; 
    text-align: center;
    padding: 0 0.5rem;
    min-width: 0; 
  }
  .pc-header__nav {
    display: none;
    width: 100%;
    order: 4;
  }
  .pc-header__nav--open {
    display: flex;
    flex-direction: column;
    background-color: var(--colour-surface);
  }
  .pc-header__nav-link {
    text-decoration: none;
    padding: 1rem;
    color: var(--color-text-primary);
    font-size: 1rem;
    border-top: 1px solid var(--colour-border);
  }
  .pc-header__nav-link:hover {
    background-color: var(--colour-action);
  }
  .pc-header__login {
      display: block;
      background-color: var(--colour-surface);
      padding: 0.5rem 1.5rem;
      margin-right: var(--spacing-base);
      font-size: 1rem;
      border: 1px solid var(--colour-border);
      border-radius: var(--border-radius);
      cursor: pointer;
    }
  .pc-header__actions {
    display: flex;
    align-items: center;
  }
  .pc-header__burger, .pc-header__actions-login, .pc-header__actions-cart, .pc-header__actions-currency {
    padding:0.5rem;
    margin: 0.5rem;
  }


  .pc-footer__top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 1rem; 
    margin: 1rem;      
    border-bottom: 1px solid var(--colour-border);
    border-top: 1px solid var(--colour-border);
    font-size: clamp(0.5rem, 0.75rem, 1rem);
  }
  .pc-footer__top-header {
    margin-bottom: 1rem;
  }
  .pc-footer__top-col1 {
    grid-column: span 2;
    margin-bottom: var(--spacing-base);
  }
  .pc-footer__top-col2, .pc-footer__top-col3 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .pc-footer__top-nav {
    display: flex;
    flex-direction: column;
    padding: 0; 
    gap: 0.75rem;
  }
  .pc-footer__top-item{
    list-style-type: none; 
  }
  .pc-footer__top-link {
    text-decoration: none;
    color: var(--colour-text-primary); 
  }
  .pc-footer__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem 1rem 1rem; 
    margin: 1rem;
    gap: 2.5rem;
    font-size: clamp(0.25rem, 0.5rem, 0.75rem);
  }
  .pc-footer__bottom-policy {
    display: flex;
    gap: 2.5rem;
  }
  .pc-footer__bottom-link {
    text-decoration: none;
    color: inherit;
  }
  .pc-footer__bottom-link:hover {
    text-decoration: underline;
  }
  
  @media (min-width: 768px) {
    .pc-header {
      flex-wrap: nowrap;
    }
    .pc-header__burger {
      display: none;
    }
    .pc-header__title {
      font-size: clamp(1.5rem, 1.75rem, 2rem);
      border-right: 1px solid var(--colour-border);
      padding-right: 2rem;
      padding-left: 1rem;   
    }
    .pc-header__nav {
      display: flex;
      flex-direction: row;
      width: auto;
      margin-top: 0px;
      flex-grow: 1;
      order: 0;
    }
    .pc-header__nav-link {
      padding: 1.5rem 1.5rem;
      border-top: none;
      border-right: 1px solid var(--colour-border);
    }
    .pc-header__login:hover {
    background-color: var(--colour-action);
    }
    .pc-header__cart {
      display: none;
    }

    .pc-footer__top {
      display: flex;
      justify-content: space-between;
      padding: 2rem; 
      font-size: clamp(0.75rem, 1rem, 1.25rem);
      gap: 3.5rem;
    }
    .pc-footer__bottom {
      font-size: clamp(0.5rem, 0.75rem, 1rem);
    }
  }
</style>


