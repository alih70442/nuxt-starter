<template>
  <el-table-column
    :label="label"
    :prop="prop"
    :width="width"
    :type="type"
    :align="align"
  >
    <template #header="passed">
      <!--      TODO: fix custom header content -->
      <slot
        name="header"
        v-bind="passed"
      ></slot>
    </template>

    <template #default="passed">
      <div class="c-table__tr">
        <div class="c-table__title">
          {{ passed.column.label }}
        </div>

        <div class="c-table__content">
          <slot
            name="default"
            v-bind="passed"
          >
            {{ passed.row[prop] }}
          </slot>
        </div>
      </div>
    </template>
  </el-table-column>
</template>

<script setup>
const props = defineProps({
  label: {
    type: String,
  },
  prop: {
    type: String,
  },
  width: {
    type: Number,
  },
  type: {
    type: String,
  },
  align: {
    type: String,
    default: 'right',
  },
});
</script>

<style lang="scss" scoped>
.c-table__tr {
  .c-table__title {
    display: none;
  }

  @include mediaMax($media-sm) {
    display: flex;

    .c-table__title {
      display: block;

      color: $color-neutral-400;

      width: 100px;
    }

    .c-table__content {
      width: calc(100% - 100px);
    }
  }
}
</style>
