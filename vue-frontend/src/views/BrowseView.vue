<script setup>
import {onMounted, computed, ref, watch} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'
import {useBuildStore} from '../stores/buildStore'

const store = usePcPartsStore()
const buildStore = useBuildStore()
const selectedCategory = ref('')
const selectedSocketType = ref('')
const selectedFormFactor = ref('')
const selectedStorageInterface = ref('')
const selectedSort = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)
const isFilterMenuOpen = ref(false)

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
    buildStore.addPart(part)
    alert(part.name + ' added to your build!')
}
</script>

<template>
    <main class="browse-parts">
        <h1>Browse Parts</h1>
        <button class="browse-parts__filter-Button" @click="isFilterMenuOpen = !isFilterMenuOpen"> {{  isFilterMenuOpen ? 'Hide Filters' : 'Filter & Sort' }} </button>
        <aside class="browse-parts__filter-container" :class="{'browse-parts__filter-container--open' : isFilterMenuOpen}" v-if="!store.isLoading && !store.error">
            <div class="browse-parts__filter-group">
                <label class="browse-parts__filter-label" for="category-filter"> Category: </label>
                <select class="browse-parts__filter-select" v-model="selectedCategory">
                    <option value=""> All Parts </option>
                    <option v-for="category in uniqueCategories" :key="category" :value="category">
                        {{ category }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label class="browse-parts__filter-label" for="formFactor-filter"> Form Factor: </label>
                <select class="browse-parts__filter-select" v-model="selectedFormFactor">
                    <option value=""> All Form Factors </option>
                    <option v-for="formFactor in uniqueFormFactors" :key="formFactor" :value="formFactor">
                        {{ formFactor }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label class="browse-parts__filter-label" for="socketType-filter"> Socket Type: </label>
                <select class="browse-parts__filter-select" v-model="selectedSocketType">
                    <option value=""> All Socket Types </option>
                    <option v-for="socket in uniqueSockets" :key="socket" :value="socket">
                        {{ socket }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label class="browse-parts__filter-label" for="storageInterface-filter"> Storage Interface: </label>
                <select class="browse-parts__filter-select" v-model="selectedStorageInterface">
                    <option value=""> All Storage Interfaces </option>
                    <option v-for="storageInterface in uniqueStorageInterfaces" :key="storageInterface" :value="storageInterface">
                        {{ storageInterface }}
                    </option>
                </select>
            </div>
            <div class="browse-parts__filter-group">
                <label class="browse-parts__filter-label" for="storageInterface-filter"> Price: </label>
                <select class="browse-parts__filter-select" v-model="selectedSort">
                    <option value="priceLowHigh">Low to High</option>
                    <option value="priceHighLow">High to Low</option>
                </select>
            </div>
        </aside>

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
                    <p class="browse-parts__inventory-name"><RouterLink :to="`/part/${part.id}`">
                        {{ part.name }}
                    </RouterLink></p>
                    <p class="browse-parts__inventory-type"> {{ part.componentType }}</p>
                    <p class="browse-parts__inventory-price"> {{ store.formattedPrice(part.price) }}</p>
                </div>
                <button class="browse-parts__inventory-button" @click="addToBuild(part)"> Add </button>
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
    .browse-parts__filter-Button {
        display: block;
        margin: 1rem auto 0 auto;
        width: 90%;
        padding: var(--spacing-base);
        font-size: 0.75rem;
        background-color: var(--colour-surface);
        color: var(--colour-text-primary);
        border: 1px solid var(--colour-border);
        border-radius: var(--border-radius);
        cursor: pointer;
    }
    .browse-parts__filter-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }
    .browse-parts__filter-container  {
        display: none;
        grid-template-columns: auto auto;
        padding: var(--spacing-base);
        gap: 0.5rem;
    }
    .browse-parts__filter-container--open {
        display: grid;
    }
    .browse-parts__filter-label {
        display: flex;
        justify-content: flex-start;
        font-size: clamp(0.25rem, 0.5rem, 0.75rem);
        width: 100%;

    }
    .browse-parts__filter-select {
        padding: 0.5rem;
        font-size: clamp(0.25rem, 0.5rem, 0.75rem);
        width: 100%;
        border-radius: 4px;
        border: 1px solid #ccc
    }
    .browse-parts__inventory-header {
        display: none;
    }
    .browse-parts__inventory-list {
        display: flex;
        flex-direction: column; 
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
        padding: var(--spacing-base);
        text-decoration: none;
    }
    .browse-parts__inventory-name a{
        text-decoration: none;
        color: inherit;
        cursor: pointer;
    }
    .browse-parts__inventory-image {
        width: clamp(50px, 20%, 150px);
        object-fit: cover;
        border-radius: var(--border-radius);
    }
    .browse-parts__inventory-button {
        padding: 0.5rem var(--spacing-base); 
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
        margin-top: var(--spacing-base);
    }
    .browse-parts__pagination-button {
        margin: 0 0.5rem;
    }

    @media (min-width: 768px) {
        .browse-parts__filter-Button {
            display: none;
        }
        .browse-parts__filter-container  {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-bottom: 0.5rem
        }
        .browse-parts__filter-label {
            font-size: clamp(0.75rem, 1rem, 1.25rem);
        }
        .browse-parts__filter-select {
            font-size: clamp(0.75rem, 1rem, 1.25rem);
        }
        .browse-parts__inventory-header {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr 1fr 100px;
            padding: var(--spacing-base);
            font-weight: bold;
            border-bottom: 2px solid var(--colour-border);
            border-top: 1px solid var(--colour-border);
            border-left: 1px solid var(--colour-border);
            border-right: 1px solid var(--colour-border);
        }
        .browse-parts__inventory-list {
            display: flex;
            flex-direction: grid; 
            gap: 0;
            margin-top: 0;
            border-left: 1px solid var(--colour-border);
            border-right: 1px solid var(--colour-border);
        }
        .browse-parts__inventory-card {
            display: grid;
            grid-template-columns: 1fr 4fr 100px;
            align-items: center;
            gap:0;
            padding: var(--spacing-base);
            border: none; 
            border-bottom: 1px solid var(--colour-border);
        }
        .browse-parts__inventory-info {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr;
            padding: 0;
        }
        .browse-parts__inventory-button {
            margin-left: 0;
            font-size: clamp(0.5rem, 0.75rem, 1rem);
        }
    }
</style>