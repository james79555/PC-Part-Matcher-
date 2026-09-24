import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import BrowseView from '../views/BrowseView.vue'
import BuildView from '../views/BuildView.vue'
import ContactView from '../views/ContactView.vue'
import PolicyView from '../views/PolicyView.vue'
import PartDetailView from '@/views/PartDetailView.vue'
import FaqView from '../views/FaqView.vue'
import CompatibilityGuideView from '../views/CompatibilityGuideView.vue'
import PcBuildingTipsView from '../views/PcBuildingTipsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
  routes: [
    {path: '/', name: 'home', component: HomeView},
    {path: '/about', name: 'about', component: AboutView}, 
    {path: '/browse', name: 'browse', component: BrowseView},
    {path: '/build', name: 'build', component: BuildView},
    {path: '/contact', name: 'contact', component: ContactView},
    {path: '/part/:id', name: 'part-detail', component: PartDetailView},
    {path: '/faq', name: 'faq', component: FaqView},
    {path: '/compatibility-guide', name: 'compatibility-guide', component: CompatibilityGuideView},
    {path: '/pc-building-tips', name: 'pc-building-tips', component: PcBuildingTipsView}
  ],
})

export default router
