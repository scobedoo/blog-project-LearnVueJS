import Vue from 'vue'
import Vuex from 'vuex'
import counter from './counter'
import alert from './alert';
import dialog from './dialog';
import auth from './auth';

import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
    key: 'sanbercode',
    storage: localStorage
});

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: { 
        counter,
        alert,
        dialog,
        auth
    }
})