
import { environment } from "../../../environments/environment.development";

const serverIp = environment.apiUrl;

export const API = {
    auth: `${serverIp}/auth`,
    register: `${serverIp}/register`,
    enters: `${serverIp}`,
    enter:`${serverIp}/enter/:id`,
    config: `/config/config.json`,

   }
