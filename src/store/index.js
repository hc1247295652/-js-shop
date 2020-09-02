import Vue from 'vue'
import Vuex from 'vuex'


// 引入所需文件
import state from "./state";
import actions from "./actions";
import mutations from "./mutations";
Vue.use(Vuex);
export default new Vuex.Store({
    state,
    actions,
    mutations
});

