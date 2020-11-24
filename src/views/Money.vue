<template>

  <layout class-prefix="layout">

    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>

    <Types :value.sync="record.type"/>

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
import {recordListModel} from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

window.localStorage.setItem('version', '0.0.1');
const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();
@Component({
  components: {Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  tags = tagList;
  recordList: RecordItem[] = recordList;
  record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

  onUpdateTags(value: string[]) {
    this.record.tags = value;
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    const recordCopy: RecordItem = recordListModel.clone(this.record);
    recordCopy.createdAt = new Date();
    this.recordList.push(recordCopy);

  }

  @Watch('recordList')
  onRecordListChange() {
    recordListModel.save(this.recordList);


  }
}
</script>
<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>
