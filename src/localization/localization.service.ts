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
    
}

