import { createApp } from 'vue';
import App from './App.vue';
import './tailwind.css';
import './styles.css';

const rootEl = document.getElementById('root');
if (rootEl) createApp(App).mount(rootEl);
