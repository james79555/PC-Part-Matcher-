# Think Aloud Testing: Summary & Redesign Strategy

Based on the Think Aloud testing sessions with Bedo and Ben (conducted Sep 24, 2026), several key insights were uncovered regarding user expectations, navigation, and layout. 

Below is a consolidated summary of their feedback and a direct strategy for how we will translate these findings into the upcoming high-fidelity redesign.

---

## 1. Homepage & Call-to-Action
**Findings:** Users felt that a "Browse by category" section on the homepage was unnecessary, as people use PC builders to assemble full systems, not just search for single components. The current label "Browse parts" lacked engagement.
**Redesign Translation:**
- Replace "Browse parts" with a strong, action-oriented primary CTA: **"Build your PC"**.
- Emphasize social proof and community metrics (e.g., "Join 50k+ builders") in the Hero section to build immediate trust.

## 2. Browsing & Filtering
**Findings:** Users requested a way to reset their searches easily and expressed a desire to filter by performance metrics.
**Redesign Translation (Scoped for Deadline):**
- Implement a highly visible **"Clear all filters"** button.
- While adding new data points (cores/speeds) to the database is out of scope for the deadline, we will ensure existing filters (Price, Socket Type, Storage Interface) are prominent and easy to use.

## 3. Component Details & Clickability
**Findings:** It was not immediately obvious that users could click into a component to see more specifications. Users requested specific data points to be visible at a glance.
**Redesign Translation (Scoped for Deadline):**
- Redesign the part cards to include a clear **"More Info"** button or distinct hover states to indicate clickability.
- Introduce **"Quick Spec" badges** on the cards using *existing* API data (e.g., displaying "SATA" or "AM4" or "65W") so users don't have to click into the product just to see basic compatibility specs. Detailed specs (cores, speeds) will be left for the item description if added manually later.

## 4. "My Build" Layout & Basket Expectations
**Findings:** Users instinctually looked for a shopping basket in the top right corner. On the actual "My Build" page, the vertical layout required too much scrolling, and summary lines with zero/blank values (e.g., wattage for cases) were confusing.
**Redesign Translation:**
- Move the "My Build" access point to the **top right of the navigation bar** (perhaps styled with a basket/cart icon) to match established e-commerce mental models.
- **Two-Column Layout:** Redesign the Build Summary page so the selected components are listed on the left, and the Total Cost / Wattage summary stays sticky on the right to utilize empty screen space and reduce scrolling.
- Conditionally hide summary rows (like memory or wattage) if a component does not possess those attributes.

## 5. Wattage & Compatibility Indicators
**Findings:** Users want to see individual wattages for each part alongside the total estimated wattage. They also heavily requested a visual compatibility indicator for each item on the build list.
**Redesign Translation:**
- Add a **green checkmark badge (or warning icon)** next to each selected item in the build list to confirm compatibility at a glance.
- Display the individual wattage draw next to the price on the component row in the build summary.

## 6. Resources & Educational Content
**Findings:** The guides are great for beginners. Users suggested adding purchase links for physical building tools (like anti-static wristbands) and embedding instructional videos for visual learners.
**Redesign Translation:**
- Add an **"Essential Tools"** section to the workspace preparation guide with affiliate/partner links to Amazon for screwdrivers and anti-static gear.
- Create space in the high-fidelity UI to embed (or link to) step-by-step YouTube tutorials.

## 7. Minor Fixes & Housekeeping
**Findings:** A few typos (lowercase 'i' in FAQs) and irrelevant form fields (Build Nord number) were spotted.
**Redesign Translation:**
- Proofread all static copy.
- Streamline the Contact Form to remove unnecessary fields.

---

### Conclusion for the High-Fidelity Phase
The testing proves that the core functionality (API, filtering, local storage) works flawlessly. The high-fidelity redesign will focus entirely on **information density** (two-column layouts), **clear affordances** (making clickable things look clickable), and **e-commerce conventions** (moving the build link to the top right).
