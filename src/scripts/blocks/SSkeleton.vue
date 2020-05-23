<script>
export default {
  name: 'SSkeleton',
  props: {
    count: {
      type: Number,
      default: 1,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    rows: {
      type: Number,
      default: 1,
    },
    width: {
      type: String,
      default: '',
    },
    title: {
      type: Boolean,
      default: true,
    },
    padding: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    computedCount: function () {
      let countArray = []
      for (let i = 0; i < this.count; i++) {
        countArray.push(i)
      }
      return countArray
    },
  },
}
</script>
<template>
  <div :style="{ padding: padding + 'px' }">
    <a-skeleton
      v-for="(c, index) in computedCount"
      :key="index"
      :avatar="avatar"
      :paragraph="{ rows: rows, width: width }"
      :title="title"
      active
    />
  </div>
</template>
