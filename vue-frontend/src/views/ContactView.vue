<script setup>
import { ref, reactive } from 'vue'

const form = reactive({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    orderRef: '',
    message: '',
    agreePolicy: false
})

const errors = reactive({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
    agreePolicy: ''
})

const isSubmitting = ref(false)
const submitSuccess = ref(false)

const validateEmail = (email) => {
    // "/../" start and end of expression 
    // [^\s@] any character except a space or an @ symbol
    // "\."" Matches a dot (.) separator 
    // "$" Asserts the end of the string
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
}

const validateForm = () => {
    let isValid = true
    
    // Reset errors
    Object.keys(errors).forEach(key => errors[key] = '')

    if (!form.firstName.trim()) {
        errors.firstName = 'First name is required'
        isValid = false
    }
    
    if (!form.lastName.trim()) {
        errors.lastName = 'Last name is required'
        isValid = false
    }

    if (!form.email.trim()) {
        errors.email = 'Email is required'
        isValid = false
    } else if (!validateEmail(form.email)) {
        errors.email = 'Please enter a valid email address'
        isValid = false
    }

    if (!form.subject) {
        errors.subject = 'Please select a subject'
        isValid = false
    }

    if (!form.message.trim()) {
        errors.message = 'Message is required'
        isValid = false
    } else if (form.message.length < 10) {
        errors.message = 'Message must be at least 10 characters'
        isValid = false
    }

    if (!form.agreePolicy) {
        errors.agreePolicy = 'You must agree to the privacy policy'
        isValid = false
    }

    return isValid
}

const handleSubmit = async () => {
    if (validateForm()) {
        isSubmitting.value = true
        
        // Simulate network request for UX
        await new Promise(resolve => setTimeout(resolve, 1200))
        
        isSubmitting.value = false
        submitSuccess.value = true
        
        // Reset form completely
        form.firstName = ''
        form.lastName = ''
        form.email = ''
        form.subject = ''
        form.orderRef = ''
        form.message = ''
        form.agreePolicy = false
        
        // Hide success message after 5 seconds
        setTimeout(() => submitSuccess.value = false, 5000)
    }
}
</script>

<template>
    <main class="contact-page">
        <header class="contact-page__header">
            <h1>Contact Us</h1>
            <p>We'd love to hear from you. Please fill out this form or use our contact details below.</p>
        </header>

        <div class="contact-page__layout">
            <!-- FORM SECTION -->
            <section class="contact-page__form-section">
                <div v-if="submitSuccess" class="contact-page__success-msg">
                    <h3>Thank you!</h3>
                    <p>Your message has been sent successfully. We will get back to you shortly.</p>
                </div>

                <form v-else class="contact-page__form" @submit.prevent="handleSubmit" novalidate>
                    <div class="contact-page__form-row">
                        <div class="contact-page__form-group">
                            <label for="firstName">First Name *</label>
                            <input type="text" id="firstName" v-model="form.firstName" :class="{'contact-page__input--error': errors.firstName}" :aria-invalid="!!errors.firstName" aria-describedby="firstName-error">
                            <span class="contact-page__error-text" id="firstName-error" v-if="errors.firstName">{{ errors.firstName }}</span>
                        </div>
                        <div class="contact-page__form-group">
                            <label for="lastName">Last Name *</label>
                            <input type="text" id="lastName" v-model="form.lastName" :class="{'contact-page__input--error': errors.lastName}" :aria-invalid="!!errors.lastName" aria-describedby="lastName-error">
                            <span class="contact-page__error-text" id="lastName-error" v-if="errors.lastName">{{ errors.lastName }}</span>
                        </div>
                    </div>

                    <div class="contact-page__form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" v-model="form.email" :class="{'contact-page__input--error': errors.email}" :aria-invalid="!!errors.email" aria-describedby="email-error">
                        <span class="contact-page__error-text" id="email-error" v-if="errors.email">{{ errors.email }}</span>
                    </div>

                    <div class="contact-page__form-row">
                        <div class="contact-page__form-group">
                            <label for="subject">Subject *</label>
                            <select id="subject" v-model="form.subject" :class="{'contact-page__input--error': errors.subject}" :aria-invalid="!!errors.subject" aria-describedby="subject-error">
                                <option value="" disabled>Select a subject</option>
                                <option value="General Enquiry">General Enquiry</option>
                                <option value="Part Compatibility">Part Compatibility</option>
                                <option value="Missing Parts/Data">Missing Parts/Data</option>
                                <option value="Bug Report">Bug Report</option>
                                <option value="Partnership">Partnership</option>
                            </select>
                            <span class="contact-page__error-text" id="subject-error" v-if="errors.subject">{{ errors.subject }}</span>
                        </div>
                    </div>

                    <div class="contact-page__form-group">
                        <label for="message">Message *</label>
                        <textarea id="message" rows="6" v-model="form.message" :class="{'contact-page__input--error': errors.message}" :aria-invalid="!!errors.message" aria-describedby="message-error"></textarea>
                        <span class="contact-page__error-text" id="message-error" v-if="errors.message">{{ errors.message }}</span>
                    </div>

                    <div class="contact-page__form-group contact-page__form-group--checkbox">
                        <label class="contact-page__checkbox-label">
                            <input type="checkbox" v-model="form.agreePolicy" :aria-invalid="!!errors.agreePolicy" aria-describedby="policy-error">
                            <span>I agree to the <RouterLink to="/">Privacy Policy</RouterLink> *</span>
                        </label>
                        <span class="contact-page__error-text" id="policy-error" v-if="errors.agreePolicy">{{ errors.agreePolicy }}</span>
                    </div>

                    <button type="submit" class="contact-page__submit-btn" :disabled="isSubmitting">
                        {{ isSubmitting ? 'Sending...' : 'Send Message' }}
                    </button>
                </form>
            </section>

            <!-- INFO SECTION -->
            <aside class="contact-page__info-section">
                
                <div class="contact-page__info-card contact-page__info-card--primary">
                    <h3>Get in Touch</h3>
                    <ul class="contact-page__info-list">
                        <li>
                            <strong>Email:</strong>
                            <a href="mailto:support@pcpartmatcher.com">support@pcpartmatcher.com</a>
                        </li>
                        <li>
                            <strong>Response Time:</strong>
                            <span>Within 24-48 hours</span>
                        </li>
                        <li>
                            <strong>Office Hours:</strong>
                            <span>Mon - Fri, 9am - 5pm (GMT)</span>
                        </li>
                    </ul>
                </div>

                <div class="contact-page__info-card contact-page__info-card--social">
                    <h3>Follow Us</h3>
                    <div class="contact-page__social-links">
                        <!-- X (Twitter) -->
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" class="contact-page__social-btn" aria-label="X (Twitter)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                            </svg>
                        </a>
                        <!-- Instagram -->
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="contact-page__social-btn" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.036 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.487.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                            </svg>
                        </a>
                        <!-- Facebook -->
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="contact-page__social-btn" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                            </svg>
                        </a>
                    </div>
                </div>

            </aside>
        </div>
    </main>
</template>

<style scoped>
.contact-page {
    padding: var(--spacing-base);
    max-width: 1100px;
    margin: 0 auto;
}

.contact-page__header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--colour-border);
}

.contact-page__header h1 {
    margin-bottom: 0.5rem;
    font-size: 2rem;
}

.contact-page__header p {
    color: var(--colour-text-secondary);
    font-size: 1.1rem;
}

/* Layout Using Flexbox and Order for Mobile Stacking */
.contact-page__layout {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-bottom: 3rem;
}

/* 
   By using display: contents on the aside wrapper, we allow its children 
   (the primary card and social card) to become direct children of the flex container (.contact-page__layout).
   This lets us easily reorder everything via the 'order' property!
*/
.contact-page__info-section {
    display: contents; 
}

/* Mobile Ordering */
.contact-page__info-card--primary {
    order: 1; /* Get in touch first */
}

.contact-page__form-section {
    order: 2; /* Form second */
    background: var(--colour-surface);
    border: 1px solid var(--colour-border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
}

.contact-page__info-card--social {
    order: 3; /* Socials last */
}

/* Desktop Grid Layout */
@media (min-width: 768px) {
    .contact-page__layout {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 2rem;
        align-items: start;
    }
    
    .contact-page__form-section {
        order: unset; /* Remove flex order */
        grid-column: 1; /* Left column */
        grid-row: 1 / span 2;
    }
    
    .contact-page__info-section {
        display: flex; /* Restore flex context for desktop */
        flex-direction: column;
        gap: 1.5rem;
        order: unset;
        grid-column: 2; /* Right column */
        grid-row: 1;
    }
}

/* Form Styles */
.contact-page__form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.contact-page__form-row {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

@media (min-width: 600px) {
    .contact-page__form-row {
        flex-direction: row;
    }
    .contact-page__form-row .contact-page__form-group {
        flex: 1;
    }
}

.contact-page__form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.contact-page__form-group label {
    font-weight: bold;
    font-size: 0.9rem;
}

.contact-page__form-group input[type="text"],
.contact-page__form-group input[type="email"],
.contact-page__form-group select,
.contact-page__form-group textarea {
    padding: 0.75rem;
    border: 1px solid var(--colour-border);
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
    transition: border-color 0.2s;
    background-color: white;
}

.contact-page__form-group input:focus,
.contact-page__form-group select:focus,
.contact-page__form-group textarea:focus {
    outline: none;
    border-color: #007bff;
}

.contact-page__form-group .contact-page__input--error {
    border-color: #dc3545;
    background-color: #fff8f8;
}

.contact-page__error-text {
    color: #dc3545;
    font-size: 0.8rem;
    margin-top: -0.25rem;
    font-weight: bold;
}

.contact-page__form-group .contact-page__checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: normal;
    cursor: pointer;
}

.contact-page__submit-btn {
    padding: 1rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
    margin-top: 0.5rem;
}

.contact-page__submit-btn:hover:not(:disabled) {
    background-color: #0056b3;
}

.contact-page__submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.contact-page__success-msg {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--colour-text-primary);
    border-radius: 8px;
}

.contact-page__success-msg h3 {
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-size: 1.5rem;
}

/* Info Cards */
.contact-page__info-card {
    background: var(--colour-surface);
    border: 1px solid var(--colour-border);
    border-radius: var(--border-radius);
    padding: 1.5rem;
}

.contact-page__info-card h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--colour-border);
    padding-bottom: 0.5rem;
    font-size: 1.25rem;
}

.contact-page__info-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-page__info-list li {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.contact-page__info-list a {
    color: #007bff;
    text-decoration: none;
}

.contact-page__social-links {
    display: flex;
    gap: 1rem;
}

.contact-page__social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: #f0f0f0;
    color: #333;
    transition: background-color 0.2s, color 0.2s, transform 0.2s;
}

.contact-page__social-btn:hover {
    background-color: #007bff;
    color: white;
    transform: translateY(-2px);
}
</style>