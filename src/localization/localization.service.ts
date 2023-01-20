import { env } from 'process';

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { LatLong } from './model';
import axios from 'axios';
import { response } from 'express';


@Injectable()
export class LocalizationService {
    url = "https://api.openrouteservice.org/";
    async getAddressCoordinates(address: string): Promise<LatLong> {
        const response = await axios.get(this.url + "geocode/search", {
            params: {
                api_key: process.env.OPENROUTE_API_KEY,
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
        

        // if (!response) {
        //     throw new InternalServerErrorException("Address validation failed.");

        // }
        

        



    }
}

