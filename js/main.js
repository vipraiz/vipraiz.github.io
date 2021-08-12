"use strict";

document.documentElement.style.setProperty("--vh", "".concat(window.innerHeight * 0.01, "px"));
var observer = lozad(".lozad", {
  rootMargin: "50% 0px"
});
observer.observe();
"use strict";

var burgerBtn = document.querySelector(".burger");
burgerBtn.addEventListener("click", function (e) {
  e.currentTarget.classList.toggle("active");
  document.querySelector(".header__nav").classList.toggle("active");
  document.querySelector("body").classList.toggle("lock");
});
document.querySelectorAll(".nav__item").forEach(function (el) {
  el.addEventListener("click", function (e) {
    if (burgerBtn.classList.contains("active")) {
      burgerBtn.classList.remove("active");
      document.querySelector(".header__nav").classList.remove("active");
      document.querySelector("body").classList.remove("lock");
    }
  });
});
"use strict";

var cartBtn = document.querySelector(".cart__btn");
var miniCart = document.querySelector(".mini-cart");
var miniCartList = document.querySelector(".mini-cart__list");
cartBtn.addEventListener("click", function () {
  cartBtn.classList.toggle("cart__btn_clicked");
  cartBtn.removeEventListener("mouseover", listener1);
  cartBtn.removeEventListener("mouseout", listener2);

  if (cartBtn.classList.contains("cart__btn_clicked")) {
    miniCart.classList.add("mini-cart_visible");
  } else {
    cartBtn.addEventListener("mouseover", listener1);
    cartBtn.addEventListener("mouseout", listener2);
    miniCart.classList.remove("mini-cart_visible");
  }
});

var listener1 = function listener1() {
  miniCart.classList.add("mini-cart_visible");
};

var listener2 = function listener2() {
  miniCart.classList.remove("mini-cart_visible");
};

cartBtn.addEventListener("mouseover", listener1);
cartBtn.addEventListener("mouseout", listener2);
document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("mini-product__delete")) {
    if (!e.target.classList.contains("mini-cart") && !e.target.classList.contains("cart__btn") && !e.target.closest(".mini-cart")) {
      cartBtn.addEventListener("mouseover", listener1);
      cartBtn.addEventListener("mouseout", listener2);
      miniCart.classList.remove("mini-cart_visible");
      cartBtn.classList.remove("cart__btn_clicked");
    }
  }
});

var changeStateCartBtn = function changeStateCartBtn() {
  if (miniCartList.children.length <= 0) {
    cartBtn.setAttribute("disabled", "disabled");
    cartBtn.classList.remove("cart__btn_clicked");
  } else {
    cartBtn.removeAttribute("disabled");
  }
};
"use strict";

var catalogList = document.querySelector(".catalog-list");
var catalogFilters = document.querySelector(".catalog-filters");
var prices = [1, 999999];
var male = false;
var female = false;
var sizes = [];
var sizesMaxCount = catalogFilters.querySelectorAll(".sizes-table__btn").length;

var getFilters = function getFilters() {
  prices = Array.from(catalogFilters.querySelectorAll(".catalog-price__input")).map(function (el) {
    return parseInt(el.value.replace(/\s/g, ""));
  });
  male = catalogFilters.querySelector(".catalog-filters__male").checked;
  female = catalogFilters.querySelector(".catalog-filters__female").checked;
  sizes = Array.from(catalogFilters.querySelectorAll(".sizes-table__btn_active")).map(function (el) {
    return parseInt(el.textContent);
  });
};

var resetFilters = function resetFilters() {
  setRangeSlider(0, minPrice);
  setRangeSlider(1, maxPrice);
  catalogFilters.querySelector(".catalog-filters__male").checked = false;
  catalogFilters.querySelector(".catalog-filters__female").checked = false;
  catalogFilters.querySelectorAll(".sizes-table__btn_active").forEach(function (el) {
    el.classList.remove("sizes-table__btn_active");
  });
  prices = [1, 999999];
  male = false;
  female = false;
  sizes = [];
};

var filterProduct = function filterProduct(item) {
  var checkSizes = function checkSizes() {
    if (sizes.length > 0 && sizes.length < sizesMaxCount) {
      for (var i = 0; i < sizes.length; i++) {
        for (var j = 0; j < item.sizes.length; j++) {
          if (sizes[i] === item.sizes[j]) {
            return true;
          }
        }
      }
    } else {
      return true;
    }
  };

  if (item.price >= prices[0] && item.price <= prices[1]) {
    if (male && female || !male && !female) {
      return checkSizes();
    } else {
      if (Object.keys(item.chars).some(function (key) {
        if (key === "Пол") {
          if (male && item.chars[key] === "Мужской" || female && item.chars[key] === "Женский") {
            return true;
          }

          return false;
        }

        return false;
      })) {
        return checkSizes();
      }

      return false;
    }
  }

  return false;
};

catalogFilters.querySelector(".catalog__apply").addEventListener("click", function () {
  lazyProds = false;
  getFilters();
  reloadProducts();
});
catalogFilters.querySelector(".catalog__reset").addEventListener("click", function () {
  lazyProds = false;
  resetFilters();
  reloadProducts();
});
"use strict";

var accordions = document.querySelectorAll(".faq-accordion");
accordions.forEach(function (el) {
  el.addEventListener("click", function (e) {
    var self = e.currentTarget;
    var control = self.querySelector(".faq-accordion__control");
    var content = self.querySelector(".faq-accordion__content");
    self.classList.toggle("open");

    if (self.classList.contains("open")) {
      control.setAttribute("aria-expanded", true);
      content.setAttribute("aria-hidden", false);
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      control.setAttribute("aria-expanded", false);
      content.setAttribute("aria-hidden", true);
      content.style.maxHeight = null;
    }
  });
});
"use strict";

// ymaps.ready(init);
function init() {
  fetch("data/data-map-settings.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    var map = new ymaps.Map("map", {
      center: data[0].coords,
      zoom: document.body.clientWidth > 576 ? data[0].zoom : data[0].zoom - 1,
      controls: ["zoomControl"],
      behaviors: ["drag", "dblClickZoom", "multiTouch"]
    }, {
      restrictMapArea: [[59.738, 29.611], [60.056, 30.829]]
    });
    var placeMarks = new Array(data.length - 1);

    var _loop = function _loop(i) {
      var dataItem = data[i];
      placeMarks[i - 1] = new ymaps.Placemark(dataItem.coords, {
        iconCaption: dataItem.iconCaption,
        balloonContent: dataItem.balloon
      }, dataItem.type == "main" ? {
        preset: "islands#redIcon"
      } : {});
      placeMarks[i - 1].events.add("click", function () {
        if (map.getZoom() < 16) {
          map.setZoom(16);
        }

        map.setCenter(dataItem.coords);
      });
    };

    for (var i = 1; i < data.length; i++) {
      _loop(i);
    }

    map.geoObjects.add(new ymaps.Clusterer({}).add(placeMarks));
  }).then(function () {
    map.style.backgroundImage = "none";
  });
}
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var catalogList = document.querySelector(".catalog-list");
var loadMoreBtn = document.querySelector(".catalog__more");
var prodModal = document.querySelector("[data-graph-target=\"prod-modal\"] .modal-content");
var cartModal = document.querySelector("[data-graph-target=\"cart-modal\"] .modal-content");
var prodModalSlider = prodModal.querySelector(".modal-slider .swiper-wrapper");
var prodModalInfo = prodModal.querySelector(".modal-info__wrapper");
var prodModalDescr = prodModal.querySelector(".modal-prod-descr");
var prodModalChars = prodModal.querySelector(".prod-chars");
var prodModalPreview = prodModal.querySelector(".modal-preview");
var prodModalNote = prodModal.querySelector(".modal-note");
var prodModalVideo = prodModal.querySelector(".prod-modal__video");
var prodModalBtn = prodModal.querySelector(".modal-info__order");
var fullPrice = document.querySelector(".mini-cart__summ");
var lazyProds = true;
var modal;
var loadProducts;
var quantityToShow = 6;
var prodQuantity = quantityToShow;
var dataLength = null;

var reloadProducts = function reloadProducts() {
  prodQuantity = quantityToShow;
  loadProducts(prodQuantity);
};

var resetProdModal = function resetProdModal() {
  prodModalSlider.innerHTML = "";
  prodModalInfo.innerHTML = "";
  prodModalDescr.textContent = "";
  prodModalChars.innerHTML = "";
  prodModalPreview.innerHTML = "";
  prodModalNote.innerHTML = "";
  prodModalVideo.innerHTML = "";
  prodModalVideo.style.display = "none";
  prodModalBtn.disabled = "true";
};

if (catalogList) {
  var areAvailable = false;
  var prodSlider = new Swiper(".modal-slider__container", {
    slidesPerView: 1,
    spaceBetween: 20
  });
  modal = new GraphModal({
    isOpen: function isOpen(modal) {
      if (document.body.clientWidth > 768) {
        modal.modal.querySelectorAll(".modal__close").forEach(function (element) {
          element.setAttribute("disabled", "disabled");
        });
      }

      if (modal.modalContainer.classList.contains("prod-modal")) {
        var openBtnId = modal.previousActiveElement.dataset.id;

        if (openBtnId) {
          loadModalData(openBtnId);
        } else {
          console.log(modal);
          if (modal.previousActiveElement === document.querySelector("body")) console.log(111);
        }
      }

      if (modal.modalContainer.classList.contains("cart-modal")) {
        modal.isOpen = true;
        modal.focusTrap();
      }
    }
  });

  loadProducts = function loadProducts(quantity) {
    fetch("data/data-prods.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      dataLength = data.length;
      catalogList.innerHTML = "";
      var listCart = [].slice.call(miniCartList.children);

      var getFirteredProdIds = function getFirteredProdIds() {
        var arr = [];

        for (var i = 0; i < dataLength; i++) {
          var item = data[i];

          if (filterProduct(item)) {
            arr.push(item.id);
          }
        }

        return arr;
      };

      var filteredProdIds = getFirteredProdIds();

      if (filteredProdIds.length > 0) {
        document.querySelector(".catalog__not-found-message").style.display = "none";
        document.querySelector(".catalog__grid").style.display = "flex";
      } else {
        document.querySelector(".catalog__grid").style.display = "none";
        document.querySelector(".catalog__not-found-message").style.display = "inline";
        return false;
      }

      if (quantity >= filteredProdIds.length) {
        quantity = filteredProdIds.length;
        loadMoreBtn.style.display = "none";
      } else {
        loadMoreBtn.style.display = "block";
      }

      for (var i = 0; i < dataLength; i++) {
        if (i < quantity) {
          var item = data[i];

          if (!filteredProdIds.includes(item.id)) {
            quantity++;
            continue;
          }

          var isInCart = false;

          for (var _i = 0; _i < listCart.length; _i++) {
            if (listCart[_i].dataset.id == item.id) {
              isInCart = true;
              listCart.splice(_i, 1);
              break;
            }
          }

          catalogList.innerHTML += "\n              <li class=\"catalog-list__item\">\n                <article class=\"product\">\n                  <div class=\"product__image\">\n                  ".concat(lazyProds ? "\n                    <img\n                     src=\"".concat(item.mainImage, "\"\n                     class=\"lozad\"\n                     data-srcset=\"").concat(item.mainImage, " 100w\"\n                     srcset=\"img/placeholder.svg 100w\"\n                     sizes=\"100vw\"\n                     alt=\"").concat(item.title, "\"\n                   />\n                  ") : "\n                    <img\n                      src=\"".concat(item.mainImage, "\"\n                      alt=\"").concat(item.title, "\"\n                   />\n                  "), "\n                    <div class=\"product__btns\">\n                      <button\n                        class=\"btn-reset product__btn product__btn_info\"\n                        aria-label=\"\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044E \u043E \u0442\u043E\u0432\u0430\u0440\u0435\"\n                        data-graph-path=\"prod-modal\"\n                        data-id=\"").concat(item.id, "\"\n                      >\n                        <svg>\n                          <use href=\"img/sprite.svg#eye\"></use>\n                        </svg>\n                      </button>\n                      <button\n                        class=\"btn-reset product__btn product__btn_cart\"\n                        aria-label=\"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443\"\n                        data-id=\"").concat(item.id, "\"\n                        ").concat(isInCart ? "disabled=\"disabled\"" : "", "\n                      >\n                      <svg>\n                        <use href=\"img/sprite.svg#cart\"></use>\n                      </svg>\n                    </button>\n                  </div>\n                </div>\n                <button href=\"#\" class=\"product__title btn-reset\"\n                  tabindex=\"-1\"\n                  data-graph-path=\"prod-modal\"\n                  data-id=\"").concat(item.id, "\">\n                  ").concat(item.title, "\n                </button>\n                <span class=\"product__price\">").concat(item.price.toLocaleString(), " \u0440</span>\n              </article>\n            </li>\n            ");
          observer.observe();
        }
      }

      return true;
    }).then(function (needCartLogic) {
      var productBtns = catalogList.querySelectorAll(".product__btn");
      productBtns.forEach(function (element) {
        element.addEventListener("focus", function (e) {
          e.currentTarget.closest(".product__btns").classList.add("product__btns_active");
        }, true);
      });
      productBtns.forEach(function (element) {
        element.addEventListener("blur", function (e) {
          e.currentTarget.closest(".product__btns").classList.remove("product__btns_active");
        }, true);
      });

      if (needCartLogic) {
        cartLogic();
      }
    });
  };

  var loadModalData = function loadModalData() {
    var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    fetch("data/data-prods.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      resetProdModal();

      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        var _loop = function _loop() {
          var dataItem = _step.value;

          if (dataItem.id == id) {
            var slides = dataItem.gallery.map(function (image, idx) {
              return "\n              <div class=\"swiper-slide\" ondragstart=\"return false\" data-index=\"".concat(idx, "\">\n               <img src=\"").concat(image, "\" alt=\"\">\n              </div>\n              ");
            });
            var preview = dataItem.gallery.map(function (image, idx) {
              return "\n              <button class=\"btn-reset modal-preview__item\n              ".concat(idx === 0 ? "modal-preview__item_active" : "", "\"\n              data-index=\"").concat(idx, "\">\n                <img src=\"").concat(image, "\" alt=\"\">\n              </button>\n              ");
            });
            var sizes = dataItem.sizes.map(function (size) {
              return "\n              <li class=\"modal-sizes__item\">\n               <button class=\"modal-sizes__btn btn-reset\">".concat(size, "</button>\n              </li>\n              ");
            });
            var note;

            if (dataItem.note) {
              note = dataItem.note.map(function (not) {
                return "\n                  <li class=\"modal-note__item\">".concat(not, "\n                    <svg class=\"modal-note__check\" aria-hidden=\"true\">\n                      <use href=\"img/sprite.svg#check\"></use>\n                    </svg>\n                  </li>\n                ");
              });
            }

            prodModalSlider.innerHTML = slides.join("");
            prodModalPreview.innerHTML = preview.join("");

            if (dataItem.quantity == 0) {
              areAvailable = false;
            } else {
              areAvailable = true;
            }

            prodModalInfo.innerHTML = "\n              <div class=\"modal-info__top\">\n                <span class=\"modal-info__vendor\">\u0410\u0440\u0442\u0438\u043A\u0443\u043B:\n                  ".concat(dataItem.vendor, "</span>\n                <div class=\"modal-info__quantity\">\n                  ").concat(areAvailable ? "\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438: <span>".concat(dataItem.quantity, " \u0448\u0442</span>") : "Нет в наличии", "\n               </div>\n              </div>\n              <h3 class=\"modal-info__title\">\n                ").concat(dataItem.title, "\n              </h3>\n              <div class=\"modal-info__rating\">\n                <svg aria-label=\"\u0420\u0435\u0439\u0442\u0438\u043D\u0433 5 \u0438\u0437 5\">\n                 <use href=\"img/sprite.svg#star\"></use>\n                </svg>\n                <svg>\n                  <use href=\"img/sprite.svg#star\"></use>\n                </svg>\n                <svg>\n                 <use href=\"img/sprite.svg#star\"></use>\n                </svg>\n                <svg>\n                  <use href=\"img/sprite.svg#star\"></use>\n                </svg>\n                <svg>\n                  <use href=\"img/sprite.svg#star\"></use>\n                </svg>\n              </div>\n              <div class=\"modal-info__sizes\">\n                <span class=\"modal-info__subtitle\">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u0430\u0437\u043C\u0435\u0440</span>\n                <ul class=\"list-reset modal-info__sizes-list modal-sizes\">\n                 ").concat(sizes.join(""), "\n                </ul>\n              </div>\n              <div class=\"modal-info__price\">\n                <span class=\"modal-info__current-price\">").concat(dataItem.price.toLocaleString(), " \u0440</span>\n                <span class=\"modal-info__old-price\">\n                  ").concat(dataItem.oldPrice ? dataItem.oldPrice.toLocaleString() + " р" : "", "\n                </span>\n              </div>\n            ");

            if (areAvailable) {
              prodModalBtn.removeAttribute("disabled");
            } else {
              prodModalBtn.setAttribute("disabled", "disabled");
            }

            prodModalNote.innerHTML = "".concat(note ? note.join("") : "");
            prodModalDescr.textContent = "".concat(dataItem.description);
            var charsItems = "";
            Object.keys(dataItem.chars).forEach(function (key) {
              charsItems += "<p class=\"prod-bottom__descr modal-prod-descr\">".concat(key, ": ").concat(dataItem.chars[key], "</p>");
            });
            prodModalChars.innerHTML = charsItems;

            if (dataItem.video) {
              prodModalVideo.style.display = "block";
              prodModalVideo.innerHTML = "\n              <iframe\n              src=\"".concat(dataItem.video, "\"\n              allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\"\n              allowfullscreen></iframe>\n            ");
            } else {
              prodModalVideo.style.display = "none";
            }

            return "break";
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }).then(function () {
      modal.focusTrap();
      prodModal.querySelectorAll(".modal-sizes__btn").forEach(function (el) {
        el.addEventListener("click", function (e) {
          if (e.target.classList.contains("modal-sizes__btn_active")) {
            e.target.classList.remove("modal-sizes__btn_active");
          } else {
            prodModal.querySelectorAll(".modal-sizes__btn_active").forEach(function (el) {
              el.classList.remove("modal-sizes__btn_active");
            });
            e.target.classList.add("modal-sizes__btn_active");
          }
        });
      });
      prodModal.querySelectorAll(".swiper-slide").forEach(function (el) {
        el.addEventListener("click", function (event) {
          window.open(event.target.src);
        });
      });
      prodSlider.setProgress(0);
      prodSlider.on("slideChangeTransitionStart", function () {
        var idx = prodModal.querySelector(".swiper-slide-active").dataset.index;
        prodModal.querySelectorAll(".modal-preview__item").forEach(function (el) {
          el.classList.remove("modal-preview__item_active");
        });
        prodModal.querySelector(".modal-preview__item[data-index=\"".concat(idx, "\"]")).classList.add("modal-preview__item_active");
      });
      prodModal.querySelectorAll(".modal-preview__item").forEach(function (el) {
        el.addEventListener("click", function (e) {
          var idx = parseInt(e.currentTarget.dataset.index);
          prodModal.querySelectorAll(".modal-preview__item").forEach(function (el) {
            el.classList.remove("modal-preview__item_active");
          });
          e.currentTarget.classList.add("modal-preview__item_active");
          prodSlider.slideTo(idx);
        });
      });
      prodSlider.update();
    });
  };

  loadMoreBtn.addEventListener("click", function () {
    lazyProds = false;
    prodQuantity += prodQuantity;

    if (prodQuantity >= dataLength) {
      prodQuantity = dataLength;
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }

    loadProducts(prodQuantity);
  });
  var totalPrice = 0;

  var plusTotalPrice = function plusTotalPrice(price) {
    totalPrice += price;
  };

  var minusTotalPrice = function minusTotalPrice(price) {
    totalPrice -= price;
  };

  var printTotalPrice = function printTotalPrice() {
    fullPrice.textContent = "".concat(totalPrice.toLocaleString(), " \u0440");
  };

  var printQuantity = function printQuantity(quantity) {
    if (quantity > 0) {
      cartCount.classList.add("cart__count_visible");
    } else {
      cartCount.classList.remove("cart__count_visible");
      cartCount.textContent = "";
      return;
    }

    cartCount.textContent = quantity;
  };

  var cartCount = document.querySelector(".cart__count");
  var miniCartList = document.querySelector(".mini-cart__list");

  var loadCartData = function loadCartData(id) {
    fetch("data/data-prods.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      var _iterator2 = _createForOfIteratorHelper(data),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dataItem = _step2.value;

          if (dataItem.id == id) {
            miniCartList.insertAdjacentHTML("afterbegin", "\n            <li class=\"mini-cart__item\" data-id=\"".concat(dataItem.id, "\">\n              <article class=\"mini-cart__product mini-product\">\n                <button tabindex=\"-1\" class=\"mini-product__image btn-reset\" data-graph-path=\"prod-modal\" data-id=\"").concat(dataItem.id, "\">\n                  <img src=\"").concat(dataItem.mainImage, "\" alt=\"").concat(dataItem.title, "\">\n                </button>\n                <div class=\"mini-product__content\">\n                  <div class=\"mini-product__text\">\n                    <button class=\"mini-product__title btn-reset\" data-graph-path=\"prod-modal\" data-id=\"").concat(dataItem.id, "\">").concat(dataItem.title, "</button>\n                    <span class=\"mini-product__price\">").concat(dataItem.price.toLocaleString(), " \u0440</span>\n                  </div>\n                  <button class=\"mini-product__delete btn-reset\" aria-label=\"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u043E\u0432\u0430\u0440\">\u0423\u0434\u0430\u043B\u0438\u0442\u044C\n                    <svg>\n                      <use href=\"img/sprite.svg#trash\"></use>\n                    </svg>\n                  </button>\n                </div>\n              </article>\n            </li>\n          "));
            return dataItem.price;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }).then(function (price) {
      updateStorage();
      plusTotalPrice(price);
      printTotalPrice();
      changeStateCartBtn();
      printQuantity(miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length);
    });
  };

  var initialState = function initialState() {
    if (localStorage.getItem("productsIds") != null) {
      JSON.parse(localStorage.getItem("productsIds")).reverse().forEach(function (el) {
        loadCartData(el);
      });
    }
  };

  initialState();

  var updateStorage = function updateStorage() {
    var ids = [];
    miniCartList.querySelectorAll(".mini-cart__item").forEach(function (el) {
      ids.push(el.dataset.id);
    });

    if (ids.length > 0) {
      localStorage.setItem("productsIds", JSON.stringify(ids));
    } else {
      localStorage.removeItem("productsIds");
    }
  };

  var cartLogic = function cartLogic() {
    var productBtn = document.querySelectorAll(".product__btn_cart");
    productBtn.forEach(function (el) {
      el.addEventListener("click", function (e) {
        var id = e.currentTarget.dataset.id;
        loadCartData(id);
        e.currentTarget.setAttribute("disabled", "disabled");
      });
    });
  };

  miniCartList.addEventListener("click", function (e) {
    if (e.target.classList.contains("mini-product__delete")) {
      var self = e.target;
      var parentProduct = self.closest(".mini-cart__item");
      var price = parseInt(parentProduct.querySelector(".mini-product__price").textContent.replace(/\s/g, ""));
      var id = parentProduct.dataset.id;
      var cartBtn = catalogList.querySelector(".product__btn_cart[data-id=\"".concat(id, "\"]"));

      if (cartBtn) {
        cartBtn.removeAttribute("disabled");
      }

      minusTotalPrice(price);
      printTotalPrice();
      parentProduct.remove();
      var quantity = miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length;
      changeStateCartBtn();
      printQuantity(quantity);

      if (quantity <= 0) {
        miniCart.classList.remove("mini-cart_visible");
      }

      updateStorage();
    }
  });
  var openModalOrder = miniCart.querySelector(".mini-cart__btn");
  var cartOrder = document.querySelector(".cart-order");
  var cartOrderList = cartOrder.querySelector(".cart-order__list");
  var cartOrderShow = cartOrder.querySelector(".cart-order__show");
  openModalOrder.addEventListener("click", function () {
    var productHtml = miniCartList.innerHTML;
    var orderQuantity = cartOrder.querySelector(".cart-order__quantity span");
    var orderSumm = cartOrder.querySelector(".cart-order__summ span");
    cartOrderList.innerHTML = productHtml;
    orderQuantity.textContent = "".concat(miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length, " \u0448\u0442");
    orderSumm.textContent = fullPrice.textContent;
  });
  cartOrderShow.addEventListener("click", function () {
    cartOrderList.classList.toggle("cart-order__list_visible");
    cartOrderShow.classList.toggle("cart-order__show_active");
  });
  cartOrderList.addEventListener("click", function (e) {
    if (e.target.classList.contains("mini-product__delete")) {
      var self = e.target;
      var parentProduct = self.closest(".mini-cart__item");
      var price = parseInt(parentProduct.querySelector(".mini-product__price").textContent.replace(/\s/g, ""));
      var id = parentProduct.dataset.id;
      catalogList.querySelector(".product__btn_cart[data-id=\"".concat(id, "\"]")).removeAttribute("disabled");
      minusTotalPrice(price);
      printTotalPrice();
      cartOrder.querySelector(".cart-order__summ span").textContent = fullPrice.textContent;
      parentProduct.remove();
      miniCartList.querySelector(".mini-cart__item[data-id=\"".concat(parentProduct.dataset.id, "\"]")).remove();
      var quantity = miniCartList.querySelectorAll(".mini-cart__list .mini-cart__item").length;
      changeStateCartBtn();
      printQuantity(quantity);
      cartOrder.querySelector(".cart-order__quantity span").textContent = "".concat(cartCount.textContent, " \u0448\u0442");

      if (quantity <= 0) {
        miniCart.classList.remove("mini-cart_visible");
        modal.close();
      }

      updateStorage();
    }
  });
}
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var lazyQuiz = true;
var quizData = [{
  number: 1,
  title: "Какой тип кроссовок рассматриваете?",
  answer_alias: "type",
  answers: [{
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }, {
    answer_title: "кеды",
    type: "checkbox"
  }]
}, {
  number: 2,
  title: "Какой размер вам подойдет?",
  answer_alias: "size",
  answers: [{
    answer_title: "менее 36",
    type: "checkbox"
  }, {
    answer_title: "36-38",
    type: "checkbox"
  }, {
    answer_title: "39-41",
    type: "checkbox"
  }, {
    answer_title: "42-44",
    type: "checkbox"
  }, {
    answer_title: "45 и больше",
    type: "checkbox"
  }]
}, {
  number: 3,
  title: "Уточните какие-либо моменты (необязательно)",
  answer_alias: "message",
  answers: [{
    answer_title: "Введите сообщение",
    type: "textarea"
  }]
}];

var quizTemplate = function quizTemplate() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var dataLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var number = data.number,
      title = data.title;
  var nextBtnText = options.nextBtnText;
  var answers = data.answers.map(function (item) {
    if (item.type === "checkbox") {
      return "\n      <li class=\"quiz-question__item\">\n        <label class=\"custom-checkbox quiz-question__label\">\n          <div class=\"quiz-question__image\">\n          ".concat(lazyQuiz ? "\n            <img\n              src=\"img/sneaker.jpg\"\n              class=\"lozad\"\n              data-srcset=\"img/sneaker.jpg 100w\"\n              srcset=\"img/placeholder.svg 100w\"\n              sizes=\"100vw\"\n              alt=\"".concat(item.title, "\"\n            />\n          ") : "\n            <img\n              src=\"img/sneaker.jpg\"\n              alt=\"".concat(item.title, "\"\n            />\n          "), "\n          </div>\n          <input type=\"").concat(item.type, "\"\n            class=\"custom-checkbox__field quiz-question__answer\"\n            data-valid=\"false\"\n            name=\"").concat(data.answer_alias, "\"\n            ").concat(item.type == "text" ? 'placeholder="Введите ваш вариант"' : "", "\n            value=\"").concat(item.type !== "text" ? item.answer_title : "", "\">\n          <span class=\"custom-checkbox__content\">").concat(item.answer_title, "</span>\n        </label>\n      </li>");
    }

    if (item.type === "textarea") {
      return "\n      <li class=\"quiz-question__item\">\n        <label class=\"quiz-question__label\">\n          <textarea class=\"quiz-question__message\" placeholder=\"".concat(item.answer_title, "\"></textarea>\n        </label>\n      </li>");
    }

    return "\n    <li class=\"quiz-question__item\">\n      <label class=\"quiz-question__label\">\n        <input type=\"".concat(item.type, "\"\n          data-valid=\"false\"\n          class=\"quiz-question__answer\"\n          name=\"").concat(data.answer_alias, "\"\n          ").concat(item.type == "text" ? 'placeholder="Введите ваш вариант"' : "", "\n          value=\"").concat(item.type !== "text" ? item.answer_title : "", "\">\n        <span>").concat(item.answer_title, "</span>\n      </label>\n    </li>");
  });
  return "\n    <h3 class=\"quiz-question__title\">".concat(title, "</h3>\n    <ul class=\"quiz-question__answers list-reset\">\n      ").concat(answers.join(""), "\n    </ul>\n    <div class=\"quiz-bottom\">\n      <div class=\"quiz-question__count\">").concat(number, " \u0438\u0437 ").concat(dataLength, "</div>\n      <button type=\"button\" class=\"btn btn-reset btn_thirdly quiz-question__btn\" data-next-btn>").concat(nextBtnText, "</button>\n    </div>\n\t");
};

var Quiz = /*#__PURE__*/function () {
  function Quiz(selector, data, options) {
    _classCallCheck(this, Quiz);

    this.$el = document.querySelector(selector);
    this.options = options;
    this.data = data;
    this.counter = 0;
    this.dataLength = this.data.length;
    this.resultArray = [];
    this.tmp = {};
    this.init();
    this.events();
  }

  _createClass(Quiz, [{
    key: "init",
    value: function init() {
      this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

      if (lazyQuiz) {
        observer.observe();
      }
    }
  }, {
    key: "nextQuestion",
    value: function nextQuestion() {
      if (this.valid()) {
        if (this.counter + 1 < this.dataLength) {
          this.counter++;
          this.$el.innerHTML = quizTemplate(this.data[this.counter], this.dataLength, this.options);

          if (lazyQuiz) {
            observer.observe();
          }

          if (this.counter + 1 == this.dataLength) {
            document.querySelector(".quiz-question__answers").style.display = "block";
          }
        } else {
          document.querySelector(".quiz-questions").style.display = "none";
          var lastQuestion = document.querySelector(".last-question");
          lastQuestion.innerHTML = "\n          <div class=\"last-question__form\">\n            <h3 class=\"last-question__title\">\u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435</h3>\n            <p class=\"last-question__descr\">\n              \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u0435 \u043F\u043E\u0434\u0431\u043E\u0440\u043A\u0443 \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0445 \u0434\u043B\u044F \u0432\u0430\u0441 \u043C\u043E\u0434\u0435\u043B\u0435\u0439 \u043D\u0430 \u043F\u043E\u0447\u0442\u0443\n            </p>\n            <input\n              type=\"text\"\n              class=\"input last-question__input\"\n              placeholder=\"\u0412\u0430\u0448\u0435 \u0438\u043C\u044F\"\n            />\n            <input\n              type=\"email\"\n              class=\"input last-question__input\"\n              placeholder=\"E-mail\"\n            />\n            <button class=\"btn btn_primary btn-reset last-question__btn\">\n              \u041F\u043E\u043B\u0443\u0447\u0438\u0442\u044C\n            </button>\n            ".concat(lazyQuiz ? "\n              <div class=\"last-question__decorate lozad\" data-background-image=\"img/iphone.png\" style=\"background-image: url(img/placeholder.svg)\"></div>\n            " : "\n              <div class=\"last-question__decorate\" style=\"background-image: url(img/iphone.png)\"></div>\n            ", "\n          </div>\n        ");
          lastQuestion.style.display = "block";
          document.querySelector(".quiz__title").textContent = "Ваша подборка готова!";
          document.querySelector(".quiz__descr").textContent = "Оставьте свои контактные данные, чтобы бы мы могли отправить  подготовленный для вас каталог";
        }
      }
    }
  }, {
    key: "events",
    value: function events() {
      var _this = this;

      this.$el.addEventListener("click", function (e) {
        if (e.target == document.querySelector("[data-next-btn]")) {
          lazyQuiz = false;

          _this.addToSend();

          _this.nextQuestion();
        }

        if (e.target == document.querySelector("[data-send]")) {
          _this.send();
        }
      });
      this.$el.addEventListener("change", function (e) {
        if (e.target.tagName == "INPUT") {
          if (e.target.type !== "checkbox" && e.target.type !== "radio") {
            var elements = _this.$el.querySelectorAll("input");

            elements.forEach(function (el) {
              el.checked = false;
            });
          }

          _this.tmp = _this.serialize(_this.$el);
        }
      });
    }
  }, {
    key: "valid",
    value: function valid() {
      var textarea = this.$el.querySelector("textarea");

      if (textarea) {
        return true;
      }

      var isValid = false;
      var elements = this.$el.querySelectorAll("input");
      elements.forEach(function (el) {
        switch (el.nodeName) {
          case "INPUT":
            switch (el.type) {
              case "text":
                isValid = true;

                if (el.value) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }

              case "checkbox":
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }

              case "radio":
                if (el.checked) {
                  isValid = true;
                } else {
                  el.classList.add("error");
                }

            }

        }
      });
      return isValid;
    }
  }, {
    key: "addToSend",
    value: function addToSend() {
      this.resultArray.push(this.tmp);
    }
  }, {
    key: "send",
    value: function send() {
      if (this.valid()) {
        var formData = new FormData();

        var _iterator = _createForOfIteratorHelper(this.resultArray),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;

            for (var obj in item) {
              formData.append(obj, item[obj].substring(0, item[obj].length - 1));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var response = fetch("mail.php", {
          method: "POST",
          body: formData
        });
      }
    }
  }, {
    key: "serialize",
    value: function serialize(form) {
      var field,
          s = {};
      var valueString = "";

      if (_typeof(form) == "object" && form.nodeName == "FORM") {
        var len = form.elements.length;

        for (var i = 0; i < len; i++) {
          field = form.elements[i];

          if (field.name && !field.disabled && field.type != "file" && field.type != "reset" && field.type != "submit" && field.type != "button") {
            if (field.type == "select-multiple") {
              for (j = form.elements[i].options.length - 1; j >= 0; j--) {
                if (field.options[j].selected) s[s.length] = encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[j].value);
              }
            } else if (field.type != "checkbox" && field.type != "radio" && field.value || field.checked) {
              valueString += field.value + ",";
              s[field.name] = valueString;
            }
          }
        }
      }

      return s;
    }
  }]);

  return Quiz;
}();

window.quiz = new Quiz(".quiz-form .quiz-questions", quizData, {
  nextBtnText: "Следующий шаг",
  sendBtnText: "Отправить"
});
"use strict";

var rangeSlider = document.getElementById("range-slider");
var minPrice = 99999,
    maxPrice = 1;

if (rangeSlider) {
  var setRange = function setRange() {
    fetch("data/data-prods.json").then(function (response) {
      return response.json();
    }).then(function (data) {
      var dataLength = data.length;

      for (var i = 0; i < dataLength; i++) {
        var item = data[i];

        if (item.price > maxPrice) {
          maxPrice = item.price;
        } else if (item.price < minPrice) {
          minPrice = item.price;
        }
      }

      rangeSlider.noUiSlider.updateOptions({
        range: {
          min: minPrice,
          max: maxPrice
        }
      });
      rangeSlider.noUiSlider.set([minPrice, maxPrice]);
      getFilters();
      reloadProducts();
    });
  };

  noUiSlider.create(rangeSlider, {
    start: [minPrice, minPrice],
    connect: true,
    step: 1,
    range: {
      min: minPrice,
      max: maxPrice
    }
  });
  setRange();
  var input0 = document.getElementById("input-0");
  var input1 = document.getElementById("input-1");
  var inputs = [input0, input1];
  rangeSlider.noUiSlider.on("update", function (values, handle) {
    inputs[handle].value = Math.round(values[handle]).toLocaleString();
  });

  var setRangeSlider = function setRangeSlider(i, value) {
    var arr = [null, null];
    arr[i] = value;
    rangeSlider.noUiSlider.set(arr);
  };

  inputs.forEach(function (el, index) {
    el.addEventListener("change", function (e) {
      setRangeSlider(index, e.currentTarget.value);
    });
  });
}
"use strict";

var sizesBtnsNodeList = document.querySelectorAll(".sizes-table__btn");

if (sizesBtnsNodeList.length != 0) {
  var sizesBtns = Array.prototype.slice.call(sizesBtnsNodeList);
  sizesBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.currentTarget.classList.toggle("sizes-table__btn_active");
    });
  });
}
"use strict";

document.querySelectorAll("input[type=\"tel\"]").forEach(function (el) {
  new Inputmask("+7 (999) 999-9999").mask(el);
});
var productsFormData = null;

var validateForms = function validateForms(selector, rules, messages, colorValue, succesModal, yaGoal) {
  new window.JustValidate(selector, {
    rules: rules,
    messages: messages,
    colorWrong: colorValue,
    submitHandler: function submitHandler(form) {
      if (form.classList.contains("cart-modal__form")) {
        productsFormData = new FormData(form);
        document.querySelectorAll(".cart-order__list .mini-cart__item").forEach(function (el, index) {
          var title = document.querySelector(".mini-product__title").textContent;
          var price = document.querySelector(".mini-product__price").textContent;
          productsFormData.append("product-".concat(index + 1), "".concat(title, ", ").concat(price));
        });
        productsFormData.append("summ", "".concat(document.querySelector(".cart-order__summ span").textContent));
        var xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("Отправлено");
            }
          }
        };

        xhr.open("POST", "mail.php", true);
        xhr.send(productsFormData);
        form.reset();
      } else {
        var formData = new FormData(form);

        var _xhr = new XMLHttpRequest();

        _xhr.onreadystatechange = function () {
          if (_xhr.readyState === 4) {
            if (_xhr.status === 200) {
              console.log("Отправлено");
            }
          }
        };

        _xhr.open("POST", "../mail.php", true);

        _xhr.send(formData);

        form.reset();
      }
    }
  });
};

validateForms(".callback-form", {
  name: {
    required: true
  },
  phone: {
    required: true
  }
}, {
  name: {
    required: "Вы должны ввести имя"
  },
  phone: {
    required: "Вы должны ввести телефон"
  }
}, getComputedStyle(document.documentElement).getPropertyValue("--color-accent"), ".thanks-popup");
validateForms(".cart-modal__form", {
  name: {
    required: true
  },
  phone: {
    required: true
  },
  email: {
    required: true,
    email: true
  }
}, {
  name: {
    required: "Вы должны ввести имя"
  },
  phone: {
    required: "Вы должны ввести телефон"
  },
  email: {
    required: "Вы должны ввести email",
    email: "Вы должны ввести корректный email"
  }
}, getComputedStyle(document.documentElement).getPropertyValue("--color-accent"), ".thanks-popup");
/**
  * название функции
  *
  * @param {number} first - первое число
  * @returns {number}
  */
"use strict";
//# sourceMappingURL=main.js.map
