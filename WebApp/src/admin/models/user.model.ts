import {GeneralSettingVm} from '../../app/models/general-setting.view.model';
import {FilterPageRequest} from '../../app/models/page-request';

export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  email: string;
  phone: string;
}

export interface AdminUserVm {
  id: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  fullName: string;
  birthday?: string;
  email: string;
  phoneNumber?: string;
  userTypes: UserType;
  settings: GeneralSettingVm[];
}

export interface UserEditModel {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  birthday: string;
  email: string;
  phoneNumber: string;
  userTypes: UserType;
  profiles: GeneralSettingVm[];
}

export interface UserGetListRequest extends FilterPageRequest {
  userType?: number;
}

export enum UserType {
  None = 0,
  Moderator = 1 << 0,
  Student =  1 << 1,
  Master =  1 << 2,
  Admin = 1 << 3,
  Parent = 1 << 4,
}

export const userTypes = [
  {key: UserType.Moderator, value: 'Модератор'},
  {key: UserType.Student, value: 'Ученик'},
  {key: UserType.Master, value: 'Інструктор'},
  {key: UserType.Admin, value: 'Администратор'},
  {key: UserType.Parent, value: 'Родитель'},
]
