import { Show } from "./definitions/Show";

const rootUrl = "http://localhost:3000";

export const getAllShows = async (): Promise<Show[]> => {
  const response: any = await fetch(`${rootUrl}/shows`);
    
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    //TODO: Error handle
    throw new Error (response.statusText);
  }
};