import Home from '../pages/Home';
import Gallery from '../pages/Gallery';

const routes = [
  { path: '/', component: Home, protected: false },
  { path: '/gallery', component: Gallery, protected: true },
];

export default routes;

