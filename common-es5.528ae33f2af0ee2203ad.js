function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var s=n[t];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{MPcn:function(e,n,t){"use strict";function s(e){var n=e.value;return n&&n.name&&n.display||n&&n.id&&n.display?null:{fieldRequired:!0}}function i(e){return e.value&&e.value.trim().match(/^[A-Za-z ]+$/)?null:{lettersOnly:!0}}function r(e){var n=e.value;return n&&n.match(/^[0-9]+([,.][0-9]+)?$/)?null:{numbersOnly:!0}}t.d(n,"c",(function(){return s})),t.d(n,"a",(function(){return i})),t.d(n,"b",(function(){return r}))},"VsN/":function(e,n,t){"use strict";t.d(n,"a",(function(){return f}));var s=t("XNiG"),i=t("1G5W"),r=t("fXoL"),a=t("IYfF"),o=t("ofXK");function u(e,n){if(1&e&&(r.Wb(0,"div",2),r.Fc(1),r.Vb()),2&e){var t=r.ic();r.Db(1),r.Hc(" ",t.message,"\n")}}function c(e,n){1&e&&r.Rb(0,"hr")}var f=function(){var e=function(){function e(n){var t=this;_classCallCheck(this,e),this.as=n,this.alwaysShow=!1,this.customMsg=".",this.showBreak=!1,this.show=!1,this.listOfAdmins=[],this.compDest$=new s.a,this.as.currentUser$.pipe(Object(i.a)(this.compDest$)).subscribe((function(e){t.currentUser=e,t.getMessage()}))}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"ngOnChanges",value:function(e){this.getMessage()}},{key:"getMessage",value:function(){var e=this;if(this.alwaysShow)return this.show=!0,void(this.message=this.customMsg);if(this.adminRequired){var n;return n=this.listOfAdmins.findIndex((function(n){return!!e.currentUser&&n.email===e.currentUser.email})),this.show=!(n>-1),void(this.message="Only admins are allowed to make edits and changes.")}return this.loginRequired?(this.show=!this.currentUser,void(this.message="Please login "+this.customMsg)):void 0}}]),e}();return e.\u0275fac=function(n){return new(n||e)(r.Qb(a.a))},e.\u0275cmp=r.Kb({type:e,selectors:[["app-notification-banner"]],inputs:{alwaysShow:"alwaysShow",customMsg:"customMsg",loginRequired:"loginRequired",adminRequired:"adminRequired",showBreak:"showBreak"},features:[r.Bb],decls:2,vars:2,consts:[["class","alert alert-info",4,"ngIf"],[4,"ngIf"],[1,"alert","alert-info"]],template:function(e,n){1&e&&(r.Dc(0,u,2,1,"div",0),r.Dc(1,c,1,0,"hr",1)),2&e&&(r.oc("ngIf",n.show),r.Db(1),r.oc("ngIf",n.showBreak&&n.show))},directives:[o.l],styles:[""]}),e}()},"gz+R":function(e,n,t){"use strict";t.d(n,"a",(function(){return c}));var s=t("ofXK"),i=t("UmVK"),r=t("tyNb"),a=t("3Pt+"),o=t("37S3"),u=t("fXoL"),c=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=u.Ob({type:e}),e.\u0275inj=u.Nb({factory:function(n){return new(n||e)},providers:[],imports:[[s.c,a.j,i.a,r.f,o.a]]}),e}()},"re6+":function(e,n,t){"use strict";t.d(n,"a",(function(){return i}));var s=t("fXoL"),i=function(){var e=function e(){_classCallCheck(this,e)};return e.\u0275mod=s.Ob({type:e}),e.\u0275inj=s.Nb({factory:function(n){return new(n||e)},providers:[],imports:[[]]}),e}()}}]);