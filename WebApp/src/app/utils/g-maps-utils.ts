import {environment} from "../../environments/environment";

export abstract class GMapsUtils {

    static getMapUrl = (address: string): string => `https://www.google.com/maps/search/?api=1&query=${address}`;

    static getEmbedUrl = (address: string): string => `https://www.google.com/maps/embed/v1/place?key=${environment.googleMapsApiKey}&q=${address}`;

}
