import {ref} from 'vue'
import {defineStore} from 'pinia'

export const usePcPartsStore = defineStore('pcParts', () => {
    const inventory = ref([])
    const activeBuild = ref([])
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
        isLoading.value= true 
        error.value = null 
        try {
            const res = await fetch('http://pc-part-matcher.local/wp-json/wp/v2/pc-part?per_page=100&acf_format=standard')
            if (!res.ok) throw new Error('HTTP error! Status: ${res.status}')
                const rawData = await res.json()
                inventory.value = rawData.map(part => ({
                    id: part.id,
                    name: part.title.rendered, 
                    image: part.acf.image || '../public/placeholder_image.jpg',
                    componentType: part.acf.component_type, 
                    price: Number(part.acf.price), 
                    socketType: part.acf.socket_type || null, 
                    memoryType: part.acf.memory_type || null, 
                    formFactor: part.acf.form_factor || null , 
                    wattage: Number(part.acf.wattage) || 0,
                    storageInterface: part.acf.storage_interface || null
                }))
        } catch (err) {
            error.value = 'Failed to fetch hardware data: ${err.message}'
            console.error(err)
        } finally {
            isLoading.value = false
        }

            
    }

    return {
        inventory,
        activeBuild,
        isLoading,
        error,
        currency, 
        currencyRate,
        formattedPrice, 
        updateCurrency,
        fetchInventory
    }
})