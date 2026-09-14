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
    <p>&copy; 2026 PC Parts Matcher. All rights reserved.</p>
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
  
</style>


