import {getValueOrDefault, setOrCreateSetting} from '../../app/models/general-setting.view.model';
import {ProfileMaps} from '../models/profile.model';

export function applyProfileMappingToForm(profileMappings: ProfileMaps, data: any) {
    if (!data.profiles)
        data.profiles = []

    for (let formKey in profileMappings) {
        const profile = profileMappings[formKey]
        data[formKey] = getValueOrDefault(data.profiles, profile.key, profile.defaultValue)
    }
}

export function applyProfileMappingToData(profileMappings: ProfileMaps, data: any) {
    for (let formKey in profileMappings) {
        const profile = profileMappings[formKey]
        setOrCreateSetting(data.profiles, profile.key, data[formKey], profile.type)
    }
}
