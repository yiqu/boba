function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var e=0;e<n.length;e++){var i=n[e];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function _createClass(t,n,e){return n&&_defineProperties(t.prototype,n),e&&_defineProperties(t,e),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{S8Z8:function(t,n,e){"use strict";e.r(n),e.d(n,"NewCustomerModule",(function(){return g}));var i,o,r,c=e("tyNb"),a=e("fXoL"),s=e("IYfF"),b=e("bTqV"),l=[{path:"",component:(i=function(){function t(n,e,i){_classCallCheck(this,t),this.router=n,this.route=e,this.as=i,this.title="Please login with your BobaShop account, or register for one if you have not done so!",this.imgUrl="/assets/images/main/icons/login-first.jpg"}return _createClass(t,[{key:"ngOnInit",value:function(){}},{key:"onClick",value:function(t){this.router.navigate("login"===t?["/","auth","signin"]:["/","auth","signup"])}}]),t}(),i.\u0275fac=function(t){return new(t||i)(a.Pb(c.c),a.Pb(c.a),a.Pb(s.a))},i.\u0275cmp=a.Jb({type:i,selectors:[["app-new-customer"]],decls:19,vars:2,consts:[[1,"container","mb-3"],[1,"row","mb-3","comf","text-center","mt-5"],[1,"col-sm-12"],[1,"row","text-center","roboto"],[1,"row"],[1,"center-align","mt-3"],["mat-flat-button","","color","primary",1,"mr-3","btn-w",3,"click"],["mat-flat-button","","color","accent",1,"btn-w",3,"click"],[1,"row","mt-5"],[1,"img-parent","center-align"],["alt","bg",1,"img-h-100","b-r",3,"src"]],template:function(t,n){1&t&&(a.Vb(0,"div",0),a.Vb(1,"div",1),a.Vb(2,"div",2),a.Vb(3,"h3"),a.Dc(4,"But first..."),a.Ub(),a.Ub(),a.Ub(),a.Vb(5,"div",3),a.Vb(6,"div",2),a.Dc(7),a.Ub(),a.Ub(),a.Vb(8,"div",4),a.Vb(9,"div",2),a.Vb(10,"div",5),a.Vb(11,"button",6),a.cc("click",(function(){return n.onClick("login")})),a.Dc(12," Login"),a.Ub(),a.Vb(13,"button",7),a.cc("click",(function(){return n.onClick("register")})),a.Dc(14," Register"),a.Ub(),a.Ub(),a.Ub(),a.Ub(),a.Vb(15,"div",8),a.Vb(16,"div",2),a.Vb(17,"div",9),a.Qb(18,"img",10),a.Ub(),a.Ub(),a.Ub(),a.Ub()),2&t&&(a.Cb(7),a.Fc(" ",n.title," "),a.Cb(11),a.mc("src",n.imgUrl,a.wc))},directives:[b.a],styles:[".btn-w[_ngcontent-%COMP%]{width:150px}.img-parent[_ngcontent-%COMP%]{height:25rem}.b-r[_ngcontent-%COMP%]{border-radius:30%}"]}),i),data:{title:"New Customer"}}],u=((o=function t(){_classCallCheck(this,t)}).\u0275mod=a.Nb({type:o}),o.\u0275inj=a.Mb({factory:function(t){return new(t||o)},imports:[[c.f.forChild(l)],c.f]}),o),f=e("UmVK"),m=e("37S3"),p=e("ofXK"),d=e("3Pt+"),g=((r=function t(){_classCallCheck(this,t)}).\u0275mod=a.Nb({type:r}),r.\u0275inj=a.Mb({factory:function(t){return new(t||r)},providers:[],imports:[[f.a,m.a,p.c,d.k,u]]}),r)}}]);