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

// Initiates plugin
  $.fn.canvas = function(options) {
    if (typeof options === 'undefined') {
      options = {};
    }

    if (this.length === 0) return this;

    if (this.length > 1) {
      // Pushes user selections to options
      this.each(function() {
          canvas.push($(this).off(options));
      });

      return canvas;
    }

    var canvas = {};
    canvas = this;

    var init = function() {
      // Run options
      canvas.options = $.extend(defaults, options);
      // Run setup function
      setup();
    }

    var setup = function() {
      // store container for easier use later on
      container = $(canvas.options.containerSurround);
      // wrap container with outer div to keep html clear
      container.wrap('<div class="outer-container"></div>');
      // also store button for use later on
      click = $(canvas.options.buttonSelector);
      // store mobile width for easier user
      mobileWidth = $(canvas.options.mobileWidth);
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
          canvas.wrap('<div class="side-right"></div>')
          if (canvas.options.sizeInPixels) {
              canvas.css({
                  'right': '-' + canvas.options.sizeWidth + 'px',
              });
          } else {
              canvas.css({
                  'right': '-' + canvas.options.sizeWidth,
              });
          }
      }
      // sets standard canvas css
      canvas.css({
          'top': '0',
          'width': canvas.options.sizeWidth,
          'height': '100%',
          'position': 'absolute',
          'z-index': '888888',
          'overflow': 'hidden',
          '-moz-backface-visibility': 'hidden',
          '-ms-backface-visibility': 'hidden',
          '-o-backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
          'backface-visibility': 'hidden'
      });

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
        // Same if statement as above, checks left/right then true/false
        if (canvas.options.side == 'left') {
            if (canvas.options.sizeInPixels) {
                container.css({
                    '-ms-transform': 'translate3d(' + sizeWidth + 'px, 0, 0)',
                    '-moz-transform': 'translate3d(' + sizeWidth + 'px, 0, 0)',
                    '-o-transform': 'translate3d(' + sizeWidth + 'px, 0, 0)',
                    '-webkit-transform': 'translate3d(' + sizeWidth + 'px, 0, 0)',
                    'transform': 'translate3d(' + sizeWidth + 'px, 0, 0)'
                });
            } else {
                container.css({
                    '-ms-transform': 'translate3d(' + sizeWidth + ', 0, 0)',
                    '-moz-transform': 'translate3d(' + sizeWidth + ', 0, 0)',
                    '-o-transform': 'translate3d(' + sizeWidth + ', 0, 0)',
                    '-webkit-transform': 'translate3d(' + sizeWidth + ', 0, 0)',
                    'transform': 'translate3d(' + sizeWidth + ', 0, 0)'
                });
            }
        }

        if (canvas.options.side == 'right') {
            if (canvas.options.sizeInPixels) {
                container.css({
                    '-ms-transform': 'translate3d(-' + sizeWidth + 'px, 0, 0)',
                    '-moz-transform': 'translate3d(-' + sizeWidth + 'px, 0, 0)',
                    '-o-transform': 'translate3d(-' + sizeWidth + 'px, 0, 0)',
                    '-webkit-transform': 'translate3d(-' + sizeWidth + 'px, 0, 0)',
                    'transform': 'translate3d(-' + sizeWidth + 'px, 0, 0)'
                });
            } else {
                container.css({
                    '-ms-transform': 'translate3d(-' + sizeWidth + ', 0, 0)',
                    '-moz-transform': 'translate3d(-' + sizeWidth + ', 0, 0)',
                    '-o-transform': 'translate3d(-' + sizeWidth + ', 0, 0)',
                    '-webkit-transform': 'translate3d(-' + sizeWidth + ', 0, 0)',
                    'transform': 'translate3d(-' + sizeWidth + ', 0, 0)'
                });
            }
        }
    }
    // store function of moving container
    var containerX = function(sizeWidth) {
        // run function from above
        percentContainer(sizeWidth);
    }
    // moving function for actual canvas
    var moveX = function(distanceX) {
        // if function for left/right
        if (canvas.options.side == 'left') {
            canvas.css({
                '-ms-transform': 'translate3d(' + distanceX + ', 0, 0)',
                '-moz-transform': 'translate3d(' + distanceX + ', 0, 0)',
                '-o-transform': 'translate3d(' + distanceX + ', 0, 0)',
                '-webkit-transform': 'translate3d(' + distanceX + ', 0, 0)',
                'transform': 'translate3d(' + distanceX + ', 0, 0)'
            });
        }

        if (canvas.options.side == 'right') {
            canvas.css({
                '-ms-transform': 'translate3d(-' + distanceX + ', 0, 0)',
                '-moz-transform': 'translate3d(-' + distanceX + ', 0, 0)',
                '-o-transform': 'translate3d(-' + distanceX + ', 0, 0)',
                '-webkit-transform': 'translate3d(-' + distanceX + ', 0, 0)',
                'transform': 'translate3d(-' + distanceX + ', 0, 0)'
            });
        }
    }
    // store css3 transitions, user selected duration & transition. standard css3 transitions
    var applyEffects = function(transition, duration) {
        canvas.css({
            '-ms-transition': 'all ' + duration + 'ms ' + transition,
            '-moz-transition': 'all ' + duration + 'ms ' + transition,
            '-o-transition': 'all ' + duration + 'ms ' + transition,
            '-webkit-transition': 'all ' + duration + 'ms ' + transition,
            'transition': 'all ' + duration + 'ms ' + transition
        });

        container.css({
            '-ms-transition': 'all ' + duration + 'ms ' + transition,
            '-moz-transition': 'all ' + duration + 'ms ' + transition,
            '-o-transition': 'all ' + duration + 'ms ' + transition,
            '-webkit-transition': 'all ' + duration + 'ms ' + transition,
            'transition': 'all ' + duration + 'ms ' + transition
        });
    }
    // open canvas
    canvas.open = function() {
        moveX(canvas.options.distanceX);
        canvas.addClass('open');
        containerX(canvas.options.sizeWidth);
        container.addClass('active');
    }
    // close canvas
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
    // on button click toggle canvas
    $(click).click(function() {
        canvas.toggle();
        return false;
    });
    // stop clicking on canvas from closing it
    $(canvas).click(function(e) {
        e.stopPropagation();
    });
    // close canvas on document click
    $(document).click(function() {
        canvas.close();
    });
    // close canvas on window resize if window is greater than mobileWidth and has class open and mobileOnly is set to true
    $(window).resize(function() {
        if ($(window).width() >= canvas.options.mobileWidth && canvas.hasClass('open') && canvas.options.mobileOnly) {
            canvas.close();
        }
    });
    // close canvas when escape key is pressed
    $(document).keyup(function(e) {
        if(e.keyCode == 27) {
            canvas.close();
            return false;
        }
    });
  };
}(jQuery));
