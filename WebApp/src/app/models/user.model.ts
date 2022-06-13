import {GeneralSettingVm} from './general-setting.view.model';

export interface RegistrationModel {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    password: string;
}

export interface UserValidationResponse {
    isSuccess: boolean;
    errors: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    isSuccess: boolean;
    errorMessage: string;
    token: string;
}

export interface UserProfile {
    id: string;
    email: string;
    name: string;
    birthday: string;
    roles: string[];
    permissions: string[];
    profiles: GeneralSettingVm[];
}

export interface UserEditProfile {
    firstName: string;
    lastName: string;
    middleName: string;
    email: string;
    birthday: string;
    phoneNumber: string;
    profiles: GeneralSettingVm[];
}

export interface CachedItem<T> {
    time: string;
    item: T;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}
