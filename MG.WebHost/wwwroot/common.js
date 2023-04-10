"use strict";
(self["webpackChunkWebApp"] = self["webpackChunkWebApp"] || []).push([["common"],{

/***/ 36985:
/*!****************************************!*\
  !*** ./src/app/models/news/news-vm.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsBlockType": () => (/* binding */ NewsBlockType)
/* harmony export */ });
var NewsBlockType;
(function (NewsBlockType) {
    NewsBlockType[NewsBlockType["None"] = 0] = "None";
    NewsBlockType[NewsBlockType["Text"] = 1] = "Text";
    NewsBlockType[NewsBlockType["Video"] = 2] = "Video";
    NewsBlockType[NewsBlockType["Image"] = 3] = "Image";
    NewsBlockType[NewsBlockType["TournamentResultsTable"] = 4] = "TournamentResultsTable";
})(NewsBlockType || (NewsBlockType = {}));


/***/ }),

/***/ 11074:
/*!**********************************************!*\
  !*** ./src/app/services/news-api.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsApiService": () => (/* binding */ NewsApiService)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 53399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.service */ 5830);



class NewsApiService {
    constructor(api) {
        this.api = api;
        this.baseUrl = 'news';
    }
    getNewsList() {
        return this.api.get(this.baseUrl);
    }
    getNewsDetails(id) {
        return this.api.get(this.baseUrl + `/${id}`)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(details => {
            if (details.blocks)
                details.blocks = JSON.parse(details.blocks);
            return details;
        }));
    }
}
NewsApiService.ɵfac = function NewsApiService_Factory(t) { return new (t || NewsApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_0__.ApiService)); };
NewsApiService.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NewsApiService, factory: NewsApiService.ɵfac });


/***/ })

}]);
//# sourceMappingURL=common.js.map