import {ref} from 'vue'
import {defineStore} from 'pinia'

export const usePcPartsStore = defineStore('pcParts', () => {
    const inventory = ref([])
    const activeBuild = ref([])
    const isLoading = ref(false)
    const error = ref(null)

    const fetchInventory = async () => {
        isLoading.value= true 
        error.value = null 
        try {
            const res = await fetch('http://pc-part-matcher.local/wp-json/wp/v2/pc-part?per_page=100')
            if (!res.ok) throw new Error('HTTP error! Status: ${res.status}')
                const rawData = await res.json()
                inventory.value = rawData.map(part => ({
                    id: part.id,
                    name: part.title.rendered, 
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
        fetchInventory
    }
})