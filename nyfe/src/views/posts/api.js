import Axios from "axios";
import { API_PREFIX } from "../../Constants";

export const getStories=async()=>{
try{

    let response= await Axios.get(API_PREFIX+"/stories",{headers:{
        Authorization:`Bearer ${localStorage.getItem("nyt_token")}`
    }});
    return response.data;

}
catch(err)
{
 if(err.response.data) return err.response.data;
 else throw new Error(err);

}
}