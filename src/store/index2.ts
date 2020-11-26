//全局变量太多放一个对象里

import recordStore from '@/store/recordStore';
import tagStore from '@/store/tagStore';

const store = {
   ...recordStore,
    ...tagStore,



};
export default store;