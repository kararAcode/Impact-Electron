
const {spriteDrawing} = require('./plugins/spriteDrawing')


window.onload = () => {
      window.$ = window.jQuery = require('jquery');
      spriteDrawing();
}