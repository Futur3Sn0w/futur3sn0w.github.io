/*
 * jQuery.dragNscroll v1.0
 *
 * Kopimi (c) 2021 Joshua Faulkenberry
 * Unlicensed under The Unlicense
 * http://unlicense.org/
 */

(function($) {

   jQuery.extend({
      mouse: {
         x: 0,
         y: 0
      },
      dragNscroll: {
         mousedown:false,
         emaX: 0,
         emaY: 0
      }
   });

   jQuery.fn.extend({
      dragNscroll: function(options) {
         var ops = $.extend({
            allowHiliting:false,
            acceleration:.65,
            deceleration:.85,
            decelRate:64,
            reverse:false,
            rightMouse:false,
            allowThrowing:true,
            throwOnOut:true
         }, options || {});
         return this.each(function() {
            var $this = $(this).data("options", ops);
            if(!ops.allowHiliting) $this.get(0).onmousedown = function(e) {
               e.preventDefault();
            };
            $this.mousedown(function(e) {
               $.dragNscroll.mousedown = $this;
            }).mouseup(function(e) {
               if(ops.allowThrowing) sling($(this));
               $.dragNscroll.mousedown = false;
            }).mouseout(function(e) {
               var from = e.relatedTarget || e.toElement;
                if (!from || from.nodeName == "HTML") {
                  if($.dragNscroll.mousedown && ops.allowThrowing && ops.throwOnOut)  sling($(this));
                  $.dragNscroll.mousedown = false;
               }
            })
         });
      }
   });

   function sling($this) {
      var
         ops    = $this.data("options"),
         changeX = ($.dragNscroll.emaX) * ops.deceleration,
         changeY = ($.dragNscroll.emaY) * ops.deceleration;

      if((changeX < .01 && changeX > -.01) || (changeY < .01 && changeY > -.01)) return;

      move($this, changeX, changeY);
      setTimeout(function() {
         sling($this);
      }, 1000/ops.decelRate);
   }

   function move($this, changeX, changeY) {
         if(($.dragNscroll.emaX < 0 && changeX > 0) || ($.dragNscroll.emaX > 0 && changeX < 0)) $.dragNscroll.emaX = 0;
         if(($.dragNscroll.emaY < 0 && changeY > 0) || ($.dragNscroll.emaY > 0 && changeY < 0)) $.dragNscroll.emaY = 0;

         var ops    = $this.data("options"),
             amntX = ops.acceleration * changeX + (1 - ops.acceleration) * $.dragNscroll.emaX,
             amntY = ops.acceleration * changeY + (1 - ops.acceleration) * $.dragNscroll.emaY,
             scrollRight = $this[0].scrollWidth ? $this[0].scrollWidth - $this[0].clientWidth : $this[0].body.scrollWidth - $this[0].body.clientWidth,
             scrollBottom = $this[0].scrollHeight ? $this[0].scrollHeight - $this[0].clientHeight : $this[0].body.scrollHeight - $this[0].body.clientHeight;

         if(($this.scrollLeft() <= 0 && changeX <= 0) ||  ($this.scrollLeft() >= scrollRight && changeX >= 0)) {}
         else $this.scrollLeft($this.scrollLeft() + (amntX));
         if(($this.scrollTop() <= 0 && changeY <= 0) ||  ($this.scrollTop() >= scrollBottom && changeY >= 0)) {}
         else $this.scrollTop($this.scrollTop() + (amntY));
         $.dragNscroll.emaX = amntX;
         $.dragNscroll.emaY = amntY;
   }

   $(document).mousemove(function(e) {
      if($.dragNscroll.mousedown) {
         var $this  = $.dragNscroll.mousedown,
             ops    = $this.data("options");
         if(ops.rightMouse && e.button != 2) return;
         else if(!ops.rightMouse && e.button == 2) return;
         var changeX = e.pageX - $.mouse.x,
             changeY = e.pageY - $.mouse.y;
         if(!ops.reverse) {
          changeX = 0-changeX;
          changeY = 0-changeY;
         }
         move($this, changeX, changeY);
      }
      $.mouse = {
         x: e.pageX,
         y: e.pageY
      };
   });

})(jQuery);
