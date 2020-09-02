/*
*
* 封装axios
*
* */
import axios from 'axios'

export default function ajax(url="",parameter={},type="GET") {
   let promise;
   return new Promise((resolve, reject) => {
       if(type.toUpperCase() === "GET"){
           let str = "";
           Object.keys(parameter).forEach((key)=>{
               str += key + "=" + parameter[key] + "&";
           });
           if(str){
               str = str.substr(0,str.length - 1);
           }
           url += "?" + str + "&time=" + addTimes();
           console.log(url);
           promise = axios.get(url);
       }else if(type.toUpperCase() === "POST"){
           promise = axios.post(url,parameter);
       }
       promise.then((response)=>{
           resolve(response)
       }).catch((err)=>{
           reject(err);
       })
   });
}
const addTimes = ()=>{
    return new Date().getTime();
}