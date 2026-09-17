<script setup>
  import {RouterLink, RouterView} from 'vue-router'
</script>

<style scoped>
  nav {
    display: flex;
    gap: 1.5rem;
    padding: 1rem; 
    margin-bottom: 2rem;
  }
</style>

<template>
  <header class="pc-header">
    <nav class="pc-header__nav">
      <h1 class="pc-header__nav-title">PC Parts Matcher</h1>
      <RouterLink class="pc-header__nav-link" to="/">Home</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/about">About Us</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/browse">Browse Parts</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/build">My Build</RouterLink>
      <RouterLink class="pc-header__nav-link" to="/contact">Contact Us</RouterLink>
    </nav>
    <button class="pc-header__button">Login</button>
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
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">Compatibility Guide</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">PC Building Tips</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">Wattage Calculator</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">FAQ</RouterLink></li>
          <li class="pc-footer__top-item"><RouterLink class="pc-footer__top-link" to="/">Support</RouterLink></li>
        </ul>
      </div>
    </div>
    <div class="pc-footer__bottom">
      <p>&copy; 2026 PC Parts Matcher. All rights reserved.</p>
      <div class="pc-footer__bottom-policy">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookies Policy</p>
      </div>
    </div>
      
    
  </footer>

</template>

<style scoped>


  .pc-header {
    background-color: var(--colour-surface);
    border-bottom: 1px solid var(--colour-border);
    display: flex; 
    align-items: center;
    justify-content: space-between;
  }
  .pc-header__nav {
    gap: 0;
    margin: 0;
    padding: 0;
    }
  .pc-header__nav-title {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem 2.5rem; 
    border-right: 1px solid var(--colour-border);
  }
  .pc-header__nav-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1rem 1.5rem;
    color: var(--color-text-primary);
    font-size: 1rem;
    border-right: 1px solid var(--colour-border);
  }
  .pc-header__nav-link:hover {
    background-color: var(--colour-action);
  }
  .pc-header__button {
    background-color: var(--colour-surface);
    padding: 0.5rem 1.5rem;
    margin-right: 1rem;
    font-size: 1rem;
    border: 1px solid var(--colour-border);
    border-radius: var(--border-radius);
    cursor: pointer;
  }
  .pc-header__button:hover {
    background-color: var(--colour-action);
  }

  .pc-footer__top {
    display: flex;
    justify-content: space-between;
    padding: 2rem; 
    margin: 1rem;
    border-bottom: 1px solid var(--colour-border);
  }
  .pc-footer__top-header {
    margin-bottom: 1rem;
  }
  .pc-footer__top-col1, .pc-footer__top-col2, .pc-footer__top-col3 {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .pc-footer__top-col1 {
    padding-right: 1rem; 
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
  }
  .pc-footer__bottom-policy {
    display: flex;
    gap: 2.5rem;
  }
  
</style>


