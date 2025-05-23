import { getHotelList } from "@/services/giantIbisServiceCall";

export class HotelService {

    async findHotelBycityId(cityId){

        return await getHotelList({
            city_id: cityId,
        });
    }

}

export const hotelService = new HotelService();