<script setup>
import {onMounted, computed, ref} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'

const store = usePcPartsStore()
const selectedCategory = ref('')

const uniqueCategories = computed( () => {
    const categories = store.inventory.map(part => part.componentType)
    return [...new Set(categories)]
})

const filteredInventory = computed( () => {
    if (selectedCategory.value === '') {
        return store.inventory
    }

    return store.inventory.filter(part => part.componentType === selectedCategory.value)
})

onMounted( () => {
    if (store.inventory.length === 0) {
        store.fetchInventory()
    }
})

const addToBuild = (part) => {
    store.activeBuild.push(part)
    alert('${part.name} added to your build!')
}
</script>

<template>
    <main class=""browse-parts>
        <h1>Browse Parts</h1>

        <div class="browse-parts__filter-container" v-if="!store.isLoading && !store.error">
            <label for="category-filter">Filter by Category: </label>
            <select class="browse-parts__filter-select" v-model="selectedCategory">
                <option value=""> All Parts </option>
                <option v-for="category in uniqueCategories" :key="category" :value="category">
                    {{ category }}
                </option>
            </select>
        </div>

        <div v-if="store.isLoading">Loading inventory...</div>
        <div v-else-if="store.error">{{ store.error }}</div>

        <div v-else class="browse-parts__grid">
            <article v-for="part in filteredInventory" :key="part.id" class="browse-parts__card">
                <h3 class="browse-parts__card-title">{{ part.name }}</h3>
                <p><strong>Type: </strong>{{ part.componentType }}</p>
                <p><strong>Price: </strong>${{ part.price }}</p>

                <p v-if="part.socketType"><strong>Socket: </strong>{{ part.socketType }}</p>
                <p v-if="part.memoryType"><strong>Memory: </strong> {{ part.memoryType }}</p>
                <p v-if="part.formFactor"><strong>Form Factor: </strong> {{ part.formFactor }}</p>
                <p v-if="part.wattage > 0"><strong>Wattage: </strong> {{ part.wattage }}W</p>
                <p v-if="part.storageInterface"><strong>Storage Interface: </strong>{{ part.storageInterface }}</p>

                <button class="browse-parts__card-button" @click="addToBuild(part)">Add to Build</button>
            </article>
        </div>
    </main>
</template>

<style scoped>
    .browse-parts__filter-container  {
        margin-bottom: 1.5rem
    }
    .browse-parts__filter-select {
        padding: 0.5rem;
        font-size: 1rem;
        margin-left: 0.5rem;
        border-radius: 4px;
        border: 1px solid #ccc
    }
    .browse-parts__grid {
        display: grid; 
        grid-template-columns: repeat(autofill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top:2rem;
    }
    .browse-parts__card {
        border: 1px solid #ddd; 
        padding: 1.5rem;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
    .browse-parts__card-title {
        margin-top: 0; 
        font-size: 1.2rem;
    }
    .browse-parts__card-button {
        margin-top: 1rem;
        padding: 0.5rem 1rem; 
        background-color: #007bff;
        color: white; 
        border: none;
        border-radius: 4px;
        cursor: pointer; 
    }
    .browse-parts__card-button:hover {
        background-color: #0056b3;
    }
</style>