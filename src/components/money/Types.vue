<template>
  <div>
    <ul class="types">
      <li :class="value==='-' && 'selected'"
          @click="selectType('-')">支出
      </li>
      <li :class="value==='+' && 'selected'"
          @click="selectType('+')">收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';//'-'表示支出'+表示‘收入'
import {Component, Prop} from 'vue-property-decorator';
@Component
export default class Types extends Vue {
  @Prop() readonly  value!: string//！不管初始值
  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unKnow');
    }
    this.$emit('update:value',type)
  }


}
// export default {
// name: "Types",
//   props:['xxx'],
//   data(){
//   return {
//     type:'-'
//   }
//   },
//   created() {
//
//     console.log(this.xxx)
//   },
//   methods:{
//   selectType(type){
//     if(type !=='-' &&type !=='+')
//     {
//       throw new Error('type is unKnow')
//     }
//     this.type =type;
//   }
//   }
// }
</script>

<style lang="scss" scoped>
.types {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  > li {
    width: 50%;
    line-height: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 4px;
      background: #333;
    }
  }
}
</style>