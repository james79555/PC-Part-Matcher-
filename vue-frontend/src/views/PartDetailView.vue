<script setup>
    import { computed, onMounted} from 'vue';
    import { useRoute } from 'vue-router';
    import { usePcPartsStore } from '../stores/pcParts';
    import { useBuildStore } from '../stores/buildStore';

    const route = useRoute();
    const store = usePcPartsStore();
    const buildStore = useBuildStore();

    onMounted( () => {
        if (store.inventory.length === 0) {
            store.fetchInventory();
        }
    })

    const part = computed( () => {
        return store.inventory.find(p => p.id == route.params.id);
    })

    const addToBuild = () => {
        if (part.value) {
            buildStore.addPart(part.value);
            alert(part.value.name + ' added to your build!');
        }
    }
</script>

<template>
    <main class="part-detail" v-if="part">
        <!-- Breadcrumbs -->
        <nav class="part-detail__breadcrumbs" aria-label="breadcrumb">
            <RouterLink to="/" class="part-detail__breadcrumb-link">Home</RouterLink>
            <span class="part-detail__breadcrumb-separator">›</span>
            <RouterLink to="/browse" class="part-detail__breadcrumb-link">Browse Parts</RouterLink>
            <span class="part-detail__breadcrumb-separator">›</span>
            <span class="part-detail__breadcrumb-current">{{ part.name }}</span>
        </nav>

        <div class="part-detail__layout">
            <div class="part-detail__image-col">
                <div class="part-detail__image-wrapper">
                    <img class="part-detail__image" :src="part.image" :alt="part.name"/>
                </div>
                <p v-if="part.image && part.image.includes('placeholder_image')" class="part-detail__image-credit">
                    <a href="https://www.vecteezy.com/free-vector/computer-hardware" target="_blank" rel="noopener noreferrer">Computer Hardware Vectors by Vecteezy</a>
                </p>
            </div>
            
            <div class="part-detail__info-col">
                <span class="part-detail__type">{{ part.componentType }}</span>
                <h1 class="part-detail__name">{{ part.name }}</h1>
                <p class="part-detail__price">{{ store.formattedPrice(part.price) }}</p>
                
                <button class="part-detail__add-btn" @click="addToBuild"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    Add to Build
                </button>

                <div class="part-detail__section">
                    <h2 class="part-detail__section-title">Description</h2>
                    <p class="part-detail__description">{{ part.description }}</p>
                </div>

                <div class="part-detail__section">
                    <h2 class="part-detail__section-title">Specifications</h2>
                    <div class="part-detail__specs">
                        <div class="part-detail__spec-row" v-if="part.formFactor">
                            <span class="part-detail__spec-label">Form Factor</span>
                            <span class="part-detail__spec-value">{{ part.formFactor }}</span>
                        </div>
                        <div class="part-detail__spec-row" v-if="part.socketType">
                            <span class="part-detail__spec-label">Socket Type</span>
                            <span class="part-detail__spec-value">{{ part.socketType }}</span>
                        </div>
                        <div class="part-detail__spec-row" v-if="part.memoryType">
                            <span class="part-detail__spec-label">Memory Type</span>
                            <span class="part-detail__spec-value">{{ part.memoryType }}</span>
                        </div>
                        <div class="part-detail__spec-row" v-if="part.storageInterface">
                            <span class="part-detail__spec-label">Storage Interface</span>
                            <span class="part-detail__spec-value">{{ part.storageInterface }}</span>
                        </div>
                        <div class="part-detail__spec-row" v-if="part.wattage">
                            <span class="part-detail__spec-label">Wattage</span>
                            <span class="part-detail__spec-value">{{ part.wattage }}W</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div v-else class="part-detail__loading">
        Loading component data...
    </div>
</template>

<style scoped>
/* Base Styles */
.part-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-base) 4rem;
}

.part-detail__loading {
    text-align: center;
    padding: 4rem;
    color: var(--colour-text-secondary);
    font-size: 1.1rem;
}

/* Breadcrumbs */
.part-detail__breadcrumbs {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1.5rem 0;
    font-size: 0.875rem;
    color: var(--colour-text-secondary);
}

.part-detail__breadcrumb-link {
    color: var(--colour-text-secondary);
    text-decoration: none;
    transition: color 0.2s;
}

.part-detail__breadcrumb-link:hover {
    color: var(--colour-primary);
}

.part-detail__breadcrumb-current {
    color: var(--colour-text-primary);
    font-weight: 500;
}

/* Layout */
.part-detail__layout {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    margin-top: 1rem;
}

/* Image Column */
.part-detail__image-col {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.part-detail__image-wrapper {
    width: 100%;
    background-color: #f8fafc;
    border: 1px solid var(--colour-border);
    border-radius: 16px;
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1 / 1;
}

.part-detail__image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
}

.part-detail__image-credit {
    margin-top: 1rem;
    font-size: 0.75rem;
    color: var(--colour-text-secondary);
}

.part-detail__image-credit a {
    color: inherit;
    text-decoration: underline;
}

/* Info Column */
.part-detail__info-col {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.part-detail__type {
    font-size: 0.875rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--colour-primary);
    margin-bottom: 0.75rem;
}

.part-detail__name {
    font-family: var(--font-heading);
    font-size: clamp(2rem, 4vw, 3rem);
    color: var(--colour-secondary);
    line-height: 1.1;
    margin: 0 0 1rem 0;
}

.part-detail__price {
    font-family: var(--font-heading);
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 800;
    color: var(--colour-text-primary);
    margin: 0 0 2rem 0;
}

.part-detail__add-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    padding: 1rem 1.5rem;
    background-color: var(--colour-primary);
    color: white;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 1.1rem;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-bottom: 3rem;
}

.part-detail__add-btn:hover {
    background-color: var(--colour-primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(27, 75, 241, 0.2);
}

.part-detail__section {
    width: 100%;
    margin-bottom: 2.5rem;
}

.part-detail__section-title {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    color: var(--colour-secondary);
    margin: 0 0 1rem 0;
    border-bottom: 1px solid var(--colour-border);
    padding-bottom: 0.75rem;
}

.part-detail__description {
    font-size: 1.05rem;
    color: var(--colour-text-secondary);
    line-height: 1.6;
    margin: 0;
}

/* Specifications Grid */
.part-detail__specs {
    display: flex;
    flex-direction: column;
}

.part-detail__spec-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid var(--colour-border);
}

.part-detail__spec-row:last-child {
    border-bottom: none;
}

.part-detail__spec-label {
    font-weight: 600;
    color: var(--colour-text-primary);
}

.part-detail__spec-value {
    color: var(--colour-text-secondary);
}

/* Desktop Layout */
@media (min-width: 768px) {
    .part-detail__layout {
        flex-direction: row;
        align-items: flex-start;
        gap: 4rem;
        margin-top: 2rem;
    }

    .part-detail__image-col {
        flex: 1;
        position: sticky;
        top: 2rem;
    }

    .part-detail__info-col {
        flex: 1.2;
    }

    .part-detail__add-btn {
        max-width: 300px;
    }
}
</style>