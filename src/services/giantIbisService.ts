import axios from 'axios';
import FormData from 'form-data';

type GiantIbisApiFunction = 'get_routeList' | 'get_route_timing' | 'get_cityList' | 'get_address' | 'get_busList' | 'get_route_bus' | 'confirm_Booking' | 'get_booking_detail' | 'get_bus_status' | 'print_ticket';

export const callGiantIbisApi = async (apiFunction: GiantIbisApiFunction, payload?: Record<string, any>) => {
  const formData = new FormData();
  formData.append('api_function', apiFunction);
  
  if (payload) {
    Object.entries(payload).forEach(([key, value]) => {
      formData.append(key, value);
    });
  }

  try {
    const response = await axios.post(
      'https://www.giantibis.com/beta1/api-booking.php',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          Cookie: 'PHPSESSID=ta5vok3vooe4222g21km42p171'
        },
        maxBodyLength: Infinity
      }
    );

    return response.data;
  } catch (error) {
    console.error('Giant Ibis API error:', error);
    throw error;
  }
};