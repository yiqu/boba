(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{oyDf:function(e,t,i){"use strict";i.r(t),i.d(t,"ManagementModule",(function(){return te}));var r=i("ofXK"),n=i("3Pt+"),s=i("UmVK"),a=i("37S3"),o=i("tyNb"),c=i("fXoL");let l=(()=>{class e{}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(t){return new(t||e)},providers:[],imports:[[r.c,n.j,n.r,s.a,a.a,o.f]]}),e})();var b=i("Cicx");const d=function(e){return[e]};function u(e,t){if(1&e&&(c.Wb(0,"li",6),c.Wb(1,"a",7),c.Fc(2),c.Vb(),c.Vb()),2&e){const e=t.$implicit;c.oc("routerLinkActive","active link-act"),c.Db(1),c.oc("routerLink",c.qc(3,d,e.url)),c.Db(1),c.Gc(e.display)}}let m=(()=>{class e{constructor(){this.managementLinks=[],this.managementLinks.push(new b.e("inventory","Inventory","inventory"),new b.e("users","Users","users"),new b.e("archives","Order Archives","archives"))}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Kb({type:e,selectors:[["app-management"]],decls:11,vars:1,consts:[[1,"container","mb-3"],[1,"row","mb-3","comf","text-center","mt-3"],[1,"col-12"],[1,"row","mb-2","mt-2"],[1,"list-group","list-group-horizontal","comf"],["class","list-group-item links",3,"routerLinkActive",4,"ngFor","ngForOf"],[1,"list-group-item","links",3,"routerLinkActive"],[3,"routerLink"]],template:function(e,t){1&e&&(c.Wb(0,"div",0),c.Wb(1,"div",1),c.Wb(2,"div",2),c.Wb(3,"h2"),c.Fc(4,"Management Corner"),c.Vb(),c.Vb(),c.Vb(),c.Wb(5,"div",3),c.Wb(6,"div",2),c.Wb(7,"ul",4),c.Dc(8,u,3,5,"li",5),c.Vb(),c.Vb(),c.Vb(),c.Rb(9,"hr"),c.Rb(10,"router-outlet"),c.Vb()),2&e&&(c.Db(8),c.oc("ngForOf",t.managementLinks))},directives:[r.k,o.g,o.d,o.e],encapsulation:2}),e})();var p=i("XNiG"),h=i("1G5W"),g=i("OO0l"),f=i("itXk"),k=i("lJxs"),D=i("sSZD");let v=(()=>{class e{constructor(e){this.firedb=e,this.BASE_SELECTIONS_URL="selections/",this.MILK_TEAS_URL="teas",this.FRUIT_TEAS_URL="creative-mix",this.YOGURT_TEAS_URL="yogurt",this.milkTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.MILK_TEAS_URL),this.creativeMixTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.FRUIT_TEAS_URL),this.yogurtTeasListFire=this.firedb.list(this.BASE_SELECTIONS_URL+this.YOGURT_TEAS_URL),this.milkTeasList$=this.getCartItemObs(this.milkTeasListFire),this.creativeMixTeasList$=this.getCartItemObs(this.creativeMixTeasListFire),this.yogurtTeasList$=this.getCartItemObs(this.yogurtTeasListFire),this.allDrinksList$=Object(f.a)(this.milkTeasList$,this.creativeMixTeasList$,this.yogurtTeasList$)}getFDB(){return this.firedb.database}getCartItemObs(e){return e.snapshotChanges().pipe(Object(k.a)(e=>this.addfireKey(e)))}getDrinkDetailObs(e,t){return this.firedb.object(this.BASE_SELECTIONS_URL+e+"/"+t).snapshotChanges().pipe(Object(k.a)(e=>this.addFireKeySingle(e)))}getDrinkDetail(e,t){return this.firedb.object(this.BASE_SELECTIONS_URL+e+"/"+t)}addFireKeySingle(e){return Object.assign({fireKey:e.payload.key},e.payload.val())}addfireKey(e){return e.map(e=>Object.assign({fireKey:e.payload.key},e.payload.val()))}}return e.\u0275fac=function(t){return new(t||e)(c.ac(D.a))},e.\u0275prov=c.Mb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var y=i("b8ES"),F=i("AB5n");let V=(()=>{class e{transform(e){let t="";return t+=e.display+" - $"+(e.price?e.price:"Not set"),t}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275pipe=c.Pb({name:"inventoryDrinkDisplay",type:e,pure:!0}),e})();function L(e,t){if(1&e){const e=c.Xb();c.Wb(0,"li",11),c.ec("click",(function(){c.wc(e);const i=t.$implicit;return c.ic(2).onDrinkItemClick(i)})),c.Fc(1),c.jc(2,"inventoryDrinkDisplay"),c.Vb()}if(2&e){const e=t.$implicit;c.Db(1),c.Hc(" ",c.kc(2,1,e)," ")}}function W(e,t){if(1&e&&(c.Wb(0,"div",7),c.Wb(1,"ul",8),c.Wb(2,"li",9),c.Fc(3),c.jc(4,"countNumberDisplay"),c.Vb(),c.Dc(5,L,3,3,"li",10),c.Vb(),c.Vb()),2&e){const e=t.$implicit;c.Db(3),c.Ic("",e.header.display," ",c.kc(4,3,e.links.length),""),c.Db(2),c.oc("ngForOf",e.links)}}function O(e,t){1&e&&c.Fc(0," Loading drink inventory...\n")}let I=(()=>{class e{constructor(e,t,i,r){this.mis=e,this.fds=t,this.router=i,this.route=r,this.compDest$=new p.a,this.allDrinksList=[],this.inventorySubText="This is a list of all the selections of our drinks on the menu. Click on a drink below to edit."}ngOnInit(){this.mis.allDrinksList$.pipe(Object(h.a)(this.compDest$)).subscribe(([e,t,i])=>{this.allDrinksList=[];const r=new g.a(e,t,i);this.createAllDrinksList(r)},e=>{},()=>{})}createAllDrinksList(e){for(const t in e)this.allDrinksList.push(new b.a(new b.b(t),e[t]))}onDrinkItemClick(e){this.router.navigate([e.seriesName,e.fireKey],{relativeTo:this.route})}ngOnDestroy(){this.compDest$.next()}}return e.\u0275fac=function(t){return new(t||e)(c.Qb(v),c.Qb(y.a),c.Qb(o.c),c.Qb(o.a))},e.\u0275cmp=c.Kb({type:e,selectors:[["app-management-inventory"]],decls:11,vars:2,consts:[[1,"row","mb-3"],[1,"col-sm-6","offset-md-3"],["id","checkout-heading",1,"order-label","mb-3","comf","center-align"],[1,"row"],[1,"col-sm-12","roboto","mb-3"],["class","col-sm-4",4,"ngFor","ngForOf"],["loading",""],[1,"col-sm-4"],[1,"list-group"],[1,"list-group-item"],["class","list-group-item list-group-item-primary roboto",3,"click",4,"ngFor","ngForOf"],[1,"list-group-item","list-group-item-primary","roboto",3,"click"]],template:function(e,t){1&e&&(c.Wb(0,"div",0),c.Wb(1,"div",1),c.Wb(2,"div",2),c.Fc(3," Inventory "),c.Vb(),c.Vb(),c.Vb(),c.Wb(4,"div",3),c.Wb(5,"div",4),c.Fc(6),c.Vb(),c.Vb(),c.Wb(7,"div",3),c.Dc(8,W,6,5,"div",5),c.Vb(),c.Dc(9,O,1,0,"ng-template",null,6,c.Ec)),2&e&&(c.Db(6),c.Hc(" ",t.inventorySubText," "),c.Db(2),c.oc("ngForOf",t.allDrinksList))},directives:[r.k],pipes:[F.a,V],styles:[".drink-item[_ngcontent-%COMP%]{cursor:pointer}.list-group-item-primary[_ngcontent-%COMP%]{color:#004085;background-color:#cce6ff;cursor:pointer}.list-group-item-primary[_ngcontent-%COMP%]:hover{color:#004085;background-color:#b8daff}"]}),e})(),S=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Kb({type:e,selectors:[["app-management-users"]],decls:1,vars:0,template:function(e,t){1&e&&c.Fc(0,"Users\n")},styles:[""]}),e})(),T=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=c.Kb({type:e,selectors:[["app-managment-archives"]],decls:1,vars:0,template:function(e,t){1&e&&c.Fc(0,"Archives\n")},styles:[""]}),e})();var w=i("E8I7"),E=i("eIep"),C=i("Pk+l"),U=i("LvDl"),_=i("MPcn"),N=i("DHDI"),A=i("kmnG"),M=i("qFsG"),R=i("d3UM"),x=i("bTqV"),K=i("FKr1"),$=i("B6IJ");function j(e,t){1&e&&(c.Wb(0,"mat-error"),c.Fc(1," Please enter only unaccented alphabetical letters, A\u2013Z or a\u2013z. "),c.Vb())}function P(e,t){1&e&&(c.Wb(0,"mat-error"),c.Fc(1," Field is "),c.Wb(2,"strong"),c.Fc(3,"required"),c.Vb(),c.Vb())}function q(e,t){1&e&&(c.Wb(0,"mat-error"),c.Fc(1," Please enter only unaccented alphabetical letters, A\u2013Z or a\u2013z. "),c.Vb())}function B(e,t){1&e&&(c.Wb(0,"mat-error"),c.Fc(1," Field is "),c.Wb(2,"strong"),c.Fc(3,"required"),c.Vb(),c.Vb())}function G(e,t){if(1&e&&(c.Wb(0,"mat-option",19),c.Fc(1),c.Vb()),2&e){const e=t.$implicit;c.oc("value",e),c.Db(1),c.Hc(" ",e.seriesDisplay," ")}}function Q(e,t){1&e&&(c.Wb(0,"mat-error"),c.Fc(1," Please enter only integers and decimals. "),c.Vb())}function X(e,t){if(1&e){const e=c.Xb();c.Ub(0),c.Wb(1,"div",3),c.Wb(2,"div",4),c.Wb(3,"div",5),c.Fc(4," Drink Detail "),c.Vb(),c.Wb(5,"div"),c.Fc(6),c.jc(7,"dateDisplay"),c.Vb(),c.Vb(),c.Vb(),c.Wb(8,"div",6),c.Wb(9,"div",7),c.Wb(10,"form",8),c.Wb(11,"table",9),c.Wb(12,"tr"),c.Wb(13,"td"),c.Wb(14,"mat-form-field",9),c.Wb(15,"mat-label"),c.Fc(16,"Drink Display Name"),c.Vb(),c.Rb(17,"input",10),c.Dc(18,j,2,0,"mat-error",11),c.Dc(19,P,4,0,"mat-error",11),c.Vb(),c.Vb(),c.Vb(),c.Wb(20,"tr"),c.Wb(21,"td"),c.Wb(22,"mat-form-field",9),c.Wb(23,"mat-label"),c.Fc(24,"Drink ID"),c.Vb(),c.Rb(25,"input",12),c.Dc(26,q,2,0,"mat-error",11),c.Dc(27,B,4,0,"mat-error",11),c.Vb(),c.Vb(),c.Vb(),c.Wb(28,"tr"),c.Wb(29,"td"),c.Wb(30,"mat-form-field",9),c.Wb(31,"mat-label"),c.Fc(32,"Drink Series"),c.Vb(),c.Wb(33,"mat-select",13),c.Dc(34,G,2,2,"mat-option",14),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(35,"tr"),c.Wb(36,"td"),c.Wb(37,"mat-form-field",9),c.Wb(38,"mat-label"),c.Fc(39,"Drink Cost"),c.Vb(),c.Rb(40,"input",15),c.Dc(41,Q,2,0,"mat-error",11),c.Wb(42,"span",16),c.Fc(43,"$\xa0"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(44,"div",17),c.Wb(45,"div",7),c.Wb(46,"button",18),c.ec("click",(function(){return c.wc(e),c.ic(2).onUpdate()})),c.Fc(47,"Update"),c.Vb(),c.Vb(),c.Vb(),c.Tb()}if(2&e){const e=c.ic(2);c.Db(6),c.Hc("Last updated: ",c.lc(7,9,e.lastUpdated,"FROMNOW"),""),c.Db(4),c.oc("formGroup",e.detailFg),c.Db(8),c.oc("ngIf",e.detailFg.get("display").hasError("lettersOnly")&&!e.detailFg.get("display").hasError("required")),c.Db(1),c.oc("ngIf",e.detailFg.get("display").hasError("required")),c.Db(7),c.oc("ngIf",e.detailFg.get("name").hasError("lettersOnly")&&!e.detailFg.get("name").hasError("required")),c.Db(1),c.oc("ngIf",e.detailFg.get("name").hasError("required")),c.Db(7),c.oc("ngForOf",e.seriesList),c.Db(7),c.oc("ngIf",e.detailFg.get("drinkCost").hasError("numbersOnly")),c.Db(5),c.oc("disabled",e.detailFg.invalid)}}function H(e,t){if(1&e&&(c.Ub(0),c.Dc(1,X,48,12,"ng-container",0),c.Tb()),2&e){const e=c.ic(),t=c.tc(2);c.Db(1),c.oc("ngIf",null!==e.currentDrink)("ngIfElse",t)}}function J(e,t){1&e&&c.Fc(0," Drink item is invalid.\n")}function Y(e,t){1&e&&c.Fc(0," Loading drink item...\n")}const z=[{path:"",component:m,children:[{path:"",redirectTo:"inventory",pathMatch:"full"},{path:"inventory",component:I},{path:"inventory/:drinkSeries/:id",component:(()=>{class e{constructor(e,t,i,r,n){this.router=e,this.route=t,this.is=i,this.fb=r,this.sbs=n,this.seriesList=[new w.d("Milk Tea",w.c.MILK_TEA),new w.d("Creative Mix",w.c.FRUIT_TEA),new w.d("Yogurt",w.c.YOGURT)],this.route.paramMap.pipe(Object(E.a)(e=>{const t=this.getFirebaseDrinkSeries(e.get("drinkSeries")),i=e.get("id");return this.is.getDrinkDetailObs(t,i)})).subscribe(e=>{this.isDrinkDetailValid(e)?(this.currentDrink=e,this.createDetailFg(),this.lastUpdated=this.getLastUpdated()):this.currentDrink=null})}ngOnInit(){}isDrinkDetailValid(e){return e.display&&e.name&&e.seriesDisplay&&e.seriesName}createDetailFg(){this.detailFg=this.fb.group({display:C.a(this.currentDrink.display,!1,[n.s.required,_.a]),name:C.a(this.currentDrink.name,!1,[n.s.required,_.a]),drinkSeries:C.a(this.getFetchedDrinkSeriesValue(),!1,[n.s.required]),drinkCost:C.b(this.getDrinkCost(),!1,[_.b])})}getFetchedDrinkSeriesValue(){const e=U.findIndex(this.seriesList,["seriesName",this.currentDrink.seriesName]);return this.seriesList[e]}getDrinkCost(){let e="0.00";return this.currentDrink.price&&(e=this.currentDrink.price),e}getLastUpdated(){let e=0;return this.currentDrink.lastUpdated&&(e=this.currentDrink.lastUpdated),e}onUpdate(){const e=this.createDrinkItemToUpdate();if(e){const t=this.isSeriesSame(e);this.is.getDrinkDetail(this.getFirebaseDrinkSeries(e.seriesName),this.currentDrink.fireKey).set(e).then(i=>{this.sbs.openSnackBar(e.display+" saved!"),t||this.is.getDrinkDetail(this.getFirebaseDrinkSeries(this.currentDrink.seriesName),this.currentDrink.fireKey).remove()},t=>{this.sbs.openSnackBar(e.display+" could not be saved, error occured: "+t)}).finally(()=>{this.router.navigate(["../../"],{relativeTo:this.route})})}}isSeriesSame(e){return this.currentDrink?this.currentDrink.seriesName===e.seriesName:null}createDrinkItemToUpdate(){const e=this.detailFg.value;if(this.detailFg.valid)return new w.b(e.display,e.name,e.drinkSeries.seriesDisplay,e.drinkSeries.seriesName,null,e.drinkCost,(new Date).getTime())}getFirebaseDrinkSeries(e){let t;switch(e){case"milkTea":t="teas";break;case"creativeMix":t="creative-mix";break;case"yogurt":t="yogurt"}return t}}return e.\u0275fac=function(t){return new(t||e)(c.Qb(o.c),c.Qb(o.a),c.Qb(v),c.Qb(n.d),c.Qb(N.a))},e.\u0275cmp=c.Kb({type:e,selectors:[["app-inventory-drink-detail"]],decls:5,vars:2,consts:[[4,"ngIf","ngIfElse"],["drinkInvalid",""],["loadingDrink",""],[1,"row","mb-3"],[1,"col-sm-12","text-center"],[1,"order-label","mb-3","comf","center-align"],[1,"row"],[1,"col-12"],[1,"detail-form",3,"formGroup"],[1,"full-w"],["matInput","","formControlName","display"],[4,"ngIf"],["matInput","","formControlName","name"],["formControlName","drinkSeries"],[3,"value",4,"ngFor","ngForOf"],["matInput","","formControlName","drinkCost",1,"field-right-align"],["matPrefix",""],[1,"row","mt-2"],["mat-flat-button","","color","primary",3,"disabled","click"],[3,"value"]],template:function(e,t){if(1&e&&(c.Dc(0,H,2,2,"ng-container",0),c.Dc(1,J,1,0,"ng-template",null,1,c.Ec),c.Dc(3,Y,1,0,"ng-template",null,2,c.Ec)),2&e){const e=c.tc(4);c.oc("ngIf",void 0!==t.currentDrink)("ngIfElse",e)}},directives:[r.l,n.t,n.o,n.i,A.c,A.g,M.b,n.b,n.n,n.g,R.a,r.k,A.h,x.a,A.b,K.n],pipes:[$.a],styles:[".detail-form[_ngcontent-%COMP%]{min-width:150px;max-width:400px;width:100%}.field-right-align[_ngcontent-%COMP%]{text-align:right}"]}),e})()},{path:"users",component:S},{path:"archives",component:T}]}];let Z=(()=>{class e{}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(t){return new(t||e)},imports:[[o.f.forChild(z)],o.f]}),e})();var ee=i("re6+");let te=(()=>{class e{}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(t){return new(t||e)},providers:[],imports:[[r.c,n.r,n.j,o.f,s.a,a.a,ee.a,l,Z]]}),e})()}}]);