<script setup>
import {onMounted, computed, ref, watch} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'

const store = usePcPartsStore()
const selectedCategory = ref('')
const selectedSocketType = ref('')
const selectedFormFactor = ref('')
const selectedStorageInterface = ref('')
const selectedSort = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)

const uniqueCategories = computed( () => {
    const categories = store.inventory.map(part => part.componentType)
    return [...new Set(categories)]
})
const uniqueSockets = computed( () => {
    const sockets = store.inventory.map(part => part.socketType)
    const validSockets = sockets.filter(socket => socket)
    return [...new Set(validSockets)]
})
const uniqueFormFactors = computed( () => {
    const forms = store.inventory.map(part => part.formFactor)
    const validForms = forms.filter(forms => forms)
    return [...new Set(validForms)]
})
const uniqueStorageInterfaces = computed( () => {
    const interfaces = store.inventory.map(part => part.storageInterface)
    const validInterfaces = interfaces.filter(interfaces => interfaces)
    return [...new Set(validInterfaces)]
})

const filteredInventory = computed( () => {
    let result = store.inventory 

    if (selectedCategory.value !== '' ) {
        result = result.filter(part => part.componentType === selectedCategory.value)
    }
    if (selectedSocketType.value !== '' ) {
        result = result.filter(part => part.socketType === selectedSocketType.value)
    }
    if (selectedFormFactor.value !== '' ) {
        result = result.filter(part => part.formFactor === selectedFormFactor.value)
    }
    if (selectedStorageInterface.value !== '' ) {
        result = result.filter(part => part.storageInterface === selectedStorageInterface.value)
    }
    if (selectedSort.value === 'priceLowHigh') {
        result.sort((a, b) => a.price - b.price)
    } else if (selectedSort.value === 'priceHighLow') {
        result.sort((a, b) => b.price - a.price)
    }

    return result 
})

const totalPages = computed( () => {
    return Math.ceil(filteredInventory.value.length / itemsPerPage.value)
})

const pageinatedInventory = computed ( () => {
    const startIndex = (currentPage.value - 1) * itemsPerPage.value
    const endIndex = startIndex + itemsPerPage.value

    return filteredInventory.value.slice(startIndex, endIndex)
})

watch(filteredInventory, () => {
    currentPage.value = 1
})

onMounted( () => {
    if (store.inventory.length === 0) {
        store.fetchInventory()
    }
})

const addToBuild = (part) => {
    store.activeBuild.push(part)
    alert(part.name + ' added to your build!')
}
</script>

<template>
    <main class="browse-parts">
        <h1>Browse Parts</h1>

        <div class="browse-parts__filter-container" v-if="!store.isLoading && !store.error">
            <div class="browse-parts__filter-group">
                <label for="category-filter">Filter by Category: </label>
                <select class="browse-parts__filter-select" v-model="selectedCategory">
                    <option value=""> All Parts </option>
                    <option v-for="category in uniqueCategories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label for="formFactor-filter">Filter by Form Factor: </label>
                <select class="browse-parts__filter-select" v-model="selectedFormFactor">
                    <option value=""> All Form Factors </option>
                    <option v-for="formFactor in uniqueFormFactors" :key="formFactor" :value="formFactor">
                        {{ formFactor }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label for="socketType-filter">Filter by Socket Type: </label>
                <select class="browse-parts__filter-select" v-model="selectedSocketType">
                    <option value=""> All Socket Types </option>
                    <option v-for="socket in uniqueSockets" :key="socket" :value="socket">
                        {{ socket }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label for="storageInterface-filter">Filter by Storage Interface: </label>
                <select class="browse-parts__filter-select" v-model="selectedStorageInterface">
                    <option value=""> All Storage Interfaces </option>
                    <option v-for="storageInterface in uniqueStorageInterfaces" :key="storageInterface" :value="storageInterface">
                        {{ storageInterface }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label for="storageInterface-filter">Sort by Price: </label>
                <select class="browse-parts__filter-select" v-model="selectedSort">
                    <option value="priceLowHigh">Low to High</option>
                    <option value="priceHighLow">High to Low</option>
                </select>
            </div>
        </div>

        <div v-if="store.isLoading">Loading inventory...</div>
        <div v-else-if="store.error">{{ store.error }}</div>

        <header class="browse-parts__inventory-header">
            <span class="browse-parts__inventory-col"></span>
            <span class="browse-parts__inventory-col">Name</span>
            <span class="browse-parts__inventory-col">Component Type</span>
            <span class="browse-parts__inventory-col">Price</span>
            <span class="browse-parts__inventory-col"></span>
        </header>
       
        <div v-if="filteredInventory.length === 0"><strong>No Parts Found. Please expand your search criteria.</strong></div>
        <div v-else class="browse-parts__inventory-list">
            <article v-for="part in pageinatedInventory" :key="part.id" class="browse-parts__inventory-card">
                <img class="browse-parts__inventory-image" :src="part.image" :alt="part.name" />
                <div class="browse-parts__inventory-info">
                    <p class="browse-parts__inventory-name"> {{ part.name }}</p>
                    <p class="browse-parts__inventory-type"> {{ part.componentType }}</p>
                    <p class="browse-parts__inventory-price"> {{ part.price }}</p>
                </div>
                <button class="browse-parts__inventory-col browse-parts__inventory-button"> Add </button>
            </article>
        </div>
        <nav class="browse-parts__pagination-nav" aria-label="Page Navigation">
            <button class="browse-parts__pagination-button" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
            <span class="browse-parts__pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
            <button class="browse-parts__pagination-button" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next</button>
        </nav>
    </main>
</template>

<style scoped>
    .browse-parts {
        margin: 0.5rem;
    }
    .browse-parts__filter-container  {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-bottom: 0.5rem
        
    }
    .browse-parts__filter-select {
        padding: 0.5rem;
        font-size: 1rem;
        margin-left: 0.1rem;
        border-radius: 4px;
        border: 1px solid #ccc
    }
    .browse-parts__inventory-header {
        display: none;
    }
    .browse-parts__inventory-list {
        display: flex;
        flex-direction: column; 
        grid-template-columns: repeat(autofill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top:2rem;
    }
    .browse-parts__inventory-card {
        display: flex; 
        flex-direction: row;
        justify-content:flex-start;
        gap: 1.5rem;
        border: 1px solid #ddd; 
        border-radius: var(--border-radius);
        background-color: #f9f9f9;
    }
    .browse-parts__inventory-info {
        display: flex; 
        flex-direction: column;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
    }
    .browse-parts__inventory-image {
        width: clamp(50px, 20%, 150px);
        object-fit: cover;
        border-radius: var(--border-radius);
    }
    .browse-parts__inventory-button {
        padding: 0.5rem 1rem; 
        background-color: #007bff;
        color: var(--colour-text-primary); 
        border: 1px solid var(--colour-border);
        border-radius: 4px;
        cursor: pointer; 
        font-size: clamp(0.25rem, 0.5rem, 0.75rem);
        margin-left: auto;
    }
    .browse-parts__pagination-nav {
        display: flex; 
        justify-content:flex-end;
        align-items: center;
        margin-top: 1rem;
    }
    .browse-parts__pagination-button {
        margin: 0 0.5rem;
    }
</style>