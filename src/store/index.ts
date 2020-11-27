import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

Vue.use(Vuex)
const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
 mutations: {
     fetchRecords(state) {
         state.recordList =JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
     },
    createRecord( state,record){
        const recordCopy: RecordItem = clone(record);
        recordCopy.createdAt = new Date();
        state.recordList.push(recordCopy);
        console.log(state.recordList);
        store.commit('saveRecords')
        // recordStore.saveRecords();
    },
     saveRecords(state) {
         window.localStorage.setItem(localStorageKeyName,
             JSON.stringify(state.recordList));
     },
    }

 });

export  default store
