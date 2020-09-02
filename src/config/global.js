// 定义一个方法来往本地存储数据
export function setStore(key,data) {
    if(!data){
       return;
    }
    key = key.toString();
    window.localStorage.setItem(key,JSON.stringify(data));
}
// 定义一个方法来往本地获取数据
export function getStore(key){
   if(!key){
       return;
   }
   key = key.toString();
   let data = JSON.parse(window.localStorage.getItem(key));
   return data;
}

// 定义一个方法来删除本地获取数据
export function removeStore(key){
    if(!key){
        return;
    }
    key = key.toString();
    window.localStorage.removeItem(key);
}