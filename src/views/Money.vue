<template>

  <layout class-prefix="layout">

    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem field-name="备注" placeholder="请在这输入备注" @update:value="onUpdateNotes"/>
    </div>
    <Tags />
    {{ count}}<button @click="$store.commit('increment',1)">+1</button>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import {Component} from 'vue-property-decorator';
import oldStore from '@/store/index2';
import store from '@/store/index';
import Button from '@/components/Button.vue';

window.localStorage.setItem('version', '0.0.1');

@Component({
  components: {Button, Tags, FormItem: FormItem, Types, NumberPad},
  computed: {
    count(){
      return store.state.count;
    },
    recordList(){
     return oldStore.recordList;
    }
  }
})
export default class Money extends Vue {

  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};


  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
  add(){
    this.$store.commit('increment',10)
    store.commit('increment',10);
  }
  saveRecord() {
   oldStore.createRecord(this.record);

  }

}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}

.notes {
  padding: 12px 0;
}
</style>
