import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePcPartsStore } from './pcParts'

export const useBuildStore = defineStore('build', () => {
    // State
    const parts = ref([])

    // Actions
    function addPart(part) {
        const exists = parts.value.find(p => p.id === part.id)
        if (!exists) {
            parts.value.push(part)
        }
    }

    function removePart(partId) {
        parts.value = parts.value.filter(p => p.id !== partId)
    }

    function clearBuild() {
        parts.value = []
    }
    
    // For sharing via URL
    function loadFromIds(idsArray) {
        const pcPartsStore = usePcPartsStore()
        const newBuild = []
        
        idsArray.forEach(id => {
            const foundPart = pcPartsStore.inventory.find(p => p.id === Number(id))
            if (foundPart) {
                newBuild.push(foundPart)
            }
        })
        
        parts.value = newBuild
    }

    // Getters
    const totalCostRaw = computed(() => {
        return parts.value.reduce((total, part) => total + (Number(part.price) || 0), 0)
    })

    const totalWattage = computed(() => {
        return parts.value.reduce((total, part) => total + (Number(part.wattage) || 0), 0)
    })

    const buildSocketType = computed(() => {
        const sockets = parts.value.map(p => p.socketType).filter(s => s)
        return [...new Set(sockets)].join(', ') || 'N/A'
    })

    const buildFormFactor = computed(() => {
        const forms = parts.value.map(p => p.formFactor).filter(f => f)
        return [...new Set(forms)].join(', ') || 'N/A'
    })

    const buildStorageInterface = computed(() => {
        const interfaces = parts.value.map(p => p.storageInterface).filter(i => i)
        return [...new Set(interfaces)].join(', ') || 'N/A'
    })

    const buildMemoryType = computed(() => {
        const memory = parts.value.map(p => p.memoryType).filter(m => m)
        return [...new Set(memory)].join(', ') || 'N/A'
    })

    return {
        parts,
        addPart,
        removePart,
        clearBuild,
        loadFromIds,
        totalCostRaw,
        totalWattage,
        buildSocketType,
        buildFormFactor,
        buildStorageInterface,
        buildMemoryType
    }
}, {
    persist: true
})
