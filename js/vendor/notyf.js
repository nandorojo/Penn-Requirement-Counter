!function(){function n(n,t){for(property in t)t.hasOwnProperty(property)&&(n[property]=t[property]);return n}function t(n,t){var e=document.createElement("div");e.className="notyf__toast";var o=document.createElement("div");o.className="notyf__wrapper";var i=document.createElement("div");i.className="notyf__icon";var a=document.createElement("i");a.className=t;var r=document.createElement("div");r.className="notyf__message",r.innerHTML=n,i.appendChild(a),o.appendChild(i),o.appendChild(r),e.appendChild(o);var c=this;return setTimeout(function(){e.className+=" notyf--disappear",e.addEventListener(c.animationEnd,function(n){n.target==e&&c.container.removeChild(e)});var n=c.notifications.indexOf(e);c.notifications.splice(n,1)},c.options.delay),e}function e(){var n,t=document.createElement("fake"),e={transition:"animationend",OTransition:"oAnimationEnd",MozTransition:"animationend",WebkitTransition:"webkitAnimationEnd"};for(n in e)if(void 0!==t.style[n])return e[n]}this.Notyf=function(){this.notifications=[];var t={delay:2e3,alertIcon:"notyf__icon--alert",confirmIcon:"notyf__icon--confirm"};arguments[0]&&"object"==typeof arguments[0]?this.options=n(t,arguments[0]):this.options=t;var o=document.createDocumentFragment(),i=document.createElement("div");i.className="notyf",o.appendChild(i),document.body.appendChild(o),this.container=i,this.animationEnd=e()},this.Notyf.prototype.alert=function(n){var e=t.call(this,n,this.options.alertIcon);e.className+=" notyf--alert",this.container.appendChild(e),this.notifications.push(e)},this.Notyf.prototype.confirm=function(n){var e=t.call(this,n,this.options.confirmIcon);e.className+=" notyf--confirm",this.container.appendChild(e),this.notifications.push(e)}}(),function(){"function"==typeof define&&define.amd?define("Notyf",function(){return Notyf}):"undefined"!=typeof module&&module.exports?module.exports=Notyf:window.Notyf=Notyf}();
