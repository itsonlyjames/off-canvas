# Off Canvas
A simple off canvas menu, it can be as simple or complex as you like.

# Install
## Download
[off-canvas.js](https://raw.githubusercontent.com/itsonlyjames/off-canvas/master/src/off-canvas.js)

[off-canvas-min.js](https://raw.githubusercontent.com/itsonlyjames/off-canvas/master/src/min/off-canvas-min.js)

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

