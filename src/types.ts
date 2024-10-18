import { Point } from 'ol/geom';

export interface SecretResponse {
  message: string;
}

export type Rebel = {
  id: number;
  long: number;
  lat: number;
  coordinates?: Point;
  distance?: number;
};

export interface RebelInfo extends Rebel {
  name?: string;
  image?: string;
  mass?: number;
  height?: number;
  died?: number;
  gender?: string;
  eyeColor?: string;
  skinColor?: string;
  species?: string;
}
