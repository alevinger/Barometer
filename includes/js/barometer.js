( function( $ ) {
    var Barometer = function(element, options) {
        this.$element = $( element );
        //this.modal = this.$element.find('.modal');
        this.init( options );
        this.$element.data('barometer', this);
        this.curretValue = null;
        return this;
    };

    Barometer.prototype = {
      defaultOptions : {
          startvalue:0,
          placeholder: "Insert rotation degrees",
          steps: 5
      },

      constructor: Barometer,
      init: function (options) {
          const self = this;
          self.options = $.extend({}, this.defaultOptions, options);
          self.createBarometer();
          self.createInputContainer();
          self.bindInput();
          self.rotate(this.options.startvalue);
      },

      createBarometer: function() {
          const self = this;
          const preview = $("<div class=\"container\">" +
            "<div class=\"first_ring\"><div class=\"second_ring\"><div class=\"third_ring\"></div></div></div>" +
            "<div class=\"pie\"><div class=\"pie_segment red\"></div><div class=\"pie_segment orange\"></div><div class=\"pie_segment green\"></div><div class=\"pie_segment white\"></div></div>"+
            "<div class=\"second_layer\"></div><div class=\"third_layer\"></div>"+
            "<div class=\"arrow\"><div class=\"arrowtop\"></div><div class=\"arrowbottom\"></div></div>" +
            "<div class=\"middle_point\"></div></div>");
            self.$element.append(preview);
        },

      createInputContainer: function () {
          const self = this;
          const input = $("<form id=\"barometer_form\"><label>"+ this.options.placeholder + "</label><input type=\"number\" min=\"-45\" max=\"225\" value="+this.options.startvalue+" step=\""+this.options.steps+"\"/></form>");
          self.$element.append(input);
      },

      rotate: function ( degs ) {
            const self = this;
            const $arrow =  this.$element.find('.arrow');
            // For webkit browsers: e.g. Chrome
            $arrow.css({ WebkitTransform: 'rotate(' + degs + 'deg)'});
            // For Mozilla browser: e.g. Firefox
            $arrow.css({ '-moz-transform': 'rotate(' + degs + 'deg)'});
        },

        bindInput: function() {
            const self = this;
            self.$element.find('form input').on('change', '', self, function (e) {
              self.rotate($(e.target).val());
            });
        },

  },

    $.fn.barometer = function ( options, arg ) {
         return new Barometer( this, options );
    };

    $.fn.barometer.Constructor = Barometer;




  }( jQuery ) );
