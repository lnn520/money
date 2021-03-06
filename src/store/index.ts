import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);
type RootState = {
    recordList: RecordItem[];
    tagList: Tag[];
    currentTag?: Tag[];
}
const localStorageKeyName = 'recordList';
const store = new Vuex.Store({
    state: {
        recordList: [] ,
        tagList: [] ,
        currentTag: undefined,
    } as RootState,
    mutations: {
        fetchRecords(state) {

         return    state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]');
        },
        createRecord(state, record) {
            const recordCopy: RecordItem = clone(record);
            recordCopy.createdAt = new Date();
            state.recordList.push(recordCopy);
            store.commit('saveRecords');

        },
        saveRecords(state) {
            window.localStorage.setItem(localStorageKeyName,
                JSON.stringify(state.recordList));
        },
/////////////////////////////////////////////////////////////////////////////////////////
        fetchTags(state){
             state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');


        },
        createTag(state ,name: string){

            const names = state.tagList.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                window.alert('标签重复');
            }
            const id = createId().toString();
            state.tagList.push({id,name: name});
            store.commit('saveTags');
            window.alert('添加成功');
        },
        saveTags(state) {
            window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
        },

        findTag(state,id: string)  {
            return state.tagList.filter(t => t.id === id)[0];
        },
        setCurrentTag(state,id: string){
            state.currentTag = state.tagList.filter(t=>t.id === id)[0]
        }
    }

});

export default store;
