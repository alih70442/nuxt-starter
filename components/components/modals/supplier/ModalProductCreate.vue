<template>
  <base-modal
    title="ایجاد محصول"
    ref="ref_modal"
  >
    <el-steps
      :active="active_step"
      finish-status="success"
    >
      <el-step title="اطلاعات پایه" />

      <el-step title="ویژگی ها" />

      <el-step title="محصولات" />
    </el-steps>

    <base-loading v-if="is_loading_product" />

    <div v-show="!is_loading_product">
      <base-form
        :request="go_variations"
        ref="ref_form"
        #default="{ isFormLoading, submitForm }"
        v-if="active_step === 0"
      >
        <div class="mt-4">
          <base-input
            :input="inputs.title"
            v-model="inputs.title.value"
          />
        </div>

        <div class="mt-4">
          <base-tree-select
            :input="inputs.category_id"
            v-model="inputs.category_id.value"
            @change="onCategoryChanged"
          />

          <ol class="flex flex-wrap mt-2">
            <li
              class="ml-2 mb-2"
              v-for="category in last_categories"
              :key="category"
            >
              <base-button
                size="small"
                @click="set_category(category.id)"
              >
                {{ category.title }}
              </base-button>
            </li>
          </ol>
        </div>

        <div class="mt-4">
          <base-input
            :input="inputs.weight"
            v-model="inputs.weight.value"
          />
        </div>

        <div class="mt-4">
          <base-input
            :input="inputs.description"
            v-model="inputs.description.value"
          >
            <template #label-hint>
              <base-tooltip>
                <base-icon
                  name="info-circle"
                  class="text-neutral-600"
                />

                <template #content>
                  فروشنده ها برای فروش محصولات شما نیازمند اطلاعات کامل از تمام جزئیات محصول هستند؛
                  <br />
                  لطفا به صورت کامل و جامع در مورد محصول و ویژگی های آن توضیح دهید.
                </template>
              </base-tooltip>
            </template>
          </base-input>
        </div>

        <div class="mt-4">
          <base-upload
            :input="inputs.image_ids"
            v-model="inputs.image_ids.value"
            v-model:file-list="inputs.image_ids.files"
            v-model:is-uploading="inputs.image_ids.loading"
          >
            <template #label-hint>
              <base-tooltip>
                <base-icon
                  name="info-circle"
                  class="text-neutral-600"
                />

                <template #content>
                  حداقل ابعاد تصاویر باید 800*800 پیکسل باشد.
                  <br />
                  ابعاد تصاویر باید مربعی باشد. (1 در 1)
                  <br />
                  تنها پسوندهای jpeg و png قابل قبول هستند.
                </template>
              </base-tooltip>
            </template>
          </base-upload>
        </div>

        <div class="mt-4">
          <base-upload
            :input="inputs.video_ids"
            v-model="inputs.video_ids.value"
            v-model:file-list="inputs.video_ids.files"
            v-model:is-uploading="inputs.video_ids.loading"
          >
            <template #label-hint>
              <base-tooltip>
                <base-icon
                  name="info-circle"
                  class="text-neutral-600"
                />

                <template #content> تنها پسوندهای mp4 و m4v قابل قبول هستند. </template>
              </base-tooltip>
            </template>
          </base-upload>
        </div>

        <div
          class="relative mt-4"
          v-if="!showMoreSettings"
        >
          <hr />

          <base-button
            type="info"
            size="small"
            plain
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            @click="showMoreSettings = !showMoreSettings"
          >
            <base-icon
              :name="showMoreSettings ? 'angle-up' : 'angle-down'"
              class="ml-1"
            />
            تنظیمات بیشتر
          </base-button>
        </div>

        <transition-slide :visible="showMoreSettings">
          <div
            v-show="showMoreSettings"
            class="mt-4"
          >
            <div class="mt-4">
              <base-select
                :input="inputs.preparation_days"
                v-model="inputs.preparation_days.value"
              />
            </div>

            <div class="row mt-4">
              <div class="col w-4/12">
                <base-input
                  :input="inputs.length"
                  v-model="inputs.length.value"
                />
              </div>

              <div class="col w-4/12">
                <base-input
                  :input="inputs.width"
                  v-model="inputs.width.value"
                />
              </div>

              <div class="col w-4/12">
                <base-input
                  :input="inputs.height"
                  v-model="inputs.height.value"
                />
              </div>
            </div>
          </div>
        </transition-slide>

        <base-button
          class="w-full mt-8"
          type="primary"
          native-type="submit"
          :loading="isFormLoading || inputs.image_ids.loading || inputs.video_ids.loading"
          @click="submitForm"
        >
          مرحله بعد

          <base-icon
            name="angle-up"
            class="-rotate-90 text-xs mr-1"
          />
        </base-button>
      </base-form>

      <base-form
        :request="go_product_variations"
        ref="ref_form"
        #default="{ isFormLoading, submitForm }"
        v-if="active_step === 1"
      >
        <section class="mt-4">
          <div
            class="text-center py-4"
            v-if="!inputs.category_id.value"
          >
            اول دسته بندی را انتخاب کنید.
          </div>

          <base-loading v-else-if="is_loading_category" />

          <template v-else>
            <div
              class="text-center py-4"
              v-if="!data_category.variation_types.length"
            >
              این دسته بندی، ویژگی ندارد،
              <br />
              به مرحله بعد بروید.
            </div>

            <table
              class="w-full mt-3"
              v-else
            >
              <thead>
                <tr>
                  <td></td>

                  <td></td>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="(variation, list_index) in data_category.variation_types"
                  :key="variation.id"
                >
                  <td class="align-baseline">
                    {{ variation.title }}
                  </td>

                  <td>
                    <ul class="space-y-2">
                      <li
                        class="flex"
                        v-for="(value, inner_index) in inputs.variations.value[list_index].list"
                        :key="value.id"
                      >
                        <div class="basis-0 grow">
                          <base-select
                            :input="{ rules: 'required' }"
                            v-model="value.value"
                            :options="getAvailableOptions(variation.id, list_index, inner_index)"
                          />
                        </div>

                        <div class="w-12 mr-2">
                          <base-button
                            type="danger"
                            plain
                            @click="remove_product_variation(list_index, inner_index)"
                            v-if="inner_index !== 0"
                          >
                            <base-icon name="trash" />
                          </base-button>
                        </div>
                      </li>
                    </ul>

                    <base-button
                      class="mt-1 mb-4"
                      type="primary"
                      plain
                      @click="add_variations(list_index)"
                    >
                      <base-icon name="add" />
                    </base-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <div class="flex mt-6">
            <base-button
              type="info"
              plain
              @click="go_base"
            >
              <base-icon
                name="angle-up"
                class="rotate-90 text-xs mr-1"
              />

              برگشت
            </base-button>

            <base-button
              class="w-full"
              type="primary"
              native-type="submit"
              :loading="isFormLoading"
              @click="submitForm"
            >
              مرحله بعد

              <base-icon
                name="angle-up"
                class="-rotate-90 text-xs mr-1"
              />
            </base-button>
          </div>
        </section>
      </base-form>

      <base-form
        :request="submit"
        ref="ref_form"
        #default="{ isFormLoading, submitForm }"
        v-if="active_step === 2"
      >
        <section class="mt-4">
          <ul class="flex mt-3">
            <li class="basis-0 grow ml-2">ویژگی ها</li>

            <li class="basis-0 grow ml-2">
              <div class="flex justify-between">
                <div>موجودی</div>

                <base-button
                  size="small"
                  text
                  @click="setPvAll('stock')"
                  v-if="inputs.product_variations.value.length > 1"
                >
                  <base-icon name="edit" />
                </base-button>
              </div>
            </li>

            <li class="basis-0 grow">
              <div class="flex justify-between">
                <div>قیمت ({{ get_currency_suffix() }})</div>

                <base-button
                  size="small"
                  text
                  @click="setPvAll('$price')"
                  v-if="inputs.product_variations.value.length > 1"
                >
                  <base-icon name="edit" />
                </base-button>
              </div>
            </li>
          </ul>

          <ul class="space-y-3 mt-1">
            <li
              class="flex"
              v-for="product_variation in inputs.product_variations.value"
              :key="product_variation.id"
            >
              <div class="basis-0 grow ml-2">
                {{ product_variation.variation_types.map(v => v.title).join(' - ') }}
              </div>

              <div class="basis-0 grow ml-2">
                <base-input
                  :input="{ rules: 'required', type: 'number' }"
                  v-model="product_variation.stock"
                />
              </div>

              <div class="basis-0 grow ml-2">
                <base-input
                  :input="{ rules: 'required', type: 'number' }"
                  v-model="product_variation.$price"
                />
              </div>
            </li>
          </ul>

          <div class="flex mt-6">
            <base-button
              type="info"
              plain
              @click="go_variations"
            >
              <base-icon
                name="angle-up"
                class="rotate-90 text-xs mr-1"
              />

              برگشت
            </base-button>

            <base-button
              class="w-full"
              type="primary"
              native-type="submit"
              :loading="isFormLoading"
              @click="submitForm"
            >
              ثبت
            </base-button>
          </div>
        </section>
      </base-form>
    </div>
  </base-modal>
</template>

<script setup>
import BaseModal from '@/components/base/BaseModal.vue';
import useModal from '@/assets/js/composables/component/useModal.composable.js';
import ModalProductCreateInputs from '@/assets/js/inputs/ModalProductCreate.inputs.js';
import { cloneDeep, groupBy } from 'lodash';
import BaseInput from '@/components/base/BaseInput.vue';
import { computed, ref } from 'vue';
import BaseForm from '@/components/base/BaseForm.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import {
  show_supplier_product,
  store_supplier_product,
} from '@/assets/js/api/supplier/product.api.js';
import get_response_data from '@/assets/js/helpers/get_response_data.js';
import { index_categories_tree, show_category } from '@/assets/js/api/supplier/category.api.js';
import BaseUpload from '@/components/base/BaseUpload.vue';
import BaseIcon from '@/components/base/BaseIcon.vue';
import unique_id from '@/assets/js/functions/unique_id';
import BaseTreeSelect from '@/components/base/BaseTreeSelect.vue';
import useFetch from '@/assets/js/composables/fetcher/useFetch';
import BaseLoading from '@/components/base/BaseLoading.vue';
import { index_variation_type_items } from '@/assets/js/api/variation_type_item.api';
import BaseSelect from '@/components/base/BaseSelect.vue';
import get_currency_suffix from '@/assets/js/helpers/get_currency_suffix';
import { ArrayStorage } from '@/assets/js/classes/Storage';
import { KEY_PRODUCT_CREATE_LAST_CATEGORY_IDS } from '@/assets/js/consts/storageKeys.const';
import flattenTree from '@/assets/js/functions/array/flattenTree';
import BaseTooltip from '@/components/base/BaseTooltip.vue';
import useProductHandler from '@/assets/js/composables/product/useProductVariations';
import { index_preparation_days } from '@/assets/js/api/preparationDays.api';

const emits = defineEmits(['submitted']);

const lastCategoriesStorage = ArrayStorage.create(KEY_PRODUCT_CREATE_LAST_CATEGORY_IDS);
const inputs = ref(cloneDeep(ModalProductCreateInputs));
const variation_type_items = ref({});
const active_step = ref(0);
const ref_form = ref(null);
const showMoreSettings = ref(false);

const {
  data,
  has_error,
  is_loading: is_loading_product,
  fetch: fetch_product,
} = useFetch(show_supplier_product, {
  manual: true,
  placeholder: {},
});

const { ref_modal, hide, show } = useModal({
  onShow(productId) {
    rest_form();

    if (Number.isInteger(productId)) {
      fetch_product({ '%id': productId }).then(rs_data => {
        inputs.value.title.value = rs_data.title;
        inputs.value.category_id.value = rs_data.category_id;
        inputs.value.weight.value = rs_data.weight;
        inputs.value.preparation_days.value = rs_data.preparation_days?.id;
        inputs.value.length.value = rs_data.length;
        inputs.value.width.value = rs_data.width;
        inputs.value.height.value = rs_data.height;
        inputs.value.description.value = rs_data.description;

        showMoreSettings.value = [
          inputs.value.preparation_days.value,
          inputs.value.length.value,
          inputs.value.width.value,
          inputs.value.height.value,
        ].some(v => Boolean(v));

        // TODO: add backend functionality to copy files
        // inputs.value.image_ids.files = rs_data.files
        //   .filter(f => f.type_enum === 0)
        //   .map(file => ({ ...file, name: file.title, url: file.path }));
        // inputs.value.image_ids.value = inputs.value.image_ids.files.map(f => f.id);

        // inputs.value.video_ids.files = rs_data.files
        //   .filter(f => f.type_enum === 1)
        //   .map(file => ({ ...file, name: file.title, url: file.path }));
        // inputs.value.video_ids.value = inputs.value.video_ids.files.map(f => f.id);

        // TODO: copy product variations

        onCategoryChanged(rs_data.category_id);
      });
    }

    index_categories_tree().then(rs => {
      const rs_data = get_response_data(rs);
      inputs.value.category_id.options = rs_data.list;
    });

    index_preparation_days().then(rs => {
      const rs_data = get_response_data(rs);
      inputs.value.preparation_days.options = rs_data.list;
    });

    index_variation_type_items().then(rs => {
      const rs_data = get_response_data(rs);
      variation_type_items.value = groupBy(rs_data.list, 'variation_type_id');
    });
  },
});

const {
  data: data_category,
  has_error: has_error_category,
  is_loading: is_loading_category,
  filters: filters_category,
  fetch: fetch_category,
} = useFetch(show_category, {
  manual: true,
  placeholder: {
    variation_types: [],
  },
  onFetch(rs_data) {
    for (const variation_type of rs_data.variation_types) {
      inputs.value.variations.value.push({
        id: variation_type.id,
        list: [
          {
            id: unique_id(),
            value: null,
          },
        ],
      });
    }

    return rs_data;
  },
});

const last_categories = computed(() => {
  const last_ids = lastCategoriesStorage.get();
  const categories = flattenTree(inputs.value.category_id.options, 'list');

  return categories
    .filter(c => last_ids.includes(c.id))
    .sort((a, b) => last_ids.indexOf(a.id) - last_ids.indexOf(b.id))
    .slice(0, 5);
});

const rest_form = () => {
  Object.keys(inputs.value).forEach(key => {
    inputs.value[key].value = cloneDeep(inputs.value[key].default);
  });

  inputs.value.image_ids.files = [];
  inputs.value.video_ids.files = [];

  setTimeout(() => {
    ref_form.value.resetForm();
  });

  active_step.value = 0;
};

const {
  getAvailableOptions,
  add_variations,
  remove_product_variation,
  setPvAll,
  generatePermutations,
} = useProductHandler(inputs, variation_type_items);

const onCategoryChanged = category_id => {
  fetch_category({
    '%id': category_id,
  });
};

const go_base = () => {
  active_step.value = 0;
};

const go_variations = () => {
  active_step.value = 1;
};

const set_category = category_id => {
  inputs.value.category_id.value = category_id;

  fetch_category({
    '%id': category_id,
  });
};

const go_product_variations = () => {
  inputs.value.product_variations.value = generatePermutations(inputs.value.variations.value).map(
    permutation => ({
      variation_types: permutation.filter(vt => vt.value),
    })
  );

  active_step.value = 2;
};

const submit = async () => {
  lastCategoriesStorage.fresh_unshift(inputs.value.category_id.value);

  await store_supplier_product({
    title: inputs.value.title.value,
    category_id: inputs.value.category_id.value,
    weight: inputs.value.weight.value,
    preparation_days: inputs.value.preparation_days.value,
    length: inputs.value.length.value,
    width: inputs.value.width.value,
    height: inputs.value.height.value,
    description: inputs.value.description.value,
    product_variations: inputs.value.product_variations.value,
    file_ids: [...inputs.value.image_ids.value, ...inputs.value.video_ids.value],
  }).then(rs => {
    const rs_data = get_response_data(rs);

    hide();

    emits('submitted', rs_data);
  });
};

defineExpose({
  hide,
  show,
});
</script>

<style scoped></style>
