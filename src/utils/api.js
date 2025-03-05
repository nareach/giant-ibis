import { API_URL } from "@/constant/constant";

export const fetchFromApi = async (apiFunction, bodyData = {}) => {
<<<<<<< HEAD
  const myHeaders = new Headers();
  myHeaders.append("Cookie", "PHPSESSID=3u01lnipofpe8o5f83sbu8mm41");

  // Create FormData and append api_function
  const formData = new FormData();
  formData.append("api_function", apiFunction);

  // Append extra body data if provided
  for (const [key, value] of Object.entries(bodyData)) {
    formData.append(key, value);
  }

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formData,
    redirect: "follow",
=======
    const myHeaders = new Headers();
    myHeaders.append("Cookie", "PHPSESSID=3u01lnipofpe8o5f83sbu8mm41");
  
    // Create FormData and append api_function
    const formdata = new FormData();
    formdata.append("api_function", apiFunction);
  
    // Append extra body data if provided
    for (const [key, value] of Object.entries(bodyData)) {
      formdata.append(key, value);
    }
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
  
    try {
      const response = await fetch(
        "https://www.giantibis.com/beta1/api-booking.php",
        requestOptions
      );
      const result = await response.text();
      // console.log(result);
      // return result;
      return JSON.parse(result);
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
>>>>>>> fd5007466c9038df5c78265be3f48dae4ab50c8f
  };

  try {
    const response = await fetch(API_URL, requestOptions);
    
    if (!response.ok) {
      // Log the response status and status text
      console.error("API Error: HTTP status", response.status, response.statusText);
      return null; // or handle error more specifically based on your needs
    }

    const text = await response.text(); // Get the response text first
    if (!text) {
      console.error("API returned empty response");
      return null;
    }

    try {
      return JSON.parse(text); // Parse text as JSON
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError, "Response text:", text);
      throw parseError;
    }
  } catch (error) {
    console.error("Network or other error:", error);
    throw error;
  }
};
