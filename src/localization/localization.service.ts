import { env } from 'process';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LatLong } from './model';
import axios from 'axios';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Injectable()
export class LocalizationService {
    private url: string
    constructor(private config: ConfigService){
        this.url = "https://api.openrouteservice.org/"
    }
    
    async getAddressCoordinates(address: string): Promise<LatLong> {
        const response = await axios.get(this.url + "geocode/search", {
            params: {
                api_key: this.config.get('OPENROUTE_API_KEY'),
                text: address
            }
        })

        if(!response) {
            throw new InternalServerErrorException("Address validation failed.");
        }

        const returnObj = {
            lat: response.data.features[0].geometry.coordinates[1],
            long: response.data.features[0].geometry.coordinates[0]
        }
        console.log(returnObj);
        return returnObj;
    }



    // Calculated with the Haversine Formula. https://www.movable-type.co.uk/scripts/latlong.html
    areCoordinatesInRange(coord1: LatLong, coord2: LatLong, range: number): boolean {
        const R = 6371e3; // metres
        const lat1InRadians = coord1.lat * Math.PI/180; // φ, λ in radians
        const lat2InRadians = coord2.lat * Math.PI/180;
        const latitudeDifferenceInRadians = (coord2.lat-coord1.lat) * Math.PI/180;
        const longitudeDifferenceInRadians = (coord2.long-coord1.long) * Math.PI/180;

        const a =   Math.sin(latitudeDifferenceInRadians/2) 
                    * Math.sin(latitudeDifferenceInRadians/2)
                    + Math.cos(lat1InRadians) * Math.cos(lat2InRadians)
                    * Math.sin(longitudeDifferenceInRadians/2) 
                    * Math.sin(longitudeDifferenceInRadians/2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const d = R * c; // in metres

        return d <= range;
    }
    
}

