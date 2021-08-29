import axios, {AxiosResponse} from "axios";
import Constants from "expo-constants";

const NASA_API_KEY = Constants.manifest?.extra?.nasaApiKey || "DEMO_KEY";

export const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&thumbs=true`;

export type ApodData = {
  copyright: string;
  date: string;
  explanation: string;
  thumbnail_url: string; // thumbnail for video - must set 'thumbs' to true in request
  media_type: "image" | "video";
  service_version: string;
  title: string;
  url: string;
};

export type APODResponse = {
  success: boolean;
  data: ApodData | undefined;
  error: string;
};

export const fetchData = async (date?: string): Promise<APODResponse> => {
  let success = false;
  let error = "";
  let data: ApodData | undefined = undefined;
  const url = date ? `${APOD_URL}&date=${date}` : APOD_URL;
  console.log("url", url);
  await axios(url)
    .then((res) => {
      if (res.data) {
        success = true;
        data = res.data;
      }
    })
    .catch((e) => {
      success = false;
      error = "Houston, we have a problem..." + e; // had to be done.;
    });
  return {success, data, error};
};
