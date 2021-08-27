import axios, {AxiosResponse} from "axios";
import Constants from "expo-constants";

const NASA_API_KEY = Constants.manifest?.extra?.nasaApiKey || "DEMO_KEY";

export const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export type ApodData = {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
};

export type APODResponse = {
  success: boolean;
  data: ApodData | undefined;
  error: string;
};

export const fetchData = async (): Promise<APODResponse> => {
  let success = false;
  let error = "";
  let data: ApodData | undefined = undefined;
  await axios(APOD_URL)
    .then((res) => {
      if (res.data) {
        success = true;
        data = res.data;
      }
    })
    .catch((e) => {
      success = false;
      error = "Error fetching APOD";
    });
  return {success, data, error};
};
