<script setup>
import {onMounted} from 'vue'
import {usePcPartsStore} from '../stores/pcParts'

const store = usePcPartsStore()

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
    <main>
        <h1>Browse Parts</h1>

        <div v-if="store.isLoading">Loading inventory...</div>
        <div v-else-if="store.error">{{ store.error }}</div>

        <div v-else class="part-grid">
            <article v-for="part in store.inventory" :key="part.id" class="part-card">
                <h3>{{ part.name }}</h3>
                <p><strong>Type: </strong>{{ part.componentType }}</p>
                <p><strong>Price: </strong>${{ part.price }}</p>

                <p v-if="part.socketType"><strong>Socket:</strong>{{ part.socketType }}</p>
                <p v-if="part.memoryType"><strong>Memory:</strong> {{ part.memoryType }}</p>
                <p v-if="part.formFactor"><strong>Form Factor:</strong> {{ part.formFactor }}</p>
                <p v-if="part.wattage > 0"><strong>Wattage:</strong> {{ part.wattage }}W</p>
                <p v-if="part.storageInterface"><strong>Storage Interface:</strong>{{ part.storageInterface }}</p>

                <button @click="addToBuild(part)">Add to Build</button>
            </article>
        </div>
    </main>
</template>

<style scoped>
    .part-grid {
        display: grid; 
        grid-template-columns: repeat(autofill, minmax(250px, 1fr));
        gap: 1.5rem;
        margin-top:2rem;
    }
    .part-card {
        border: 1px solid #ddd; 
        padding: 1.5rem;
        border-radius: 8px;
        background-color: #f9f9f9;
    }
    .part-card h3 {
        margin-top: 0; 
        font-size: 1.2rem;
    }
    button {
        margin-top: 1rem;
        padding: 0.5rem 1rem; 
        background-color: #007bff;
        color: white; 
        border: none;
        border-radius: 4px;
        cursor: pointer; 
    }
    button:hover {
        background-color: #0056b3;
    }
</style>