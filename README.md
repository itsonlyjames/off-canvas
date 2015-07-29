# Off Canvas
Off canvas menu
Simples

# Install
## Download
[off-canvas.js](https://raw.githubusercontent.com/itsonlyjames/off-canvas/master/src/off-canvas.js)

## Initialize
With Jquery
```javascript
$(".off-canvas").canvas({
    containerSurround: '.container-wrapper',
    buttonSelector: '.mobile-button',
});
```
Adding HTML

You must add the off-canvas selector above everything on the page, then add the container-wrapper around everything that shows on the page. Like below:
```html
<div class="off-canvas">

</div>

<div class="container-wrapper">
  <div class="header">
  </div>
  <div class="content">
  </div<
</div>
```

