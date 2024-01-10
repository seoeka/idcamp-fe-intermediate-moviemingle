import AOS from 'aos';
import main from './scripts/view/main.js';

import 'aos/dist/aos.css';
import './styles/styles.css';

// components
import './scripts/component/navigation-bar.js';
import './scripts/component/banner.js';

AOS.init();

document.addEventListener('DOMContentLoaded', main);