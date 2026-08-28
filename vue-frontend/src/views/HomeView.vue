<script setup>
import {ref} from 'vue'

const pages = ref([])

const fetchWordPressPages = async () => {
    try {
        const response = await fetch('http://pc-part-matcher.local/wp-json/wp/v2/pages')
        const data = await response.json()
        pages.value = data 
    } catch (error) {
        console.error('Failed to fetch from WordPress:', error)
    }
}

fetchWordPressPages()
</script> 

<template> 
    <main>
        <h1>Wordpress Connection Test</h1>

        <ul v-if="pages.length > 0">
            <li v-for="page in pages" :key="page.id">
                {{ page.title.rendered }}
            </li>
        </ul>

        <p v-else>Loading data from WordPress...</p>
    </main>
</template>
