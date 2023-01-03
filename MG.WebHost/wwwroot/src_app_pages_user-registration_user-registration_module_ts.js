"use strict";
(self["webpackChunkWebApp"] = self["webpackChunkWebApp"] || []).push([["src_app_pages_user-registration_user-registration_module_ts"],{

/***/ 584:
/*!***********************************************!*\
  !*** ./src/app/guards/not-authorize.guard.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotAuthorizeGuard": () => (/* binding */ NotAuthorizeGuard)
/* harmony export */ });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 3399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 8259);
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/authentication.service */ 7053);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 8750);




class NotAuthorizeGuard {
    constructor(authService, location) {
        this.authService = authService;
        this.location = location;
    }
    canActivate(route, state) {
        return this.authService.isAuthenticated$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(isAuthenticated => {
            if (isAuthenticated)
                this.location.back();
            return !isAuthenticated;
        }));
    }
}
NotAuthorizeGuard.ɵfac = function NotAuthorizeGuard_Factory(t) { return new (t || NotAuthorizeGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_0__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_common__WEBPACK_IMPORTED_MODULE_3__.LocationStrategy)); };
NotAuthorizeGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({ token: NotAuthorizeGuard, factory: NotAuthorizeGuard.ɵfac, providedIn: 'root' });


/***/ }),

/***/ 5912:
/*!***********************************************************************************!*\
  !*** ./src/app/pages/user-registration/guards/user-invitation-validator.guard.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserInvitationValidatorGuard": () => (/* binding */ UserInvitationValidatorGuard)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 2426);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5249);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 3399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 8259);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../services/user.service */ 3071);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3903);





class UserInvitationValidatorGuard {
    constructor(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    canActivate(route, state) {
        const token = route.queryParamMap.get('token');
        if (!token)
            return true;
        return this.userService.getInvitation(token)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.map)(invite => {
            debugger;
            route.data = {
                invite: invite
            };
            return true;
        }), (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.catchError)(err => {
            debugger;
            route.data = {
                error: err
            };
            this.router.navigate(['/400'], {
                state: {
                    code: '400',
                    text: 'Неправильне посилання на запрошення або час запрошення минув'
                }
            });
            return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(true);
        }));
    }
}
UserInvitationValidatorGuard.ɵfac = function UserInvitationValidatorGuard_Factory(t) { return new (t || UserInvitationValidatorGuard)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_services_user_service__WEBPACK_IMPORTED_MODULE_0__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router)); };
UserInvitationValidatorGuard.ɵprov = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({ token: UserInvitationValidatorGuard, factory: UserInvitationValidatorGuard.ɵfac });


/***/ }),

/***/ 5347:
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/user-registration/user-registration-page/user-registration-page.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRegistrationPageComponent": () => (/* binding */ UserRegistrationPageComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ 6410);
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/form-utils */ 65);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 8259);
/* harmony import */ var _services_authentication_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services/authentication.service */ 7053);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 3903);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 8750);
/* harmony import */ var _mg_shared_components_google_login_google_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../mg-shared/components/google-login/google-login.component */ 3570);








function UserRegistrationPageComponent_p_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, "\u0417\u0430\u0432\u0435\u0440\u0448\u0456\u0442\u044C \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044E - \u0432\u0432\u0435\u0434\u0456\u0442\u044C \u0434\u0430\u043D\u043D\u0456");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} }
function UserRegistrationPageComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ul", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("innerHTML", ctx_r1.errorHtml, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeHtml"]);
} }
function UserRegistrationPageComponent_ng_template_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
} }
function UserRegistrationPageComponent_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](0, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
} }
function UserRegistrationPageComponent_ng_container_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function UserRegistrationPageComponent_ng_template_35_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " - \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0435\u043C\u0435\u0439\u043B\u0443 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function UserRegistrationPageComponent_ng_template_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, UserRegistrationPageComponent_ng_template_35_ng_container_0_Template, 2, 0, "ng-container", 2);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r6.hasError("email", "email"));
} }
function UserRegistrationPageComponent_ng_container_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function UserRegistrationPageComponent_ng_container_52_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function UserRegistrationPageComponent_ng_template_53_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " - \u043F\u0430\u0440\u043E\u043B\u044C \u043C\u0430\u0454 \u0437\u0431\u0456\u0433\u0430\u0442\u0438\u0441\u044F ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} }
function UserRegistrationPageComponent_ng_template_53_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](0, UserRegistrationPageComponent_ng_template_53_ng_container_0_Template, 2, 0, "ng-container", 2);
} if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r10.hasError("confirmPassword", "mustMatch"));
} }
function UserRegistrationPageComponent_div_60_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 28)(1, "mg-google-login", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("onResponse", function UserRegistrationPageComponent_div_60_Template_mg_google_login_onResponse_1_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r14.onGoogleSignup($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
} }
class UserRegistrationPageComponent {
    constructor(fb, authService, router, activatedRoute) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.submitted = true;
        this.errorHtml = null;
    }
    ngOnInit() {
        this.activatedRoute.data.subscribe((data) => {
            this.invite = data.invite;
            this.buildForm();
        });
        this.buildForm();
    }
    register() {
        this.submitted = true;
        this.errorHtml = null;
        if (this.form.invalid)
            return;
        const obs = this.invite
            ? this.authService.registerWithInvite(this.invite.id, this.form.value)
            : this.authService.register(this.form.value);
        obs.subscribe(response => this.processRegisterResponse(response));
    }
    hasError(name, error) {
        return this.submitted && this.form.controls[name].hasError(error);
    }
    processRegisterResponse(response) {
        if (response.isSuccess) {
            this.router.navigate(['/login']);
        }
        else {
            this.errorHtml = (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_0__.errorsToHtml)(response.errors);
        }
    }
    onGoogleSignup(response) {
        this.errorHtml = null;
        this.authService.signupWithGoogle(response)
            .subscribe(resp => this.processRegisterResponse(resp));
    }
    buildForm() {
        var _a, _b;
        this.submitted = false;
        let firstName = '';
        let lastName = '';
        let middleName = '';
        if (this.invite) {
            const nameParts = this.invite.name.split(' ');
            if (nameParts.length > 0)
                firstName = nameParts[0];
            if (nameParts.length > 1)
                lastName = nameParts[1];
            if (nameParts.length > 2)
                middleName = nameParts[2];
        }
        this.form = this.fb.group({
            firstName: [lastName, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
            lastName: [firstName, [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
            middleName: [middleName],
            email: [(_b = (_a = this.invite) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : '', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.email]],
            password: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_4__.Validators.required]],
        });
        this.form.get('confirmPassword').addValidators((confirmationControl) => {
            const confirmValue = confirmationControl.value;
            const passwordValue = this.form.get('password').value;
            if (confirmValue === '') {
                return null;
            }
            if (confirmValue !== passwordValue) {
                return { mustMatch: true };
            }
            return null;
        });
    }
}
UserRegistrationPageComponent.ɵfac = function UserRegistrationPageComponent_Factory(t) { return new (t || UserRegistrationPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_authentication_service__WEBPACK_IMPORTED_MODULE_1__.AuthenticationService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute)); };
UserRegistrationPageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: UserRegistrationPageComponent, selectors: [["mg-user-registration-page"]], decls: 61, vars: 11, consts: [[1, "uk-card", "mt-100", "uk-align-center", "mg-card", 2, "max-width", "600px", "padding", "20px"], [1, "uk-card-header", "uk-text-center"], [4, "ngIf"], [1, "uk-form-stacked", 3, "formGroup", "ngSubmit"], [1, "uk-card-body"], [3, "ngIf"], [1, "uk-margin"], ["for", "firstName", 1, "uk-form-label"], [1, "uk-form-controls"], ["type", "text", "placeholder", "\u0406\u043C\u02BC\u044F", "id", "firstName", "formControlName", "firstName", 1, "uk-input"], ["for", "lastName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435", "id", "lastName", "formControlName", "lastName", 1, "uk-input"], ["for", "middleName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456", "id", "middleName", "formControlName", "middleName", 1, "uk-input"], ["for", "email", 1, "uk-form-label"], [4, "ngIf", "ngIfElse"], ["emailEmail", ""], ["type", "text", "placeholder", "email@gmail.com", "id", "email", "formControlName", "email", 1, "uk-input"], ["for", "password", 1, "uk-form-label"], ["type", "password", "placeholder", "\u041F\u0430\u0440\u043E\u043B\u044C", "id", "password", "formControlName", "password", 1, "uk-input"], ["for", "confirmPassword", 1, "uk-form-label"], ["confirmPasswordMatch", ""], ["type", "password", "placeholder", "\u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C", "id", "confirmPassword", "formControlName", "confirmPassword", 1, "uk-input"], [1, "uk-card-footer", "uk-text-center"], ["type", "submit", 1, "uk-button", "uk-button-primary", "uk-margin-small-right"], ["class", "uk-inline", 4, "ngIf"], [1, "uk-margin", "uk-form-danger"], [3, "innerHTML"], [1, "uk-inline"], ["text", "signup_with", 3, "onResponse"]], template: function UserRegistrationPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "\u0420\u0435\u0433\u0456\u0441\u0442\u0440\u0430\u0446\u0456\u044F");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](4, UserRegistrationPageComponent_p_4_Template, 2, 0, "p", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "form", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("ngSubmit", function UserRegistrationPageComponent_Template_form_ngSubmit_5_listener() { return ctx.register(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, UserRegistrationPageComponent_ng_template_7_Template, 2, 1, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div", 6)(9, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](10, " \u0406\u043C\u02BC\u044F ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](11, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](12, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](13, UserRegistrationPageComponent_ng_template_13_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](14, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](15, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "div", 6)(17, "label", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, " \u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](20, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](21, UserRegistrationPageComponent_ng_template_21_Template, 1, 0, "ng-template", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](23, "input", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "div", 6)(25, "label", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](28, "input", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "div", 6)(30, "label", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](31, " \u0415\u043C\u0435\u0439\u043B ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](33, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](34, UserRegistrationPageComponent_ng_container_34_Template, 2, 0, "ng-container", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](35, UserRegistrationPageComponent_ng_template_35_Template, 1, 1, "ng-template", null, 16, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](38, "input", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](39, "div", 6)(40, "label", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](41, " \u041F\u0430\u0440\u043E\u043B\u044C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](42, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](43, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](44, UserRegistrationPageComponent_ng_container_44_Template, 2, 0, "ng-container", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](46, "input", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "div", 6)(48, "label", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](49, " \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](50, "sup");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](51, "*");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](52, UserRegistrationPageComponent_ng_container_52_Template, 2, 0, "ng-container", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](53, UserRegistrationPageComponent_ng_template_53_Template, 1, 1, "ng-template", null, 21, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](56, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](57, "div", 23)(58, "button", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](59, "\u0417\u0430\u0440\u0435\u0454\u0441\u0442\u0440\u0443\u0432\u0430\u0442\u0438\u0441\u044C");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](60, UserRegistrationPageComponent_div_60_Template, 2, 0, "div", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](36);
        const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](54);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.invite);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.errorHtml);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasError("firstName", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasError("lastName", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasError("email", "required"))("ngIfElse", _r5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasError("password", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.hasError("confirmPassword", "required"))("ngIfElse", _r9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.invite);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_4__.FormControlName, _mg_shared_components_google_login_google_login_component__WEBPACK_IMPORTED_MODULE_2__.GoogleLoginComponent], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXJlZ2lzdHJhdGlvbi1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 2996:
/*!*****************************************************************************!*\
  !*** ./src/app/pages/user-registration/user-registration-routing.module.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRegistrationRoutingModule": () => (/* binding */ UserRegistrationRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 3903);
/* harmony import */ var _user_registration_page_user_registration_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-registration-page/user-registration-page.component */ 5347);
/* harmony import */ var _guards_user_invitation_validator_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./guards/user-invitation-validator.guard */ 5912);
/* harmony import */ var _guards_not_authorize_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../guards/not-authorize.guard */ 584);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 8259);






const routes = [
    {
        path: '',
        component: _user_registration_page_user_registration_page_component__WEBPACK_IMPORTED_MODULE_0__.UserRegistrationPageComponent,
        canActivate: [_guards_user_invitation_validator_guard__WEBPACK_IMPORTED_MODULE_1__.UserInvitationValidatorGuard, _guards_not_authorize_guard__WEBPACK_IMPORTED_MODULE_2__.NotAuthorizeGuard]
    }
];
class UserRegistrationRoutingModule {
}
UserRegistrationRoutingModule.ɵfac = function UserRegistrationRoutingModule_Factory(t) { return new (t || UserRegistrationRoutingModule)(); };
UserRegistrationRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: UserRegistrationRoutingModule });
UserRegistrationRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](UserRegistrationRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 4871:
/*!*********************************************************************!*\
  !*** ./src/app/pages/user-registration/user-registration.module.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserRegistrationModule": () => (/* binding */ UserRegistrationModule)
/* harmony export */ });
/* harmony import */ var _user_registration_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-registration-routing.module */ 2996);
/* harmony import */ var _user_registration_page_user_registration_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-registration-page/user-registration-page.component */ 5347);
/* harmony import */ var _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../mg-shared/mg-shared.module */ 1839);
/* harmony import */ var _guards_user_invitation_validator_guard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guards/user-invitation-validator.guard */ 5912);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 8259);





class UserRegistrationModule {
}
UserRegistrationModule.ɵfac = function UserRegistrationModule_Factory(t) { return new (t || UserRegistrationModule)(); };
UserRegistrationModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: UserRegistrationModule });
UserRegistrationModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ providers: [
        _guards_user_invitation_validator_guard__WEBPACK_IMPORTED_MODULE_3__.UserInvitationValidatorGuard
    ], imports: [[
            _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_2__.MgSharedModule,
            _user_registration_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserRegistrationRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](UserRegistrationModule, { declarations: [_user_registration_page_user_registration_page_component__WEBPACK_IMPORTED_MODULE_1__.UserRegistrationPageComponent], imports: [_mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_2__.MgSharedModule,
        _user_registration_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserRegistrationRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_pages_user-registration_user-registration_module_ts.js.map