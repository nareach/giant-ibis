import {
    Bus,
    Armchair,
    CreditCard,
} from "lucide-react";

export const BookProgress = ({activeStep}) => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-4 my-12 mx-4">
            <div className="flex flex-col items-center gap-2 m-2">
                <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-sm ${activeStep === "select"
                        ? "bg-primary text-white"
                        : "border border-primary text-primary"
                        }`}
                >
                    <Bus className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className="text-xs sm:text-sm  text-Textcolor">Select</span>
            </div>
            <div className="w-36 h-[2px] bg-gray-200 hidden sm:block" />

            <div className="flex flex-col items-center gap-2 m-2">
                <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${activeStep === "seat"
                        ? "bg-primary text-white"
                        : "border border-primary text-primary"
                        }`}
                >
                    <Armchair className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className="text-xs sm:text-sm text-Textcolor">Select Seat</span>
            </div>
            <div className="w-36 h-[2px] bg-gray-200 hidden sm:block" />
            <div className="flex flex-col items-center gap-2 m-2">
                <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${activeStep === "pay"
                        ? "bg-primary text-white"
                        : "border border-primary text-primary"
                        }`}
                >
                    <CreditCard className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <span className="text-xs sm:text-sm text-Textcolor">Pay</span>
            </div>
        </div>
    );
}