import { cn } from "@/lib/utils";
import { BusType } from "@/enum/BusType";
import ParentSeatLayout from "../all-seat-layout/ParentSeatLayout";
import { universeCounty } from "@/components/seat-layut-data/univer-county";
import NExclusiveVipSeater from "../all-seat-layout/NEXclusiveVIPSeater";
import { universeLuxury27Data } from "@/components/seat-layut-data/universe-luxury-27";
import { exclusiveVipSeaterData } from "@/components/seat-layut-data/exclusive-vip-seater";
import SleepeerBus from "../all-seat-layout/SleeperBus";
import KiaGrandbird from "../all-seat-layout/KiaGrandbird";
import { universeLuxury } from "@/components/seat-layut-data/universe-luxury";

export const SeatLayout = ({ onSelectSeat, busType, allSeatStatus }) => {


    const renderBusLayout = () => {
        switch (busType) {
            case BusType.UNIVERSE_LUXURY:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.UNIVERSE_NOBLE_37:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.EXCLUSIVE_VIP_SEATER:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.UNIVERSE_LUXURY_27:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.UNIVERSE_COUNTY:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.SLEEPER_BUS:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;

            case BusType.N_EXCLUSIVE_VIP_SEATER:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;


            case BusType.KIA_GRANDBIRD:
                return <ParentSeatLayout
                    busType={busType}
                    onClick={(seat) => onSelectSeat(seat)}
                    seatData={allSeatStatus}
                />;


            default:
                return <div className="text-center">
                    No layout available for: {busType}
                </div>;
        }
    };

    return (
        <div className={cn("seat-layout-container")}>
            {renderBusLayout()}
        </div>
    );
}