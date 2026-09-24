<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBuildStore } from '../stores/buildStore'
import { usePcPartsStore } from '../stores/pcParts'

const route = useRoute()
const router = useRouter()
const buildStore = useBuildStore()
const pcPartsStore = usePcPartsStore()

const copySuccess = ref(false)

onMounted(async () => {
    // If the URL has ?build=1,2,3 we need to load it
    if (route.query.build) {
        if (pcPartsStore.inventory.length === 0) {
            await pcPartsStore.fetchInventory()
        }
        
        const idsArray = route.query.build.split(',')
        buildStore.loadFromIds(idsArray)
        
        // Clean up the URL so the user doesn't keep reloading from params if they make changes
        router.replace({ path: '/build' })
    } else {
        // Ensure inventory is loaded just in case we need it for currency conversions or fallback
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

/**
 * Generates a shareable URL containing the IDs of all parts currently in the build.
 * It copies this URL to the user's clipboard and provides visual feedback.
 * 
 * How it works:
 * 1. Maps over `buildStore.parts` to extract an array of just the part IDs (e.g. [12, 45, 89])
 * 2. Joins them into a comma-separated string: "12,45,89"
 * 3. Constructs a full URL pointing to the /build page with the IDs as a query parameter (?build=...)
 * 4. Uses the modern navigator.clipboard API to save the URL to the user's clipboard
 */
const shareBuild = async () => {
    const ids = buildStore.parts.map(p => p.id).join(',')
    if (!ids) {
        alert("Your build is empty!")
        return
    }
    
    // Create the full URL based on the current domain
    const shareUrl = `${window.location.origin}/build?build=${ids}`
    
    try {
        // Await the clipboard write operation
        await navigator.clipboard.writeText(shareUrl)
        copySuccess.value = true
        // Reset the button text/icon after 3 seconds
        setTimeout(() => copySuccess.value = false, 3000)
    } catch (err) {
        // Fallback for older browsers or if clipboard permissions are denied
        alert("Failed to copy link. Here is the URL:\n" + shareUrl)
    }
}
</script>

<template>
    <main class="build-page">
        <header class="build-page__header">
            <h1>My Custom Build</h1>
        </header>

        <section class="build-page__content" v-if="buildStore.parts.length > 0">
            
            <div class="build-page__list">
                <article v-for="part in buildStore.parts" :key="part.id" class="build-page__card">
                    <div class="build-page__card-main">
                        <img class="build-page__card-image" :src="part.image" :alt="part.name" />
                        
                        <div class="build-page__card-info">
                            <h3 class="build-page__card-title"><RouterLink :to="`/part/${part.id}`">{{ part.name }}</RouterLink></h3>
                            <p class="build-page__card-type">{{ part.componentType }}</p>
                        </div>
                        
                        <div class="build-page__card-price-section">
                            <p class="build-page__card-price">{{ pcPartsStore.formattedPrice(part.price) }}</p>
                        </div>
                    </div>

                    <div class="build-page__card-actions">
                        <a :href="getAmazonLink(part.name)" target="_blank" rel="noopener noreferrer" class="build-page__btn build-page__btn--amazon">Amazon</a>
                        <a :href="getNeweggLink(part.name)" target="_blank" rel="noopener noreferrer" class="build-page__btn build-page__btn--newegg">Newegg</a>
                        <a :href="getOverclockersLink(part.name)" target="_blank" rel="noopener noreferrer" class="build-page__btn build-page__btn--overclockers">OverClockers</a>
                    </div>
                    
                    <button class="build-page__btn--remove" @click="buildStore.removePart(part.id)" title="Remove Part">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                        </svg>
                    </button>
                </article>
            </div>

            <!-- Build Summary Below the List -->
            <aside class="build-page__summary">
                <h2 class="build-page__summary-title">Build Summary</h2>
                <ul class="build-page__summary-list">
                    <li class="build-page__summary-item"><strong>Total Cost:</strong> <span>{{ pcPartsStore.formattedPrice(buildStore.totalCostRaw) }}</span></li>
                    <li class="build-page__summary-item"><strong>Estimated Wattage:</strong> <span>{{ buildStore.totalWattage }}W</span></li>
                    <li class="build-page__summary-item" v-if="buildStore.psuWattage > 0"><strong>PSU Wattage:</strong> <span>{{ buildStore.psuWattage }}W</span></li>
                    <li class="build-page__summary-item"><strong>Socket Type:</strong> <span>{{ buildStore.buildSocketType }}</span></li>
                    <li class="build-page__summary-item"><strong>Form Factor:</strong> <span>{{ buildStore.buildFormFactor }}</span></li>
                    <li class="build-page__summary-item"><strong>Storage:</strong> <span>{{ buildStore.buildStorageInterface }}</span></li>
                    <li class="build-page__summary-item"><strong>Memory:</strong> <span>{{ buildStore.buildMemoryType }}</span></li>
                </ul>

                <button class="build-page__share-btn" @click="shareBuild">
                    <svg v-if="!copySuccess" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                    </svg>
                    {{ copySuccess ? 'Link Copied!' : 'Share My Build' }}
                </button>
            </aside>
        </section>

        <section v-else class="build-page__empty">
            <p>Your build is currently empty.</p>
            <RouterLink to="/browse" class="build-page__btn build-page__btn--primary">Browse Parts</RouterLink>
        </section>
    </main>
</template>

<style scoped>
.build-page {
    padding: var(--spacing-base);
    max-width: 1200px;
    margin: 0 auto;
}
.build-page__header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--colour-border);
}

.build-page__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

/* Part List */
.build-page__list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
}

/* Build Card (Mobile First) */
.build-page__card {
    display: flex;
    flex-direction: column;
    border: 1px solid var(--colour-border);
    border-radius: var(--border-radius);
    background: var(--colour-surface);
    overflow: hidden;
    position: relative; /* Position context for the absolute remove button */
    padding-right: 40px; /* Leave space on the right for the absolute button */
}

.build-page__card-main {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    gap: 1rem;
}

.build-page__card-image {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 4px;
}

.build-page__card-info {
    flex-grow: 1;
}

.build-page__card-title {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
}

.build-page__card-title a {
    color: inherit;
    text-decoration: none;
}

.build-page__card-title a:hover {
    text-decoration: underline;
}

.build-page__card-type {
    margin: 0;
    font-size: 0.85rem;
    color: #666;
}

.build-page__card-price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
}

.build-page__card-price {
    margin: 0;
    font-weight: bold;
    color: #333;
    font-size: 1rem;
}

/* Actions attached underneath */
.build-page__card-actions {
    display: flex;
    flex-direction: row; /* Spread across 1 line on mobile */
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    background-color: #f8f9fa;
    border-top: 1px solid var(--colour-border);
    gap: 0.25rem;
}

.build-page__btn {
    padding: 0.5rem 0.25rem;
    border-radius: 4px;
    text-decoration: none;
    font-size: clamp(0.6rem, 2vw, 0.85rem); /* Smaller font on mobile so they fit */
    font-weight: 600;
    text-align: center;
    flex: 1; /* Ensure they all share the line evenly */
    cursor: pointer;
}

.build-page__btn--amazon {
    background-color: #ff9900;
    color: #111;
}

.build-page__btn--newegg {
    background-color: #004a8e;
    color: white;
}

.build-page__btn--overclockers {
    background-color: #d10000;
    color: white;
}

.build-page__btn--remove {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 40px;
    background: #fff0f0;
    color: #dc3545;
    border: none;
    border-left: 1px solid var(--colour-border);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s;
}

.build-page__btn--remove:hover {
    background: #ffe0e0;
}

.build-page__btn--primary {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1.5rem;
    background-color: #007bff;
    color: white;
    border: none;
}

/* Build Summary */
.build-page__summary {
    background: var(--colour-surface);
    border: 1px solid var(--colour-border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
}

.build-page__summary-title {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    border-bottom: 1px solid var(--colour-border);
    padding-bottom: 0.5rem;
}

.build-page__summary-list {
    list-style: none;
    padding: 0;
    margin: 0 0 1.5rem 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.build-page__summary-item {
    display: flex;
    flex-direction: column; /* Stack property and value on mobile */
    gap: 0.25rem;
    font-size: 1rem;
    border-bottom: 1px solid #f0f0f0;
    padding-bottom: 0.5rem;
}

.build-page__summary-item:last-child {
    border-bottom: none;
}

.build-page__summary-item span {
    text-align: left;
    color: #555;
}

.build-page__share-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    transition: background-color 0.2s;
    width: 100%;
    margin-top: 1rem;
}

.build-page__share-btn:hover {
    background-color: #0056b3;
}

.build-page__empty {
    text-align: center;
    padding: 3rem;
    background: #f9f9f9;
    border-radius: 8px;
}

/* Laptop / Desktop UI */
@media (min-width: 768px) {
    /* Keep it spanning full width, but make it look cleaner */
    .build-page__card-image {
        width: 100px;
        height: 100px;
    }
    
    .build-page__card-title {
        font-size: 1.25rem;
    }

    .build-page__card-price {
        font-size: 1.25rem;
    }

    .build-page__card-actions {
        flex-direction: row; /* Buttons are horizontal underneath */
        justify-content: flex-start;
    }
    
    .build-page__btn {
        width: auto;
        flex: 0 1 auto;
        min-width: 120px;
    }

    /* Change summary list to Row based on larger screens */
    .build-page__summary-item {
        flex-direction: row;
        justify-content: space-between;
    }

    .build-page__summary-item span {
        text-align: right;
    }
}
</style>