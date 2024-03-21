(()=>{"use strict";function e(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",n)}function t(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function r(e,t,n,r,o,c,u,a){var i=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),l=i.querySelector(".card__image"),s=i.querySelector(".card__title"),d=i.querySelector(".card__delete-button"),p=i.querySelector(".card__like-button"),f=i.querySelector(".likes_counter"),_=e._id,m=e.owner._id,y=e.likes;return s.textContent=e.name,l.src=e.link,l.alt=e.name,f.textContent=y.length,d.addEventListener("click",(function(){t(i,_,c)})),l.addEventListener("click",(function(){n(e)})),m!==o&&(d.removeEventListener("click",(function(){return t(i)})),d.remove()),y.forEach((function(e){e._id===o&&r(p)})),p.addEventListener("click",(function(){var t,n;(t=p.classList.contains("card__like-button_is-active"))!==(n=!t)&&(n?u(e._id).then((function(e){r(p),f.textContent=e.likes.length})).catch((function(e){console.log(e)})):a(e._id).then((function(e){r(p),f.textContent=e.likes.length})).catch((function(e){console.log(e)})))})),i}function o(e,t,n){n(t).then((function(){e.remove()})).catch((function(e){console.log(e)}))}function c(e){e.classList.toggle("card__like-button_is-active")}var u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},a=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""},i=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):l(t,n)},l=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},s=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.value="",a(e,n,t)})),l(r,t)},d={baseUrl:"https://nomoreparties.co/v1/wff-cohort-8",headers:{authorization:"3ce5af04-c6ad-4a37-8ea8-66b06e336b2d","Content-Type":"application/json"}};function p(e){return e.ok?e.json():Promise.reject("Ошибка ".concat(e.status))}function f(e){return fetch("".concat(d.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:d.headers}).then(p)}function _(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:d.headers}).then(p)}function m(e){return fetch("".concat(d.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:d.headers}).then(p)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v=document.querySelector(".places__list"),h=document.querySelector(".profile__edit-button"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),E=document.querySelector(".popup_type_image"),g=document.querySelector(".profile__title"),L=document.querySelector(".profile__description"),C=document.querySelector(".profile__image"),k=q.querySelector(".popup__form"),A=q.querySelector(".popup__input_type_url"),x=q.querySelector(".popup__input_type_card-name"),U=document.querySelector(".popup__input_type_name"),w=document.querySelector(".popup__input_type_description"),j=document.querySelector(".popup__image"),O=document.querySelector(".popup__caption"),T=document.querySelectorAll(".popup"),B=b.querySelector(".popup__form"),D=document.querySelector(".popup_type_new-avatar"),P=D.querySelector(".popup__form"),I=D.querySelector(".popup__input_type_url"),M=k.querySelector(".popup__button"),N=B.querySelector(".popup__button"),J=P.querySelector(".popup__button"),z="",G="Сохранить...",H="Сохранить";function V(e,t){e.textContent=t}function $(t){O.textContent=t.name,j.src=t.link,j.alt=t.name,e(E)}Promise.all([fetch("".concat(d.baseUrl,"/users/me"),{method:"Get",headers:{authorization:"3ce5af04-c6ad-4a37-8ea8-66b06e336b2d"}}).then(p),fetch("".concat(d.baseUrl,"/cards"),{method:"Get",headers:d.headers}).then(p)]).then((function(e){var t,n,u=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=u[0],i=u[1];z=a._id,g.textContent=a.name,L.textContent=a.about,C.src=a.avatar,Array.from(i).forEach((function(e){v.append(r(e,o,$,c,z,f,_,m))}))})).catch((function(e){console.log(e)})),S.addEventListener("click",(function(){return e(q),void s(k,u)})),h.addEventListener("click",(function(){return U.value=g.textContent,w.value=L.textContent,e(b),void s(B,u)})),C.addEventListener("click",(function(){return e(D),void s(P,u)})),T.forEach((function(e){var n;(n=e).querySelector(".popup__close").addEventListener("click",(function(){return t(n)})),n.addEventListener("click",(function(e){e.target.classList.contains("popup")&&t(n)})),function(e){e.classList.add("popup_is-animated")}(e)})),B.addEventListener("submit",(function(e){var n,r;e.preventDefault(),V(N,G),g.textContent=U.value,L.textContent=w.value,(n=U.value,r=w.value,fetch("".concat(d.baseUrl,"/users/me"),{method:"PATCH",headers:d.headers,body:JSON.stringify({name:n,about:r})}).then(p)).then((function(){t(b),B.reset()})).catch((function(e){console.log(e)})).finally((function(){V(N,H)}))})),k.addEventListener("submit",(function(e){e.preventDefault(),V(M,G);var n,u,a={name:x.value,link:A.value};(n=a.name,u=a.link,fetch("".concat(d.baseUrl,"/cards"),{method:"POST",headers:d.headers,body:JSON.stringify({name:n,link:u})}).then(p)).then((function(e){!function(e,t){var n=r(e,o,$,c,t,f,_,m);v.prepend(n)}(e,z),t(q),k.reset()})).catch((function(e){console.log(e)})).finally((function(){V(M,H)}))})),P.addEventListener("submit",(function(e){var n;e.preventDefault(),V(J,G),(n=I.value,fetch("".concat(d.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:d.headers,body:JSON.stringify({avatar:n})}).then(p)).then((function(){t(D),C.style.backgroundImage="url('"+I.value+"')",P.reset()})).catch((function(e){console.log(e)})).finally((function(){V(J,H)}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?a(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),i(n,r,t)}))}))}(t,e)}))}(u)})();