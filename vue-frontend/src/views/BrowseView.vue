<script setup>
import {onMounted, computed, ref, watch} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'
import {useBuildStore} from '../stores/buildStore'
import {useRoute} from 'vue-router'

const store = usePcPartsStore()
const buildStore = useBuildStore()
const route = useRoute()
const selectedCategory = ref(route.query.category || '')
const selectedSocketType = ref('')
const selectedFormFactor = ref('')
const selectedStorageInterface = ref('')
const selectedSort = ref('priceLowHigh') // Default sort is now set here for the dropdown
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
    // We create a shallow copy to sort it safely
    let result = [...store.inventory] 

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
    
    if (route.query.category) {
        selectedCategory.value = route.query.category
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
        
        <button class="browse-parts__filter-Button" @click="isFilterMenuOpen = !isFilterMenuOpen"> {{  isFilterMenuOpen ? 'Hide Filters' : 'Filters' }} </button>

        <div class="browse-parts__layout">
            <aside class="browse-parts__sidebar" :class="{'browse-parts__sidebar--open' : isFilterMenuOpen}" v-if="!store.isLoading && !store.error">
                <div class="browse-parts__sidebar-box">
                    <h3 class="browse-parts__sidebar-title">Filters</h3>
                    
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="category-filter"> Category: </label>
                        <select class="browse-parts__filter-select" id="category-filter" v-model="selectedCategory">
                            <option value=""> All Parts </option>
                            <option v-for="category in uniqueCategories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="formFactor-filter"> Form Factor: </label>
                        <select class="browse-parts__filter-select" id="formFactor-filter" v-model="selectedFormFactor">
                            <option value=""> All Form Factors </option>
                            <option v-for="formFactor in uniqueFormFactors" :key="formFactor" :value="formFactor">
                                {{ formFactor }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="socketType-filter"> Socket Type: </label>
                        <select class="browse-parts__filter-select" id="socketType-filter" v-model="selectedSocketType">
                            <option value=""> All Socket Types </option>
                            <option v-for="socket in uniqueSockets" :key="socket" :value="socket">
                                {{ socket }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="storageInterface-filter"> Storage Interface: </label>
                        <select class="browse-parts__filter-select" id="storageInterface-filter" v-model="selectedStorageInterface">
                            <option value=""> All Storage Interfaces </option>
                            <option v-for="storageInterface in uniqueStorageInterfaces" :key="storageInterface" :value="storageInterface">
                                {{ storageInterface }}
                            </option>
                        </select>
                    </div>
                </div>
            </aside>

            <div class="browse-parts__main">
                <div class="browse-parts__main-top-bar" v-if="!store.isLoading && !store.error">
                    <div class="browse-parts__filter-group browse-parts__filter-group--price">
                        <label class="browse-parts__filter-label" for="price-sort"> Sort by Price: </label>
                        <select class="browse-parts__filter-select" id="price-sort" v-model="selectedSort">
                            <option value="priceLowHigh">Low to High</option>
                            <option value="priceHighLow">High to Low</option>
                        </select>
                    </div>
                </div>

                <div v-if="store.isLoading">Loading inventory...</div>
                <div v-else-if="store.error">{{ store.error }}</div>
                
                <template v-else>
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
                </template>
            </div>
        </div>
    </main>
</template>

<style scoped>
    .browse-parts {
        padding: var(--spacing-base);
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .browse-parts__layout {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .browse-parts__sidebar {
        display: none; /* hidden on mobile until button pressed */
    }
    
    .browse-parts__sidebar--open {
        display: block;
    }
    
    .browse-parts__sidebar-box {
        background-color: var(--colour-surface);
        padding: var(--spacing-base);
        border: 1px solid var(--colour-border);
        border-radius: var(--border-radius);
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .browse-parts__sidebar-title {
        margin: 0;
        font-size: 1.25rem;
        border-bottom: 1px solid var(--colour-border);
        padding-bottom: 0.5rem;
    }
    
    .browse-parts__main {
        flex: 1;
        min-width: 0;
    }
    
    .browse-parts__main-top-bar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        padding: 0.5rem 0;
        background: transparent;
        border: none;
    }
    
    .browse-parts__filter-group.browse-parts__filter-group--price {
        flex-direction: row; /* side by side for price sort */
        align-items: center;
        margin: 0;
    }

    #price-sort {
        border: 1px solid var(--colour-border);
        background: transparent;
        font-weight: bold;
        cursor: pointer;
        padding-left: 0.25rem;
    }
    
    #price-sort:focus {
        outline: none;
    }
    
    .browse-parts__filter-Button {
        display: block;
        margin: 1rem auto 0 auto;
        width: 100%;
        padding: var(--spacing-base);
        font-size: 1rem;
        background-color: var(--colour-surface);
        color: var(--colour-text-primary);
        border: 1px solid var(--colour-border);
        border-radius: var(--border-radius);
        cursor: pointer;
    }
    
    .browse-parts__filter-group {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
    }
    
    .browse-parts__filter-label {
        font-size: 0.85rem;
        font-weight: bold;
    }
    
    .browse-parts__filter-select {
        padding: 0.5rem;
        font-size: 0.9rem;
        width: 100%;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: white;
    }
    
    .browse-parts__inventory-header {
        display: none;
    }
    
    .browse-parts__inventory-list {
        display: flex;
        flex-direction: column; 
        gap: 1.5rem;
    }
    
    .browse-parts__inventory-card {
        display: flex; 
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        border: 1px solid #ddd; 
        border-radius: var(--border-radius);
        background-color: #f9f9f9;
        padding: 0.5rem;
    }
    
    .browse-parts__inventory-info {
        display: flex; 
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;
    }
    
    .browse-parts__inventory-name a {
        text-decoration: none;
        color: inherit;
        font-weight: bold;
    }
    
    .browse-parts__inventory-name a:hover {
        text-decoration: underline;
    }
    
    .browse-parts__inventory-image {
        width: 70px;
        height: 70px;
        object-fit: cover;
        border-radius: 4px;
    }
    
    .browse-parts__inventory-button {
        padding: 0.5rem 1rem; 
        background-color: #007bff;
        color: white; 
        border: none;
        border-radius: 4px;
        cursor: pointer; 
        font-weight: bold;
    }
    
    .browse-parts__inventory-button:hover {
        background-color: #0056b3;
    }
    
    .browse-parts__pagination-nav {
        display: flex; 
        justify-content: flex-end;
        align-items: center;
        margin-top: 1.5rem;
    }
    
    .browse-parts__pagination-button {
        margin: 0 0.5rem;
        padding: 0.5rem 1rem;
        cursor: pointer;
    }

    @media (min-width: 768px) {
        .browse-parts__layout {
            flex-direction: row;
            align-items: flex-start;
            gap: 2.5rem; /* Increased spacing between filters and list */
        }
        
        .browse-parts__sidebar {
            display: block; /* Always show on desktop */
            width: 320px;
            flex-shrink: 0;
        }
        
        .browse-parts__filter-Button {
            display: none;
        }
        
        .browse-parts__inventory-header {
            display: grid;
            grid-template-columns: 80px 2fr 1.5fr 1fr 100px;
            padding: 0.75rem var(--spacing-base);
            font-weight: bold;
            border: 1px solid var(--colour-border);
            background-color: #f0f0f0;
            border-radius: var(--border-radius) var(--border-radius) 0 0;
            gap: 1rem;
        }
        
        .browse-parts__inventory-list {
            gap: 0;
            border-left: 1px solid var(--colour-border);
            border-right: 1px solid var(--colour-border);
            border-bottom: 1px solid var(--colour-border);
            border-radius: 0 0 var(--border-radius) var(--border-radius);
        }
        
        .browse-parts__inventory-card {
            display: grid;
            grid-template-columns: 80px 2fr 1.5fr 1fr 100px;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem var(--spacing-base);
            border: none; 
            border-bottom: 1px solid var(--colour-border);
            border-radius: 0;
            background-color: white;
        }
        
        .browse-parts__inventory-card:last-child {
            border-bottom: none;
        }
        
        .browse-parts__inventory-info {
            display: contents; /* Flattens the info div so its children participate in the grid directly */
        }
        
        .browse-parts__inventory-name, 
        .browse-parts__inventory-type, 
        .browse-parts__inventory-price {
            margin: 0;
        }
    }
</style>