"use strict";
(self["webpackChunkWebApp"] = self["webpackChunkWebApp"] || []).push([["src_app_modules_news_news_module_ts"],{

/***/ 51803:
/*!*****************************************************!*\
  !*** ./src/app/modules/news/news-routing.module.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsRoutingModule": () => (/* binding */ NewsRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _pages_news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/news-feed/news-feed.component */ 15820);
/* harmony import */ var _pages_news_details_news_details_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/news-details/news-details.component */ 64603);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 18259);





const routes = [
    { path: '', component: _pages_news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_0__.NewsFeedComponent },
    { path: ':id', component: _pages_news_details_news_details_component__WEBPACK_IMPORTED_MODULE_1__.NewsDetailsComponent },
];
class NewsRoutingModule {
}
NewsRoutingModule.ɵfac = function NewsRoutingModule_Factory(t) { return new (t || NewsRoutingModule)(); };
NewsRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: NewsRoutingModule });
NewsRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](NewsRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule] }); })();


/***/ }),

/***/ 42505:
/*!*********************************************!*\
  !*** ./src/app/modules/news/news.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsModule": () => (/* binding */ NewsModule)
/* harmony export */ });
/* harmony import */ var _news_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./news-routing.module */ 51803);
/* harmony import */ var _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../mg-shared/mg-shared.module */ 51839);
/* harmony import */ var _pages_news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/news-feed/news-feed.component */ 15820);
/* harmony import */ var _pages_news_details_news_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/news-details/news-details.component */ 64603);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 18259);





class NewsModule {
}
NewsModule.ɵfac = function NewsModule_Factory(t) { return new (t || NewsModule)(); };
NewsModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: NewsModule });
NewsModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_1__.MgSharedModule,
            _news_routing_module__WEBPACK_IMPORTED_MODULE_0__.NewsRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](NewsModule, { declarations: [_pages_news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_2__.NewsFeedComponent,
        _pages_news_details_news_details_component__WEBPACK_IMPORTED_MODULE_3__.NewsDetailsComponent], imports: [_mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_1__.MgSharedModule,
        _news_routing_module__WEBPACK_IMPORTED_MODULE_0__.NewsRoutingModule] }); })();


/***/ }),

/***/ 64603:
/*!***************************************************************************!*\
  !*** ./src/app/modules/news/pages/news-details/news-details.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsDetailsComponent": () => (/* binding */ NewsDetailsComponent)
/* harmony export */ });
/* harmony import */ var _services_news_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../services/news-api.service */ 11074);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 53399);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 54366);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 75249);
/* harmony import */ var _models_news_news_vm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../models/news/news-vm */ 36985);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 48750);
/* harmony import */ var _mg_shared_components_news_news_image_block_news_image_block_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../mg-shared/components/news/news-image-block/news-image-block.component */ 96743);
/* harmony import */ var _mg_shared_components_news_news_tournament_table_news_tournament_table_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../mg-shared/components/news/news-tournament-table/news-tournament-table.component */ 4162);
/* harmony import */ var _mg_shared_components_avatar_avatar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../mg-shared/components/avatar/avatar.component */ 94648);
/* harmony import */ var _mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../mg-shared/pipes/image.pipe */ 1913);
/* harmony import */ var _mg_shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../mg-shared/pipes/safe-html.pipe */ 15803);
/* harmony import */ var _mg_shared_pipes_sorted_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../mg-shared/pipes/sorted.pipe */ 59227);
/* harmony import */ var _mg_shared_pipes_safe_url_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../mg-shared/pipes/safe-url.pipe */ 6455);















function NewsDetailsComponent_ng_template_0_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 17)(1, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("error", function NewsDetailsComponent_ng_template_0_div_1_Template_img_error_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2); return ctx_r6.imageLoadingError = true; });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, ctx_r3.news.imageUrl), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeUrl"]);
} }
function NewsDetailsComponent_ng_template_0_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r4.news.categoryName);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "safeHtml");
} if (rf & 2) {
    const block_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, block_r9.data), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "iframe", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](2, "safeUrl");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const block_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](2, 1, block_r9.data), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeResourceUrl"]);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "mg-news-image-block", 24);
} if (rf & 2) {
    const block_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", block_r9.data);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "mg-news-tournament-table", 24);
} if (rf & 2) {
    const block_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("data", block_r9.data);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_1_Template, 2, 3, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_2_Template, 3, 3, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_3_Template, 1, 1, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, NewsDetailsComponent_ng_template_0_ng_template_8_div_0_ng_template_4_Template, 1, 1, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} if (rf & 2) {
    const block_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", block_r9.type == ctx_r8.blockTypes.Text);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", block_r9.type == ctx_r8.blockTypes.Video);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", block_r9.type == ctx_r8.blockTypes.Image);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", block_r9.type == ctx_r8.blockTypes.TournamentResultsTable);
} }
function NewsDetailsComponent_ng_template_0_ng_template_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, NewsDetailsComponent_ng_template_0_ng_template_8_div_0_Template, 5, 4, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](1, "sorted");
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](1, 1, ctx_r5.news.blocks));
} }
function NewsDetailsComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, NewsDetailsComponent_ng_template_0_div_1_Template, 3, 3, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, NewsDetailsComponent_ng_template_0_div_3_Template, 2, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "h3", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](7, "safeHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](8, NewsDetailsComponent_ng_template_0_ng_template_8_Template, 2, 3, "ng-template", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "div", 9)(10, "div", 10)(11, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](12, "mg-avatar", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](13, "div", 13)(14, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](16, "p", 15)(17, "time", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](19, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx_r0.news == null ? null : ctx_r0.news.imageUrl) || ctx_r0.imageLoadingError);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r0.news == null ? null : ctx_r0.news.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r0.news == null ? null : ctx_r0.news.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("innerHtml", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind1"](7, 10, ctx_r0.news == null ? null : ctx_r0.news.description), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", (ctx_r0.news == null ? null : ctx_r0.news.blocks) && ctx_r0.news.blocks.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("size", 40)("image", ctx_r0.news == null ? null : ctx_r0.news.authorAvatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r0.news == null ? null : ctx_r0.news.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("dateTime", ctx_r0.news == null ? null : ctx_r0.news.createdDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](19, 12, ctx_r0.news == null ? null : ctx_r0.news.createdDate, "longDate"));
} }
function NewsDetailsComponent_ng_template_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "h3", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "\u041D\u043E\u0432\u0438\u043D\u0430 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u0430 = (");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
} }
class NewsDetailsComponent {
    constructor(newsApiService, activeRoute) {
        this.newsApiService = newsApiService;
        this.activeRoute = activeRoute;
        this.blockTypes = _models_news_news_vm__WEBPACK_IMPORTED_MODULE_1__.NewsBlockType;
        this.newsNotFound = false;
        this.id = null;
        this.imageLoadingError = false;
    }
    ngOnInit() {
        this.activeRoute.params.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(params => params['id']), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(id => {
            if (!id) {
                this.newsNotFound = true;
                return (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.of)(null);
            }
            return this.newsApiService.getNewsDetails(id);
        })).subscribe({
            next: data => {
                if (data) {
                    this.news = data;
                }
            },
            error: _ => this.newsNotFound = true
        });
    }
}
NewsDetailsComponent.ɵfac = function NewsDetailsComponent_Factory(t) { return new (t || NewsDetailsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_news_api_service__WEBPACK_IMPORTED_MODULE_0__.NewsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute)); };
NewsDetailsComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({ type: NewsDetailsComponent, selectors: [["mg-news-details"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵProvidersFeature"]([
            _services_news_api_service__WEBPACK_IMPORTED_MODULE_0__.NewsApiService
        ])], decls: 3, vars: 2, consts: [[3, "ngIf", "ngIfElse"], ["notFound", ""], [1, "uk-card", "uk-card-default", "mt-50"], ["class", "uk-card-media-top", 4, "ngIf"], [1, "uk-card-body"], ["class", "uk-card-badge uk-label", 4, "ngIf"], [1, "uk-card-title"], [3, "innerHtml"], [3, "ngIf"], [1, "uk-card-footer"], ["uk-grid", "", 1, "uk-grid-small", "uk-flex-middle"], [1, "uk-width-auto"], [3, "size", "image"], [1, "uk-width-expand"], [1, "uk-margin-remove-bottom"], [1, "uk-text-meta", "uk-margin-remove-top"], [3, "dateTime"], [1, "uk-card-media-top"], ["alt", "", 2, "width", "100%", 3, "src", "error"], [1, "uk-card-badge", "uk-label"], [4, "ngFor", "ngForOf"], [3, "innerHTML"], [1, "news-video"], ["width", "1920", "height", "1080", "allowfullscreen", "", "uk-responsive", "", "uk-video", "automute: true; autoplay: false", 3, "src"], [3, "data"], [1, "uk-text-center", "mt-200"]], template: function NewsDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](0, NewsDetailsComponent_ng_template_0_Template, 20, 15, "ng-template", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, NewsDetailsComponent_ng_template_1_Template, 2, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx.newsNotFound)("ngIfElse", _r1);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _mg_shared_components_news_news_image_block_news_image_block_component__WEBPACK_IMPORTED_MODULE_2__.NewsImageBlockComponent, _mg_shared_components_news_news_tournament_table_news_tournament_table_component__WEBPACK_IMPORTED_MODULE_3__.NewsTournamentTableComponent, _mg_shared_components_avatar_avatar_component__WEBPACK_IMPORTED_MODULE_4__.AvatarComponent], pipes: [_mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_5__.ImagePipe, _mg_shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_6__.SafeHtmlPipe, _mg_shared_pipes_sorted_pipe__WEBPACK_IMPORTED_MODULE_7__.SortedPipe, _mg_shared_pipes_safe_url_pipe__WEBPACK_IMPORTED_MODULE_8__.SafeUrlPipe, _angular_common__WEBPACK_IMPORTED_MODULE_14__.DatePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJuZXdzLWRldGFpbHMuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 15820:
/*!*********************************************************************!*\
  !*** ./src/app/modules/news/pages/news-feed/news-feed.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NewsFeedComponent": () => (/* binding */ NewsFeedComponent)
/* harmony export */ });
/* harmony import */ var _services_news_api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../services/news-api.service */ 11074);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 48750);
/* harmony import */ var _mg_shared_components_avatar_avatar_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../mg-shared/components/avatar/avatar.component */ 94648);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../mg-shared/pipes/image.pipe */ 1913);
/* harmony import */ var _mg_shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../mg-shared/pipes/safe-html.pipe */ 15803);








function NewsFeedComponent_div_4_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const news_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](2, 1, news_r1.imageUrl), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeUrl"]);
} }
function NewsFeedComponent_div_4_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const news_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](news_r1.categoryName);
} }
function NewsFeedComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div")(1, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, NewsFeedComponent_div_4_div_2_Template, 3, 3, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, NewsFeedComponent_div_4_div_4_Template, 2, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "p", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](8, "safeHtml");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 10)(10, "div", 11)(11, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "mg-avatar", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 14)(14, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "p", 16)(17, "time", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](19, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "div", 12)(21, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438 \u0447\u0438\u0442\u0430\u0442\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
} if (rf & 2) {
    const news_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", news_r1.imageUrl);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", news_r1.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](news_r1.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("innerHtml", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](8, 10, news_r1.description), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("size", 40)("image", news_r1.authorAvatar);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](news_r1.author);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dateTime", news_r1.createdDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind2"](19, 12, news_r1.createdDate, "longDate"));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("routerLink", "/news/" + news_r1.id);
} }
class NewsFeedComponent {
    constructor(newsApiService) {
        this.newsApiService = newsApiService;
    }
    ngOnInit() {
        this.newsApiService.getNewsList()
            .subscribe(data => this.data = data);
    }
}
NewsFeedComponent.ɵfac = function NewsFeedComponent_Factory(t) { return new (t || NewsFeedComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_news_api_service__WEBPACK_IMPORTED_MODULE_0__.NewsApiService)); };
NewsFeedComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: NewsFeedComponent, selectors: [["mg-news-feed"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([
            _services_news_api_service__WEBPACK_IMPORTED_MODULE_0__.NewsApiService
        ])], decls: 5, vars: 1, consts: [[1, "col-12", "mt-50"], [1, "uk-text-center"], ["uk-grid", "masonry: true", 1, "uk-child-width-1-3@xl", "uk-child-width-1-2@m", "mt-50"], [4, "ngFor", "ngForOf"], [1, "uk-card", "uk-card-default"], ["class", "uk-card-media-top", 4, "ngIf"], [1, "uk-card-body"], ["class", "uk-card-badge uk-label", 4, "ngIf"], [1, "uk-card-title"], [1, "truncate-text", 3, "innerHtml"], [1, "uk-card-footer"], ["uk-grid", "", 1, "uk-grid-small", "uk-flex-middle"], [1, "uk-width-auto"], [3, "size", "image"], [1, "uk-width-expand"], [1, "uk-margin-remove-bottom"], [1, "uk-text-meta", "uk-margin-remove-top"], [3, "dateTime"], ["href", "#", 1, "uk-button", "uk-button-text", 3, "routerLink"], [1, "uk-card-media-top"], ["alt", "Post image", "loading", "lazy", 3, "src"], [1, "uk-card-badge", "uk-label"]], template: function NewsFeedComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "\u041D\u043E\u0432\u0438\u043D\u0438");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, NewsFeedComponent_div_4_Template, 23, 15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.data);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _mg_shared_components_avatar_avatar_component__WEBPACK_IMPORTED_MODULE_1__.AvatarComponent, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkWithHref], pipes: [_mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_2__.ImagePipe, _mg_shared_pipes_safe_html_pipe__WEBPACK_IMPORTED_MODULE_3__.SafeHtmlPipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe], styles: [".truncate-text[_ngcontent-%COMP%] {\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 2;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5ld3MtZmVlZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG9CQUFBO0VBQ0EsNEJBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFDRiIsImZpbGUiOiJuZXdzLWZlZWQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudHJ1bmNhdGUtdGV4dCB7XG4gIGRpc3BsYXk6IC13ZWJraXQtYm94O1xuICAtd2Via2l0LWJveC1vcmllbnQ6IHZlcnRpY2FsO1xuICAtd2Via2l0LWxpbmUtY2xhbXA6IDI7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuIl19 */"] });


/***/ })

}]);
//# sourceMappingURL=src_app_modules_news_news_module_ts.js.map