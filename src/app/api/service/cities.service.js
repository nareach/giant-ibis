import { getCity } from "@/services/giantIbisServiceCall";

export class CityService {

    async getAllCity() {
        return await this.findAllCity();
    }


    async findAllCity() {
        return await getCity();
    }

}

export const cityService = new CityService();