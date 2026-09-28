import { ref } from 'vue'
import { defineStore } from 'pinia'

export const usePcPartsStore = defineStore('pcParts', () => {
    const inventory = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const currency = ref('GBP')
    const currencyRate = ref(1)

    function formattedPrice(basePrice) {
        if (!basePrice) return '';
        const converted = (basePrice * currencyRate.value).toFixed(2);

        let symbol = '£';
        if (currency.value === 'USD') symbol = '$';
        if (currency.value === 'EUR') symbol = '€';

        return `${symbol}${converted}`;
    }

    async function updateCurrency(targetCurrency) {
        currency.value = targetCurrency;

        if (targetCurrency === 'GBP') {
            currencyRate.value = 1;
            return;
        }

        try {
            const res = await fetch(`/api/frankfurter/latest?amount=1&from=GBP&to=${targetCurrency}`);
            if (!res.ok) throw new Error('API Network response was not ok');

            const data = await res.json();
            currencyRate.value = data.rates[targetCurrency];
        } catch (err) {
            console.error("Currency API Error: ", err);
            alert("Unable to fetch live exchnage rates. Defaulting to GBP.");
            currency.value = 'GBP';
            currencyRate.value = 1;
        }
    }

    const fetchInventory = async () => {
        isLoading.value = true
        error.value = null
        try {
            // Using the new custom REST API endpoint
            const res = await fetch('http://pc-part-matcher.local/wp-json/pc-part-matcher/v1/parts')
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

            // The API now returns the exact shape we need
            const data = await res.json()

            inventory.value = data.map(part => ({
                id: part.id,
                name: part.name,
                price: part.price,
                componentType: part.componentType,
                socketType: part.socketType,
                memoryType: part.memoryType,
                formFactor: part.formFactor,
                wattage: part.wattage,
                storageInterface: part.storageInterface,
                image: part.image || (window.wpThemeUrl ? `${window.wpThemeUrl}/dist/placeholder_image.jpg` : '/placeholder_image.jpg'),
                description: part.description || 'To be Added...'
            }))
        } catch (err) {
            error.value = `Failed to fetch hardware data: ${err.message}`
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    return {
        inventory,
        isLoading,
        error,
        currency,
        currencyRate,
        formattedPrice,
        updateCurrency,
        fetchInventory
    }
})