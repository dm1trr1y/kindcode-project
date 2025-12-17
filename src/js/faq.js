import Accordion from 'accordion-js';
import 'accordion-js/dist/accordion.min.css';

new Accordion('.accordion-container', {
  duration: 400,
  showMultiple: false,
  elementClass: 'ac',
  triggerClass: 'ac-item-header',
  panelClass: 'ac-panel',
});
