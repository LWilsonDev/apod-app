import axios, {AxiosResponse} from "axios";
import Constants from "expo-constants";

const NASA_API_KEY = Constants.manifest?.extra?.nasaApiKey || "DEMO_KEY";

export const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export type apodResponse = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};
