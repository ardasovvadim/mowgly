import {LocationViewModel} from '../../app/models/locations/location.view.model';
import {IdName} from '../../app/models/timetable-records/timetable-record.view.model';

export interface LocationEditModel extends LocationViewModel {
    sections: IdName[];
}
