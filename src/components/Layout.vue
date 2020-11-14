<template>
  <div class="nav-wrapper">
    <div class="content">
    <slot></slot>
    </div>
    <Nav/>
  </div>
</template>

<script>
export default {
name: "Layout"
}
</script>
<style lang="scss" scoped>
.nav-wrapper{
  border : 1px solid  black;
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content{
  border:1px solid black;
  overflow: auto;//加一个滚动
  flex-grow: 1;
}
</style>