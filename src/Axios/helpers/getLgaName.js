import { LGA } from "../utils"

export const getLGAName =(num)=>{
    // console.log(num,"This is num")
    if(num>0){
        const result= LGA.filter(item=>{
            // console.log(item.code,"item code",num,"Num")
            return item["code"]===num
        })//[0]["name"]
    if(result.length){
        // console.log(result[0].name,"result from getLGAName")
        return result[0]["name"]
    }
       
    }
   return
}