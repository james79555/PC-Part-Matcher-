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
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About Us</RouterLink>
      <RouterLink to="/browse">Browse Parts</RouterLink>
      <RouterLink to="/build">My Build</RouterLink>
      <RouterLink to="/contact">Contact Us</RouterLink>
    </nav>
  </header>

  <RouterView />

  <footer class="pc-footer">
    <p>&copy; 2026 PC Parts Matcher. All rights reserved.</p>
  </footer>

</template>

<style scoped>

</style>


