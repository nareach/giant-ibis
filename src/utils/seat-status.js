import { exclusiveVipSeaterData } from "@/components/seat-layut-data/exclusive-vip-seater";
import { kiaGrandBirdSeatDataLayout } from "@/components/seat-layut-data/kia-grand-bird-data-seat-layout";
import { kiaGrandBirdSeatDataLayoutBottom } from "@/components/seat-layut-data/kia-grand-bird-data-seat-layout-bottom";
import { kiaGrandBirdSeatDataLayoutTop } from "@/components/seat-layut-data/kia-grand-bird-data-seat-layout-top";
import { nExclusiveVipSeaterData } from "@/components/seat-layut-data/n-exclusive-vip-seater";
import { sleeerBusSeatDataLayout } from "@/components/seat-layut-data/sleeper-bus-data-layout";
import { sleeerBusSeatDataLayoutBottom } from "@/components/seat-layut-data/sleeper-bus-data-layout-bottom";
import { universeCounty } from "@/components/seat-layut-data/univer-county";
import { universeLuxury } from "@/components/seat-layut-data/universe-luxury";
import { universeLuxury27Data } from "@/components/seat-layut-data/universe-luxury-27";
import { universeNode37Data } from "@/components/seat-layut-data/universe-noble-37";
import { BusType } from "@/enum/BusType";
import { RockingChair, Toilet } from "lucide-react";

export const seatStatusConfig = {
    hide: { disabled: true },
    sold: { disabled: true },
    wc: { disabled: true },
    reserved: { disabled: true },
    available: { disabled: false }
};


export const renderBusLayout = (status, seat) => {
    switch (status) {
        case 'hide':
            return <></>;
        case 'Available':
            return <div className="flex flex-col items-center ">
                <RockingChair className="w-8 h-8" />
                <span className="text-xs font-medium text-white">{seat}</span>
            </div>;
        case 'Reserved':
            return <div className="flex flex-col items-center ">
                <RockingChair className="w-8 h-8" />
                <span className="text-xs font-medium text-white">{seat}</span>
            </div>;
        case 'selected':
            return <div className="flex flex-col items-center ">
                <RockingChair className="w-8 h-8" />
                <span className="text-xs font-medium text-white">{seat}</span>
            </div>;
        case 'Booked':
            return <div className="flex flex-col items-center ">
                <RockingChair className="w-8 h-8" />
                <span className="text-xs font-medium text-white">{seat}</span>
            </div>;
        case 'wc':
            return (<div className='flex flex-col items-center'>
                <Toilet className="w-7 h-7" />
                <span className="text-xs font-medium">WC</span>
            </div>)
    }
};


export const getAllSeatLayout = (busType) => {
    switch (busType) {
        case BusType.UNIVERSE_LUXURY:
            return universeLuxury;

        case BusType.UNIVERSE_NOBLE_37:
            return universeNode37Data;

        case BusType.EXCLUSIVE_VIP_SEATER:
            return exclusiveVipSeaterData;

        case BusType.UNIVERSE_LUXURY_27:
            return universeLuxury27Data;

        case BusType.UNIVERSE_COUNTY:
            return universeCounty;

        case BusType.N_EXCLUSIVE_VIP_SEATER:
            return nExclusiveVipSeaterData;

        case BusType.SLEEPER_BUS:
            return sleeerBusSeatDataLayout;

        case BusType.KIA_GRANDBIRD:
            return kiaGrandBirdSeatDataLayout;

        // return [kiaGrandBirdSeatDataLayoutBottom, kiaGrandBirdSeatDataLayoutTop];

        default:
            return null;
    }
}