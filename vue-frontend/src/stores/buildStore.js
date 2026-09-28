import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { usePcPartsStore } from './pcParts'

export const useBuildStore = defineStore('build', () => {
    // State
    const parts = ref([])
    const notification = ref(null)
    const notificationTimeout = ref(null)

    function showNotification(message) {
        notification.value = message;
        if (notificationTimeout.value) {
            clearTimeout(notificationTimeout.value);
        }
        notificationTimeout.value = setTimeout(() => {
            notification.value = null;
        }, 3000);
    }

    // Actions
    function addPart(part) {
        const exists = parts.value.find(p => p.id === part.id)
        if (!exists) {
            parts.value.push(part)
            showNotification(`${part.name} added to your build!`)
        } else {
            showNotification(`${part.name} is already in your build!`)
        }
    }

    function removePart(partId) {
        parts.value = parts.value.filter(p => p.id !== partId)
    }

    function clearBuild() {
        parts.value = []
    }
    
    function isPartCompatible(part) {
        // Check socket
        if (part.socketType) {
            const conflictingSocket = parts.value.find(p => p.socketType && p.socketType !== part.socketType)
            if (conflictingSocket) return false
        }
        
        // Check memory
        if (part.memoryType) {
            const conflictingMemory = parts.value.find(p => p.memoryType && p.memoryType !== part.memoryType)
            if (conflictingMemory) return false
        }
        
        // Check form factor (Motherboard vs Case primarily)
        if (part.formFactor) {
            const conflictingFormFactor = parts.value.find(p => p.formFactor && p.formFactor !== part.formFactor)
            if (conflictingFormFactor) return false
        }
        
        // Check storage interface
        if (part.storageInterface) {
            const conflictingStorage = parts.value.find(p => p.storageInterface && p.storageInterface !== part.storageInterface)
            if (conflictingStorage) return false
        }

        return true
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
        return parts.value.reduce((total, part) => {
            if (part.componentType === 'PSU') return total
            return total + (Number(part.wattage) || 0)
        }, 0)
    })

    const psuWattage = computed(() => {
        const psu = parts.value.find(p => p.componentType === 'PSU')
        return psu ? Number(psu.wattage) || 0 : 0
    })

    const buildSocketType = computed(() => {
        const sockets = parts.value.map(p => p.socketType).filter(s => s)
        return [...new Set(sockets)].join(', ')
    })

    const buildFormFactor = computed(() => {
        const forms = parts.value.map(p => p.formFactor).filter(f => f)
        return [...new Set(forms)].join(', ')
    })

    const buildStorageInterface = computed(() => {
        const interfaces = parts.value.map(p => p.storageInterface).filter(i => i)
        return [...new Set(interfaces)].join(', ')
    })

    const buildMemoryType = computed(() => {
        const memory = parts.value.map(p => p.memoryType).filter(m => m)
        return [...new Set(memory)].join(', ')
    })

    return {
        parts,
        notification,
        showNotification,
        addPart,
        removePart,
        clearBuild,
        loadFromIds,
        isPartCompatible,
        totalCostRaw,
        totalWattage,
        psuWattage,
        buildSocketType,
        buildFormFactor,
        buildStorageInterface,
        buildMemoryType
    }
}, {
    persist: true
})
