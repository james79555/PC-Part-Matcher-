import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BrowseView from '../views/BrowseView.vue'
import BuildView from '../views/BuildView.vue'
import ContactView from '../views/ContactView.vue'
import PolicyView from '../views/PolicyView.vue'
import PartDetailView from '@/views/PartDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/about', name: 'about', component: AboutView}, 
    {path: '/browse', name: 'browse', component: BrowseView},
    {path: '/build', name: 'build', component: BuildView},
    {path: '/contact', name: 'contact', component: ContactView},
    {path: '/part/:id', name: 'part-detail', component: PartDetailView}
  ],
})

export default router
