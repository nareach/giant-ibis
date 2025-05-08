import { cn } from "@/lib/utils";
import { BusType } from "@/enum/BusType";
import ParentSeatLayout from "../all-seat-layout/ParentSeatLayout";

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

            case BusType.UNIVERSE_NOBLE:
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