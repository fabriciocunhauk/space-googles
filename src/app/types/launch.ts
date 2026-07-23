export type LaunchData = {
  id: string;
  name: string;
  date_utc: string;
  date_unix: number;
  upcoming: boolean;
  flight_number: number;
  details?: string | null;
  rocket: {
    id: string;
    name: string;
  };
  launchpad: {
    id: string;
    name: string;
    full_name: string;
  };
  links: {
    patch: {
      small?: string | null;
      large?: string | null;
    };
    youtube_id?: string | null;
    wikipedia?: string | null;
    article?: string | null;
  };
  agency?: {
    name: string;
    type: string;
  };
  status?: {
    name: string;
    abbrev: string;
  };
  missionType?: string | null;
  orbit?: string | null;
  payloads: { name: string }[];
};
