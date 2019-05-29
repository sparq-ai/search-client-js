import {AxiosInstance} from "axios";
import Axios from "axios";
import {getServers} from "./Util";
import {UserIdResponse} from "./TypeDefs";

export class TrackingClient {
  globalUserId!: string | null;
  customUserId!: string;
  private trackingRestClient!: AxiosInstance;
  trackField: string = "id";

  constructor(public searchToken: string) {
    this.trackingRestClient = Axios.create({
      baseURL: getServers().tracking,
      headers: {
        "authorization": "Bearer " + this.searchToken,
        "content-type": "application/json"
      }
    });
  }

  async requestUserId(): Promise<UserIdResponse | null> {
    let userIdResponse = await this.trackingRestClient.post("/u").catch(x => x.response);
    if (userIdResponse.status === 200) {
      let userIdBody: UserIdResponse = userIdResponse.data;
      this.globalUserId = userIdBody.data.userId;
      return userIdBody;
    } else {
      console.log(`Failed to get UserId for Search client.Received Response: ${userIdResponse.status}`);
      return null;
    }
  }

  async tq(searchResponse: any) {
    let userIdResponse = await this.trackingRestClient.post("query").catch(x => x.response);
  }

}