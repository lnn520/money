<template>

  <layout class-prefix="layout">
    {{record}}
    <NumberPad   :value.sync="record.amount" @submit="saveRecord"/>

    <Types  :value.sync="record.type"/>

    <Notes @update:value="onUpdateNotes"/>

    <Tags :data-source.sync="tags " @update:value="onUpdateTags"/>

  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NumberPad from '@/components/money/NumberPad.vue';
import Types from '@/components/money/Types.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import {Component, Watch} from 'vue-property-decorator';
window.localStorage.setItem('version','0.0.1')
type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: Date;
}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '爽一下'];
  recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList')||'[]')
  record: Record = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
saveRecord(){
    const recordCopy: Record= JSON.parse(JSON.stringify(this.record))
    recordCopy.createdAt = new Date()
    this.recordList.push(recordCopy)

}
@Watch('recordList')
    onRecordListChange(){
      window.localStorage.setItem('recordList',JSON.stringify(this.recordList));


}
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
