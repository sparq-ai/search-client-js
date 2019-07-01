import {AxiosInstance} from "axios";
import Axios from "axios";
import {getServers} from "../Util";
import {UserIdResponse} from "./UserIdResponse";
import {TrackingData} from "./TrackingData";

export class TrackingClient {
  globalUserId!: string | null;
  customUserId!: string;
  private trackingRestClient!: AxiosInstance;
  trackField: string = "id";
  collectionId!: string;
  private ipv4Address!: string;

  constructor(public searchToken: string) {
    this.trackingRestClient = Axios.create({
      baseURL: getServers().tracking,
      headers: {
        "authorization": "Bearer " + this.searchToken,
        "content-type": "application/json"
      }
    });
    this.getIpAddress();
  }

  async requestUserId(collectionId: string): Promise<UserIdResponse | null> {
    let userIdResponse = await this.trackingRestClient.post("/u", {collection: collectionId}).catch(x => x.response);
    if (userIdResponse.status === 200) {
      let userIdBody: UserIdResponse = userIdResponse.data;
      return userIdBody;
    } else {
      console.log(`Failed to get UserId for Search client.Received Response: ${userIdResponse.status}`);
      return null;
    }
  }

  async tq(searchResponse: any) {
    let uniqueId = searchResponse.uniqueId;
    let trackingData: TrackingData = {
      queryId: uniqueId,
      collection: this.collectionId,
      items: searchResponse.results.slice(0, Math.min(searchResponse.totalHits, 10)).map((result, index) => {
        return {
          rank: index,
          label: result[this.trackField]
        }
      }),
      meta: {
        ip: this.ipv4Address
      }
    };
    let trackingResponse = await this.trackingRestClient.post("query", trackingData, {
      headers: {
        "x-st-user": this.customUserId || this.globalUserId
      }
    }).catch(x => x.response);
    if (trackingResponse.status !== 200)
      console.log(`Failed to send tracking data for Query:${uniqueId}.Received Response: ${trackingResponse.status}`);
  }


  private async getIpAddress() {
    let ipAddressResponse = await Axios.get("https://api.ipify.org?format=json")
      .catch(e => e.response);
    if (ipAddressResponse.status === 200) {
      this.ipv4Address = ipAddressResponse.data.ip;
    } else
      this.ipv4Address = "0.0.0.0";
  }

}