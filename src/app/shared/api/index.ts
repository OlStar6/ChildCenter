
import { environment } from "../../../environments/environment.development";

const serverIp = environment.apiUrl;

export const API = {
    auth: `${serverIp}/auth`,
    register: `${serverIp}/register`,
    enters: `${serverIp}`,
    
    config: `/config/config.json`,

   }
