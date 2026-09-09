<script setup>
import {onMounted, computed, ref} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'

const store = usePcPartsStore()
const selectedCategory = ref('')
const selectedSocketType = ref('')
const selectedFormFactor = ref('')
const selectedStorageInterface = ref('')
const selectedSort = ref('')

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
        <div v-if="filteredInventory.length === 0"><strong>No Parts Found. Please expand your search criteria.</strong></div>

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