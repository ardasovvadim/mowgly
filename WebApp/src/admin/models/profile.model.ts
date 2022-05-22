import {DataType} from '../../app/models/data-type';

export type ProfileMaps = {[formKey: string]: ProfileMap}

export interface ProfileMap {
    key: string;
    type: DataType;
    defaultValue?: any;
}
