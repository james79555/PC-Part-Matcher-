import { ref } from 'vue'
import { defineStore } from 'pinia'

/**
 * Pinia store managing the global inventory of PC parts and currency conversion.
 */
export const usePcPartsStore = defineStore('pcParts', () => {
    const inventory = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const currency = ref('GBP')
    const currencyRate = ref(1)

    /**
     * Formats a raw price integer/float into a localized currency string.
     * @param {number} basePrice The base price in GBP.
     * @returns {string} The formatted price string with the correct currency symbol.
     */
    function formattedPrice(basePrice) {
        if (!basePrice) return '';
        const converted = (basePrice * currencyRate.value).toFixed(2);

        let symbol = '£';
        if (currency.value === 'USD') symbol = '$';
        if (currency.value === 'EUR') symbol = '€';

        return `${symbol}${converted}`;
    }

    /**
     * Fetches live exchange rates and updates the global currency multiplier.
     * @param {string} targetCurrency The currency code to convert to (e.g. 'USD', 'EUR').
     */
    async function updateCurrency(targetCurrency) {
        currency.value = targetCurrency;

        if (targetCurrency === 'GBP') {
            currencyRate.value = 1;
            return;
        }

        try {
            // We must call the absolute URL directly. The old '/api/frankfurter' path 
            // relied on a Vite Dev Server proxy, which doesn't exist in the live WordPress environment!
            // Note: The Frankfurter API moved from .app to .dev/v1/ - this prevents CORS redirect blocks.
            const res = await fetch(`https://api.frankfurter.dev/v1/latest?amount=1&from=GBP&to=${targetCurrency}`);
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

    /**
     * Fetches the entire hardware inventory from the custom WordPress REST API.
     * Maps the response data into the internal inventory state array.
     */
    const fetchInventory = async () => {
        isLoading.value = true
        error.value = null
        try {
            // Dynamic URL resolution:
            // In Vite 'dev' mode, forcefully hit the local WordPress site to avoid CORS/404s.
            // In production (live server), use the current browser domain so it works anywhere.
            const baseUrl = import.meta.env.DEV ? 'http://pc-part-matcher.local' : window.location.origin;
            const res = await fetch(`${baseUrl}/wp-json/pc-part-matcher/v1/parts`)
            if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`)

            const data = await res.json()

            // The API returns a highly structured array, but we use .map() here 
            // to defensively ensure every single property exists before Vue tries to render it.
            // This prevents crashes if a field in the database was accidentally left blank.
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
                // Fallback logic: If the part has no image, try to use the WordPress injected URL.
                // If even that fails (we are running locally outside WP), just use the root placeholder.
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