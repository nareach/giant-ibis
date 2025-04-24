export const getStatusColor = (status) => {
    switch (status) {
        case "Available":
            return "bg-gray-300 hover:bg-gray-400 text-white cursor-pointer";
        case "Reserved":
            return "bg-red-500 text-white cursor-not-allowed";
        case "Booked":
            return "bg-red-500 text-white cursor-not-allowed";
        case "selected":
            return "bg-blue-600 text-white cursor-pointer";
        case "hide":
            return "bg-transparent";
        case "wc":
            return "bg-white border-1 border-gray-300";
        default:
            return "bg-gray-300 hover:bg-gray-400 text-white cursor-pointer";
    }
};