webpackJsonp([1],{"/TaY":function(t,a,e){"use strict";var s=e("Xxa5"),r=e.n(s),n=e("exGp"),c=e.n(n),i=e("HK56"),o=e("o9nW");a.a={name:"HeaderBar",components:{ProductCarousel:i.a},data:function(){return{products:[]}},methods:{getBanner:function(){var t=this;return c()(r.a.mark(function a(){var e;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t.$store.dispatch("isLoading",!0),a.next=4,o.a.getBannerInfo();case 4:if(e=a.sent,e.data&&!1!==e.data.success){a.next=7;break}throw new Error;case 7:t.products=e.data,t.$store.dispatch("isLoading",!1),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),t.$store.dispatch("handleError",!0);case 14:case"end":return a.stop()}},a,t,[[0,11]])}))()}},created:function(){this.getBanner()}}},"/o5o":function(t,a,e){"use strict";function s(t){e("Etft")}var r=e("Aqhm"),n=e("uYc9"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-13afa576",null);a.a=o.exports},"/oiM":function(t,a,e){"use strict";a.a={name:"Contact",data:function(){return{}},created:function(){this.contact||this.$store.dispatch("setContact")},computed:{contact:function(){return this.$store.state.contact},callPhone:function(){return"tel:"+this.contact.phone},callMobile:function(){return"tel:"+this.contact.mobile}}}},"/uSJ":function(t,a){},"0dzx":function(t,a,e){"use strict";a.a={name:"FooterBar",data:function(){return{}},computed:{facebookLink:function(){return this.$store.state.contact?this.$store.state.contact.facebookLink:"https://facebook.com"}},created:function(){this.contact||this.$store.dispatch("setContact")}}},"1k1P":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.product?e("div",{staticClass:"container"},[e("h1",{staticClass:"my-4"},[t._v(t._s(t.product.title)+"\n    "),e("category-badge",{attrs:{category:t.product.category.name}})],1),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-md-8"},[e("img",{staticClass:"img-fluid img-responsive main-img",attrs:{src:t.getProductImage(t.product),alt:""}})]),t._v(" "),e("div",{staticClass:"col-md-4"},[e("h3",{staticClass:"cost"},[t.product.price?e("s",{staticClass:"price"},[t._v(t._s(t.calculatePrice(t.product.price)))]):t._e(),t._v(" "),t.product.priceSale?e("span",{staticClass:"price-sale"},[t._v(t._s(t.calculatePrice(t.product.priceSale)))]):t._e()]),t._v(" "),e("h3",{staticClass:"my-3"},[t._v(" Chi tiết")]),t._v(" "),t.product.freeItems?e("ul",{staticClass:"product-info"},t._l(t.product.freeItems,function(a){return e("li",{key:a._id},[e("strong",[t._v(t._s(a.title)+":")]),t._v(" "+t._s(a.value)+"\n        ")])})):t._e()]),t._v(" "),t.product.description?e("div",{staticClass:"col-md-12"},[e("h3",{staticClass:"my-3"},[t._v(" Mô tả sản phẩm")]),t._v(" "),e("p",[t._v(t._s(t.product.description))])]):t._e()]),t._v(" "),t.otherImage?e("h3",{staticClass:"my-4"},[t._v("Hình ảnh khác")]):t._e(),t._v(" "),e("div",{staticClass:"row"},t._l(t.otherImage,function(t,a){return e("div",{key:a,staticClass:"col-md-3 col-sm-6 mb-4"},[e("img",{staticClass:"img-fluid",attrs:{src:t,alt:""}})])})),t._v(" "),e("contact-floating",{attrs:{display:!0}})],1):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},"1lyH":function(t,a,e){"use strict";a.a={cutCharacter:function(t,a){return t.length>a?t.slice(0,a)+"...":t},calculatePrice:function(t){return t=parseInt(t),!t||isNaN(t)?"Liên hệ":t.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g,"$1,")+"₫"},getProductImage:function(t,a){if(a&&t&&t.image)return t.image[0].pathImage;var e=t.image;if(e&&e.length>0)for(var s=0;s<e.length;s++)if(e[s].defaultImage)return e[s].pathImage;return"/static/img/no-image.jpg"}}},"1zCr":function(t,a,e){"use strict";var s=e("1lyH");a.a={name:"ProductCarousel",data:function(){return{}},props:["products","additionClass","isHeaderBar"],components:{},methods:{createProduct:function(){for(var t=[],a=0;a<this.products.length;a++){var e=this.products[a];t.push({_id:e._id,image:this.getProductImage(e,this.isHeaderBar),title:e.title||"",price:e.price,priceSale:e.priceSale})}return t},getProductImage:function(t,a){return s.a.getProductImage(t,a)},calculatePrice:function(t){return s.a.calculatePrice(t)},cutCharacter:function(t){return s.a.cutCharacter(t,100)}},created:function(){},computed:{productSlide:function(){return this.createProduct()},newClass:function(){return this.additionClass?this.additionClass:"img-default"}}}},"2Ct4":function(t,a){},"2PLm":function(t,a){},"3KQM":function(t,a,e){"use strict";function s(t){e("WiOo")}var r=e("6qlc"),n=e("4Bkj"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-11ff9216",null);a.a=o.exports},"42Hy":function(t,a,e){"use strict";function s(t){e("ynLJ")}var r=e("DK6z"),n=e("zTTA"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-44b1c0ea",null);a.a=o.exports},"4Bkj":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{attrs:{id:"services"}},[t._m(0),t._v(" "),t.categories&&t.categories.length>0?e("div",{staticClass:"container"},[e("div",{staticClass:"row"},t._l(t.categories,function(a){return e("div",{key:a._id,staticClass:"col-lg-4 col-md-4 text-center"},[e("div",{staticClass:"service-box"},[e("img",{staticClass:"img-circle img-responsive",attrs:{src:"/images/"+a.imagePath,alt:a.imagePath}}),t._v(" "),e("h3",[t._v(t._s(a.title))]),t._v(" "),e("p",{staticClass:"text-muted description"},[t._v(t._s(t.cutCharacter(a.description)))]),t._v(" "),e("router-link",{staticClass:"category-details",attrs:{to:{path:"products/"+a.name}}},[t._v("Chi tiết >>")])],1)])}))]):t._e()])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12 text-center"},[e("h2",{staticClass:"section-heading"},[t._v("Dịch vụ của chúng tôi")]),t._v(" "),e("hr",{staticClass:"primary"})])])])}],n={render:s,staticRenderFns:r};a.a=n},"4lvo":function(t,a){},"60gS":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement;return(t._self._c||a)("span",{class:t.badgeClass},[t._v(t._s(t.categoryLabel(t.category)))])},r=[],n={render:s,staticRenderFns:r};a.a=n},"6qlc":function(t,a,e){"use strict";var s=e("1lyH");a.a={name:"Category",data:function(){return{}},methods:{cutCharacter:function(t){return s.a.cutCharacter(t,200)}},created:function(){this.categories||this.$store.dispatch("setCategories")},computed:{categories:function(){return this.$store.state.categories}}}},"7JbU":function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"row search-area"},[e("div",{staticClass:"col-sm-7 col-md-7"}),t._v(" "),e("div",{staticClass:"col-sm-5 col-md-5"},[e("form",{staticClass:"navbar-form",attrs:{id:"search-product",role:"search",action:"",method:"POST"}},[e("div",{staticClass:"input-group"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.keySearch,expression:"keySearch"}],staticClass:"form-control",attrs:{id:"input-search",placeholder:"Tìm kiếm sản phẩm.",name:"q",autocomplete:"off"},domProps:{value:t.keySearch},on:{input:function(a){a.target.composing||(t.keySearch=a.target.value)}}}),t._v(" "),e("span",{staticClass:"glyphicon glyphicon-remove",attrs:{id:"searchClear"}}),t._v(" "),e("div",{staticClass:"input-group-btn"},[e("button",{staticClass:"btn btn-default",attrs:{id:"btn-search"},on:{click:function(a){if(a.preventDefault(),a.target!==a.currentTarget)return null;t.searchProduct(a)}}},[e("i",{staticClass:"fa fa-search"})])])])])])]),t._v(" "),e("div",{staticClass:"row"},[t.categories&&t.categories.length>0?e("div",{staticClass:"col-lg-3"},[e("h1",{staticClass:"my-4 section-heading"},[t._v("Danh mục")]),t._v(" "),e("div",{staticClass:"list-group"},t._l(t.categories,function(a){return e("router-link",{key:a._id,staticClass:"list-group-item menu-item",class:{active:t.calculateActive(a.name)},attrs:{to:{path:"/products/"+a.name}}},[e("span",[t._v(t._s(a.nameMenu))])])}))]):t._e(),t._v(" "),t.mostViewProduct.length>0||t.products.length>0?e("div",{staticClass:"col-lg-9"},[e("product-carousel",{attrs:{products:t.mostViewProduct}}),t._v(" "),e("pagination",{attrs:{totalPage:t.totalPage,page:t.page},on:{pageChanged:t.pageChanged}}),t._v(" "),e("div",{staticClass:"row"},[t._l(t.products,function(a){return e("div",{key:a._id,staticClass:"col-lg-4 col-md-6 mb-4"},[e("div",{staticClass:"card h-100"},[e("a",{attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.showImages(a)}}},[e("img",{staticClass:"card-img-top img-responsive img-product",attrs:{src:t.getProductImage(a),alt:""}})]),t._v(" "),e("div",{staticClass:"card-body"},[e("h4",{staticClass:"card-title text-center"},[e("router-link",{attrs:{to:{path:"/product/"+a._id+"/details"}}},[t._v(t._s(a.title))])],1)]),t._v(" "),e("div",{staticClass:"card-footer"},[a.price?e("s",{staticClass:"price"},[t._v(t._s(t.calculatePrice(a.price)))]):t._e(),t._v(" "),a.priceSale?e("span",{staticClass:"price-sale"},[t._v(t._s(t.calculatePrice(a.priceSale)))]):e("span",{staticClass:"price-sale"},[t._v("Liên hệ")])])])])}),t._v(" "),t.products.length<1?e("div",{staticClass:"col-sm-12 alert alert-warning not-found"},[t._v("\n          Không tồn tại sản phẩm nào\n        ")]):t._e()],2),t._v(" "),e("pagination",{attrs:{totalPage:t.totalPage,page:t.page},on:{pageChanged:t.pageChanged}})],1):t._e()]),t._v(" "),e("images",{attrs:{showImage:t.showImage,product:t.product},on:{close:function(a){t.showImage=!1}}})],1)},r=[],n={render:s,staticRenderFns:r};a.a=n},"8Rez":function(t,a){},"9bKx":function(t,a){},Aqhm:function(t,a,e){"use strict";a.a={name:"Modal",props:["classError"]}},B3Kk:function(t,a,e){"use strict";var s=e("Xxa5"),r=e.n(s),n=e("exGp"),c=e.n(n),i=e("o9nW"),o=e("1lyH");a.a={name:"Portfolio",data:function(){return{loading:!1,portfolios:[]}},methods:{getPortfolio:function(){var t=this;return c()(r.a.mark(function a(){var e;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t.$store.dispatch("isLoading",!0),a.next=4,i.a.getPortfolio();case 4:if(e=a.sent,e.data&&!1!==e.data.success){a.next=7;break}throw new Error;case 7:t.portfolios=e.data,t.$store.dispatch("isLoading",!1),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),t.$store.dispatch("handleError",!0);case 14:case"end":return a.stop()}},a,t,[[0,11]])}))()},getPortfolioImage:function(t){return o.a.getProductImage(t)},calculatePrice:function(t){return o.a.calculatePrice(t)}},created:function(){this.getPortfolio()}}},BdVs:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.loading?e("div",{attrs:{id:"loading-mask"}},[e("div",{attrs:{id:"loader"}})]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},BflL:function(t,a,e){"use strict";var s=e("/o5o"),r=e("U8tH");a.a={name:"ImagesSlider",components:{Modal:s.a,CategoryBadge:r.a},props:["showImage","product"]}},D4pf:function(t,a,e){"use strict";a.a={name:"ScrollTop",props:["display"],methods:{gotoTop:function(){document.body.scrollTop=0,document.documentElement.scrollTop=0}}}},DEtk:function(t,a,e){"use strict";a.a={name:"NavBar"}},DK6z:function(t,a,e){"use strict";var s=e("p7/k"),r=e("3KQM"),n=e("yRJc"),c=e("FnhZ");a.a={name:"Index",components:{HeaderBar:s.a,Category:r.a,Portfolio:n.a,Contact:c.a}}},EEcH:function(t,a,e){"use strict";function s(t){e("v992")}var r=e("D4pf"),n=e("GOiV"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-1877ff40",null);a.a=o.exports},Etft:function(t,a){},FX9o:function(t,a){},FnhZ:function(t,a,e){"use strict";function s(t){e("hsO0")}var r=e("/oiM"),n=e("X59H"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-5ed47590",null);a.a=o.exports},GOiV:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.display?e("div",[e("button",{attrs:{id:"goTop",title:"Go to top"},on:{click:function(a){t.gotoTop()}}},[e("i",{staticClass:"fa fa-2x fa-arrow-circle-up"})])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},Gh1Q:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.productSlide.length>0?e("div",{},[e("div",{staticClass:"carousel slide my-4",attrs:{id:"carouselProduct","data-ride":"carousel"}},[e("ol",{staticClass:"carousel-indicators"},t._l(t.productSlide,function(t,a){return e("li",{key:t._id,class:{active:0===a},attrs:{"data-target":"#carouselProduct","data-slide-to":a}})})),t._v(" "),e("div",{staticClass:"carousel-inner",attrs:{role:"listbox"}},t._l(t.productSlide,function(a,s){return e("div",{key:a._id,staticClass:"carousel-item",class:{active:0===s}},[e("router-link",{attrs:{to:{path:"/product/"+a._id+"/details"}}},[e("img",{staticClass:"d-block img-fluid",class:t.newClass,attrs:{src:a.image}}),t._v(" "),e("div",{staticClass:"carousel-caption d-md-block"},[e("h4",[t._v(t._s(a.title))])])])],1)}))])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},GwTs:function(t,a,e){"use strict";function s(t){e("4lvo")}var r=e("BflL"),n=e("q6Rp"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-3730e5de",null);a.a=o.exports},HK56:function(t,a,e){"use strict";function s(t){e("8Rez")}var r=e("1zCr"),n=e("Gh1Q"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-6f43d5f2",null);a.a=o.exports},HdpC:function(t,a,e){"use strict";function s(t){e("YXM1")}var r=e("rlyw"),n=e("1k1P"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-1567b62a",null);a.a=o.exports},Hmko:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"container"},[e("div",{staticClass:"row page-error text-center"},[t._m(0),t._v(" "),e("img",{attrs:{src:"/images/error-3.svg",alt:""}}),t._v(" "),e("div",{staticClass:"col-lg-12 error_bottom"},[e("h3",[e("router-link",{staticClass:"pri_btn error_login",attrs:{to:"/"}},[t._v("Thử đi tới trang chủ")])],1)])])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-lg-12 error_info"},[e("h1",[t._v("Rất tiếc, trang bạn đang tìm kiếm không tồn tại !!")])])}],n={render:s,staticRenderFns:r};a.a=n},IcnI:function(t,a,e){"use strict";var s=e("7+uW"),r=e("NYxO"),n=e("o9nW");s.a.use(r.a);a.a=new r.a.Store({strict:!1,state:{error:!1,categories:null,contact:null,loading:!1},mutations:{setCategories:function(t,a){t.categories=a},setContact:function(t,a){t.contact=a},handleError:function(t,a){t.error=a},isLoading:function(t,a){t.loading=a}},actions:{setCategories:function(t,a){var e=t.commit;e("isLoading",!0),a?e("setCategories",a):n.a.getCategory().then(function(t){if(!1===t.data.success)throw new Error;e("setCategories",t.data),e("isLoading",!1)}).catch(function(t){e("handleError",!0)})},setContact:function(t){var a=t.commit;a("isLoading",!0),n.a.getContactInfo().then(function(t){if(!1===t.data.success)throw new Error;a("setContact",t.data),a("isLoading",!1)}).catch(function(t){a("handleError",!0)})},handleError:function(t,a){(0,t.commit)("handleError",a)},isLoading:function(t,a){(0,t.commit)("isLoading",a)}}})},IxIG:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.showModal?e("modal",{attrs:{classError:"col-md-5"},on:{close:function(a){t.$emit("close")}}},[e("h3",{attrs:{slot:"header"},slot:"header"},[t._v("Đã có lỗi xảy ra")]),t._v(" "),e("p",{attrs:{slot:"body"},slot:"body"},[t._v("\n    Hệ thống đang bận.\n    "),e("br"),t._v("\n    Vui lòng quay lại sau.\n  ")])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},Ji4m:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.totalPage>1?e("div",{staticClass:"container paging"},[e("div",{staticClass:"row"},[e("ul",{staticClass:"pagination"},[t.page>1?e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.doPaging(1)}}},[t._v(" «")])]):t._e(),t._v(" "),t._l(t.totalPage,function(a){return e("li",{key:a,staticClass:"page-item",class:{active:t.page==a}},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.doPaging(a)}}},[t._v(" "+t._s(a))])])}),t._v(" "),t.page<t.totalPage?e("li",{staticClass:"page-item"},[e("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(a){a.preventDefault(),t.doPaging(t.lastPage)}}},[t._v(" »")])]):t._e()],2)])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},KXlp:function(t,a){},LUoY:function(t,a,e){"use strict";function s(t){e("9bKx")}var r=e("oYxT"),n=e("IxIG"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-0e0689f3",null);a.a=o.exports},M93x:function(t,a,e){"use strict";function s(t){e("FX9o")}var r=e("xJD8"),n=e("MTSB"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,null,null);a.a=o.exports},MTSB:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{attrs:{id:"app"}},[e("nav-bar"),t._v(" "),e("router-view"),t._v(" "),e("hr"),t._v(" "),e("footer-bar"),t._v(" "),e("loader",{attrs:{loading:t.loading}}),t._v(" "),e("modal-error",{attrs:{showModal:t.hasError},on:{close:t.closeModal}}),t._v(" "),e("scroll-top",{attrs:{display:t.displayScroll}})],1)},r=[],n={render:s,staticRenderFns:r};a.a=n},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("7+uW"),r=e("M93x"),n=e("YaEn"),c=e("IcnI");s.a.config.productionTip=!1,new s.a({el:"#app",store:c.a,router:n.a,template:"<App/>",components:{App:r.a}})},OnuA:function(t,a,e){"use strict";function s(t){e("jzWF")}var r=e("0dzx"),n=e("a8W1"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-68bc8ce0",null);a.a=o.exports},P3jc:function(t,a){},P4ji:function(t,a,e){"use strict";var s=e("mtWM"),r=e.n(s);a.a=function(){return r.a.create({baseURL:Object({NODE_ENV:"production"}).API_BASE_URL||"/api/",headers:{"Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type, X-Auth-Token, Origin, Authorization",Accept:"application/json","Content-Type":"application/json"},proxy:{host:"localhost",port:3e3}})}},SiEm:function(t,a,e){"use strict";function s(t){e("P3jc")}var r=e("VLro"),n=e("vBOm"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-3255e344",null);a.a=o.exports},U8tH:function(t,a,e){"use strict";function s(t){e("2PLm")}var r=e("qHGE"),n=e("60gS"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-341c03dd",null);a.a=o.exports},VLro:function(t,a,e){"use strict";a.a={name:"ContactFloating",props:["display"],computed:{callPhone:function(){if(this.$store.state&&this.$store.state.contact)return"tel:"+this.$store.state.contact.mobile}}}},WiOo:function(t,a){},WoGI:function(t,a,e){"use strict";a.a={}},Wx1E:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("header",{staticClass:"intro-header"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12"},[e("product-carousel",{attrs:{isHeaderBar:"true",products:t.products,additionClass:"img-header"}})],1)])])},r=[],n={render:s,staticRenderFns:r};a.a=n},X59H:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.contact?e("section",{attrs:{id:"contact"}},[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-8 mx-auto text-center"},[e("h2",{staticClass:"section-heading"},[t._v(t._s(t.contact.title))]),t._v(" "),e("hr",{staticClass:"primary"}),t._v(" "),e("p",[t._v(t._s(t.contact.caption))])])]),t._v(" "),e("div",{staticClass:"row"},[t.contact.name?e("div",{staticClass:"col-lg-2 col-md-4 ml-auto text-center"},[e("i",{staticClass:"fa fa-address-card-o fa-3x sr-contact"}),t._v(" "),e("p",[t._v(t._s(t.contact.name))])]):t._e(),t._v(" "),t.contact.phone||t.contact.mobile?e("div",{staticClass:"col-lg-3 col-md-4 text-center"},[t.contact.phone||t.contact.mobile?e("p",[t.contact.phone?e("a",{staticClass:"phone-contact",attrs:{href:t.callPhone}},[e("h4",[e("i",{staticClass:"fa fa-phone fa-1x sr-contact"}),t._v("\n              "+t._s(t.contact.phone)+"\n            ")])]):t._e(),t._v(" "),t.contact.mobile?e("a",{staticClass:"phone-contact",attrs:{href:t.callMobile}},[e("h4",[e("i",{staticClass:"fa fa-mobile fa-1x sr-contact"}),t._v("\n              "+t._s(t.contact.mobile)+"\n            ")])]):t._e()]):t._e()]):t._e(),t._v(" "),t.contact.email?e("div",{staticClass:"col-lg-2 col-md-4 mr-auto text-center"},[e("i",{staticClass:"fa fa-envelope-o fa-3x sr-contact"}),t._v(" "),e("p",[e("a",{attrs:{href:{path:"mailto:"+t.contact.email}}},[t._v(t._s(t.contact.email))])])]):t._e()])])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},YXM1:function(t,a){},YaEn:function(t,a,e){"use strict";var s=e("7+uW"),r=e("/ocq"),n=e("42Hy"),c=e("mBSZ"),i=e("HdpC"),o=e("YcJa");s.a.use(r.a),a.a=new r.a({mode:"history",routes:[{path:"/",name:"Index",component:n.a},{path:"/products",name:"Products",component:c.a},{path:"/products/:category",name:"ProductsCategory",component:c.a},{path:"/product/:productId/details",name:"ProductDetails",component:i.a},{path:"*",component:o.a}]})},YcJa:function(t,a,e){"use strict";var s=e("WoGI"),r=e("Hmko"),n=e("VU/8"),c=n(s.a,r.a,!1,null,null,null);a.a=c.exports},a8W1:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("footer",[e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-8 col-md-10 mx-auto text-center"},[e("a",{attrs:{href:t.facebookLink,target:"_blank"}},[t._m(0),t._v("\n          Lâm Trang petstore\n        ")]),t._v(" "),e("p",{staticClass:"copyright text-muted"},[t._v("Copyright © 2017")])])])])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("span",{staticClass:"fa-stack fa-lg"},[e("i",{staticClass:"fa fa-circle fa-stack-2x"}),t._v(" "),e("i",{staticClass:"fa fa-facebook fa-stack-1x fa-inverse"})])}],n={render:s,staticRenderFns:r};a.a=n},cMGX:function(t,a,e){"use strict";function s(t){e("ncus")}var r=e("xJvq"),n=e("Ji4m"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-7a30feb2",null);a.a=o.exports},cpJt:function(t,a){},d9Kf:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-light bg-faded",attrs:{id:"mainNav"}},[e("div",{staticClass:"container"},[t._m(0),t._v(" "),e("router-link",{staticClass:"navbar-brand js-scroll-trigger",attrs:{to:"/"}},[t._v("Lâm Trang")]),t._v(" "),e("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarResponsive"}},[e("ul",{staticClass:"navbar-nav ml-auto"},[e("li",{staticClass:"nav-item"},[e("router-link",{staticClass:"nav-link js-scroll-trigger",attrs:{"data-toggle":"collapse","data-target":".navbar-collapse.show",to:"/products"}},[t._v("Sản phẩm")])],1),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3)])])],1)])])},r=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"navbar-toggler navbar-toggler-right",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarResponsive","aria-controls":"navbarResponsive","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link js-scroll-trigger",attrs:{href:"/#services"}},[t._v("Dịch vụ")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link js-scroll-trigger",attrs:{href:"/#portfolio"}},[t._v("Gallery")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("li",{staticClass:"nav-item"},[e("a",{staticClass:"nav-link js-scroll-trigger",attrs:{href:"/#contact"}},[t._v("Liên hệ")])])}],n={render:s,staticRenderFns:r};a.a=n},"g2+m":function(t,a,e){"use strict";function s(t){e("/uSJ")}var r=e("DEtk"),n=e("d9Kf"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-7e351008",null);a.a=o.exports},hsO0:function(t,a){},j5Ze:function(t,a,e){"use strict";var s=e("Xxa5"),r=e.n(s),n=e("exGp"),c=e.n(n),i=e("o9nW"),o=e("1lyH"),l=e("GwTs"),u=e("HK56"),d=e("cMGX");a.a={name:"Products",data:function(){return{products:[],product:{},images:[],showImage:!1,mostViewProduct:[],activeLink:"",keySearch:"",page:1,perPage:6,totalPage:1}},components:{Images:l.a,ProductCarousel:u.a,Pagination:d.a},methods:{getProducts:function(t){var a=this;return c()(r.a.mark(function e(){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.$store.dispatch("isLoading",!0),e.next=4,i.a.getProducts(t);case 4:if(s=e.sent,s.data&&!1!==s.data.success){e.next=7;break}throw new Error;case 7:a.totalPage=parseInt(s.headers["xxx-total-count"]),a.products=s.data,a.$store.dispatch("isLoading",!1),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),a.$store.dispatch("handleError",!0);case 15:case"end":return e.stop()}},e,a,[[0,12]])}))()},searchProduct:function(){this.getProducts({category:this.$route.params.category,q:this.keySearch,page:this.page,perPage:this.perPage})},pageChanged:function(t){this.page=t,this.searchProduct()},getProductsMostView:function(){var t=this;return c()(r.a.mark(function a(){var e;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.prev=0,t.$store.dispatch("isLoading",!0),a.next=4,i.a.getProducts("most_view");case 4:if(e=a.sent,e.data&&!1!==e.data.success){a.next=7;break}throw new Error;case 7:t.mostViewProduct=e.data,t.$store.dispatch("isLoading",!1),a.next=14;break;case 11:a.prev=11,a.t0=a.catch(0),t.$store.dispatch("handleError",!0);case 14:case"end":return a.stop()}},a,t,[[0,11]])}))()},getProductImage:function(t){return o.a.getProductImage(t)},calculatePrice:function(t){return o.a.calculatePrice(t)},cutCharacter:function(t){return o.a.cutCharacter(t,100)},calculateActive:function(t){return t===this.activeLink},showImages:function(t){t.price=this.calculatePrice(t.price),t.priceSale=this.calculatePrice(t.priceSale),this.product=t,this.showImage=!0}},created:function(){var t=this.$route.params.category;this.activeLink=t,this.searchProduct(),this.getProductsMostView()},computed:{categories:function(){return this.$store.state.categories}},watch:{"$route.params.category":function(t){this.activeLink=t,this.keySearch="",this.getProducts(t)}}}},jzWF:function(t,a){},mBSZ:function(t,a,e){"use strict";function s(t){e("KXlp")}var r=e("j5Ze"),n=e("7JbU"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-361c037c",null);a.a=o.exports},ncus:function(t,a){},o9nW:function(t,a,e){"use strict";var s=e("pFYg"),r=e.n(s),n=e("P4ji"),c=e("o/zv");a.a={getProducts:function(t){var a="products";if("string"==typeof t)a=c.resolve(a,t);else if("object"===(void 0===t?"undefined":r()(t)))return Object(n.a)().post(a,t);return Object(n.a)().get(a)},getProduct:function(t){var a="products/product";return t&&(a=c.resolve(a,t)),Object(n.a)().get(a)},getCategory:function(t){return Object(n.a)().get("categories")},getPortfolio:function(){return Object(n.a)().get("portfolio")},getContactInfo:function(){return Object(n.a)().get("contact")},getBannerInfo:function(){return Object(n.a)().get("banner")}}},oYxT:function(t,a,e){"use strict";var s=e("/o5o");a.a={name:"ModalError",components:{Modal:s.a},props:["showModal"]}},"p7/k":function(t,a,e){"use strict";function s(t){e("xGnc")}var r=e("/TaY"),n=e("Wx1E"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-1ac30f44",null);a.a=o.exports},q6Rp:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.showImage?e("modal",{on:{close:function(a){t.$emit("close")}}},[e("h3",{attrs:{slot:"header"},slot:"header"},[t._v(t._s(t.product.title)+"\n    "),e("category-badge",{attrs:{category:t.product.category.name}})],1),t._v(" "),e("section",{staticClass:"p-0",attrs:{slot:"body",id:"portfolio"},slot:"body"},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"carousel slide",attrs:{id:"carouselImage","data-ride":"carousel"}},[e("ol",{staticClass:"carousel-indicators"},t._l(t.product.image,function(t,a){return e("li",{key:t._id,class:{active:0===a},attrs:{"data-target":"#carouselImage","data-slide-to":a}})})),t._v(" "),e("div",{staticClass:"carousel-inner",attrs:{role:"listbox"}},t._l(t.product.image,function(a,s){return e("div",{key:a._id,staticClass:"carousel-item text-center",class:{active:0===s}},[e("img",{staticClass:"d-block img-fluid img-responsive",attrs:{src:a.pathImage,alt:t.product.name}}),t._v(" "),e("div",{staticClass:"carousel-caption d-md-block"},[e("p",[t.product.price?e("s",{staticClass:"price"},[t._v(t._s(t.product.price))]):t._e(),t._v(" "),t.product.priceSale?e("span",{staticClass:"price-sale"},[t._v(t._s(t.product.priceSale))]):t._e()]),t._v(" "),e("div",[e("router-link",{staticClass:"btn btn-theme btn-sm btn-min-block btn-details",attrs:{to:{path:"/product/"+t.product._id+"/details"}}},[t._v("Chi tiết")])],1)])])})),t._v(" "),t.product.image.length>1?e("a",{staticClass:"carousel-control-prev",attrs:{href:"#carouselImage",role:"button","data-slide":"prev"}},[e("span",{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{staticClass:"sr-only"},[t._v("Previous")])]):t._e(),t._v(" "),t.product.image.length>1?e("a",{staticClass:"carousel-control-next",attrs:{href:"#carouselImage",role:"button","data-slide":"next"}},[e("span",{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),t._v(" "),e("span",{staticClass:"sr-only"},[t._v("Next")])]):t._e()])])])]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},qHGE:function(t,a,e){"use strict";a.a={name:"CategoryBadge",data:function(){return{}},props:["category"],methods:{categoryLabel:function(t){for(var a=this.$store.state.categories,e=0;e<a.length;e++)if(t===a[e].name)return a[e].nameMenu;return"pets"}},computed:{badgeClass:function(){var t="badge badge-pill badge-";switch(this.category){case"pets":t+="primary";break;case"accessory":t+="success";break;case"service":t+="info";break;default:t+="default"}return t}}}},rlyw:function(t,a,e){"use strict";var s=e("Xxa5"),r=e.n(s),n=e("exGp"),c=e.n(n),i=e("o9nW"),o=e("1lyH"),l=e("wd27"),u=e("U8tH"),d=e("SiEm");a.a={name:"ProductDetails",components:{Loader:l.a,CategoryBadge:u.a,ContactFloating:d.a},data:function(){return{product:null}},methods:{getProduct:function(t){var a=this;return c()(r.a.mark(function e(){var s;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a.$store.dispatch("isLoading",!0),e.next=4,i.a.getProduct(t);case 4:if(s=e.sent,s.data&&!1!==s.data.success){e.next=7;break}throw new Error;case 7:a.product=s.data,a.$store.dispatch("isLoading",!1),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),a.$store.dispatch("handleError",!0);case 14:case"end":return e.stop()}},e,a,[[0,11]])}))()},getProductImage:function(t){return o.a.getProductImage(t)},calculatePrice:function(t){return o.a.calculatePrice(t)},getOtherImages:function(t){var a=this.getProductImage(t),e=t.image,s=[];if(e.length>1)for(var r=0;r<e.length;r++){var n=e[r].pathImage;n!==a&&s.push(n)}return s}},created:function(){var t=this.$route.params.productId;this.getProduct(t)},computed:{otherImage:function(){return this.getOtherImages(this.product)}}}},uExR:function(t,a,e){"use strict";a.a={name:"Loader",props:["loading"]}},uYc9:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("transition",{attrs:{name:"modal"}},[e("div",{staticClass:"modal-mask"},[e("div",{staticClass:"modal-wrapper"},[e("div",{staticClass:"modal-container col-xs-12",class:[t.classError]},[e("div",{staticClass:"modal-header"},[t._t("header"),t._v(" "),e("button",{staticClass:"close",attrs:{type:"button"},on:{click:function(a){t.$emit("close")}}},[t._v("×")])],2),t._v(" "),e("div",{staticClass:"modal-body"},[t._t("body")],2),t._v(" "),e("div",{staticClass:"modal-footer"},[t._t("footer",[e("button",{staticClass:"btn btn-warning",on:{click:function(a){t.$emit("close")}}},[t._v(" OK ")])])],2)])])])])},r=[],n={render:s,staticRenderFns:r};a.a=n},v992:function(t,a){},vBOm:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return t.display?e("div",[t.callPhone?e("a",{staticClass:"btn btn-warning contact-float rounded-circle",attrs:{href:t.callPhone,"data-toggle":"tooltip",title:"Liên hệ đặt hàng"}},[e("i",{staticClass:"fa fa-phone fa-2x sr-contact"})]):t._e()]):t._e()},r=[],n={render:s,staticRenderFns:r};a.a=n},wd27:function(t,a,e){"use strict";function s(t){e("cpJt")}var r=e("uExR"),n=e("BdVs"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-394ed2ab",null);a.a=o.exports},xGnc:function(t,a){},xJD8:function(t,a,e){"use strict";var s=e("g2+m"),r=e("OnuA"),n=e("wd27"),c=e("LUoY"),i=e("EEcH");a.a={name:"app",components:{NavBar:s.a,FooterBar:r.a,Loader:n.a,ScrollTop:i.a,ModalError:c.a},data:function(){return{displayScroll:!1}},methods:{closeModal:function(){this.$store.dispatch("handleError",!1),this.$store.dispatch("isLoading",!1)},handleScroll:function(t){this.displayScroll=window.scrollY>20}},computed:{loading:function(){return this.$store.state.loading},hasError:function(){return this.$store.state.error}},created:function(){this.$store.dispatch("setCategories"),window.addEventListener("scroll",this.handleScroll)},destroyed:function(){window.removeEventListener("scroll",this.handleScroll)},mounted:function(){}}},xJvq:function(t,a,e){"use strict";a.a={name:"Pagination",props:["page","totalPage"],data:function(){return{visiblePages:5}},methods:{doPaging:function(t){this.$emit("pageChanged",t)}},computed:{paginationRange:function(){for(var t=this.page-this.visiblePages/2<=0?1:this.page+this.visiblePages/2>this.lastPage?this.totalPage-this.visiblePages+1:Math.ceil(this.page-this.visiblePages/2),a=[],e=0;e<this.visiblePages&&e<this.lastPage;e++)a.push(t+e)},lastPage:function(){return Math.floor(this.totalPage)}}}},yRJc:function(t,a,e){"use strict";function s(t){e("2Ct4")}var r=e("B3Kk"),n=e("zGRF"),c=e("VU/8"),i=s,o=c(r.a,n.a,!1,i,"data-v-195d9b40",null);a.a=o.exports},ynLJ:function(t,a){},zGRF:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("section",{staticClass:"p-0",attrs:{id:"portfolio"}},[e("div",{staticClass:"container-fluid"},[e("div",{staticClass:"row no-gutter popup-gallery"},t._l(t.portfolios,function(a,s){return e("div",{key:s,staticClass:"col-lg-4 col-md-4 col-sm-6 text-center"},[e("router-link",{staticClass:"portfolio-box",attrs:{to:{path:"/product/"+a._id+"/details"}}},[e("img",{staticClass:"img-fluid img-responsive",attrs:{src:t.getPortfolioImage(a),alt:""}}),t._v(" "),e("div",{staticClass:"portfolio-box-caption"},[e("div",{staticClass:"portfolio-box-caption-content"},[a.title?e("div",{staticClass:"project-category text-faded"},[t._v("\n                "+t._s(a.title)+"\n              ")]):t._e(),t._v(" "),a.price?e("div",{staticClass:"project-name"},[t._v("\n                "+t._s(t.calculatePrice(a.price))+"\n              ")]):t._e()])])])],1)}))])])},r=[],n={render:s,staticRenderFns:r};a.a=n},zTTA:function(t,a,e){"use strict";var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("header-bar"),t._v(" "),e("category"),t._v(" "),e("portfolio"),t._v(" "),e("contact")],1)},r=[],n={render:s,staticRenderFns:r};a.a=n}},["NHnr"]);
//# sourceMappingURL=app.24bdc0d12d0f3c0f24cb.js.map