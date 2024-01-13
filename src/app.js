import AOS from 'aos';
import main from './scripts/view/main.js';

import 'aos/dist/aos.css';
import './styles/styles.css';

// components
import './scripts/component/navigation-bar.js';
import './scripts/component/banner.js';
import './scripts/component/popular.js';
import './scripts/component/about-us.js';
import './scripts/component/footer.js';


AOS.init();

document.addEventListener('DOMContentLoaded', main);