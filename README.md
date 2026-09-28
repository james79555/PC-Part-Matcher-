# PC Part Matcher

PC Part Matcher is a modern, responsive Single Page Application (SPA) designed to help users build their perfect PC. It features an interactive hardware compatibility checker, a live browsing interface with robust filtering, and a seamless WordPress backend integration.

## 🎓 Assignment Criteria Fulfilled (Aiming for Excellent Band: 32-40 pts)

This project was built to strictly adhere to the Web Design 2 assignment specification, successfully implementing all mandatory and additional requirements:

### 1. Core Requirements
*   **Architecture & State Management:** Built utilizing a modern component-based architecture using **Vue 3 (Composition API)**. Global state management is handled by **Pinia** (powering the `pcPartsStore` for inventory and `buildStore` for the user's active PC build).
*   **Routing:** Utilizes **Vue Router** to navigate between 11 distinct pages (Home, Browse, Build, Part Detail, Contact, About, FAQ, Privacy Policy, Terms, etc.) without page reloads.
*   **Design & Styling:** Features a fully responsive, custom-built CSS design system. It strictly adheres to the **BEM (Block Element Modifier)** naming convention, utilizes CSS variables for global tokens, and employs modern functions like `clamp()` for fluid typography. **No `!important` tags were used**, relying entirely on proper selector specificity.
*   **Accessibility (a11y) & GDPR Compliance:** 
    *   **A11y:** Passes WCAG 2.1 AA standards. Includes semantic HTML, `aria-labels`, `aria-invalid` form states, "Skip to Main Content" links, focus-trapping, and `role="status"` on notification toasts for screen readers.
    *   **GDPR:** Implements a fully functional Cookie Consent banner that saves user preferences to `localStorage`, alongside dedicated Privacy Policy and Terms of Service pages.
*   **Forms & Validation:** The **Contact Page** features a highly robust form with real-time validation, Regex-based email checking, specific visual error states, and a simulated asynchronous submission process.
*   **API Integration:** The Vue application fetches its live inventory data from a custom WordPress REST API endpoint. The **Browse Parts** page features advanced multi-dimensional filtering (by Component Type, Socket, Form Factor, Storage Interface) and price sorting.

### 2. Additional Deliverables
*   **WordPress Theme Integration:** The entire Vue SPA is embedded within a **Custom WordPress Theme**. We utilized `functions.php` to securely inject the absolute theme directory path (`window.wpThemeUrl`) directly into the Vue app, ensuring all static assets and routing resolve perfectly regardless of the WordPress hosting environment.
*   **Custom WordPress API Plugin:** Developed a custom REST API endpoint plugin (`pc-part-matcher-api.php`) to intercept default WordPress JSON outputs and strip away unnecessary bloat, delivering a clean, tailored data structure exclusively for the Vue frontend.
*   **Social Integration:** Built a "Share My Build" feature that generates custom URL query parameters (e.g., `?build=1,2,3`), allowing users to easily share their specific PC configurations.

---

## 🚀 Setup & Installation (For Marking)

Due to file size limits on free cloud hosting platforms, the full WordPress database and media library are provided via an export file.

### Option 1: Full WordPress Integration (Recommended)
To view the complete project, including the custom API plugin and database:
1. Spin up a blank local WordPress site (e.g., using **Local WP**).
2. Go to **Plugins > Add New** and install the **All-in-One WP Migration** plugin.
3. Import the provided `.wpress` file located in the root of this submission folder.
4. *Important:* Once imported, navigate to **Settings > Permalinks** and click **Save Changes** twice to flush the rewrite rules for the Vue Router.
5. Visit the frontend of the site!

### Option 2: Vue Frontend Only (Dev Mode)
If you wish to examine the Vue component architecture independent of the WordPress backend:
1. Navigate to the `vue-frontend` directory in your terminal.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the Vite development server.
*(Note: In dev mode, the app will attempt to fetch data from the local API endpoint. If the WordPress backend is not running, the inventory may not populate, but the component structure and UI are fully testable).*
