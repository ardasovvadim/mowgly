"use strict";
(self["webpackChunkWebApp"] = self["webpackChunkWebApp"] || []).push([["src_app_pages_user-profile_user-profile_module_ts"],{

/***/ 98730:
/*!**********************************!*\
  !*** ./src/admin/utils/forms.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formHasError": () => (/* binding */ formHasError)
/* harmony export */ });
function formHasError(submitted, form, name, error) {
    return submitted && form.controls[name].hasError(error);
}


/***/ }),

/***/ 6613:
/*!********************************************************************************************!*\
  !*** ./src/app/pages/user-profile/components/change-password/change-password.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChangePasswordComponent": () => (/* binding */ ChangePasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 36410);
/* harmony import */ var _utils_ui_kit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../utils/ui-kit */ 89377);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../utils/utils */ 49860);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../services/user.service */ 73071);
/* harmony import */ var _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../mg-shared/components/list-errors/list-errors.component */ 5622);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 48750);








function ChangePasswordComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function ChangePasswordComponent_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function ChangePasswordComponent_ng_container_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function ChangePasswordComponent_ng_template_22_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " - \u043F\u0430\u0440\u043E\u043B\u044C \u043C\u0430\u0454 \u0437\u0431\u0456\u0433\u0430\u0442\u0438\u0441\u044F ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} }
function ChangePasswordComponent_ng_template_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, ChangePasswordComponent_ng_template_22_ng_container_0_Template, 2, 0, "ng-container", 7);
} if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.hasError(ctx_r4.passwordForm, ctx_r4.passwordFormSubmitted, "confirmPassword", "mustMatch"));
} }
class ChangePasswordComponent {
    constructor(fb, userService) {
        this.fb = fb;
        this.userService = userService;
        this.passwordForm = this.fb.group({
            currentPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]],
            newPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]],
            confirmPassword: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required]]
        });
        this.passwordFormSubmitted = false;
        this.errorHtml = null;
    }
    ngOnInit() {
        this.passwordForm.get('confirmPassword').addValidators((confirmationControl) => {
            const confirmValue = confirmationControl.value;
            const passwordValue = this.passwordForm.get('newPassword').value;
            if (confirmValue === '') {
                return null;
            }
            if (confirmValue !== passwordValue) {
                return { mustMatch: true };
            }
            return null;
        });
    }
    changePassword() {
        this.passwordFormSubmitted = true;
        this.errorHtml = null;
        if (this.passwordForm.invalid)
            return;
        const request = Object.assign({}, this.passwordForm.value);
        this.userService.changePassword(request)
            .subscribe(response => {
            if (response.isSuccess) {
                (0,_utils_ui_kit__WEBPACK_IMPORTED_MODULE_0__.mgSuccessNotification)('Пароль бы изменен');
            }
            else {
                this.errorHtml = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.getErrorListHtml)(response.errors);
            }
        });
    }
    hasError(form, submitted, control, error) {
        return form.controls[control].hasError(error) && submitted;
    }
}
ChangePasswordComponent.ɵfac = function ChangePasswordComponent_Factory(t) { return new (t || ChangePasswordComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService)); };
ChangePasswordComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: ChangePasswordComponent, selectors: [["mg-change-password"]], decls: 26, vars: 6, consts: [[3, "formGroup", "ngSubmit"], ["type", "submit", 1, "uk-button", "uk-button-primary"], ["uk-icon", "icon: download", 1, "uk-margin-small-right"], [1, "uk-margin"], [3, "errorHtml"], [1, "uk-margin", 2, "max-width", "300px"], ["for", "currentPassword", 1, "uk-form-label"], [4, "ngIf"], ["type", "password", "id", "currentPassword", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", "formControlName", "currentPassword", 1, "uk-input"], ["for", "newPassword", 1, "uk-form-label"], ["type", "password", "id", "newPassword", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", "formControlName", "newPassword", 1, "uk-input"], ["for", "confirmPassword", 1, "uk-form-label"], [4, "ngIf", "ngIfElse"], ["confirmPasswordMatch", ""], [1, "uk-form-controls"], ["type", "password", "placeholder", "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0435 \u043D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C", "id", "confirmPassword", "formControlName", "confirmPassword", 1, "uk-input"]], template: function ChangePasswordComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function ChangePasswordComponent_Template_form_ngSubmit_0_listener() { return ctx.changePassword(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div")(2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "span", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "\u0417\u0431\u0435\u0440\u0456\u0433\u0442\u0438 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "mg-list-errors", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "div", 5)(8, "div", 3)(9, "label", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, " \u0422\u0435\u043A\u0443\u0449\u0438\u0439 \u043F\u0430\u0440\u043E\u043B\u044C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, ChangePasswordComponent_ng_container_11_Template, 2, 0, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 3)(14, "label", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, " \u041D\u043E\u0432\u044B\u0439 \u043F\u0430\u0440\u043E\u043B\u044C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ChangePasswordComponent_ng_container_16_Template, 2, 0, "ng-container", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](17, "input", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "div", 3)(19, "label", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, " \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0456\u0442\u044C \u043F\u0430\u0440\u043E\u043B\u044C ");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, ChangePasswordComponent_ng_container_21_Template, 2, 0, "ng-container", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, ChangePasswordComponent_ng_template_22_Template, 1, 1, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](24, "div", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](25, "input", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
    } if (rf & 2) {
        const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](23);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.passwordForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("errorHtml", ctx.errorHtml);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.passwordForm, ctx.passwordFormSubmitted, "currentPassword", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.passwordForm, ctx.passwordFormSubmitted, "newPassword", "required"));
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.hasError(ctx.passwordForm, ctx.passwordFormSubmitted, "confirmPassword", "required"))("ngIfElse", _r3);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_3__.ListErrorsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJjaGFuZ2UtcGFzc3dvcmQuY29tcG9uZW50LnNjc3MifQ== */"] });


/***/ }),

/***/ 76436:
/*!****************************************************************************************************!*\
  !*** ./src/app/pages/user-profile/components/edit-master-profile/edit-master-profile.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EditMasterProfileComponent": () => (/* binding */ EditMasterProfileComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 36410);
/* harmony import */ var _models_data_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/data-type */ 27141);
/* harmony import */ var _services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/manage-image-api.service */ 42839);
/* harmony import */ var _admin_utils_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../admin/utils/settings */ 96087);
/* harmony import */ var _utils_ui_kit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/ui-kit */ 89377);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../utils/utils */ 49860);
/* harmony import */ var _admin_utils_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../admin/utils/forms */ 98730);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../mg-shared/components/list-errors/list-errors.component */ 5622);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 48750);
/* harmony import */ var _mg_shared_components_image_cropp_modal_image_cropp_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../mg-shared/components/image-cropp-modal/image-cropp-modal.component */ 45587);
/* harmony import */ var _mg_shared_components_quill_editor_quill_editor_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../mg-shared/components/quill-editor/quill-editor.component */ 8370);
/* harmony import */ var _mg_shared_components_add_image_modal_add_image_modal_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../mg-shared/components/add-image-modal/add-image-modal.component */ 78429);
/* harmony import */ var _mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../mg-shared/pipes/image.pipe */ 1913);


















const _c0 = ["cropModal"];
const _c1 = ["cropProfileImageModal"];
function EditMasterProfileComponent_ng_container_12_ng_template_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
} }
function EditMasterProfileComponent_ng_container_12_ng_template_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
} }
function EditMasterProfileComponent_ng_container_12_ng_container_44_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " - \u0446\u0435 \u043F\u043E\u043B\u0435 \u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} }
function EditMasterProfileComponent_ng_container_12_ng_template_45_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, " - \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0435\u043C\u0435\u0439\u043B\u0443 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} }
function EditMasterProfileComponent_ng_container_12_ng_template_45_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, EditMasterProfileComponent_ng_container_12_ng_template_45_ng_container_0_Template, 2, 0, "ng-container", 5);
} if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r6.hasError("email", "email"));
} }
const _c2 = function () { return { width: 200, height: 200 }; };
function EditMasterProfileComponent_ng_container_12_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 6)(2, "div", 7)(3, "img", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("error", function EditMasterProfileComponent_ng_container_12_Template_img_error_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return (ctx_r9.form.value["avatar"] = ctx_r9.defaultAvatar); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 9)(6, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u0444\u043E\u0442\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "input", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function EditMasterProfileComponent_ng_container_12_Template_input_change_8_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r10); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r11.cropImage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div")(10, "div", 11)(11, "label", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12, " \u0406\u043C\u02BC\u044F ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, EditMasterProfileComponent_ng_container_12_ng_template_15_Template, 1, 0, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](17, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](18, "div", 11)(19, "label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20, " \u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](22, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](23, EditMasterProfileComponent_ng_container_12_ng_template_23_Template, 1, 0, "ng-template", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](25, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "div", 11)(27, "label", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](28, "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](29, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](30, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](31, "div")(32, "div", 11)(33, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](34, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](35, "div", 14)(36, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](37, "span", 22)(38, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](39, "div", 11)(40, "label", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](41, " \u0415\u043C\u0435\u0439\u043B ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](42, "sup");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](43, "*");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](44, EditMasterProfileComponent_ng_container_12_ng_container_44_Template, 2, 0, "ng-container", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](45, EditMasterProfileComponent_ng_container_12_ng_template_45_Template, 1, 1, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](47, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](48, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](49, "div", 11)(50, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](51, "\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](52, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](53, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](54, "div")(55, "div", 11)(56, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](57, "Instagram");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](58, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](59, "a", 31)(60, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](61, "div", 11)(62, "label", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](63, "Facebook");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](64, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](65, "span", 34)(66, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](67, "mg-image-cropp-modal", 36, 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("onSave", function EditMasterProfileComponent_ng_container_12_Template_mg_image_cropp_modal_onSave_67_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r10); const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r12.displayImage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](46);
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 8, ctx_r0.form.value.avatar), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.hasError("firstName", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.hasError("lastName", "required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r0.hasError("email", "required"))("ngIfElse", _r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("circleCropper", true)("aspectRatio", 1)("saveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](10, _c2));
} }
function EditMasterProfileComponent_ng_container_14_div_27_Template(rf, ctx) { if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "img", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](3, "div", 56)(4, "a", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function EditMasterProfileComponent_ng_container_14_div_27_Template_a_click_4_listener() { const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r18); const image_r16 = restoredCtx.$implicit; const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2); return ctx_r17.deleteImage(image_r16); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
} if (rf & 2) {
    const image_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, image_r16), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
} }
const _c3 = function () { return { width: 800, height: 600 }; };
const _c4 = function () { return { width: 400, height: 500 }; };
function EditMasterProfileComponent_ng_container_14_Template(rf, ctx) { if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 38)(2, "div", 39)(3, "div", 40)(4, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "\u0424\u043E\u0442\u043E \u0456\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u0430");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "img", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "div", 9)(9, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10, "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0444\u043E\u0442\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("change", function EditMasterProfileComponent_ng_container_14_Template_input_change_11_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r20); const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r19.cropProfileImage($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div")(13, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](14, "\u041E\u043F\u0438\u0441");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](15, "mg-quill-editor", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](16, "div", 44)(17, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](18, "\u041E\u043F\u0438\u0441 \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "mg-quill-editor", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](20, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](21, "div", 47)(22, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](23, "\u0424\u043E\u0442\u043E \u0441 \u0456\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u043E\u043C");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function EditMasterProfileComponent_ng_container_14_Template_button_click_24_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r20); const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](29); return _r14.open(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25, "\u0414\u043E\u0434\u0430\u0442\u0438");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, EditMasterProfileComponent_ng_container_14_div_27_Template, 5, 3, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "mg-add-image-modal", 51, 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("onImageAdded", function EditMasterProfileComponent_ng_container_14_Template_mg_add_image_modal_onImageAdded_28_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r20); const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](29); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); let tmp_b_0; _r14.close(); return (tmp_b_0 = ctx_r22.form.get("images")) == null ? null : tmp_b_0.value == null ? null : tmp_b_0.value.push($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](30, "mg-image-cropp-modal", 36, 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("onSave", function EditMasterProfileComponent_ng_container_14_Template_mg_image_cropp_modal_onSave_30_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r20); const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](); return ctx_r23.changeProfilePicture($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 9, ctx_r1.form.value["profileImage"]), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("height", 400);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("height", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r1.form.value["images"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("aspectRatio", 4 / 3)("saveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](11, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("circleCropper", false)("aspectRatio", 4 / 5)("saveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](12, _c4));
} }
const _c5 = ["*"];
class EditMasterProfileComponent {
    constructor(fb, activeRoute, imageApi) {
        this.fb = fb;
        this.activeRoute = activeRoute;
        this.imageApi = imageApi;
        this.submitted = false;
        this.editMode = false;
        this.errorHtml = null;
        this.tab = 0;
        this.defaultAvatar = '/assets/img/masters/avatars/default.webp';
        this.defaultProfileImage = '/assets/img/masters/avatars/default.webp';
        this.imagesToDelete = [];
        this.profileMappings = {
            'avatar': { key: 'UserAvatar', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Image, defaultValue: this.defaultAvatar },
            'profileImage': { key: 'MasterProfileImage', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Image, defaultValue: this.defaultProfileImage },
            'description': { key: 'MasterDescriptions', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Html },
            'instagram': { key: 'MasterInstagramLink', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.String },
            'facebook': { key: 'MasterFacebookLink', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.String },
            'images': { key: 'MasterWithImages', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Array, defaultValue: [] },
            'achievements': { key: 'CardMasterAchievements', type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Html, defaultValue: '' },
        };
        this.save = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter();
    }
    set master(value) {
        this.buildForm(value !== null && value !== void 0 ? value : {});
    }
    ngOnInit() {
    }
    submit() {
        this.submitted = true;
        if (!this.form.valid)
            return null;
        const request = this.form.value;
        (0,_admin_utils_settings__WEBPACK_IMPORTED_MODULE_2__.applyProfileMappingToData)(this.profileMappings, request);
        // todo
        if (this.imagesToDelete.length > 0)
            this.imageApi.deleteImages(this.imagesToDelete).subscribe();
        return request;
    }
    ngAfterViewInit() {
    }
    cropImage($event) {
        const file = $event.target.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            this.cropModal.imageUrl = fr.result;
            this.cropModal.open();
        };
        fr.readAsDataURL(file);
    }
    displayImage(imageDataUrl) {
        this.cropModal.close();
        this.imageApi.add({
            dataUrl: imageDataUrl,
            pathPrefix: 'masters/avatars'
        })
            .subscribe(id => {
            var _a;
            (_a = this.form.get('avatar')) === null || _a === void 0 ? void 0 : _a.setValue(id);
        });
    }
    buildForm(data) {
        this.submitted = false;
        (0,_admin_utils_settings__WEBPACK_IMPORTED_MODULE_2__.applyProfileMappingToForm)(this.profileMappings, data);
        if (data.birthday)
            data.birthday = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_4__.toNormalDate)(data.birthday);
        this.form = this.fb.group({
            id: [''],
            firstName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required]],
            lastName: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required]],
            middleName: [''],
            birthday: [''],
            email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.email]],
            phone: [''],
            profiles: [''],
            avatar: [''],
            profileImage: [''],
            description: [''],
            instagram: [''],
            facebook: [''],
            images: [''],
            achievements: [''],
        });
        this.form.reset(data);
    }
    changeProfilePicture(imageDataUrl) {
        this.cropProfileImageModal.close();
        this.imageApi.add({
            dataUrl: imageDataUrl,
            pathPrefix: 'masters/profile-photos'
        })
            .subscribe(id => {
            var _a;
            (_a = this.form.get('profileImage')) === null || _a === void 0 ? void 0 : _a.setValue(id);
        });
    }
    cropProfileImage($event) {
        const file = $event.target.files[0];
        const fr = new FileReader();
        fr.onload = () => {
            this.cropProfileImageModal.imageUrl = fr.result;
            this.cropProfileImageModal.open();
        };
        fr.readAsDataURL(file);
    }
    deleteImage(imageUrl) {
        (0,_utils_ui_kit__WEBPACK_IMPORTED_MODULE_3__.mgConfirm)('Ви впевнені, що бажаєте видалити фото?')
            .subscribe(() => {
            if ((0,_utils_utils__WEBPACK_IMPORTED_MODULE_4__.isGuid)(imageUrl)) {
                this.imagesToDelete.push(imageUrl);
            }
            const control = this.form.get('images');
            const array = control.value;
            control.setValue(array.filter(v => v != imageUrl));
        });
    }
    hasError(control, error) {
        return (0,_admin_utils_forms__WEBPACK_IMPORTED_MODULE_5__.formHasError)(this.submitted, this.form, control, error);
    }
}
EditMasterProfileComponent.ɵfac = function EditMasterProfileComponent_Factory(t) { return new (t || EditMasterProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_1__.ManageImageApiService)); };
EditMasterProfileComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({ type: EditMasterProfileComponent, selectors: [["mg-edit-master-profile"]], viewQuery: function EditMasterProfileComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c1, 5);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.cropModal = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.cropProfileImageModal = _t.first);
    } }, inputs: { master: "master", editMode: "editMode", errorHtml: "errorHtml" }, outputs: { save: "save" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵProvidersFeature"]([
            _services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_1__.ManageImageApiService
        ])], ngContentSelectors: _c5, decls: 15, vars: 4, consts: [[3, "formGroup", "ngSubmit"], ["id", "switcher", "uk-tab", "animation: uk-animation-fade"], ["href", "#", 3, "click"], [3, "errorHtml"], [1, "uk-switcher", "uk-margin-medium"], [4, "ngIf"], ["uk-grid", "", 1, "uk-grid-small"], ["uk-form-custom", ""], ["width", "200", "height", "200", "loading", "lazy", "alt", "Master card image avatar", 1, "uk-border-circle", "uk-background-primary", 2, "padding", "10px", 3, "src", "error"], [1, "uk-margin", "uk-text-center"], ["type", "file", "id", "cardImage", "accept", "image/*", 3, "change"], [1, "uk-margin"], ["for", "firstName", 1, "uk-form-label"], [3, "ngIf"], [1, "uk-form-controls"], ["type", "text", "placeholder", "\u0406\u043C\u02BC\u044F", "formControlName", "firstName", "id", "firstName", 1, "uk-input"], ["for", "lastName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435", "formControlName", "lastName", "id", "lastName", 1, "uk-input"], ["for", "middleName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456", "formControlName", "middleName", "id", "middleName", 1, "uk-input"], ["for", "birthday", 1, "uk-form-label"], [1, "uk-inline", "w-100"], ["uk-icon", "icon: calendar", 1, "uk-form-icon", "uk-form-icon-flip", "mg-text-green-main"], ["type", "date", "placeholder", "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F", "formControlName", "birthday", "id", "birthday", 1, "uk-input"], ["for", "email", 1, "uk-form-label"], [4, "ngIf", "ngIfElse"], ["emailEmail", ""], ["type", "email", "placeholder", "\u0415\u043C\u0435\u0439\u043B", "formControlName", "email", "id", "email", 1, "uk-input"], ["for", "phone", 1, "uk-form-label"], ["type", "tel", "placeholder", "\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D", "formControlName", "phone", "id", "phone", 1, "uk-input"], ["for", "instagramUrl", 1, "uk-form-label"], ["href", "#", "uk-icon", "icon: instagram", 1, "uk-form-icon"], ["type", "text", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u0432 instagram", "formControlName", "instagram", "id", "instagramUrl", 1, "uk-input"], ["for", "facebook", 1, "uk-form-label"], ["uk-icon", "icon: facebook", 1, "uk-form-icon"], ["type", "text", "placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u043F\u0440\u043E\u0444\u0438\u043B\u044C \u0432 facebook", "formControlName", "facebook", "id", "facebook", 1, "uk-input"], [3, "circleCropper", "aspectRatio", "saveOptions", "onSave"], ["cropModal", ""], ["uk-grid", "", 1, "uk-grid", "uk-grid-row-large", "uk-child-width-1-2@m", "uk-grid-divider"], [1, "x-center"], ["uk-form-custom", "", 1, "uk-inline"], ["loading", "lazy", "width", "400", "height", "500", "alt", "\u0418\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u043F\u0440\u043E\u0444\u0438\u043B\u044F \u0406\u043D\u0441\u0442\u0440\u0443\u043A\u0442\u043E\u0440\u0430", 1, "mg-background-green-main", 2, "padding", "10px", 3, "src"], ["type", "file", "id", "profileImage", "accept", "image/*", 3, "change"], ["placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u0442\u0435\u043A\u0441\u0442...", "formControlName", "description", 3, "height"], [1, "mg-quill-field"], ["placeholder", "\u0412\u0432\u0435\u0434\u0456\u0442\u044C \u043E\u043F\u0438\u0441...", "formControlName", "achievements", 3, "height"], [1, "mg-editor", 2, "display", "none"], [1, "w-100"], ["type", "button", 1, "uk-button", "uk-button-primary", "uk-margin-medium-bottom", 3, "click"], ["uk-grid", "masonry: true", 1, "uk-grid", "uk-child-width-auto@s"], ["class", "on-hover", 4, "ngFor", "ngForOf"], ["pathPrefix", "photo-with-masters", 3, "aspectRatio", "saveOptions", "onImageAdded"], ["addImageModal", ""], ["cropProfileImageModal", ""], [1, "on-hover"], ["height", "300", "width", "400", 1, "mg-background-green-main", 2, "padding", "5px", 3, "src"], [1, "mg-btn-delete", "uk-position-absolute", "uk-padding-small", "uk-position-top-right"], ["uk-icon", "icon: close", 3, "click"]], template: function EditMasterProfileComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngSubmit", function EditMasterProfileComponent_Template_form_ngSubmit_0_listener() { return ctx.submit(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵprojection"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "ul", 1)(3, "li")(4, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function EditMasterProfileComponent_Template_a_click_4_listener() { return ctx.tab = 0; });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "\u041E\u0441\u043D\u043E\u0432\u043D\u0430 \u0456\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0456\u044F");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "li")(7, "a", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function EditMasterProfileComponent_Template_a_click_7_listener() { return ctx.tab = 1; });
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8, "\u041F\u043E\u0434\u0440\u043E\u0431\u0438\u0446\u0456");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "mg-list-errors", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "ul", 4)(11, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, EditMasterProfileComponent_ng_container_12_Template, 69, 11, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "li");
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, EditMasterProfileComponent_ng_container_14_Template, 32, 13, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("errorHtml", ctx.errorHtml);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.tab == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.tab == 1);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_12__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormGroupDirective, _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_6__.ListErrorsComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormControlName, _mg_shared_components_image_cropp_modal_image_cropp_modal_component__WEBPACK_IMPORTED_MODULE_7__.ImageCroppModalComponent, _mg_shared_components_quill_editor_quill_editor_component__WEBPACK_IMPORTED_MODULE_8__.QuillEditorComponent, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _mg_shared_components_add_image_modal_add_image_modal_component__WEBPACK_IMPORTED_MODULE_9__.AddImageModalComponent], pipes: [_mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_10__.ImagePipe], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJlZGl0LW1hc3Rlci1wcm9maWxlLmNvbXBvbmVudC5zY3NzIn0= */"] });


/***/ }),

/***/ 54319:
/*!****************************************************************************************!*\
  !*** ./src/app/pages/user-profile/components/personal-data/personal-data.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PersonalDataComponent": () => (/* binding */ PersonalDataComponent)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 36410);
/* harmony import */ var _models_data_type__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../models/data-type */ 27141);
/* harmony import */ var _admin_utils_settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../admin/utils/settings */ 96087);
/* harmony import */ var _utils_ui_kit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../utils/ui-kit */ 89377);
/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../utils/utils */ 49860);
/* harmony import */ var _services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../services/manage-image-api.service */ 42839);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 53399);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _services_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../services/user.service */ 73071);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 48750);
/* harmony import */ var _edit_master_profile_edit_master_profile_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../edit-master-profile/edit-master-profile.component */ 76436);
/* harmony import */ var _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../mg-shared/components/list-errors/list-errors.component */ 5622);
/* harmony import */ var _mg_shared_components_image_cropp_modal_image_cropp_modal_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../mg-shared/components/image-cropp-modal/image-cropp-modal.component */ 45587);
/* harmony import */ var _mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../mg-shared/pipes/image.pipe */ 1913);
















const _c0 = ["masterProfileComponent"];
const _c1 = ["cropImageModal"];
function PersonalDataComponent_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "mg-edit-master-profile", 2, 3)(2, "div", 4)(3, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function PersonalDataComponent_ng_template_0_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r4.saveMasterProfile();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](4, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "\u0417\u0431\u0435\u0440\u0456\u0433\u0442\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("master", ctx_r0.profile)("editMode", true)("errorHtml", ctx_r0.errorHtml);
  }
}
function PersonalDataComponent_ng_template_2_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 34)(1, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "a", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function PersonalDataComponent_ng_template_2_ng_template_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "img", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("loadeddata", function PersonalDataComponent_ng_template_2_ng_template_11_Template_img_loadeddata_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return ctx_r10.imgAvatarErr = false;
    })("error", function PersonalDataComponent_ng_template_2_ng_template_11_Template_img_error_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r11);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return ctx_r12.imgAvatarErr = true;
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "image");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("src", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 1, ctx_r8.form.value.avatar), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsanitizeUrl"]);
  }
}
const _c2 = function () {
  return {
    width: 200,
    height: 200
  };
};
function PersonalDataComponent_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "form", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngSubmit", function PersonalDataComponent_ng_template_2_Template_form_ngSubmit_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r13.submit();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](1, "div")(2, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](3, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4, "\u0417\u0431\u0435\u0440\u0456\u0433\u0442\u0438 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "mg-list-errors", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "div", 10)(8, "div", 11)(9, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, PersonalDataComponent_ng_template_2_div_10_Template, 3, 0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, PersonalDataComponent_ng_template_2_ng_template_11_Template, 2, 3, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "div", 15)(14, "a");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](15, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u0444\u043E\u0442\u043E");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("change", function PersonalDataComponent_ng_template_2_Template_input_change_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r15.cropImage($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](17, "div")(18, "div", 4)(19, "label", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](20, "\u0406\u043C\u02BC\u044F:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](22, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "div", 4)(24, "label", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25, "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](27, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](28, "div", 4)(29, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](30, "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](32, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "div")(34, "div", 4)(35, "label", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](36, "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "div", 18)(38, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](39, "span", 26)(40, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](41, "div", 4)(42, "label", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](43, "\u0415\u043C\u0435\u0439\u043B:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](44, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](45, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](46, "div", 4)(47, "label", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](48, "\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D:");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](49, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](50, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "mg-image-cropp-modal", 32, 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("onSave", function PersonalDataComponent_ng_template_2_Template_mg_image_cropp_modal_onSave_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return ctx_r16.onImageCropped($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](12);
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("formGroup", ctx_r2.form);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("errorHtml", ctx_r2.errorHtml);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r2.form.value.avatar || ctx_r2.imgAvatarErr)("ngIfElse", _r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("circleCropper", true)("saveOptions", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](7, _c2))("aspectRatio", 1);
  }
}
class PersonalDataComponent {
  constructor(userService, fb, imageService) {
    this.userService = userService;
    this.fb = fb;
    this.imageService = imageService;
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      middleName: [''],
      birthday: [''],
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required]],
      phoneNumber: [''],
      profiles: [[]],
      avatar: ['']
    });
    this.profileFormSubmitted = true;
    this.profileMappings = {
      'avatar': {
        key: 'UserAvatar',
        type: _models_data_type__WEBPACK_IMPORTED_MODULE_0__.DataType.Image
      }
    };
    this.errorHtml = null;
    this.isMaster$ = this.userService.profile$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.map)(profile => {
      var _a, _b;
      return (_b = (_a = profile === null || profile === void 0 ? void 0 : profile.roles) === null || _a === void 0 ? void 0 : _a.some(r => r === 'Master')) !== null && _b !== void 0 ? _b : false;
    }));
    this.profile = null;
  }
  ngOnInit() {
    this.refreshProfile();
  }
  submit() {
    this.errorHtml = null;
    this.profileFormSubmitted = true;
    if (this.form.invalid) return;
    const request = this.form.value;
    (0,_admin_utils_settings__WEBPACK_IMPORTED_MODULE_1__.applyProfileMappingToData)(this.profileMappings, request);
  }
  updateUserData(request) {
    this.userService.updateUserData(request).subscribe(response => {
      if (response.isSuccess) {
        (0,_utils_ui_kit__WEBPACK_IMPORTED_MODULE_2__.mgSuccessNotification)('Профіль було збережено');
        this.userService.refreshProfile();
        this.errorHtml = null;
      } else {
        this.errorHtml = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.getErrorListHtml)(response.errors);
      }
    });
  }
  cropImage($event) {
    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.readImageAsDataUrl)($event, dataUrl => {
      this.cropImageModal.imageUrl = dataUrl;
      this.cropImageModal.open();
    });
  }
  onImageCropped(imageUrl) {
    this.imageService.add({
      dataUrl: imageUrl,
      pathPrefix: 'avatar'
    }).subscribe(id => {
      var _a;
      (_a = this.form.controls['avatar']) === null || _a === void 0 ? void 0 : _a.setValue(id);
      this.cropImageModal.close();
    });
  }
  refreshProfile() {
    this.userService.getEditProfile().subscribe(profile => {
      this.profile = profile;
      (0,_admin_utils_settings__WEBPACK_IMPORTED_MODULE_1__.applyProfileMappingToForm)(this.profileMappings, profile);
      if (profile.birthday) profile.birthday = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_3__.toNormalDate)(profile.birthday);
      this.form.reset(profile);
    });
  }
  saveMasterProfile() {
    const request = this.masterProfileComponent.submit();
    if (!request) return;
    this.updateUserData(request);
  }
}
PersonalDataComponent.ɵfac = function PersonalDataComponent_Factory(t) {
  return new (t || PersonalDataComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_4__.ManageImageApiService));
};
PersonalDataComponent.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: PersonalDataComponent,
  selectors: [["mg-personal-data"]],
  viewQuery: function PersonalDataComponent_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.masterProfileComponent = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.cropImageModal = _t.first);
    }
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵProvidersFeature"]([_services_manage_image_api_service__WEBPACK_IMPORTED_MODULE_4__.ManageImageApiService])],
  decls: 4,
  vars: 4,
  consts: [[3, "ngIf", "ngIfElse"], ["userProfile", ""], [3, "master", "editMode", "errorHtml"], ["masterProfileComponent", ""], [1, "uk-margin"], ["type", "submit", 1, "uk-button", "uk-button-primary", 3, "click"], ["uk-icon", "icon: download", 1, "uk-margin-small-right"], [3, "formGroup", "ngSubmit"], ["type", "submit", 1, "uk-button", "uk-button-primary"], [3, "errorHtml"], [1, "uk-modal-body"], ["uk-grid", "", 1, "uk-grid-small"], ["uk-form-custom", ""], ["class", "uk-border-circle mg-background-green-main uk-overflow-hidden", "style", "padding: 10px;width: 200px; height: 200px;", 4, "ngIf", "ngIfElse"], ["imgAvatar", ""], [1, "uk-margin", "uk-text-center"], ["type", "file", "id", "cardImage", "accept", "image/*", 3, "change"], ["for", "firstName", 1, "uk-form-label"], [1, "uk-form-controls"], ["type", "text", "placeholder", "\u0406\u043C\u02BC\u044F", "formControlName", "firstName", "id", "firstName", 1, "uk-input"], ["for", "lastName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u0440\u0456\u0437\u0432\u0438\u0449\u0435", "formControlName", "lastName", "id", "lastName", 1, "uk-input"], ["for", "middleName", 1, "uk-form-label"], ["type", "text", "placeholder", "\u041F\u043E-\u0431\u0430\u0442\u044C\u043A\u043E\u0432\u0456", "formControlName", "middleName", "id", "middleName", 1, "uk-input"], ["for", "birthday", 1, "uk-form-label"], [1, "uk-inline", "w-100"], ["uk-icon", "icon: calendar", 1, "uk-form-icon", "uk-form-icon-flip", "mg-text-green-main"], ["type", "date", "placeholder", "\u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F", "formControlName", "birthday", "id", "birthday", 1, "uk-input"], ["for", "email", 1, "uk-form-label"], ["type", "email", "placeholder", "\u0415\u043C\u0435\u0439\u043B", "formControlName", "email", "id", "email", 1, "uk-input"], ["for", "phoneNumber", 1, "uk-form-label"], ["type", "tel", "placeholder", "\u041C\u043E\u0431\u0456\u043B\u044C\u043D\u0438\u0439 \u0442\u0435\u043B\u0435\u0444\u043E\u043D", "formControlName", "phoneNumber", "id", "phoneNumber", 1, "uk-input"], [3, "circleCropper", "saveOptions", "aspectRatio", "onSave"], ["cropImageModal", ""], [1, "uk-border-circle", "mg-background-green-main", "uk-overflow-hidden", 2, "padding", "10px", "width", "200px", "height", "200px"], [1, "uk-border-circle", "uk-overflow-hidden", "mg-text-green"], ["uk-icon", "icon: avatar;"], ["width", "200", "height", "200", "loading", "lazy", "alt", "Master card image avatar", 1, "uk-border-circle", "uk-background-primary", 2, "padding", "10px", 3, "src", "loadeddata", "error"]],
  template: function PersonalDataComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](0, PersonalDataComponent_ng_template_0_Template, 6, 3, "ng-template", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](1, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, PersonalDataComponent_ng_template_2_Template, 53, 8, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplateRefExtractor"]);
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵreference"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](1, 2, ctx.isMaster$))("ngIfElse", _r1);
    }
  },
  directives: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _edit_master_profile_edit_master_profile_component__WEBPACK_IMPORTED_MODULE_6__.EditMasterProfileComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormGroupDirective, _mg_shared_components_list_errors_list_errors_component__WEBPACK_IMPORTED_MODULE_7__.ListErrorsComponent, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormControlName, _mg_shared_components_image_cropp_modal_image_cropp_modal_component__WEBPACK_IMPORTED_MODULE_8__.ImageCroppModalComponent],
  pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.AsyncPipe, _mg_shared_pipes_image_pipe__WEBPACK_IMPORTED_MODULE_9__.ImagePipe],
  styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwZXJzb25hbC1kYXRhLmNvbXBvbmVudC5zY3NzIn0= */"]
});

/***/ }),

/***/ 66671:
/*!*******************************************************************************************!*\
  !*** ./src/app/pages/user-profile/pages/user-profile-page/user-profile-page.component.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfilePageComponent": () => (/* binding */ UserProfilePageComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 18259);
/* harmony import */ var _services_mg_component_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../services/mg-component.service */ 26260);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 48750);




function UserProfilePageComponent_h3_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u041F\u0440\u043E\u0444\u0456\u043B\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function UserProfilePageComponent_h3_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class UserProfilePageComponent {
    constructor(componentService, activatedRoute) {
        this.componentService = componentService;
        this.activatedRoute = activatedRoute;
        this.currentTab = 0;
        this.componentService.changeState({ isFooterBar: false });
    }
    ngOnInit() {
        this.activatedRoute.url.subscribe(() => {
            var _a;
            const data = this.activatedRoute.snapshot.firstChild.data;
            this.currentTab = (_a = data === null || data === void 0 ? void 0 : data.index) !== null && _a !== void 0 ? _a : 0;
        });
    }
    ngOnDestroy() {
        this.componentService.changeState({ isFooterBar: true });
    }
    ngAfterContentInit() {
    }
}
UserProfilePageComponent.ɵfac = function UserProfilePageComponent_Factory(t) { return new (t || UserProfilePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_mg_component_service__WEBPACK_IMPORTED_MODULE_0__.MgComponentService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__.ActivatedRoute)); };
UserProfilePageComponent.ɵcmp = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: UserProfilePageComponent, selectors: [["mg-user-profile-page"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([])], decls: 15, vars: 8, consts: [["uk-grid", ""], [1, "uk-column-span", "uk-width-1-5@m"], [1, "uk-width-4-5@m"], [4, "ngIf"], [1, "uk-width-1-5@m"], ["uk-tab", "", 1, "uk-tab-right"], [3, "routerLink"]], template: function UserProfilePageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, UserProfilePageComponent_h3_3_Template, 2, 0, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, UserProfilePageComponent_h3_4_Template, 2, 0, "h3", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4)(6, "ul", 5)(7, "li", 6)(8, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "\u041F\u0440\u043E\u0444\u0456\u043B\u044C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "li", 6)(11, "a");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "\u0417\u043C\u0456\u043D\u0438\u0442\u0438 \u043F\u0430\u0440\u043E\u043B\u044C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "router-outlet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.currentTab == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.currentTab == 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("uk-active", ctx.currentTab == 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", "/user-profile");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("uk-active", ctx.currentTab == 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", "/user-profile/change-password");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterOutlet], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ1c2VyLXByb2ZpbGUtcGFnZS5jb21wb25lbnQuc2NzcyJ9 */"] });


/***/ }),

/***/ 23376:
/*!*******************************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile-routing.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileRoutingModule": () => (/* binding */ UserProfileRoutingModule)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 73903);
/* harmony import */ var _pages_user_profile_page_user_profile_page_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/user-profile-page/user-profile-page.component */ 66671);
/* harmony import */ var _components_personal_data_personal_data_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/personal-data/personal-data.component */ 54319);
/* harmony import */ var _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/change-password/change-password.component */ 6613);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 18259);






const routes = [
    {
        path: '',
        component: _pages_user_profile_page_user_profile_page_component__WEBPACK_IMPORTED_MODULE_0__.UserProfilePageComponent,
        children: [
            { path: '', component: _components_personal_data_personal_data_component__WEBPACK_IMPORTED_MODULE_1__.PersonalDataComponent, data: { index: 0 } },
            { path: 'change-password', component: _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_2__.ChangePasswordComponent, data: { index: 1 } },
        ]
    }
];
class UserProfileRoutingModule {
}
UserProfileRoutingModule.ɵfac = function UserProfileRoutingModule_Factory(t) { return new (t || UserProfileRoutingModule)(); };
UserProfileRoutingModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: UserProfileRoutingModule });
UserProfileRoutingModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](UserProfileRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule] }); })();


/***/ }),

/***/ 71749:
/*!***********************************************************!*\
  !*** ./src/app/pages/user-profile/user-profile.module.ts ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserProfileModule": () => (/* binding */ UserProfileModule)
/* harmony export */ });
/* harmony import */ var _user_profile_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-profile-routing.module */ 23376);
/* harmony import */ var _pages_user_profile_page_user_profile_page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/user-profile-page/user-profile-page.component */ 66671);
/* harmony import */ var _components_personal_data_personal_data_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/personal-data/personal-data.component */ 54319);
/* harmony import */ var _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/change-password/change-password.component */ 6613);
/* harmony import */ var _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../mg-shared/mg-shared.module */ 51839);
/* harmony import */ var _components_edit_master_profile_edit_master_profile_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/edit-master-profile/edit-master-profile.component */ 76436);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 18259);







class UserProfileModule {
}
UserProfileModule.ɵfac = function UserProfileModule_Factory(t) { return new (t || UserProfileModule)(); };
UserProfileModule.ɵmod = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({ type: UserProfileModule });
UserProfileModule.ɵinj = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({ imports: [[
            _mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_4__.MgSharedModule,
            _user_profile_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserProfileRoutingModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](UserProfileModule, { declarations: [_pages_user_profile_page_user_profile_page_component__WEBPACK_IMPORTED_MODULE_1__.UserProfilePageComponent,
        _components_personal_data_personal_data_component__WEBPACK_IMPORTED_MODULE_2__.PersonalDataComponent,
        _components_change_password_change_password_component__WEBPACK_IMPORTED_MODULE_3__.ChangePasswordComponent,
        _components_edit_master_profile_edit_master_profile_component__WEBPACK_IMPORTED_MODULE_5__.EditMasterProfileComponent], imports: [_mg_shared_mg_shared_module__WEBPACK_IMPORTED_MODULE_4__.MgSharedModule,
        _user_profile_routing_module__WEBPACK_IMPORTED_MODULE_0__.UserProfileRoutingModule] }); })();


/***/ })

}]);
//# sourceMappingURL=src_app_pages_user-profile_user-profile_module_ts.js.map