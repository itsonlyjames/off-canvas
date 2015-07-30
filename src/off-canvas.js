;
(function($) {

  var canvas = [];
  // sets defaults unless overidden by user
  var defaults = {
    containerSurround: '.container',
    buttonSelector: '.mobile-button',
    mobileOnly: false,
    mobileWidth: 1920,
    distanceX: '100%',
    duration: 400,
    transition: 'ease',
    sizeWidth: '70%',
    sizeInPixels: false,
    side: 'left',
  };

  var browserPrefixes = ['ms', 'moz', 'o', 'webkit'];
  var prefixedCSSAttribute = function(attribute, value) {
    var prefix, i, len, cssObject = {};
    for (i = 0, len = browserPrefixes.length; i < len; i++) {
      prefix = '-' + browserPrefixes[i] + '-';
      cssObject[prefix + attribute] = value.replace('%{prefix}', prefix);
    }
    cssObject[attribute] = value.replace('%{prefix}', '');
    return cssObject;
  };

  // Initiates plugin
  $.fn.canvas = function(options) {
    if (typeof options === 'undefined') {
      options = {};
    }

    if (this.length === 0) return this;

    if (this.length > 1) {
      this.each(function() {
        canvas.push($(this).off(options));
      });

      return canvas;
    }

    var canvas = {};
    canvas = this;

    var init = function() {
      canvas.options = $.extend(defaults, options);
      setup();
    }

    var setup = function() {
      $document = $(document);
      $window = $(window);
      container = $(canvas.options.containerSurround);
      container.wrap('<div class="outer-container"></div>');
      $button = $(canvas.options.buttonSelector);
      // If statement for if side is left/right, then goes into if size is in pixels true/false
      if (canvas.options.side == 'left') {
        if (canvas.options.sizeInPixels) {
          canvas.css({
            'left': '-' + canvas.options.sizeWidth + 'px',
          });
        } else {
          canvas.css({
            'left': '-' + canvas.options.sizeWidth,
          });
        }
      }
      if (canvas.options.side == 'right') {
        canvas.wrap('<div class="side-right"></div>');
        var units = canvas.options.sizeInPixels ? 'px' : '';
        canvas.css({
          'right': '-' + canvas.options.sizeWidth + units,
        });
      }
      // sets standard canvas css
      canvas.css({
        'top': '0',
        'width': canvas.options.sizeWidth,
        'height': '100%',
        'position': 'absolute',
        'z-index': '888888',
        'overflow': 'hidden'
      }).css(prefixedCSSAttribute('backface-visibility', 'hidden'));

      $("html, body").css('position', 'relative');

      container.css({
        overflow: 'hidden'
      });

      $(".outer-container").css({
        position: 'relative',
        overflow: 'hidden'
      });

      $(".side-right").css({
        overflow: 'hidden',
        width: '100vw',
        position: 'absolute',
        height: '100%',
      });
      // applys css3 transitions
      applyEffects(canvas.options.transition, canvas.options.duration);
    }
    // store this function so it runs quicker later on, it's also cleaner this way
    var percentContainer = function(sizeWidth) {
      var units = canvas.options.sizeInPixels ? 'px' : '';
      var direction = canvas.options.side == 'left' ? '' : '-';
      container.css(prefixedCSSAttribute('transform', 'translate3d(' + direction + sizeWidth + units + ', 0, 0)'));
    }
    // store function of moving container
    var containerX = function(sizeWidth) {
      // run function from above
      percentContainer(sizeWidth);
    }
    // moving function for actual canvas
    var moveX = function(distanceX) {
      var direction = canvas.options.side == 'left' ? '' : '-';
      canvas.css(prefixedCSSAttribute('transform', 'translate3d(' + direction + distanceX + ', 0, 0)'));
    }
    // store css3 transitions, user selected duration & transition. standard css3 transitions
    var applyEffects = function(transition, duration) {
      canvas.add(container).css(prefixedCSSAttribute('transition', '%{prefix}transform ' + duration + 'ms ' + transition));
    }

    canvas.open = function() {
      moveX(canvas.options.distanceX);
      canvas.addClass('open');
      containerX(canvas.options.sizeWidth);
      container.addClass('active');
    }

    canvas.close = function() {
      moveX(0);
      canvas.removeClass('open');
      containerX(0);
      container.removeClass('active');
    }
    // set up toggle of canvas
    canvas.toggle = function() {
      if (canvas.hasClass('open')) {
        canvas.close();
      } else {
        canvas.open();
      }
    }
    // init, runs everything and makes magic happen!
    init();

    $button.click(function(e) {
      canvas.toggle();
      return false;
    });
    // stop clicking on canvas from closing it
    $(canvas).click(function(e) {
      e.stopPropagation();
    });

    $document.click(function() {
      canvas.close();
    });
    // close canvas on window resize if window is greater than mobileWidth and has class open and mobileOnly is set to true
    $window.resize(function() {
      if ($window.width() >= canvas.options.mobileWidth && canvas.hasClass('open') && canvas.options.mobileOnly) {
        canvas.close();
      }
    });
    // close canvas when escape key is pressed
    $document.keyup(function(e) {
      if(e.keyCode == 27) {
        canvas.close();
        e.preventDefault();
      }
    });
  };
}(jQuery));
