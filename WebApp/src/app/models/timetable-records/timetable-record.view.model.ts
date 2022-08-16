import {DayOfWeek} from './day-of-week';

export class TimetableRecordLocationGroupVm {
  city: string = '';
  sectionId: string = '';
  sectionName: string = '';
  locationId: string = '';
  locationName: string = '';
  group?: number;
  masters: TimetableRecordMasterGroupVm[] = [];
}

export interface IdName {
  id: string;
  name: string;
}

export interface LocationSectionOptions extends IdName {
  id: string;
  name: string;
  sections: IdName[];
}

export interface AdminTimetableRecordsResponse {
  data: TimetableRecordEditModel[];
  locations: IdName[];
  sections: IdName[];
  masters: IdName[];
}

export interface TimetableRecordEditModel {
  id?: string;
  locationId: string;
  sectionId: string;
  masterId: string;
  dayOfWeek?: number;
  startTime: string;
  endTime: string;
  group?: number;
}

export class TimetableRecordMasterGroupVm {
  masterId: string = '';
  masterName: string = '';
  timetables: TimetableRecordVm[] = [];
}

export class TimetableRecordVm {
  id: string = '';
  dayOfWeek: DayOfWeek = 0;
  startTime: string = '';
  endTime: string = '';
}
