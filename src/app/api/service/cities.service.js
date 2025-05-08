import { getCity, getRouteList } from "@/services/giantIbisServiceCall";

export class CityService {

    async getAllCity() {
        return await this.findAllCity();
    }


    async findAllCity() {
        return await getCity();
    }

    async findDestinationAvalableForOrigin(origin) {
        const cities = await this.findAllCity();

        const routeList = await this.findAllRoute();

        const originRoute = routeList?.data?.filter((route) => route.origin == origin)
        const destinationIds = originRoute?.map(item => item.destination)
        const uniqueDestinationIds = [...new Set(destinationIds)];
        const filteredCities = cities?.data?.filter(city =>
            uniqueDestinationIds.includes(city.city_id)
        );

        return filteredCities
    }


    async findAllRoute() {
        return await getRouteList();
    }

}

export const cityService = new CityService();