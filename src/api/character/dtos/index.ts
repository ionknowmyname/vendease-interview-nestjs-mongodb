import { GENDER, STATUS } from 'src/constants';

export class CharacterCreateDto {
  first_name: string;
  last_name: string;
  status: STATUS;
  gender: GENDER;
  state_of_origin: string;
  location?: LocationCreateDto;
  episode_codes?: string[];
}

export class LocationCreateDto {
  name: string;
  latitude: number;
  longitude: number;
}

export class EpisodeCreateDto {
  name: string;
  episode_code: string;
  release_date: Date;
  characters?: CharacterCreateDto[];
  episode_comments?: CommentCreateDto[];
}

export class CommentCreateDto {
  comment: string;
  ip_address_location: string;
}