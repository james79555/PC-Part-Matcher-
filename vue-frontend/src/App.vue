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
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About Us</RouterLink>
      <RouterLink to="/browse">Browse Parts</RouterLink>
      <RouterLink to="/build">My Build</RouterLink>
      <RouterLink to="/contact">Contact Us</RouterLink>
    </nav>
  </header>

  <RouterView />

</template>


