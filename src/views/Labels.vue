<template>
  <layout>
    <div class="tags">
      <router-link v-for="tag in tags" class="tag" :key="tag.id" :to="`labels/edit/${tag.id}`"><span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
<!--      @click后可以加.native就可以不用在子元素传递事件-->
    </div>
  </layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import TagHelper  from '@/mixins/TagHelper.ts';


@Component({
  components: {Button},

  computed:{
    tags(){
      return this.$store.state.tagList;
    }
  }
})

export default class Labels extends mixins(TagHelper) {
  beforeCreate(){
     this.$store.commit('fetchTags')
  }



}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 15px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e5e8;

    svg {
      color: #666;
      margin-right: 16px;
    }
  }

}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  height: 40px;
  border: none;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin: 44-16px;
  }
}
</style>