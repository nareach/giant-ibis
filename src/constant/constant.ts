
export const API_URL = process.env.API_URL || "https://www.giantibis.com/beta1/api-booking.php";

export const ACLEDA_BANK_API = process.env.ACLEDA_BANK_API || 'https://epaymentuat.acledabank.com.kh:8443/GIANTIBIS/XPAYConnectorServiceInterfaceImplV2/XPAYConnectorServiceInterfaceImplV2RS/openSessionV2';
export const ACLEDA_BANK_API_CHECK_STATUS = process.env.ACLEDA_BANK_API_CHECK_STATUS || 'https://epaymentuat.acledabank.com.kh:8443/GIANTIBIS/XPAYConnectorServiceInterfaceImplV2/XPAYConnectorServiceInterfaceImplV2RS/getTxnStatus';

// send mail
export const fromMail = "info@giantibis.com";



export const loginId = process.env.loginId || "GIANTuser";
export const password = process.env.password || "GIANTuser123$$";
export const merchantID = process.env.merchantID || "QxSy5wACjfT1eLDTIaL8M6NNKGs=";
export const signature = process.env.signature || "241654c3d1ef";
export const merchantName = "GIANTIBIS";


export const API_KEY = "ce3e3f95a317e31ac46e98cd32dd00b38b3e1488";
export const CLIENT_URL = "https://giant-ibis-three.vercel.app";
export const API_URL_NEXT = process.env.API_URL || `${CLIENT_URL}/api`;


// http://localhost:3000
// https://giant-ibis-three.vercel.app