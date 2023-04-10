import {IdName} from "../timetable-records/timetable-record.view.model";

export interface NewsVm {
  id?: string;
  title: string;
  description: string;
  author: string;
  createdDate: string;
  imageUrl: string;
  authorAvatar: string;
  categoryId?: string;
  categoryName?: string;
}

export interface NewsDetailsVm extends NewsVm {
  authorId?: string;
  tournamentId?: string;
  blocks: NewsBlock[];
}

export enum NewsBlockType {
  None = 0,
  Text,
  Video,
  Image,
  TournamentResultsTable
}

export interface NewsBlock {
  order: number;
  type: NewsBlockType;
  data: string;
}

export interface NewsImageBlock {
  url: string;
  caption: string;
}

export interface TournamentEditModel {
  id: string;
  name: string;
  actionDate: string;
}

export interface TournamentResultsData extends TournamentEditModel {
  results: TournamentResult[];
}

export interface TournamentResult {
  id: string;
  student: IdName;
  place: string;
  score: string;
  additionalInfo: string;
  awards: string;
}
