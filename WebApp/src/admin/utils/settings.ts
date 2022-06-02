import {getValueOrDefault, setOrCreateSetting} from '../../app/models/general-setting.view.model';
import {ProfileMaps} from '../models/profile.model';

export function applyProfileMappingToForm(profileMappings: ProfileMaps, data: any, profilesKey: string = 'profiles') {
    if (!data[profilesKey])
        data[profilesKey] = []

    for (let formKey in profileMappings) {
        const profile = profileMappings[formKey]
        data[formKey] = getValueOrDefault(data[profilesKey], profile.key, profile.defaultValue)
    }
}

export function applyProfileMappingToData(profileMappings: ProfileMaps, data: any, profilesKey: string = 'profiles') {
    for (let formKey in profileMappings) {
        const profile = profileMappings[formKey]
        setOrCreateSetting(data[profilesKey], profile.key, data[formKey], profile.type)
    }
}
