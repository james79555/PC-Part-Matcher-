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
    <div class="product-page" v-if="part">
        <div class="product-page__image-container">
            <img class="product-page__image" :src="part.image" :alt="part.name"/>
            <p v-if="part.image && part.image.includes('placeholder_image')" class="product-page__image-credit">
                <a href="https://www.vecteezy.com/free-vector/computer-hardware" target="_blank" rel="noopener noreferrer">Computer Hardware Vectors by Vecteezy</a>
            </p>
        </div>
        <div class="product-page__details">
            <h3 class="product-page-details-componentType"> {{ part.componentType }}</h3>
            <h1 class="product-page__details-name">{{ part.name }}</h1>
            <h2 class="product-page__details-price">{{ store.formattedPrice(part.price) }}</h2>
            <button class="product-page__details-button" @click="addToBuild"> Add to Build </button>
        </div>
        <div class="product-page__description">
            <h2 class="product-page__description-header">Description</h2>
            <p class="product-page__description-text">To be Added...</p>
        </div>
        <div class="product-page__specifications">
            <table class="product-page__specifications-table">
                <th class="product-page__specifications-table-header" colspan="2">Specifications</th>
                <tr v-if="part.formFactor">
                    <th>Form Factor</th>
                    <td>{{ part.formFactor }}</td>
                </tr>
                <tr v-if="part.socketType">
                    <th>Socket Type</th>
                    <td>{{ part.socketType }}</td>
                </tr>
                <tr v-if="part.memoryType">
                    <th>Memory Type</th>
                    <td>{{ part.memoryType }}</td>
                </tr>
                <tr v-if="part.storageInterface">
                    <th>Storage Interface</th>
                    <td>{{ part.storageInterface }}</td>
                </tr>
                <tr v-if="part.wattage">
                    <th>Wattage</th>
                    <td>{{ part.wattage }}W</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .product-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: var(--spacing-base);
    }
    .product-page__image-container {
        width: 100%;
        margin-bottom: var(--spacing-base);
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .product-page__image {
        width: 100%;
        border-radius: var(--border-radius);
        border: 1px solid var(--colour-border);
    }
    .product-page__image-credit {
        margin: 0.5rem 0 0 0;
        font: 13.0px 'Helvetica Neue', Helvetica, Arial, sans-serif;
        text-align: center;
    }
    .product-page__image-credit a {
        color: #666;
        text-decoration: underline;
    }
    .product-page__details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: var(--spacing-base);
        border: 1px solid var(--colour-border);
        border-radius: var(--border-radius);
        padding: var(--spacing-base);
        width: 100%;
    }
    .product-page-details-componentType {
        font-size: clamp(0.75rem, 1rem, 1.25rem);
        margin-bottom: var(--spacing-base);
    }
    .product-page__details-name {
        font-size: clamp(1rem, 1.5rem, 2rem);
        margin-bottom: var(--spacing-base);
    }
    .product-page__details-price {
        font-size: clamp(1rem, 1.25rem, 1.5rem);
        margin-bottom: var(--spacing-base);
    }
    .product-page__details-button {
        color: var(--colour-text-primary);
        border-radius: var(--border-radius);
        padding: 0.5rem 1.5rem;
        font-size: clamp(0.75rem, 1rem, 1.25rem);
        cursor: pointer;
        width: 75%;
    }
    .product-page__description {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-bottom: var(--spacing-base);
        border: 1px solid var(--colour-border);
        border-radius: var(--border-radius);
        padding: var(--spacing-base);
        width: 100%;
    }
    .product-page__description-header {
        font-size: clamp(0.75rem, 1rem, 1.25rem);
        font-weight: bold;
        margin-bottom: var(--spacing-base);
    }
    .product-page__description-text {
        font-size: clamp(0.75rem, 1rem, 1.25rem);
    }
    .product-page__specifications {
        width:100%;
    }
    .product-page__specifications-table {
        width: 100%;
        border-collapse: collapse;
        font-size: clamp(0.75rem, 1rem, 1.25rem);
        border: 1px solid var(--colour-border);
    }
    .product-page__specifications-table th, .product-page__specifications-table td {
        border: 1px solid var(--colour-border);
        padding: var(--spacing-base);
        text-align: left;
    }
    .product-page__specifications-table-header {
        background-color: var(--colour-surface);
    }

    @media (min-width: 768px) {
        .product-page {
            display: grid;
            grid-template-columns: 40% 60%;
            grid-template-areas: 
                "image details"
                "image description"
                "specifications specifications";
            gap: 2rem;
        }
        .product-page__image-container {
            grid-area: image;
            height: 100%;
            margin-bottom: 0;
        }
        .product-page__image {
            object-fit: cover;
        }
        .product-page__details {
            grid-area: details;
            margin-bottom: 0; 
            height: 100%;
            gap: var(--spacing-base);
        }
        .product-page__description {
            grid-area: description;
            margin-bottom: 0;
            height: 100%;
        }
        .product-page__specifications {
            grid-area: specifications;
            margin-bottom: 0;
        }
    }
</style>