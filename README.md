# Off Canvas
A simple off canvas menu, which can be as simple or complex as you like.

# Install
## Download
- [off-canvas.js](https://raw.githubusercontent.com/itsonlyjames/off-canvas/master/src/off-canvas.js) un-minified,
- [off-canvas-min.js](https://raw.githubusercontent.com/itsonlyjames/off-canvas/master/src/min/off-canvas-min.js) minified

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
  </div>
</div>
```

Don't forget to add the button so off canvas can be toggled
```html
<div class="mobile-button">Open Menu</div>
```

## Extra Settings
```javascript
$(".off-canvas").canvas({
    containerSurround: '.container-wrapper',
    buttonSelector: '.mobile-button',
    duration: 200,
    mobileOnly: true,
    mobileWidth: 800,
    transition: 'ease-in-out',
    sizeWidth: '70%',
    sizeInPixels: false,
    side: 'left',
});
```

### Extra Settings Description
containerSurround: Which element to wrap the container around.

buttonSelector: Which element to apply the click (open/close) to.

duration: How long the transition takes (in ms).

mobileOnly: If true the menu will close once the mobileWidth has been reached.

mobileWidth: Close the off canvas after the browser is equal to or larger than the number, in pixels.

transition: Standard css transitions, e.g: 'linear', 'ease', 'ease-in', 'ease-out'.

sizeWidth: The size of the menu, in percentage if sizeInPixels is set to false. 

sizeInPixels: If true the sizeWidth will be set in pixels. If false it will be in percentages. E.g:

sizeInPixels = true
```javascript
sizeWidth: 700,
sizeInPixels: true
```
sizeInPixels = false
```javascript
sizeWidth: '70%',
sizeInPixels: false
```

side: Which side the off canvas menu is on.

