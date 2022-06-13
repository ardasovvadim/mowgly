import {IdName} from '../../app/models/timetable-records/timetable-record.view.model';

export interface GetRolesResponse {
    roles: RoleDto[];
    permissions: IdName[];
}

export interface RoleDto {
    id: string;
    name: string;
    permissions: string[];
}
