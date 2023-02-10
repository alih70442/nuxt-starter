<template>
  <div>

    <div class="border-b border-solid border-b-gray-200">
      <slot name="tabs"></slot>

      <ul class="flex">
        <sectiontab-tab
          :is-active="tab.name === active_tab_name"
          :name="tab.name"
          @select="change_tab"
          v-for="tab in tabs"
          :key="tab.name"
        >
          {{ tab.title }}
        </sectiontab-tab>
      </ul>
    </div>

    <div class="mt-6">
      <slot name="sections" :active-tab="active_tab_name"></slot>
      <slot></slot>
    </div>

  </div>
</template>

<script setup>
import SectiontabTab from "~/components/layouts/section-tab/SectiontabTab.vue";
import { onMounted } from "vue";

const emits = defineEmits(["change"]);
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
  },
  active_tab: {
    type: String,
  },
});

const active_tab_name = ref("");

const change_tab = (tab_name) => {
  active_tab_name.value = tab_name;
  emits("change", tab_name);
};

onMounted(() => {
  const found_tab = props.tabs.find(tab => tab.name === props.active_tab);

  active_tab_name.value = found_tab ? found_tab.name : props.tabs[0].name;
});

</script>

<style scoped>

</style>