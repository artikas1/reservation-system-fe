/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

import router from './router'; // Import the router

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)

app.use(router); // Use the router

app.mount('#app')
