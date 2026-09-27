<script setup>
import {onMounted, computed, ref, watch} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'
import {useBuildStore} from '../stores/buildStore'
import {useRoute, useRouter} from 'vue-router'

const store = usePcPartsStore()
const buildStore = useBuildStore()
const route = useRoute()
const router = useRouter()
const selectedCategory = ref(route.query.category || '')
const selectedSocketType = ref('')
const selectedFormFactor = ref('')
const selectedStorageInterface = ref('')
const selectedSort = ref('priceLowHigh')
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

const clearFilters = () => {
    selectedCategory.value = ''
    selectedSocketType.value = ''
    selectedFormFactor.value = ''
    selectedStorageInterface.value = ''
    selectedSort.value = 'priceLowHigh'
    currentPage.value = 1
    
    if (Object.keys(route.query).length > 0) {
        router.replace({ path: '/browse' })
    }
}
</script>

<template>
    <main class="browse-parts">
        <!-- Breadcrumbs -->
        <nav class="browse-parts__breadcrumbs" aria-label="breadcrumb">
            <RouterLink to="/" class="browse-parts__breadcrumb-link">Home</RouterLink>
            <span class="browse-parts__breadcrumb-separator">›</span>
            <span class="browse-parts__breadcrumb-current">Browse Parts</span>
        </nav>

        <div class="browse-parts__header">
            <h1 class="browse-parts__title">Browse Parts</h1>
            <p class="browse-parts__subtitle" v-if="!store.isLoading && !store.error">{{ filteredInventory.length }} components match your filters</p>
        </div>
        
        <button class="browse-parts__filter-toggle" @click="isFilterMenuOpen = !isFilterMenuOpen">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            {{  isFilterMenuOpen ? 'Hide Filters' : 'Filters' }}
        </button>

        <div class="browse-parts__layout">
            <aside class="browse-parts__sidebar" :class="{'browse-parts__sidebar--open' : isFilterMenuOpen}" v-if="!store.isLoading && !store.error">
                <div class="browse-parts__sidebar-box">
                    <div class="browse-parts__sidebar-header">
                        <h3 class="browse-parts__sidebar-title">Filters</h3>
                        <button class="browse-parts__clear-btn" @click="clearFilters">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            Clear all
                        </button>
                    </div>

                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="category-filter"> Component Type </label>
                        <select class="browse-parts__filter-select" id="category-filter" v-model="selectedCategory">
                            <option value=""> All Parts </option>
                            <option v-for="category in uniqueCategories" :key="category" :value="category">
                                {{ category }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="formFactor-filter"> Form Factor </label>
                        <select class="browse-parts__filter-select" id="formFactor-filter" v-model="selectedFormFactor">
                            <option value=""> All Form Factors </option>
                            <option v-for="formFactor in uniqueFormFactors" :key="formFactor" :value="formFactor">
                                {{ formFactor }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="socketType-filter"> Socket Type </label>
                        <select class="browse-parts__filter-select" id="socketType-filter" v-model="selectedSocketType">
                            <option value=""> All Socket Types </option>
                            <option v-for="socket in uniqueSockets" :key="socket" :value="socket">
                                {{ socket }}
                            </option>
                        </select>
                    </div>
                    <div class="browse-parts__filter-group">
                        <label class="browse-parts__filter-label" for="storageInterface-filter"> Storage Interface </label>
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
                    <div class="browse-parts__sort-group">
                        <button 
                            class="browse-parts__sort-btn" 
                            :class="{'browse-parts__sort-btn--active': selectedSort === 'priceLowHigh'}"
                            @click="selectedSort = 'priceLowHigh'"
                        >
                            Price: Low &rarr; High
                        </button>
                        <button 
                            class="browse-parts__sort-btn" 
                            :class="{'browse-parts__sort-btn--active': selectedSort === 'priceHighLow'}"
                            @click="selectedSort = 'priceHighLow'"
                        >
                            Price: High &rarr; Low
                        </button>
                    </div>
                </div>

                <div v-if="store.isLoading" class="browse-parts__message">Loading inventory...</div>
                <div v-else-if="store.error" class="browse-parts__message browse-parts__message--error">{{ store.error }}</div>
                
                <template v-else>
                    <header class="browse-parts__inventory-header">
                        <span class="browse-parts__inventory-col"></span>
                        <span class="browse-parts__inventory-col">Product</span>
                        <span class="browse-parts__inventory-col">Type</span>
                        <span class="browse-parts__inventory-col">Price</span>
                        <span class="browse-parts__inventory-col"></span>
                    </header>
                
                    <div v-if="filteredInventory.length === 0" class="browse-parts__message">
                        <strong>No parts match your filters.</strong>
                        <p>Try clearing your filters or selecting a different category.</p>
                    </div>
                    
                    <div v-else class="browse-parts__inventory-list">
                        <article v-for="part in pageinatedInventory" :key="part.id" class="browse-parts__inventory-card">
                            <div class="browse-parts__image-col">
                                <img class="browse-parts__inventory-image" :src="part.image" :alt="part.name" />
                            </div>
                            
                            <div class="browse-parts__info-col">
                                <h3 class="browse-parts__inventory-name">
                                    <RouterLink :to="`/part/${part.id}`">{{ part.name }}</RouterLink>
                                </h3>
                                <div class="browse-parts__inventory-specs">
                                    <span class="browse-parts__spec-badge" v-if="part.socketType">{{ part.socketType }}</span>
                                    <span class="browse-parts__spec-badge" v-if="part.formFactor">{{ part.formFactor }}</span>
                                    <span class="browse-parts__spec-badge" v-if="part.memoryType">{{ part.memoryType }}</span>
                                    <span class="browse-parts__spec-badge" v-if="part.storageInterface">{{ part.storageInterface }}</span>
                                    <span class="browse-parts__spec-badge" v-if="part.wattage">{{ part.wattage }}W</span>
                                </div>
                                <!-- Mobile only displays -->
                                <div class="browse-parts__mobile-meta">
                                    <span class="browse-parts__inventory-type--mobile">{{ part.componentType }}</span>
                                    <span class="browse-parts__inventory-price--mobile">{{ store.formattedPrice(part.price) }}</span>
                                </div>
                            </div>
                            
                            <div class="browse-parts__type-col">
                                <span class="browse-parts__inventory-type">{{ part.componentType }}</span>
                            </div>
                            
                            <div class="browse-parts__price-col">
                                <span class="browse-parts__inventory-price">{{ store.formattedPrice(part.price) }}</span>
                            </div>
                            
                            <div class="browse-parts__actions-col">
                                <RouterLink class="browse-parts__btn-more" :to="`/part/${part.id}`">More info &rarr;</RouterLink>
                                <button class="browse-parts__btn-add" @click="addToBuild(part)">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                                    Add
                                </button>
                            </div>
                        </article>
                    </div>
                    
                    <nav class="browse-parts__pagination" aria-label="Page Navigation">
                        <span class="browse-parts__pagination-info">Page {{ currentPage }} of {{ totalPages }}</span>
                        <div class="browse-parts__pagination-controls">
                            <button class="browse-parts__pagination-btn" :disabled="currentPage === 1" @click="currentPage--">&larr; Prev</button>
                            <button class="browse-parts__pagination-btn" :disabled="currentPage === totalPages || totalPages === 0" @click="currentPage++">Next &rarr;</button>
                        </div>
                    </nav>
                </template>
            </div>
        </div>
    </main>
</template>

<style scoped>
/* Base Styles */
.browse-parts {
    padding: 0 var(--spacing-base) 4rem;
    max-width: 1200px;
    margin: 0 auto;
}

/* Breadcrumbs */
.browse-parts__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 0;
  font-size: 0.875rem;
  color: var(--colour-text-secondary);
}

.browse-parts__breadcrumb-link {
  color: var(--colour-text-secondary);
  text-decoration: none;
  transition: color 0.2s;
}

.browse-parts__breadcrumb-link:hover {
  color: var(--colour-primary);
}

.browse-parts__breadcrumb-current {
  color: var(--colour-text-primary);
  font-weight: 500;
}

/* Header */
.browse-parts__header {
    margin-bottom: 2rem;
}

.browse-parts__title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3vw, 2.5rem);
    color: var(--colour-secondary);
    margin: 0 0 0.5rem 0;
}

.browse-parts__subtitle {
    color: var(--colour-text-secondary);
    margin: 0;
    font-size: 1.05rem;
}

/* Layout */
.browse-parts__layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

/* Mobile Filter Toggle */
.browse-parts__filter-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 0.75rem;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1rem;
    background-color: white;
    color: var(--colour-secondary);
    border: 1px solid var(--colour-border);
    border-radius: 8px;
    cursor: pointer;
    margin-bottom: 1rem;
}

.browse-parts__sidebar {
    display: none;
}

.browse-parts__sidebar--open {
    display: block;
}

/* Sidebar / Filters */
.browse-parts__sidebar-box {
    background-color: white;
    padding: 1.5rem;
    border: 1px solid var(--colour-border);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.browse-parts__sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--colour-border);
    padding-bottom: 1rem;
}

.browse-parts__sidebar-title {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--colour-secondary);
}

.browse-parts__clear-btn {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: none;
    color: var(--colour-primary);
    border: 1px solid rgba(27, 75, 241, 0.2);
    border-radius: 100px;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    transition: all 0.2s ease;
}

.browse-parts__clear-btn:hover {
    background-color: rgba(27, 75, 241, 0.05);
    border-color: var(--colour-primary);
}

.browse-parts__filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.browse-parts__filter-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--colour-secondary);
}

.browse-parts__filter-select {
    padding: 0.75rem;
    font-size: 0.95rem;
    font-family: var(--font-primary);
    width: 100%;
    border-radius: 8px;
    border: 1px solid var(--colour-border);
    background-color: white;
    color: var(--colour-text-primary);
    outline: none;
    transition: border-color 0.2s;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
}

.browse-parts__filter-select:focus {
    border-color: var(--colour-primary);
}

/* Main Content Area */
.browse-parts__main {
    flex: 1;
    min-width: 0;
}

.browse-parts__main-top-bar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;
}

.browse-parts__sort-group {
    display: flex;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 8px;
    overflow: hidden;
}

.browse-parts__sort-btn {
    padding: 0.5rem 1rem;
    background: none;
    border: none;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--colour-text-secondary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.browse-parts__sort-btn--active {
    background-color: var(--colour-primary);
    color: white;
}

.browse-parts__sort-btn:not(.browse-parts__sort-btn--active):hover {
    background-color: #f8fafc;
}

/* Messages */
.browse-parts__message {
    padding: 3rem;
    text-align: center;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 12px;
    color: var(--colour-text-secondary);
}

.browse-parts__message--error {
    color: #dc2626;
    border-color: #fca5a5;
    background-color: #fef2f2;
}

/* Inventory List (Mobile Cards) */
.browse-parts__inventory-header {
    display: none;
}

.browse-parts__inventory-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.browse-parts__inventory-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 12px;
    padding: 1.25rem;
}

.browse-parts__image-col {
    display: flex;
    justify-content: center;
    align-items: center;
}

.browse-parts__inventory-image {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
}

.browse-parts__info-col {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.browse-parts__inventory-name {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.15rem;
}

.browse-parts__inventory-name a {
    text-decoration: none;
    color: var(--colour-secondary);
    transition: color 0.2s;
}

.browse-parts__inventory-name a:hover {
    color: var(--colour-primary);
}

.browse-parts__inventory-specs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.browse-parts__spec-badge {
    background-color: #f1f5f9;
    color: #475569;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
}

.browse-parts__mobile-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
}

.browse-parts__inventory-type--mobile {
    font-size: 0.85rem;
    color: var(--colour-text-secondary);
    font-weight: 500;
    text-transform: uppercase;
}

.browse-parts__inventory-price--mobile {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--colour-text-primary);
}

.browse-parts__type-col,
.browse-parts__price-col {
    display: none;
}

.browse-parts__actions-col {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 0.5rem;
}

.browse-parts__btn-more {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 1rem;
    background-color: #f8fafc;
    color: var(--colour-primary);
    border: 1px solid rgba(27, 75, 241, 0.2);
    border-radius: 100px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.browse-parts__btn-more:hover {
    background-color: rgba(27, 75, 241, 0.05);
}

.browse-parts__btn-add {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.6rem 1rem;
    background-color: var(--colour-primary);
    color: white;
    border: none;
    border-radius: 100px;
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.browse-parts__btn-add:hover {
    background-color: var(--colour-primary-hover);
    transform: translateY(-1px);
}

/* Pagination */
.browse-parts__pagination {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 12px;
}

.browse-parts__pagination-info {
    font-size: 0.9rem;
    color: var(--colour-text-secondary);
    font-weight: 500;
}

.browse-parts__pagination-controls {
    display: flex;
    gap: 0.5rem;
}

.browse-parts__pagination-btn {
    padding: 0.5rem 1rem;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 6px;
    font-weight: 600;
    color: var(--colour-text-primary);
    cursor: pointer;
    transition: all 0.2s ease;
}

.browse-parts__pagination-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.browse-parts__pagination-btn:not(:disabled):hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
}

/* Desktop Responsive Layout (Table View) */
@media (min-width: 1025px) {
    .browse-parts__layout {
        flex-direction: row;
        align-items: flex-start;
        gap: 2.5rem;
    }
    
    .browse-parts__sidebar {
        display: block;
        width: 280px;
        flex-shrink: 0;
    }
    
    .browse-parts__filter-toggle {
        display: none;
    }

    .browse-parts__inventory-header {
        display: grid;
        grid-template-columns: 80px 2.5fr 1fr 1fr 200px;
        align-items: center;
        gap: 1.5rem;
        padding: 1rem 1.5rem;
        background-color: #f8fafc;
        border: 1px solid var(--colour-border);
        border-bottom: none;
        border-radius: 12px 12px 0 0;
    }

    .browse-parts__inventory-col {
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--colour-text-secondary);
    }
    
    .browse-parts__inventory-list {
        gap: 0;
        border: 1px solid var(--colour-border);
        border-radius: 0 0 12px 12px;
        background-color: white;
    }
    
    .browse-parts__inventory-card {
        display: grid;
        grid-template-columns: 80px 2.5fr 1fr 1fr 200px;
        align-items: center;
        gap: 1.5rem;
        padding: 1.5rem;
        border: none;
        border-bottom: 1px solid var(--colour-border);
        border-radius: 0;
        margin: 0;
    }
    
    .browse-parts__inventory-card:last-child {
        border-bottom: none;
    }

    .browse-parts__mobile-meta {
        display: none;
    }

    .browse-parts__type-col,
    .browse-parts__price-col {
        display: block;
    }

    .browse-parts__inventory-type {
        font-size: 0.9rem;
        color: var(--colour-text-secondary);
        font-weight: 500;
    }

    .browse-parts__inventory-price {
        font-family: var(--font-heading);
        font-size: 1.25rem;
        font-weight: 800;
        color: var(--colour-text-primary);
    }

    .browse-parts__actions-col {
        margin-top: 0;
        justify-content: flex-end;
    }

    .browse-parts__pagination {
        flex-direction: row;
    }
}
</style>