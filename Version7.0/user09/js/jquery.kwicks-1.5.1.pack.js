/*
	Kwicks for jQuery (version 1.5.1)
	Copyright (c) 2008 Jeremy Martin
	http://www.jeremymartin.name/projects.php?project=kwicks
	
	Licensed under the MIT license:
		http://www.opensource.org/licenses/mit-license.php

	Any and all use of this script must be accompanied by this copyright/license notice in its present form.
*/
(function ($) {
  $.fn.kwicks = function (n) {
    var p = {
      isVertical: false,
      sticky: false,
      defaultKwick: 0,
      event: "mouseover",
      spacing: 0,
      duration: 500,
    };
    var o = $.extend(p, n);
    var q = o.isVertical ? "height" : "width";
    var r = o.isVertical ? "top" : "left";
    return this.each(function () {
      container = $(this);
      var k = container.children("li");
      var l = k.eq(0).css(q).replace(/px/, "");
      if (!o.max) {
        o.max = l * k.size() - o.min * (k.size() - 1);
      } else {
        o.min = (l * k.size() - o.max) / (k.size() - 1);
      }
      if (o.isVertical) {
        container.css({
          width: k.eq(0).css("width"),
          height: "1200px",
        });
      } else {
        container.css({
          width: l * k.size() + o.spacing * (k.size() - 1) + "px",
          height: "1200px",
        });
      }
      var m = [];
      for (i = 0; i < k.size(); i++) {
        m[i] = [];
        for (j = 1; j < k.size() - 1; j++) {
          if (i == j) {
            m[i][j] = o.isVertical
              ? j * o.min + j * o.spacing
              : j * o.min + j * o.spacing;
          } else {
            m[i][j] =
              (j <= i ? j * o.min : (j - 1) * o.min + o.max) + j * o.spacing;
          }
        }
      }
      k.each(function (i) {
        var h = $(this);
        if (i === 0) {
          h.css(r, "0px");
        } else if (i == k.size() - 1) {
          h.css(o.isVertical ? "bottom" : "right", "0px");
        } else {
          if (o.sticky) {
            h.css(r, m[o.defaultKwick][i]);
          } else {
            h.css(r, i * l + i * o.spacing);
          }
        }
        if (o.sticky) {
          if (o.defaultKwick == i) {
            h.css(q, o.max + "px");
            h.addClass("active");
          } else {
            h.css(q, o.min + "px");
          }
        }
        h.css({ margin: 0, position: "absolute" });
        h.bind(o.event, function () {
          var c = [];
          var d = [];
          k.stop().removeClass("active");
          for (j = 0; j < k.size(); j++) {
            c[j] = k.eq(j).css(q).replace(/px/, "");
            d[j] = k.eq(j).css(r).replace(/px/, "");
          }
          var e = {};
          e[q] = o.max;
          var f = o.max - c[i];
          var g = c[i] / f;
          h.addClass("active").animate(e, {
            step: function (a) {
              var b = f != 0 ? a / f - g : 1;
              k.each(function (j) {
                if (j != i) {
                  k.eq(j).css(q, c[j] - (c[j] - o.min) * b + "px");
                }
                if (j > 0 && j < k.size() - 1) {
                  k.eq(j).css(r, d[j] - (d[j] - m[i][j]) * b + "px");
                }
              });
            },
            duration: o.duration,
            easing: o.easing,
          });
        });
      });
      if (!o.sticky) {
        container.bind("mouseleave", function () {
          var c = [];
          var d = [];
          k.removeClass("active").stop();
          for (i = 0; i < k.size(); i++) {
            c[i] = k.eq(i).css(q).replace(/px/, "");
            d[i] = k.eq(i).css(r).replace(/px/, "");
          }
          var e = {};
          e[q] = l;
          var f = l - c[0];
          k.eq(0).animate(e, {
            step: function (a) {
              var b = f != 0 ? (a - c[0]) / f : 1;
              for (i = 1; i < k.size(); i++) {
                k.eq(i).css(q, c[i] - (c[i] - l) * b + "px");
                if (i < k.size() - 1) {
                  k.eq(i).css(
                    r,
                    d[i] - (d[i] - (i * l + i * o.spacing)) * b + "px"
                  );
                }
              }
            },
            duration: o.duration,
            easing: o.easing,
          });
        });
      }
    });
  };
})(jQuery);
