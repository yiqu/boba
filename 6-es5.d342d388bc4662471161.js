function _slicedToArray(e,t){return _arrayWithHoles(e)||_iterableToArrayLimit(e,t)||_unsupportedIterableToArray(e,t)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(i):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,r=new Array(t);i<t;i++)r[i]=e[i];return r}function _iterableToArrayLimit(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var i=[],r=!0,n=!1,a=void 0;try{for(var s,c=e[Symbol.iterator]();!(r=(s=c.next()).done)&&(i.push(s.value),!t||i.length!==t);r=!0);}catch(o){n=!0,a=o}finally{try{r||null==c.return||c.return()}finally{if(n)throw a}}return i}}function _arrayWithHoles(e){if(Array.isArray(e))return e}function _defineProperties(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,i){return t&&_defineProperties(e.prototype,t),i&&_defineProperties(e,i),e}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{oyDf:function(e,t,i){"use strict";i.r(t),i.d(t,"ManagementModule",(function(){return de}));var r,n=i("ofXK"),a=i("3Pt+"),s=i("UmVK"),c=i("37S3"),o=i("tyNb"),l=i("fXoL"),u=((r=function e(){_classCallCheck(this,e)}).\u0275mod=l.Ob({type:r}),r.\u0275inj=l.Nb({factory:function(e){return new(e||r)},providers:[],imports:[[n.c,a.j,a.r,s.a,c.a,o.f]]}),r),b=i("Cicx"),f=function(e){return[e]};function d(e,t){if(1&e&&(l.Wb(0,"li",6),l.Wb(1,"a",7),l.Fc(2),l.Vb(),l.Vb()),2&e){var i=t.$implicit;l.oc("routerLinkActive","active link-act"),l.Db(1),l.oc("routerLink",l.qc(3,f,i.url)),l.Db(1),l.Gc(i.display)}}var m,p,h,v=((m=function(){function e(){_classCallCheck(this,e),this.managementLinks=[],this.managementLinks.push(new b.e("inventory","Inventory","inventory"),new b.e("users","Users","users"),new b.e("archives","Order Archives","archives"))}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||m)},m.\u0275cmp=l.Kb({type:m,selectors:[["app-management"]],decls:11,vars:1,consts:[[1,"container","mb-3"],[1,"row","mb-3","comf","text-center","mt-3"],[1,"col-12"],[1,"row","mb-2","mt-2"],[1,"list-group","list-group-horizontal","comf"],["class","list-group-item links",3,"routerLinkActive",4,"ngFor","ngForOf"],[1,"list-group-item","links",3,"routerLinkActive"],[3,"routerLink"]],template:function(e,t){1&e&&(l.Wb(0,"div",0),l.Wb(1,"div",1),l.Wb(2,"div",2),l.Wb(3,"h2"),l.Fc(4,"Management Corner"),l.Vb(),l.Vb(),l.Vb(),l.Wb(5,"div",3),l.Wb(6,"div",2),l.Wb(7,"ul",4),l.Dc(8,d,3,5,"li",5),l.Vb(),l.Vb(),l.Vb(),l.Rb(9,"hr"),l.Rb(10,"router-outlet"),l.Vb()),2&e&&(l.Db(8),l.oc("ngForOf",t.managementLinks))},directives:[n.k,o.g,o.d,o.e],encapsulation:2}),m),g=i("XNiG"),y=i("1G5W"),k=i("OO0l"),D=i("itXk"),F=i("lJxs"),C=i("sSZD"),_=((p=function(){function e(t){_classCallCheck(this,e),this.firedb=t,this.BASE_SELECTIONS_URL="selections/",this.MILK_TEAS_URL="teas",this.FRUIT_TEAS_URL="creative-mix",this.YOGURT_TEAS_URL="yogurt",this.milkTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.MILK_TEAS_URL),this.creativeMixTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.FRUIT_TEAS_URL),this.yogurtTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.YOGURT_TEAS_URL),this.milkTeasList$=this.getCartItemObs(this.milkTeasListFire),this.creativeMixTeasList$=this.getCartItemObs(this.creativeMixTeasListFire),this.yogurtTeasList$=this.getCartItemObs(this.yogurtTeasListFire),this.allDrinksList$=Object(D.a)(this.milkTeasList$,this.creativeMixTeasList$,this.yogurtTeasList$)}return _createClass(e,[{key:"getFDB",value:function(){return this.firedb.database}},{key:"getCartItemObs",value:function(e){var t=this;return e.snapshotChanges().pipe(Object(F.a)((function(e){return t.addfireKey(e)})))}},{key:"getDrinkDetailObs",value:function(e,t){var i=this;return this.firedb.object(this.BASE_SELECTIONS_URL+e+"/"+t).snapshotChanges().pipe(Object(F.a)((function(e){return i.addFireKeySingle(e)})))}},{key:"getDrinkDetail",value:function(e,t){return this.firedb.object(this.BASE_SELECTIONS_URL+e+"/"+t)}},{key:"addFireKeySingle",value:function(e){return Object.assign({fireKey:e.payload.key},e.payload.val())}},{key:"addfireKey",value:function(e){return e.map((function(e){return Object.assign({fireKey:e.payload.key},e.payload.val())}))}}]),e}()).\u0275fac=function(e){return new(e||p)(l.ac(C.a))},p.\u0275prov=l.Mb({token:p,factory:p.\u0275fac,providedIn:"root"}),p),L=i("b8ES"),V=i("MutI"),W=i("FKr1"),I=i("NFeN"),O=i("f0Cb"),T=((h=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"transform",value:function(e){var t="";return t+=e.display+" - "+e.seriesDisplay}}]),e}()).\u0275fac=function(e){return new(e||h)},h.\u0275pipe=l.Pb({name:"inventoryDrinkDisplay",type:h,pure:!0}),h);function w(e,t){1&e&&(l.Wb(0,"mat-icon",12),l.Fc(1,"edit"),l.Vb())}function S(e,t){if(1&e){var i=l.Xb();l.Ub(0),l.Wb(1,"mat-list-item",8),l.ec("click",(function(){l.wc(i);var e=t.$implicit;return l.ic(2).onDrinkItemClick(e)})),l.Dc(2,w,2,0,"mat-icon",9),l.Wb(3,"div",10),l.Fc(4),l.jc(5,"inventoryDrinkDisplay"),l.Vb(),l.Wb(6,"div",11),l.Fc(7),l.Vb(),l.Vb(),l.Tb()}if(2&e){var r=t.$implicit,n=l.ic(2);l.Db(2),l.oc("ngIf",!n.fds.mobileQuery.matches),l.Db(2),l.Gc(l.kc(5,3,r)),l.Db(3),l.Hc(" ",r.fireKey," ")}}function E(e,t){1&e&&l.Rb(0,"mat-divider")}function A(e,t){if(1&e&&(l.Ub(0),l.Wb(1,"div",6),l.Fc(2),l.Vb(),l.Dc(3,S,8,5,"ng-container",5),l.Dc(4,E,1,0,"mat-divider",7),l.Tb()),2&e){var i=t.$implicit,r=t.last;l.Db(2),l.Gc(i.header.display),l.Db(1),l.oc("ngForOf",i.links),l.Db(1),l.oc("ngIf",!r)}}var U,R,M,N=((M=function(){function e(t,i,r,n){_classCallCheck(this,e),this.mis=t,this.fds=i,this.router=r,this.route=n,this.compDest$=new g.a,this.allDrinksList=[]}return _createClass(e,[{key:"ngOnInit",value:function(){var e=this;this.mis.allDrinksList$.pipe(Object(y.a)(this.compDest$)).subscribe((function(t){var i=_slicedToArray(t,3),r=i[0],n=i[1],a=i[2],s=new k.a(r,n,a);e.createAllDrinksList(s)}),(function(e){}),(function(){}))}},{key:"createAllDrinksList",value:function(e){for(var t in e)this.allDrinksList.push(new b.a(new b.b(t),e[t]))}},{key:"onDrinkItemClick",value:function(e){this.router.navigate([e.seriesName,e.fireKey],{relativeTo:this.route})}},{key:"ngOnDestroy",value:function(){this.compDest$.next()}}]),e}()).\u0275fac=function(e){return new(e||M)(l.Qb(_),l.Qb(L.a),l.Qb(o.c),l.Qb(o.a))},M.\u0275cmp=l.Kb({type:M,selectors:[["app-management-inventory"]],decls:8,vars:1,consts:[[1,"row","mb-3"],[1,"col-sm-6","offset-md-3"],["id","checkout-heading",1,"order-label","mb-3","comf","center-align"],[1,"row"],[1,"col-12"],[4,"ngFor","ngForOf"],["mat-subheader",""],[4,"ngIf"],[1,"drink-item",3,"click"],["mat-list-icon","",4,"ngIf"],["mat-line",""],["mat-line","",1,"text-muted","fs-10"],["mat-list-icon",""]],template:function(e,t){1&e&&(l.Wb(0,"div",0),l.Wb(1,"div",1),l.Wb(2,"div",2),l.Fc(3," Inventory "),l.Vb(),l.Vb(),l.Vb(),l.Wb(4,"div",3),l.Wb(5,"div",4),l.Wb(6,"mat-list"),l.Dc(7,A,5,3,"ng-container",5),l.Vb(),l.Vb(),l.Vb()),2&e&&(l.Db(7),l.oc("ngForOf",t.allDrinksList))},directives:[V.a,n.k,V.f,n.l,V.c,W.j,I.a,V.b,O.a],pipes:[T],styles:[".drink-item[_ngcontent-%COMP%]{cursor:pointer}"]}),M),j=((R=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||R)},R.\u0275cmp=l.Kb({type:R,selectors:[["app-management-users"]],decls:1,vars:0,template:function(e,t){1&e&&l.Fc(0,"Users\n")},styles:[""]}),R),x=((U=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||U)},U.\u0275cmp=l.Kb({type:U,selectors:[["app-managment-archives"]],decls:1,vars:0,template:function(e,t){1&e&&l.Fc(0,"Archives\n")},styles:[""]}),U),K=i("eIep"),$=i("Pk+l"),P=i("E8I7"),q=i("LvDl"),G=i("MPcn"),Q=i("kmnG"),B=i("qFsG"),X=i("d3UM"),H=i("bTqV"),J=i("B6IJ");function Y(e,t){1&e&&(l.Wb(0,"mat-error"),l.Fc(1," Please enter only unaccented alphabetical letters, A\u2013Z or a\u2013z. "),l.Vb())}function z(e,t){1&e&&(l.Wb(0,"mat-error"),l.Fc(1," Field is "),l.Wb(2,"strong"),l.Fc(3,"required"),l.Vb(),l.Vb())}function Z(e,t){1&e&&(l.Wb(0,"mat-error"),l.Fc(1," Please enter only unaccented alphabetical letters, A\u2013Z or a\u2013z. "),l.Vb())}function ee(e,t){1&e&&(l.Wb(0,"mat-error"),l.Fc(1," Field is "),l.Wb(2,"strong"),l.Fc(3,"required"),l.Vb(),l.Vb())}function te(e,t){if(1&e&&(l.Wb(0,"mat-option",19),l.Fc(1),l.Vb()),2&e){var i=t.$implicit;l.oc("value",i),l.Db(1),l.Hc(" ",i.seriesDisplay," ")}}function ie(e,t){1&e&&(l.Wb(0,"mat-error"),l.Fc(1," Please enter only integers and decimals. "),l.Vb())}function re(e,t){if(1&e){var i=l.Xb();l.Ub(0),l.Wb(1,"div",3),l.Wb(2,"div",4),l.Wb(3,"div",5),l.Fc(4," Drink Detail "),l.Vb(),l.Wb(5,"div"),l.Fc(6),l.jc(7,"dateDisplay"),l.Vb(),l.Vb(),l.Vb(),l.Wb(8,"div",6),l.Wb(9,"div",7),l.Wb(10,"form",8),l.Wb(11,"table",9),l.Wb(12,"tr"),l.Wb(13,"td"),l.Wb(14,"mat-form-field",9),l.Wb(15,"mat-label"),l.Fc(16,"Drink Display Name"),l.Vb(),l.Rb(17,"input",10),l.Dc(18,Y,2,0,"mat-error",11),l.Dc(19,z,4,0,"mat-error",11),l.Vb(),l.Vb(),l.Vb(),l.Wb(20,"tr"),l.Wb(21,"td"),l.Wb(22,"mat-form-field",9),l.Wb(23,"mat-label"),l.Fc(24,"Drink ID"),l.Vb(),l.Rb(25,"input",12),l.Dc(26,Z,2,0,"mat-error",11),l.Dc(27,ee,4,0,"mat-error",11),l.Vb(),l.Vb(),l.Vb(),l.Wb(28,"tr"),l.Wb(29,"td"),l.Wb(30,"mat-form-field",9),l.Wb(31,"mat-label"),l.Fc(32,"Drink Series"),l.Vb(),l.Wb(33,"mat-select",13),l.Dc(34,te,2,2,"mat-option",14),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Wb(35,"tr"),l.Wb(36,"td"),l.Wb(37,"mat-form-field",9),l.Wb(38,"mat-label"),l.Fc(39,"Drink Cost"),l.Vb(),l.Rb(40,"input",15),l.Dc(41,ie,2,0,"mat-error",11),l.Wb(42,"span",16),l.Fc(43,"$\xa0"),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Vb(),l.Wb(44,"div",17),l.Wb(45,"div",7),l.Wb(46,"button",18),l.ec("click",(function(){return l.wc(i),l.ic(2).onUpdate()})),l.Fc(47,"Update"),l.Vb(),l.Vb(),l.Vb(),l.Tb()}if(2&e){var r=l.ic(2);l.Db(6),l.Hc("Last updated: ",l.lc(7,9,r.lastUpdated,"FROMNOW"),""),l.Db(4),l.oc("formGroup",r.detailFg),l.Db(8),l.oc("ngIf",r.detailFg.get("display").hasError("lettersOnly")&&!r.detailFg.get("display").hasError("required")),l.Db(1),l.oc("ngIf",r.detailFg.get("display").hasError("required")),l.Db(7),l.oc("ngIf",r.detailFg.get("name").hasError("lettersOnly")&&!r.detailFg.get("name").hasError("required")),l.Db(1),l.oc("ngIf",r.detailFg.get("name").hasError("required")),l.Db(7),l.oc("ngForOf",r.seriesList),l.Db(7),l.oc("ngIf",r.detailFg.get("drinkCost").hasError("numbersOnly")),l.Db(5),l.oc("disabled",r.detailFg.invalid)}}function ne(e,t){if(1&e&&(l.Ub(0),l.Dc(1,re,48,12,"ng-container",0),l.Tb()),2&e){var i=l.ic(),r=l.tc(2);l.Db(1),l.oc("ngIf",null!==i.currentDrink)("ngIfElse",r)}}function ae(e,t){1&e&&l.Fc(0," Drink item is invalid.\n")}function se(e,t){1&e&&l.Fc(0," Loading drink item...\n")}var ce,oe,le,ue=[{path:"",component:v,children:[{path:"",redirectTo:"inventory",pathMatch:"full"},{path:"inventory",component:N},{path:"inventory/:drinkSeries/:id",component:(ce=function(){function e(t,i,r,n){var a=this;_classCallCheck(this,e),this.router=t,this.route=i,this.is=r,this.fb=n,this.seriesList=[new P.c("Milk Tea",P.b.MILK_TEA),new P.c("Creative Mix",P.b.FRUIT_TEA),new P.c("Yogurt",P.b.YOGURT)],this.route.paramMap.pipe(Object(K.a)((function(e){var t=a.getFirebaseDrinkSeries(e.get("drinkSeries")),i=e.get("id");return a.is.getDrinkDetailObs(t,i)}))).subscribe((function(e){a.isDrinkDetailValid(e)?(a.currentDrink=e,a.createDetailFg(),console.log(a.detailFg),a.lastUpdated=a.getLastUpdated()):a.currentDrink=null}))}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"isDrinkDetailValid",value:function(e){return e.display&&e.name&&e.seriesDisplay&&e.seriesName}},{key:"createDetailFg",value:function(){this.detailFg=this.fb.group({display:$.a(this.currentDrink.display,!1,[a.s.required,G.a]),name:$.a(this.currentDrink.name,!1,[a.s.required,G.a]),drinkSeries:$.a(this.getFetchedDrinkSeriesValue(),!1,[a.s.required]),drinkCost:$.b(this.getDrinkCost(),!1,[G.b])})}},{key:"getFetchedDrinkSeriesValue",value:function(){var e=q.findIndex(this.seriesList,["seriesName",this.currentDrink.seriesName]);return this.seriesList[e]}},{key:"getDrinkCost",value:function(){var e="0.00";return this.currentDrink.price&&(e=this.currentDrink.price),e}},{key:"getLastUpdated",value:function(){var e=0;return this.currentDrink.lastUpdated&&(e=this.currentDrink.lastUpdated),e}},{key:"onUpdate",value:function(){console.log(this.detailFg.value)}},{key:"getFirebaseDrinkSeries",value:function(e){var t;switch(e){case"milkTea":t="teas";break;case"creativeMix":t="creative-mix";break;case"yogurt":t="yogurt"}return t}}]),e}(),ce.\u0275fac=function(e){return new(e||ce)(l.Qb(o.c),l.Qb(o.a),l.Qb(_),l.Qb(a.d))},ce.\u0275cmp=l.Kb({type:ce,selectors:[["app-inventory-drink-detail"]],decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["drinkInvalid",""],["loadingDrink",""],[1,"row","mb-3"],[1,"col-sm-12","text-center"],[1,"order-label","mb-3","comf","center-align"],[1,"row"],[1,"col-12"],[1,"detail-form",3,"formGroup"],[1,"full-w"],["matInput","","formControlName","display"],[4,"ngIf"],["matInput","","formControlName","name"],["formControlName","drinkSeries"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","drinkCost",1,"field-right-align"],["matPrefix",""],[1,"row","mt-2"],["mat-flat-button","","color","primary",3,"disabled","click"],[3,"value"]],template:function(e,t){if(1&e&&(l.Dc(0,ne,2,2,"ng-container",0),l.Dc(1,ae,1,0,"ng-template",null,1,l.Ec),l.Dc(3,se,1,0,"ng-template",null,2,l.Ec)),2&e){var i=l.tc(4);l.oc("ngIf",void 0!==t.currentDrink)("ngIfElse",i)}},directives:[n.l,a.t,a.o,a.i,Q.c,Q.g,B.b,a.b,a.n,a.g,X.a,n.k,Q.h,H.a,Q.b,W.n],pipes:[J.a],styles:[".detail-form[_ngcontent-%COMP%]{min-width:150px;max-width:400px;width:100%}.field-right-align[_ngcontent-%COMP%]{text-align:right}"]}),ce)},{path:"users",component:j},{path:"archives",component:x}]}],be=((oe=function e(){_classCallCheck(this,e)}).\u0275mod=l.Ob({type:oe}),oe.\u0275inj=l.Nb({factory:function(e){return new(e||oe)},imports:[[o.f.forChild(ue)],o.f]}),oe),fe=i("re6+"),de=((le=function e(){_classCallCheck(this,e)}).\u0275mod=l.Ob({type:le}),le.\u0275inj=l.Nb({factory:function(e){return new(e||le)},providers:[],imports:[[n.c,a.r,a.j,o.f,s.a,c.a,fe.a,u,be]]}),le)}}]);