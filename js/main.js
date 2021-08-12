"use strict";document.documentElement.style.setProperty("--vh","".concat(.01*window.innerHeight,"px"));var observer=lozad(".lozad",{rootMargin:"50% 0px"});observer.observe();var burgerBtn=document.querySelector(".burger");burgerBtn.addEventListener("click",(function(e){e.currentTarget.classList.toggle("active"),document.querySelector(".header__nav").classList.toggle("active"),document.querySelector("body").classList.toggle("lock")})),document.querySelectorAll(".nav__item").forEach((function(e){e.addEventListener("click",(function(e){burgerBtn.classList.contains("active")&&(burgerBtn.classList.remove("active"),document.querySelector(".header__nav").classList.remove("active"),document.querySelector("body").classList.remove("lock"))}))}));var cartBtn=document.querySelector(".cart__btn"),miniCart=document.querySelector(".mini-cart"),miniCartList=document.querySelector(".mini-cart__list");cartBtn.addEventListener("click",(function(){cartBtn.classList.toggle("cart__btn_clicked"),cartBtn.removeEventListener("mouseover",listener1),cartBtn.removeEventListener("mouseout",listener2),cartBtn.classList.contains("cart__btn_clicked")?miniCart.classList.add("mini-cart_visible"):(cartBtn.addEventListener("mouseover",listener1),cartBtn.addEventListener("mouseout",listener2),miniCart.classList.remove("mini-cart_visible"))}));var listener1=function(){miniCart.classList.add("mini-cart_visible")},listener2=function(){miniCart.classList.remove("mini-cart_visible")};cartBtn.addEventListener("mouseover",listener1),cartBtn.addEventListener("mouseout",listener2),document.addEventListener("click",(function(e){e.target.classList.contains("mini-product__delete")||e.target.classList.contains("mini-cart")||e.target.classList.contains("cart__btn")||e.target.closest(".mini-cart")||(cartBtn.addEventListener("mouseover",listener1),cartBtn.addEventListener("mouseout",listener2),miniCart.classList.remove("mini-cart_visible"),cartBtn.classList.remove("cart__btn_clicked"))}));var changeStateCartBtn=function(){miniCartList.children.length<=0?(cartBtn.setAttribute("disabled","disabled"),cartBtn.classList.remove("cart__btn_clicked")):cartBtn.removeAttribute("disabled")},catalogList=document.querySelector(".catalog-list"),catalogFilters=document.querySelector(".catalog-filters"),prices=[1,999999],male=!1,female=!1,sizes=[],sizesMaxCount=catalogFilters.querySelectorAll(".sizes-table__btn").length,getFilters=function(){prices=Array.from(catalogFilters.querySelectorAll(".catalog-price__input")).map((function(e){return parseInt(e.value.replace(/\s/g,""))})),male=catalogFilters.querySelector(".catalog-filters__male").checked,female=catalogFilters.querySelector(".catalog-filters__female").checked,sizes=Array.from(catalogFilters.querySelectorAll(".sizes-table__btn_active")).map((function(e){return parseInt(e.textContent)}))},resetFilters=function(){setRangeSlider(0,minPrice),setRangeSlider(1,maxPrice),catalogFilters.querySelector(".catalog-filters__male").checked=!1,catalogFilters.querySelector(".catalog-filters__female").checked=!1,catalogFilters.querySelectorAll(".sizes-table__btn_active").forEach((function(e){e.classList.remove("sizes-table__btn_active")})),prices=[1,999999],male=!1,female=!1,sizes=[]},filterProduct=function(e){var t=function(){if(!(sizes.length>0&&sizes.length<sizesMaxCount))return!0;for(var t=0;t<sizes.length;t++)for(var n=0;n<e.sizes.length;n++)if(sizes[t]===e.sizes[n])return!0};return e.price>=prices[0]&&e.price<=prices[1]&&((male&&female||!male&&!female||!!Object.keys(e.chars).some((function(t){return"Пол"===t&&!!(male&&"Мужской"===e.chars[t]||female&&"Женский"===e.chars[t])})))&&t())};catalogFilters.querySelector(".catalog__apply").addEventListener("click",(function(){lazyProds=!1,getFilters(),reloadProducts()})),catalogFilters.querySelector(".catalog__reset").addEventListener("click",(function(){lazyProds=!1,resetFilters(),reloadProducts()}));var accordions=document.querySelectorAll(".faq-accordion");function init(){fetch("data/data-map-settings.json").then((function(e){return e.json()})).then((function(e){for(var t=new ymaps.Map("map",{center:e[0].coords,zoom:document.body.clientWidth>576?e[0].zoom:e[0].zoom-1,controls:["zoomControl"],behaviors:["drag","dblClickZoom","multiTouch"]},{restrictMapArea:[[59.738,29.611],[60.056,30.829]]}),n=new Array(e.length-1),r=function(r){var a=e[r];n[r-1]=new ymaps.Placemark(a.coords,{iconCaption:a.iconCaption,balloonContent:a.balloon},"main"==a.type?{preset:"islands#redIcon"}:{}),n[r-1].events.add("click",(function(){t.getZoom()<16&&t.setZoom(16),t.setCenter(a.coords)}))},a=1;a<e.length;a++)r(a);t.geoObjects.add(new ymaps.Clusterer({}).add(n))})).then((function(){map.style.backgroundImage="none"}))}function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}accordions.forEach((function(e){e.addEventListener("click",(function(e){var t=e.currentTarget,n=t.querySelector(".faq-accordion__control"),r=t.querySelector(".faq-accordion__content");t.classList.toggle("open"),t.classList.contains("open")?(n.setAttribute("aria-expanded",!0),r.setAttribute("aria-hidden",!1),r.style.maxHeight=r.scrollHeight+"px"):(n.setAttribute("aria-expanded",!1),r.setAttribute("aria-hidden",!0),r.style.maxHeight=null)}))}));catalogList=document.querySelector(".catalog-list");var modal,loadProducts,loadMoreBtn=document.querySelector(".catalog__more"),prodModal=document.querySelector('[data-graph-target="prod-modal"] .modal-content'),cartModal=document.querySelector('[data-graph-target="cart-modal"] .modal-content'),prodModalSlider=prodModal.querySelector(".modal-slider .swiper-wrapper"),prodModalInfo=prodModal.querySelector(".modal-info__wrapper"),prodModalDescr=prodModal.querySelector(".modal-prod-descr"),prodModalChars=prodModal.querySelector(".prod-chars"),prodModalPreview=prodModal.querySelector(".modal-preview"),prodModalNote=prodModal.querySelector(".modal-note"),prodModalVideo=prodModal.querySelector(".prod-modal__video"),prodModalBtn=prodModal.querySelector(".modal-info__order"),fullPrice=document.querySelector(".mini-cart__summ"),lazyProds=!0,quantityToShow=6,prodQuantity=quantityToShow,dataLength=null,reloadProducts=function(){loadProducts(prodQuantity=quantityToShow)},resetProdModal=function(){prodModalSlider.innerHTML="",prodModalInfo.innerHTML="",prodModalDescr.textContent="",prodModalChars.innerHTML="",prodModalPreview.innerHTML="",prodModalNote.innerHTML="",prodModalVideo.innerHTML="",prodModalVideo.style.display="none",prodModalBtn.disabled="true"};if(catalogList){var areAvailable=!1,prodSlider=new Swiper(".modal-slider__container",{slidesPerView:1,spaceBetween:20});modal=new GraphModal({isOpen:function(e){if(document.body.clientWidth>768&&e.modal.querySelectorAll(".modal__close").forEach((function(e){e.setAttribute("disabled","disabled")})),e.modalContainer.classList.contains("prod-modal")){var t=e.previousActiveElement.dataset.id;t?loadModalData(t):(console.log(e),e.previousActiveElement===document.querySelector("body")&&console.log(111))}e.modalContainer.classList.contains("cart-modal")&&(e.isOpen=!0,e.focusTrap())}}),loadProducts=function(e){fetch("data/data-prods.json").then((function(e){return e.json()})).then((function(t){dataLength=t.length,catalogList.innerHTML="";var n=[].slice.call(miniCartList.children),r=function(){for(var e=[],n=0;n<dataLength;n++){var r=t[n];filterProduct(r)&&e.push(r.id)}return e}();if(!(r.length>0))return document.querySelector(".catalog__grid").style.display="none",document.querySelector(".catalog__not-found-message").style.display="inline",!1;document.querySelector(".catalog__not-found-message").style.display="none",document.querySelector(".catalog__grid").style.display="flex",e>=r.length?(e=r.length,loadMoreBtn.style.display="none"):loadMoreBtn.style.display="block";for(var a=0;a<dataLength;a++)if(a<e){var o=t[a];if(!r.includes(o.id)){e++;continue}for(var i=!1,c=0;c<n.length;c++)if(n[c].dataset.id==o.id){i=!0,n.splice(c,1);break}catalogList.innerHTML+='\n              <li class="catalog-list__item">\n                <article class="product">\n                  <div class="product__image">\n                  '.concat(lazyProds?'\n                    <img\n                     src="'.concat(o.mainImage,'"\n                     class="lozad"\n                     data-srcset="').concat(o.mainImage,' 100w"\n                     srcset="img/placeholder.svg 100w"\n                     sizes="100vw"\n                     alt="').concat(o.title,'"\n                   />\n                  '):'\n                    <img\n                      src="'.concat(o.mainImage,'"\n                      alt="').concat(o.title,'"\n                   />\n                  '),'\n                    <div class="product__btns">\n                      <button\n                        class="btn-reset product__btn product__btn_info"\n                        aria-label="Показать информацию о товаре"\n                        data-graph-path="prod-modal"\n                        data-id="').concat(o.id,'"\n                      >\n                        <svg>\n                          <use href="img/sprite.svg#eye"></use>\n                        </svg>\n                      </button>\n                      <button\n                        class="btn-reset product__btn product__btn_cart"\n                        aria-label="Добавить товар в корзину"\n                        data-id="').concat(o.id,'"\n                        ').concat(i?'disabled="disabled"':"",'\n                      >\n                      <svg>\n                        <use href="img/sprite.svg#cart"></use>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                <button href="#" class="product__title btn-reset"\n                  tabindex="-1"\n                  data-graph-path="prod-modal"\n                  data-id="').concat(o.id,'">\n                  ').concat(o.title,'\n                </button>\n                <span class="product__price">').concat(o.price.toLocaleString()," р</span>\n              </article>\n            </li>\n            "),observer.observe()}return!0})).then((function(e){var t=catalogList.querySelectorAll(".product__btn");t.forEach((function(e){e.addEventListener("focus",(function(e){e.currentTarget.closest(".product__btns").classList.add("product__btns_active")}),!0)})),t.forEach((function(e){e.addEventListener("blur",(function(e){e.currentTarget.closest(".product__btns").classList.remove("product__btns_active")}),!0)})),e&&cartLogic()}))};var loadModalData=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;fetch("data/data-prods.json").then((function(e){return e.json()})).then((function(t){resetProdModal();var n,r=_createForOfIteratorHelper(t);try{var a=function(){var t=n.value;if(t.id==e){var r,a=t.gallery.map((function(e,t){return'\n              <div class="swiper-slide" ondragstart="return false" data-index="'.concat(t,'">\n               <img src="').concat(e,'" alt="">\n              </div>\n              ')})),o=t.gallery.map((function(e,t){return'\n              <button class="btn-reset modal-preview__item\n              '.concat(0===t?"modal-preview__item_active":"",'"\n              data-index="').concat(t,'">\n                <img src="').concat(e,'" alt="">\n              </button>\n              ')})),i=t.sizes.map((function(e){return'\n              <li class="modal-sizes__item">\n               <button class="modal-sizes__btn btn-reset">'.concat(e,"</button>\n              </li>\n              ")}));t.note&&(r=t.note.map((function(e){return'\n                  <li class="modal-note__item">'.concat(e,'\n                    <svg class="modal-note__check" aria-hidden="true">\n                      <use href="img/sprite.svg#check"></use>\n                    </svg>\n                  </li>\n                ')}))),prodModalSlider.innerHTML=a.join(""),prodModalPreview.innerHTML=o.join(""),areAvailable=0!=t.quantity,prodModalInfo.innerHTML='\n              <div class="modal-info__top">\n                <span class="modal-info__vendor">Артикул:\n                  '.concat(t.vendor,'</span>\n                <div class="modal-info__quantity">\n                  ').concat(areAvailable?"В наличии: <span>".concat(t.quantity," шт</span>"):"Нет в наличии",'\n               </div>\n              </div>\n              <h3 class="modal-info__title">\n                ').concat(t.title,'\n              </h3>\n              <div class="modal-info__rating">\n                <svg aria-label="Рейтинг 5 из 5">\n                 <use href="img/sprite.svg#star"></use>\n                </svg>\n                <svg>\n                  <use href="img/sprite.svg#star"></use>\n                </svg>\n                <svg>\n                 <use href="img/sprite.svg#star"></use>\n                </svg>\n                <svg>\n                  <use href="img/sprite.svg#star"></use>\n                </svg>\n                <svg>\n                  <use href="img/sprite.svg#star"></use>\n                </svg>\n              </div>\n              <div class="modal-info__sizes">\n                <span class="modal-info__subtitle">Выберите размер</span>\n                <ul class="list-reset modal-info__sizes-list modal-sizes">\n                 ').concat(i.join(""),'\n                </ul>\n              </div>\n              <div class="modal-info__price">\n                <span class="modal-info__current-price">').concat(t.price.toLocaleString(),' р</span>\n                <span class="modal-info__old-price">\n                  ').concat(t.oldPrice?t.oldPrice.toLocaleString()+" р":"","\n                </span>\n              </div>\n            "),areAvailable?prodModalBtn.removeAttribute("disabled"):prodModalBtn.setAttribute("disabled","disabled"),prodModalNote.innerHTML="".concat(r?r.join(""):""),prodModalDescr.textContent="".concat(t.description);var c="";return Object.keys(t.chars).forEach((function(e){c+='<p class="prod-bottom__descr modal-prod-descr">'.concat(e,": ").concat(t.chars[e],"</p>")})),prodModalChars.innerHTML=c,t.video?(prodModalVideo.style.display="block",prodModalVideo.innerHTML='\n              <iframe\n              src="'.concat(t.video,'"\n              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"\n              allowfullscreen></iframe>\n            ')):prodModalVideo.style.display="none","break"}};for(r.s();!(n=r.n()).done;){if("break"===a())break}}catch(e){r.e(e)}finally{r.f()}})).then((function(){modal.focusTrap(),prodModal.querySelectorAll(".modal-sizes__btn").forEach((function(e){e.addEventListener("click",(function(e){e.target.classList.contains("modal-sizes__btn_active")?e.target.classList.remove("modal-sizes__btn_active"):(prodModal.querySelectorAll(".modal-sizes__btn_active").forEach((function(e){e.classList.remove("modal-sizes__btn_active")})),e.target.classList.add("modal-sizes__btn_active"))}))})),prodModal.querySelectorAll(".swiper-slide").forEach((function(e){e.addEventListener("click",(function(e){window.open(e.target.src)}))})),prodSlider.setProgress(0),prodSlider.on("slideChangeTransitionStart",(function(){var e=prodModal.querySelector(".swiper-slide-active").dataset.index;prodModal.querySelectorAll(".modal-preview__item").forEach((function(e){e.classList.remove("modal-preview__item_active")})),prodModal.querySelector('.modal-preview__item[data-index="'.concat(e,'"]')).classList.add("modal-preview__item_active")})),prodModal.querySelectorAll(".modal-preview__item").forEach((function(e){e.addEventListener("click",(function(e){var t=parseInt(e.currentTarget.dataset.index);prodModal.querySelectorAll(".modal-preview__item").forEach((function(e){e.classList.remove("modal-preview__item_active")})),e.currentTarget.classList.add("modal-preview__item_active"),prodSlider.slideTo(t)}))})),prodSlider.update()}))};loadMoreBtn.addEventListener("click",(function(){lazyProds=!1,(prodQuantity+=prodQuantity)>=dataLength?(prodQuantity=dataLength,loadMoreBtn.style.display="none"):loadMoreBtn.style.display="block",loadProducts(prodQuantity)}));var totalPrice=0,plusTotalPrice=function(e){totalPrice+=e},minusTotalPrice=function(e){totalPrice-=e},printTotalPrice=function(){fullPrice.textContent="".concat(totalPrice.toLocaleString()," р")},printQuantity=function(e){if(!(e>0))return cartCount.classList.remove("cart__count_visible"),void(cartCount.textContent="");cartCount.classList.add("cart__count_visible"),cartCount.textContent=e},cartCount=document.querySelector(".cart__count"),loadCartData=(miniCartList=document.querySelector(".mini-cart__list"),function(e){fetch("data/data-prods.json").then((function(e){return e.json()})).then((function(t){var n,r=_createForOfIteratorHelper(t);try{for(r.s();!(n=r.n()).done;){var a=n.value;if(a.id==e)return miniCartList.insertAdjacentHTML("afterbegin",'\n            <li class="mini-cart__item" data-id="'.concat(a.id,'">\n              <article class="mini-cart__product mini-product">\n                <button tabindex="-1" class="mini-product__image btn-reset" data-graph-path="prod-modal" data-id="').concat(a.id,'">\n                  <img src="').concat(a.mainImage,'" alt="').concat(a.title,'">\n                </button>\n                <div class="mini-product__content">\n                  <div class="mini-product__text">\n                    <button class="mini-product__title btn-reset" data-graph-path="prod-modal" data-id="').concat(a.id,'">').concat(a.title,'</button>\n                    <span class="mini-product__price">').concat(a.price.toLocaleString(),' р</span>\n                  </div>\n                  <button class="mini-product__delete btn-reset" aria-label="Удалить товар">Удалить\n                    <svg>\n                      <use href="img/sprite.svg#trash"></use>\n                    </svg>\n                  </button>\n                </div>\n              </article>\n            </li>\n          ')),a.price}}catch(e){r.e(e)}finally{r.f()}})).then((function(e){updateStorage(),plusTotalPrice(e),printTotalPrice(),changeStateCartBtn(),printQuantity(miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length)}))}),initialState=function(){null!=localStorage.getItem("productsIds")&&JSON.parse(localStorage.getItem("productsIds")).reverse().forEach((function(e){loadCartData(e)}))};initialState();var updateStorage=function(){var e=[];miniCartList.querySelectorAll(".mini-cart__item").forEach((function(t){e.push(t.dataset.id)})),e.length>0?localStorage.setItem("productsIds",JSON.stringify(e)):localStorage.removeItem("productsIds")},cartLogic=function(){document.querySelectorAll(".product__btn_cart").forEach((function(e){e.addEventListener("click",(function(e){var t=e.currentTarget.dataset.id;loadCartData(t),e.currentTarget.setAttribute("disabled","disabled")}))}))};miniCartList.addEventListener("click",(function(e){if(e.target.classList.contains("mini-product__delete")){var t=e.target.closest(".mini-cart__item"),n=parseInt(t.querySelector(".mini-product__price").textContent.replace(/\s/g,"")),r=t.dataset.id,a=catalogList.querySelector('.product__btn_cart[data-id="'.concat(r,'"]'));a&&a.removeAttribute("disabled"),minusTotalPrice(n),printTotalPrice(),t.remove();var o=miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length;changeStateCartBtn(),printQuantity(o),o<=0&&miniCart.classList.remove("mini-cart_visible"),updateStorage()}}));var openModalOrder=miniCart.querySelector(".mini-cart__btn"),cartOrder=document.querySelector(".cart-order"),cartOrderList=cartOrder.querySelector(".cart-order__list"),cartOrderShow=cartOrder.querySelector(".cart-order__show");openModalOrder.addEventListener("click",(function(){var e=miniCartList.innerHTML,t=cartOrder.querySelector(".cart-order__quantity span"),n=cartOrder.querySelector(".cart-order__summ span");cartOrderList.innerHTML=e,t.textContent="".concat(miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length," шт"),n.textContent=fullPrice.textContent})),cartOrderShow.addEventListener("click",(function(){cartOrderList.classList.toggle("cart-order__list_visible"),cartOrderShow.classList.toggle("cart-order__show_active")})),cartOrderList.addEventListener("click",(function(e){if(e.target.classList.contains("mini-product__delete")){var t=e.target.closest(".mini-cart__item"),n=parseInt(t.querySelector(".mini-product__price").textContent.replace(/\s/g,"")),r=t.dataset.id;catalogList.querySelector('.product__btn_cart[data-id="'.concat(r,'"]')).removeAttribute("disabled"),minusTotalPrice(n),printTotalPrice(),cartOrder.querySelector(".cart-order__summ span").textContent=fullPrice.textContent,t.remove(),miniCartList.querySelector('.mini-cart__item[data-id="'.concat(t.dataset.id,'"]')).remove();var a=miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length;changeStateCartBtn(),printQuantity(a),cartOrder.querySelector(".cart-order__quantity span").textContent="".concat(cartCount.textContent," шт"),a<=0&&(miniCart.classList.remove("mini-cart_visible"),modal.close()),updateStorage()}}))}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var lazyQuiz=!0,quizData=[{number:1,title:"Какой тип кроссовок рассматриваете?",answer_alias:"type",answers:[{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"},{answer_title:"кеды",type:"checkbox"}]},{number:2,title:"Какой размер вам подойдет?",answer_alias:"size",answers:[{answer_title:"менее 36",type:"checkbox"},{answer_title:"36-38",type:"checkbox"},{answer_title:"39-41",type:"checkbox"},{answer_title:"42-44",type:"checkbox"},{answer_title:"45 и больше",type:"checkbox"}]},{number:3,title:"Уточните какие-либо моменты (необязательно)",answer_alias:"message",answers:[{answer_title:"Введите сообщение",type:"textarea"}]}],quizTemplate=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2?arguments[2]:void 0,r=e.number,a=e.title,o=n.nextBtnText,i=e.answers.map((function(t){return"checkbox"===t.type?'\n      <li class="quiz-question__item">\n        <label class="custom-checkbox quiz-question__label">\n          <div class="quiz-question__image">\n          '.concat(lazyQuiz?'\n            <img\n              src="img/sneaker.jpg"\n              class="lozad"\n              data-srcset="img/sneaker.jpg 100w"\n              srcset="img/placeholder.svg 100w"\n              sizes="100vw"\n              alt="'.concat(t.title,'"\n            />\n          '):'\n            <img\n              src="img/sneaker.jpg"\n              alt="'.concat(t.title,'"\n            />\n          '),'\n          </div>\n          <input type="').concat(t.type,'"\n            class="custom-checkbox__field quiz-question__answer"\n            data-valid="false"\n            name="').concat(e.answer_alias,'"\n            ').concat("text"==t.type?'placeholder="Введите ваш вариант"':"",'\n            value="').concat("text"!==t.type?t.answer_title:"",'">\n          <span class="custom-checkbox__content">').concat(t.answer_title,"</span>\n        </label>\n      </li>"):"textarea"===t.type?'\n      <li class="quiz-question__item">\n        <label class="quiz-question__label">\n          <textarea class="quiz-question__message" placeholder="'.concat(t.answer_title,'"></textarea>\n        </label>\n      </li>'):'\n    <li class="quiz-question__item">\n      <label class="quiz-question__label">\n        <input type="'.concat(t.type,'"\n          data-valid="false"\n          class="quiz-question__answer"\n          name="').concat(e.answer_alias,'"\n          ').concat("text"==t.type?'placeholder="Введите ваш вариант"':"",'\n          value="').concat("text"!==t.type?t.answer_title:"",'">\n        <span>').concat(t.answer_title,"</span>\n      </label>\n    </li>")}));return'\n    <h3 class="quiz-question__title">'.concat(a,'</h3>\n    <ul class="quiz-question__answers list-reset">\n      ').concat(i.join(""),'\n    </ul>\n    <div class="quiz-bottom">\n      <div class="quiz-question__count">').concat(r," из ").concat(t,'</div>\n      <button type="button" class="btn btn-reset btn_thirdly quiz-question__btn" data-next-btn>').concat(o,"</button>\n    </div>\n\t")},Quiz=function(){function e(t,n,r){_classCallCheck(this,e),this.$el=document.querySelector(t),this.options=r,this.data=n,this.counter=0,this.dataLength=this.data.length,this.resultArray=[],this.tmp={},this.init(),this.events()}return _createClass(e,[{key:"init",value:function(){this.$el.innerHTML=quizTemplate(this.data[this.counter],this.dataLength,this.options),lazyQuiz&&observer.observe()}},{key:"nextQuestion",value:function(){if(this.valid())if(this.counter+1<this.dataLength)this.counter++,this.$el.innerHTML=quizTemplate(this.data[this.counter],this.dataLength,this.options),lazyQuiz&&observer.observe(),this.counter+1==this.dataLength&&(document.querySelector(".quiz-question__answers").style.display="block");else{document.querySelector(".quiz-questions").style.display="none";var e=document.querySelector(".last-question");e.innerHTML='\n          <div class="last-question__form">\n            <h3 class="last-question__title">Получить предложение</h3>\n            <p class="last-question__descr">\n              Получите подборку подходящих для вас моделей на почту\n            </p>\n            <input\n              type="text"\n              class="input last-question__input"\n              placeholder="Ваше имя"\n            />\n            <input\n              type="email"\n              class="input last-question__input"\n              placeholder="E-mail"\n            />\n            <button class="btn btn_primary btn-reset last-question__btn">\n              Получить\n            </button>\n            '.concat(lazyQuiz?'\n              <div class="last-question__decorate lozad" data-background-image="img/iphone.png" style="background-image: url(img/placeholder.svg)"></div>\n            ':'\n              <div class="last-question__decorate" style="background-image: url(img/iphone.png)"></div>\n            ',"\n          </div>\n        "),e.style.display="block",document.querySelector(".quiz__title").textContent="Ваша подборка готова!",document.querySelector(".quiz__descr").textContent="Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог"}}},{key:"events",value:function(){var e=this;this.$el.addEventListener("click",(function(t){t.target==document.querySelector("[data-next-btn]")&&(lazyQuiz=!1,e.addToSend(),e.nextQuestion()),t.target==document.querySelector("[data-send]")&&e.send()})),this.$el.addEventListener("change",(function(t){if("INPUT"==t.target.tagName){if("checkbox"!==t.target.type&&"radio"!==t.target.type)e.$el.querySelectorAll("input").forEach((function(e){e.checked=!1}));e.tmp=e.serialize(e.$el)}}))}},{key:"valid",value:function(){if(this.$el.querySelector("textarea"))return!0;var e=!1;return this.$el.querySelectorAll("input").forEach((function(t){switch(t.nodeName){case"INPUT":switch(t.type){case"text":e=!0,t.value?e=!0:t.classList.add("error");case"checkbox":t.checked?e=!0:t.classList.add("error");case"radio":t.checked?e=!0:t.classList.add("error")}}})),e}},{key:"addToSend",value:function(){this.resultArray.push(this.tmp)}},{key:"send",value:function(){if(this.valid()){var e,t=new FormData,n=_createForOfIteratorHelper(this.resultArray);try{for(n.s();!(e=n.n()).done;){var r=e.value;for(var a in r)t.append(a,r[a].substring(0,r[a].length-1))}}catch(e){n.e(e)}finally{n.f()}fetch("mail.php",{method:"POST",body:t})}}},{key:"serialize",value:function(e){var t,n={},r="";if("object"==_typeof(e)&&"FORM"==e.nodeName)for(var a=e.elements.length,o=0;o<a;o++)if((t=e.elements[o]).name&&!t.disabled&&"file"!=t.type&&"reset"!=t.type&&"submit"!=t.type&&"button"!=t.type)if("select-multiple"==t.type)for(j=e.elements[o].options.length-1;j>=0;j--)t.options[j].selected&&(n[n.length]=encodeURIComponent(t.name)+"="+encodeURIComponent(t.options[j].value));else("checkbox"!=t.type&&"radio"!=t.type&&t.value||t.checked)&&(r+=t.value+",",n[t.name]=r);return n}}]),e}();window.quiz=new Quiz(".quiz-form .quiz-questions",quizData,{nextBtnText:"Следующий шаг",sendBtnText:"Отправить"});var rangeSlider=document.getElementById("range-slider"),minPrice=99999,maxPrice=1;if(rangeSlider){var setRange=function(){fetch("data/data-prods.json").then((function(e){return e.json()})).then((function(e){for(var t=e.length,n=0;n<t;n++){var r=e[n];r.price>maxPrice?maxPrice=r.price:r.price<minPrice&&(minPrice=r.price)}rangeSlider.noUiSlider.updateOptions({range:{min:minPrice,max:maxPrice}}),rangeSlider.noUiSlider.set([minPrice,maxPrice]),getFilters(),reloadProducts()}))};noUiSlider.create(rangeSlider,{start:[minPrice,minPrice],connect:!0,step:1,range:{min:minPrice,max:maxPrice}}),setRange();var input0=document.getElementById("input-0"),input1=document.getElementById("input-1"),inputs=[input0,input1];rangeSlider.noUiSlider.on("update",(function(e,t){inputs[t].value=Math.round(e[t]).toLocaleString()}));var setRangeSlider=function(e,t){var n=[null,null];n[e]=t,rangeSlider.noUiSlider.set(n)};inputs.forEach((function(e,t){e.addEventListener("change",(function(e){setRangeSlider(t,e.currentTarget.value)}))}))}var sizesBtnsNodeList=document.querySelectorAll(".sizes-table__btn");if(0!=sizesBtnsNodeList.length){var sizesBtns=Array.prototype.slice.call(sizesBtnsNodeList);sizesBtns.forEach((function(e){e.addEventListener("click",(function(e){e.currentTarget.classList.toggle("sizes-table__btn_active")}))}))}document.querySelectorAll('input[type="tel"]').forEach((function(e){new Inputmask("+7 (999) 999-9999").mask(e)}));var productsFormData=null,validateForms=function(e,t,n,r,a,o){new window.JustValidate(e,{rules:t,messages:n,colorWrong:r,submitHandler:function(e){if(e.classList.contains("cart-modal__form")){productsFormData=new FormData(e),document.querySelectorAll(".cart-order__list .mini-cart__item").forEach((function(e,t){var n=document.querySelector(".mini-product__title").textContent,r=document.querySelector(".mini-product__price").textContent;productsFormData.append("product-".concat(t+1),"".concat(n,", ").concat(r))})),productsFormData.append("summ","".concat(document.querySelector(".cart-order__summ span").textContent));var t=new XMLHttpRequest;t.onreadystatechange=function(){4===t.readyState&&200===t.status&&console.log("Отправлено")},t.open("POST","../mail.php",!0),t.send(productsFormData),e.reset()}else{var n=new FormData(e),r=new XMLHttpRequest;r.onreadystatechange=function(){4===r.readyState&&200===r.status&&console.log("Отправлено")},r.open("POST","../mail.php",!0),r.send(n),e.reset()}}})};validateForms(".callback-form",{name:{required:!0},phone:{required:!0}},{name:{required:"Вы должны ввести имя"},phone:{required:"Вы должны ввести телефон"}},getComputedStyle(document.documentElement).getPropertyValue("--color-accent"),".thanks-popup"),validateForms(".cart-modal__form",{name:{required:!0},phone:{required:!0},email:{required:!0,email:!0}},{name:{required:"Вы должны ввести имя"},phone:{required:"Вы должны ввести телефон"},email:{required:"Вы должны ввести email",email:"Вы должны ввести корректный email"}},getComputedStyle(document.documentElement).getPropertyValue("--color-accent"),".thanks-popup");