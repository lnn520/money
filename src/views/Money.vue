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

type Record = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = ['衣', '食', '住', '行', '爽一下'];
  recordList: Record[] = []
  record: Record = {tags: [], notes: '', type: '-', amount: 1000};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }
saveRecord(){
    const recordCopy= JSON.parse(JSON.stringify(this.record))
    this.recordList.push(recordCopy)
    console.log(recordCopy)
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
