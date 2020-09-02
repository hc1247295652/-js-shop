import {
    SAVE_USER
} from './mutation-type'

import {getStore} from './../config/global'
import {getAutomaticLogin} from './../server/index'
export default {
    // 保存用户数据
    async saveUserInfo({commit},userInfo){
        // let Info = await userInfo;
        commit(SAVE_USER,{userInfo});
    },

    // 自动登录
    async automaticLogin({commit}){
        let userInfo = getStore("userInfo");
        if(userInfo){
            // 1.1 检查本地是否有用户信息
            commit(SAVE_USER,{userInfo});
        }
    }
}