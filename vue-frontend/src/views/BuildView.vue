<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBuildStore } from '../stores/buildStore'
import { usePcPartsStore } from '../stores/pcParts'

const route = useRoute()
const router = useRouter()
const buildStore = useBuildStore()
const pcPartsStore = usePcPartsStore()

const copySuccess = ref(false)

onMounted(async () => {
    if (route.query.build) {
        if (pcPartsStore.inventory.length === 0) {
            await pcPartsStore.fetchInventory()
        }
        
        const idsArray = route.query.build.split(',')
        buildStore.loadFromIds(idsArray)
        
        router.replace({ path: '/build' })
    } else {
        if (pcPartsStore.inventory.length === 0) {
            pcPartsStore.fetchInventory()
        }
    }
})

const getAmazonLink = (partName) => {
    return `https://www.amazon.com/s?k=${encodeURIComponent(partName)}`
}

const getNeweggLink = (partName) => {
    return `https://www.newegg.com/p/pl?d=${encodeURIComponent(partName)}`
}

const getOverclockersLink = (partName) => {
    return `https://www.overclockers.co.uk/search?q=${encodeURIComponent(partName)}`
}

const shareBuild = async () => {
    const ids = buildStore.parts.map(p => p.id).join(',')
    if (!ids) {
        alert("Your build is empty!")
        return
    }
    
    const shareUrl = `${window.location.origin}/build?build=${ids}`
    
    try {
        await navigator.clipboard.writeText(shareUrl)
        copySuccess.value = true
        setTimeout(() => copySuccess.value = false, 3000)
    } catch (err) {
        alert("Failed to copy link. Here is the URL:\n" + shareUrl)
    }
}

const allCompatible = computed(() => {
    return buildStore.parts.every(part => buildStore.isPartCompatible(part))
})

</script>

<template>
    <main class="my-build">
        <!-- Breadcrumbs -->
        <nav class="my-build__breadcrumbs" aria-label="breadcrumb">
            <RouterLink to="/browse" class="my-build__breadcrumb-link">Browse Parts</RouterLink>
            <span class="my-build__breadcrumb-separator">›</span>
            <span class="my-build__breadcrumb-current">My Build</span>
        </nav>

        <header class="my-build__header">
            <div class="my-build__header-left">
                <h1 class="my-build__title">My Build</h1>
                <p class="my-build__subtitle">
                    {{ buildStore.parts.length }} components &middot; 
                    <span v-if="buildStore.parts.length === 0">Add some parts to get started!</span>
                    <span v-else-if="allCompatible" class="my-build__subtitle--success">All compatible</span>
                    <span v-else class="my-build__subtitle--error">Compatibility issues detected</span>
                </p>
            </div>
            <RouterLink to="/browse" class="my-build__header-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                Add more parts
            </RouterLink>
        </header>

        <div class="my-build__layout" v-if="buildStore.parts.length > 0">
            <!-- Left Side: Parts List -->
            <div class="my-build__list">
                <article v-for="part in buildStore.parts" :key="part.id" class="my-build__card">
                    <div class="my-build__card-top">
                        <div class="my-build__card-image-wrapper">
                            <img class="my-build__card-image" :src="part.image" :alt="part.name" />
                        </div>
                        
                        <div class="my-build__card-info">
                            <div class="my-build__card-title-row">
                                <h3 class="my-build__card-title"><RouterLink :to="`/part/${part.id}`">{{ part.name }}</RouterLink></h3>
                                <span v-if="buildStore.isPartCompatible(part)" class="my-build__badge my-build__badge--compatible">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                    Compatible
                                </span>
                                <span v-else class="my-build__badge my-build__badge--warning">
                                    ⚠️ Conflict
                                </span>
                            </div>
                            
                            <div class="my-build__card-meta">
                                <span>{{ part.componentType }}</span>
                                <span class="my-build__meta-dot" v-if="part.socketType || part.formFactor">&middot;</span>
                                <span v-if="part.socketType || part.formFactor">{{ part.socketType || part.formFactor }}</span>
                                <span class="my-build__meta-dot" v-if="part.wattage">&middot;</span>
                                <span v-if="part.wattage" class="my-build__meta-wattage">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                    {{ part.wattage }}W
                                </span>
                            </div>
                        </div>

                        <div class="my-build__card-price-col">
                            <p class="my-build__card-price">{{ pcPartsStore.formattedPrice(part.price) }}</p>
                            <button class="my-build__btn-remove" @click="buildStore.removePart(part.id)" aria-label="Remove part">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    </div>

                    <div class="my-build__card-bottom">
                        <span class="my-build__buy-label">BUY AT</span>
                        <div class="my-build__buy-links">
                            <a :href="getAmazonLink(part.name)" target="_blank" rel="noopener noreferrer" class="my-build__btn-retailer">
                                Amazon
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                            <a :href="getNeweggLink(part.name)" target="_blank" rel="noopener noreferrer" class="my-build__btn-retailer">
                                Newegg
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                            <a :href="getOverclockersLink(part.name)" target="_blank" rel="noopener noreferrer" class="my-build__btn-retailer">
                                Overclockers
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                            </a>
                        </div>
                    </div>
                </article>

                <RouterLink to="/browse" class="my-build__add-card">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add another component
                </RouterLink>
            </div>

            <!-- Right Side: Build Summary -->
            <aside class="my-build__summary-wrapper">
                <div class="my-build__summary-box">
                    <h2 class="my-build__summary-title">BUILD SUMMARY</h2>
                    
                    <div class="my-build__summary-cost-row">
                        <span class="my-build__summary-cost-label">Total cost</span>
                        <span class="my-build__summary-cost-value">{{ pcPartsStore.formattedPrice(buildStore.totalCostRaw) }}</span>
                    </div>

                    <div class="my-build__summary-wattage-box">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                        <span class="my-build__wattage-label">Est. total wattage</span>
                        <span class="my-build__wattage-value">{{ buildStore.totalWattage }}W</span>
                    </div>

                    <ul class="my-build__summary-specs">
                        <li class="my-build__summary-spec-item" v-if="buildStore.buildSocketType">
                            <span class="my-build__spec-label">Socket Type</span>
                            <span class="my-build__spec-value">{{ buildStore.buildSocketType }}</span>
                        </li>
                        <li class="my-build__summary-spec-item" v-if="buildStore.buildFormFactor">
                            <span class="my-build__spec-label">Form Factor</span>
                            <span class="my-build__spec-value">{{ buildStore.buildFormFactor }}</span>
                        </li>
                        <li class="my-build__summary-spec-item" v-if="buildStore.buildStorageInterface">
                            <span class="my-build__spec-label">Storage Interface</span>
                            <span class="my-build__spec-value">{{ buildStore.buildStorageInterface }}</span>
                        </li>
                        <li class="my-build__summary-spec-item" v-if="buildStore.buildMemoryType">
                            <span class="my-build__spec-label">Memory Type</span>
                            <span class="my-build__spec-value">{{ buildStore.buildMemoryType }}</span>
                        </li>
                        <li class="my-build__summary-spec-item" v-if="buildStore.psuWattage > 0">
                            <span class="my-build__spec-label">PSU Wattage</span>
                            <span class="my-build__spec-value">{{ buildStore.psuWattage }}W</span>
                        </li>
                    </ul>

                    <div class="my-build__summary-status" :class="allCompatible ? 'my-build__summary-status--ok' : 'my-build__summary-status--warn'">
                        <svg v-if="allCompatible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                        {{ allCompatible ? 'All parts are compatible' : 'Compatibility issues detected' }}
                    </div>

                    <button class="my-build__btn-share" @click="shareBuild">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                        {{ copySuccess ? 'Link Copied!' : 'Share my build' }}
                    </button>
                </div>
            </aside>
        </div>
        
        <section v-else class="my-build__empty">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <p>Your build is currently empty.</p>
            <RouterLink to="/browse" class="my-build__btn-primary">Browse Parts</RouterLink>
        </section>

    </main>
</template>

<style scoped>
.my-build {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-base) 4rem;
}

/* Breadcrumbs */
.my-build__breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 0;
    font-size: 0.875rem;
    color: var(--colour-text-secondary);
}

.my-build__breadcrumb-link {
    color: var(--colour-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
}

.my-build__breadcrumb-link:hover {
    color: var(--colour-primary);
}

.my-build__breadcrumb-current {
    color: var(--colour-text-primary);
    font-weight: 500;
}

/* Header */
.my-build__header {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--colour-border);
}

.my-build__header-left {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.my-build__title {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 3vw, 2.5rem);
    color: var(--colour-secondary);
    margin: 0;
}

.my-build__subtitle {
    margin: 0;
    color: var(--colour-text-secondary);
    font-size: 1.05rem;
}

.my-build__subtitle--success {
    color: #16a34a;
}

.my-build__subtitle--error {
    color: #dc2626;
}

.my-build__header-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: var(--colour-primary);
    border: 1px solid rgba(27, 75, 241, 0.2);
    border-radius: 100px;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.my-build__header-btn:hover {
    background-color: rgba(27, 75, 241, 0.05);
}

/* Layout */
.my-build__layout {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
}

.my-build__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    flex: 1;
}

/* Item Card */
.my-build__card {
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.my-build__card-top {
    display: flex;
    align-items: flex-start;
    padding: 1.5rem;
    gap: 1.5rem;
}

.my-build__card-image-wrapper {
    width: 80px;
    height: 80px;
    background-color: #f8fafc;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    flex-shrink: 0;
}

.my-build__card-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
}

.my-build__card-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.my-build__card-title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
}

.my-build__card-title {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.15rem;
}

.my-build__card-title a {
    color: var(--colour-secondary);
    text-decoration: none;
    transition: color 0.2s;
}

.my-build__card-title a:hover {
    color: var(--colour-primary);
}

.my-build__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
}

.my-build__badge--compatible {
    background-color: #f0fdf4;
    color: #16a34a;
}

.my-build__badge--warning {
    background-color: #fef2f2;
    color: #dc2626;
}

.my-build__card-meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: var(--colour-text-secondary);
}

.my-build__meta-dot {
    opacity: 0.5;
}

.my-build__meta-wattage {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #ca8a04;
    font-weight: 600;
}

.my-build__card-price-col {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1rem;
}

.my-build__card-price {
    margin: 0;
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 800;
    color: var(--colour-text-primary);
}

.my-build__btn-remove {
    background: none;
    border: none;
    color: #cbd5e1;
    cursor: pointer;
    transition: color 0.2s;
    padding: 0;
}

.my-build__btn-remove:hover {
    color: #dc2626;
}

/* Card Bottom: Retailers */
.my-build__card-bottom {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 1.5rem;
    background-color: #f8fafc;
    border-top: 1px solid var(--colour-border);
    gap: 1rem;
}

.my-build__buy-label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    color: var(--colour-text-secondary);
}

.my-build__buy-links {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 100%;
}

.my-build__btn-retailer {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--colour-text-primary);
    text-decoration: none;
    transition: all 0.2s ease;
    min-width: 120px;
}

.my-build__btn-retailer:hover {
    border-color: #cbd5e1;
    background-color: #f1f5f9;
}

.my-build__btn-retailer svg {
    color: var(--colour-text-secondary);
}

/* Add another card */
.my-build__add-card {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 2rem;
    border: 2px dashed #cbd5e1;
    border-radius: 16px;
    background-color: transparent;
    color: var(--colour-text-secondary);
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.2s ease;
}

.my-build__add-card:hover {
    border-color: var(--colour-primary);
    color: var(--colour-primary);
    background-color: rgba(27, 75, 241, 0.02);
}

/* Right Side Summary */
.my-build__summary-wrapper {
    width: 100%;
}

.my-build__summary-box {
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 2rem;
}

.my-build__summary-title {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: var(--colour-primary);
    margin: 0 0 2rem 0;
}

.my-build__summary-cost-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1.5rem;
}

.my-build__summary-cost-label {
    font-size: 1.1rem;
    color: var(--colour-text-secondary);
}

.my-build__summary-cost-value {
    font-family: var(--font-heading);
    font-size: 2.5rem;
    font-weight: 800;
    color: var(--colour-secondary);
    line-height: 1;
}

.my-build__summary-wattage-box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #fefce8;
    border: 1px solid #fef08a;
    padding: 1rem;
    border-radius: 8px;
    color: #a16207;
    margin-bottom: 2rem;
}

.my-build__wattage-label {
    font-weight: 600;
    flex: 1;
}

.my-build__wattage-value {
    font-family: var(--font-heading);
    font-weight: 800;
    font-size: 1.1rem;
}

.my-build__summary-specs {
    list-style: none;
    padding: 0;
    margin: 0 0 2rem 0;
    display: flex;
    flex-direction: column;
}

.my-build__summary-spec-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid #f1f5f9;
}

.my-build__summary-spec-item:last-child {
    border-bottom: none;
}

.my-build__spec-label {
    color: var(--colour-text-secondary);
    font-size: 0.95rem;
}

.my-build__spec-value {
    font-weight: 600;
    color: var(--colour-text-primary);
}

.my-build__summary-status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
}

.my-build__summary-status--ok {
    background-color: #f0fdf4;
    color: #16a34a;
}

.my-build__summary-status--warn {
    background-color: #fef2f2;
    color: #dc2626;
}

.my-build__btn-share {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem;
    background-color: transparent;
    border: 1px solid var(--colour-border);
    border-radius: 100px;
    color: var(--colour-text-primary);
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.my-build__btn-share:hover {
    background-color: #f8fafc;
    border-color: #cbd5e1;
}

/* Empty State */
.my-build__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 2rem;
    background-color: white;
    border: 1px solid var(--colour-border);
    border-radius: 16px;
    text-align: center;
    color: var(--colour-text-secondary);
    margin-top: 1rem;
}

.my-build__empty svg {
    color: #cbd5e1;
    margin-bottom: 1.5rem;
}

.my-build__empty p {
    font-size: 1.1rem;
    margin-bottom: 2rem;
}

.my-build__btn-primary {
    display: inline-flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--colour-primary);
    color: white;
    font-family: var(--font-heading);
    font-weight: 700;
    text-decoration: none;
    border-radius: 100px;
    transition: all 0.2s ease;
}

.my-build__btn-primary:hover {
    background-color: var(--colour-primary-hover);
    transform: translateY(-2px);
}

@media (min-width: 992px) {
    .my-build__header {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .my-build__layout {
        flex-direction: row;
    }

    .my-build__list {
        flex: 1.5;
    }

    .my-build__summary-wrapper {
        flex: 1;
        max-width: 420px;
    }

    .my-build__card-bottom {
        flex-direction: row;
        align-items: center;
    }

    .my-build__buy-links {
        width: auto;
        margin-left: 1.5rem;
    }
    
    .my-build__btn-retailer {
        flex: 0 1 auto;
    }
}
</style>