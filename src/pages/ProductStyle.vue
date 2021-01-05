<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="产品编号管理"
        :data="serverData"
        style="height: 650px"
        virtual-scroll
        :hide-header="mode === 'grid'"
        :columns="columns"
        row-key="id"
        :loading="tableLoading"
        :grid="mode == 'grid'"
        :pagination.sync="serverPagination"
        :visible-columns="visibleColumns"
        @request="request"
        :rows-per-page-options="[10, 20]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <!-- <q-td auto-width>
            <q-checkbox color="secondary"
                        v-model="props.selected" />
          </q-td>-->
            <q-td
              v-if="checkCode('prodCode')"
              key="prodCode"
              :props="props"
              style="text-align:center"
            >
              {{ props.row.prodCode }}
              <q-btn
                dense
                round
                flat
                :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'"
                @click="props.expand = !props.expand"
              />
            </q-td>
            <q-td
              v-if="checkCode('codeThumbnail')"
              key="codeThumbnail"
              :props="props"
              style="text-align:center"
            >
              <img
                :src="
                  thumbnailCheck(
                    props.row.id,
                    props.row.styleId,
                    props.row.codeThumbnail,
                    props.row.styleThumbnail
                  )
                "
                style="height: 80px; width: 80px;"
              />
            </q-td>
            <q-td
              v-if="checkCode('prodName')"
              key="prodName"
              :props="props"
              :style="{
                textAlign: 'center',
                maxWidth: '150px',
                whiteSpace: 'normal'
              }"
            >
              {{ props.row.prodName }}
              <!-- <q-btn
                flat
                v-if="checkAuth(15)"
                rounded
                color="info"
                class="print-hide"
                icon="mdi-tooltip-image"
                @click="
                  imageCheck(
                    props.row.id,
                    props.row.styleId,
                    props.row.codeImage,
                    props.row.styleImage
                  )
                "
              >
                <q-tooltip>图片预览</q-tooltip>
              </q-btn> -->
            </q-td>
            <q-td
              v-if="checkCode('catName')"
              key="catName"
              :props="props"
              :style="{
                textAlign: 'center',
                maxWidth: '100px',
                whiteSpace: 'normal'
              }"
              >{{ props.row.catName }}</q-td
            >
            <q-td
              v-if="checkCode('prodStyle')"
              key="prodStyle"
              :props="props"
              style="text-align:center"
              >{{ props.row.prodStyle }}</q-td
            >
            <q-td
              v-if="checkCode('familyName')"
              key="familyName"
              :props="props"
              style="text-align:center"
              >{{ props.row.familyName }}</q-td
            >
            <q-td
              v-if="checkCode('typeName')"
              key="typeName"
              :props="props"
              style="text-align:center"
              >{{ props.row.typeName }}</q-td
            >
            <q-td
              v-if="checkCode('bigName')"
              key="bigName"
              :props="props"
              style="text-align:center"
              >{{ props.row.bigName }}</q-td
            >
            <q-td
              v-if="checkCode('middleName')"
              key="middleName"
              :props="props"
              style="text-align:center"
              >{{ props.row.middleName }}</q-td
            >
            <q-td
              v-if="checkCode('smallName')"
              key="smallName"
              :props="props"
              style="text-align:center"
              >{{ props.row.smallName }}</q-td
            >
            <q-td
              v-if="checkCode('attrName')"
              key="attrName"
              :props="props"
              style="text-align:center"
              >{{ props.row.attrName }}</q-td
            >
            <q-td
              v-if="checkCode('speName')"
              key="speName"
              :props="props"
              :style="{
                textAlign: 'center',
                maxWidth: '100px',
                whiteSpace: 'normal'
              }"
              >{{ props.row.speName }}</q-td
            >
            <q-td
              v-if="checkCode('colorName')"
              key="colorName"
              :props="props"
              style="text-align:center"
              >{{ props.row.colorName }}</q-td
            >
            <q-td
              v-if="checkCode('retailPrice')"
              key="retailPrice"
              :props="props"
              style="text-align:center"
              >{{ props.row.retailPrice }}</q-td
            >
            <q-td
              v-if="checkCode('supplyPrice')"
              key="supplyPrice"
              :props="props"
              style="text-align:center"
              >{{ props.row.supplyPrice }}</q-td
            >
            <q-td
              v-if="checkCode('costPrice')"
              key="costPrice"
              :props="props"
              style="text-align:center"
              >{{ props.row.costPrice }}</q-td
            >
            <q-td
              v-if="checkCode('numModel')"
              key="numModel"
              :props="props"
              style="text-align:center"
              >{{ props.row.numModel }}</q-td
            >
            <q-td
              v-if="checkCode('netWeight')"
              key="netWeight"
              :props="props"
              style="text-align:center"
              >{{ props.row.netWeight }}</q-td
            >
            <q-td
              v-if="checkCode('boxNum')"
              key="boxNum"
              :props="props"
              style="text-align:center"
              >{{ props.row.boxNum }}</q-td
            >
            <q-td
              v-if="checkCode('boxModel')"
              key="boxModel"
              :props="props"
              style="text-align:center"
              >{{ props.row.boxModel }}</q-td
            >
            <q-td
              v-if="checkCode('boxVolume')"
              key="boxVolume"
              :props="props"
              style="text-align:center"
              >{{ props.row.boxVolume }}</q-td
            >
            <q-td
              v-if="checkCode('boxWeight')"
              key="boxWeight"
              :props="props"
              style="text-align:center"
              >{{ props.row.boxWeight }}</q-td
            >
            <q-td
              v-if="checkCode('boxWarn')"
              key="boxWarn"
              :props="props"
              style="text-align:center"
              >{{ props.row.boxWarn }}</q-td
            >
            <q-td
              v-if="checkCode('isRemind')"
              key="isRemind"
              :props="props"
              style="text-align:center"
              >{{ props.row.isRemind ? '是' : '否' }}</q-td
            >
            <q-td
              v-if="checkCode('isSecurity')"
              key="isSecurity"
              :props="props"
              style="text-align:center"
              >{{ props.row.isSecurity ? '是' : '否' }}</q-td
            >
            <q-td
              v-if="checkCode('isRate')"
              key="isRate"
              :props="props"
              style="text-align:center"
              >{{ props.row.isRate ? '是' : '否' }}</q-td
            >
            <q-td
              v-if="checkCode('prodCycle')"
              key="prodCycle"
              :props="props"
              style="text-align:center"
              >{{ props.row.prodCycle }}</q-td
            >
            <q-td
              v-if="checkCode('yearName')"
              key="yearName"
              :props="props"
              style="text-align:center"
              >{{ props.row.yearName }}</q-td
            >
            <q-td
              v-if="checkCode('seasonName')"
              key="seasonName"
              :props="props"
              style="text-align:center"
              >{{ props.row.seasonName }}</q-td
            >
            <q-td
              v-if="checkCode('unitName')"
              key="unitName"
              :props="props"
              style="text-align:center"
              >{{ props.row.unitName }}</q-td
            >
            <q-td
              v-if="checkCode('levelName')"
              key="levelName"
              :props="props"
              style="text-align:center"
              >{{ props.row.levelName }}</q-td
            >
            <q-td
              v-if="checkCode('designerName')"
              key="designerName"
              :props="props"
              style="text-align:center"
              >{{ props.row.designerName }}</q-td
            >

            <q-td
              v-if="checkCode('codeIsSync')"
              key="codeIsSync"
              :props="props"
              style="text-align:center"
            >
              <q-icon
                :name="
                  props.row.codeIsSync ? 'mdi-check-circle' : 'mdi-sync-off'
                "
                size="1.5rem"
                :color="props.row.codeIsSync ? 'positive' : 'negative'"
              />
            </q-td>
            <!-- 20190705 -->
            <q-td
              v-if="checkCode('code69')"
              key="code69"
              :props="props"
              style="text-align:center"
              >{{ props.row.code69 }}</q-td
            >
            <q-td
              v-if="checkCode('grossWeight')"
              key="grossWeight"
              :props="props"
              style="text-align:center"
              >{{ props.row.grossWeight }}</q-td
            >
            <q-td
              v-if="checkCode('singleWeight')"
              key="singleWeight"
              :props="props"
              style="text-align:center"
              >{{ props.row.singleWeight }}</q-td
            >
            <q-td
              v-if="checkCode('pakMat')"
              key="pakMat"
              :props="props"
              style="text-align:center"
              >{{ props.row.pakMat }}</q-td
            >
            <q-td
              v-if="checkCode('pakSize')"
              key="pakSize"
              :props="props"
              style="text-align:center"
              >{{ props.row.pakSize }}</q-td
            >
            <q-td
              v-if="checkCode('gmtCreate')"
              key="gmtCreate"
              :props="props"
              style="text-align:center"
              >{{ formatDate(props.row.gmtCreate) }}</q-td
            >
            <q-td
              v-if="checkCode('gmtModified')"
              key="gmtModified"
              :props="props"
              style="text-align:center"
              >{{ formatDate(props.row.gmtModified) }}</q-td
            >
          </q-tr>
          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
              <div class="text-left">
                <q-btn-group>
                  <q-btn
                    dense
                    label="修改"
                    icon="mdi-pencil"
                    @click="openProductDetailDialog('update', props.row.id)"
                  />
                  <q-btn dense label="增加同款" icon="mdi-playlist-plus" />
                  <q-btn
                    dense
                    label="上传主图"
                    icon="mdi-image-plus"
                    @click="openImageDialog(props.row.id)"
                  />
                  <q-btn dense label="查看日志" icon="mdi-pencil-box" />
                  <q-btn dense label="更换绑定" icon="mdi-format-section" />
                  <q-btn dense label="上传细节图" icon="mdi-image-multiple" />
                  <q-btn dense label="查看细节图" icon="mdi-image-search" />
                  <q-btn dense label="同步有赞" icon="mdi-thumb-up" />
                  <q-btn dense label="同步微盟" icon="mdi-alpha-w-box" />
                </q-btn-group>
              </div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-right="props">
          <q-btn
            @click="openProductDetailDialog('add', 0)"
            outline
            color="primary"
            label="新增"
            class="q-mr-xs"
          />

          <q-input outlined dense debounce="300" placeholder="搜索">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
            flat
            round
            dense
            :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
            @click="props.toggleFullscreen"
            v-if="mode === 'list'"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{
                props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'
              }}
            </q-tooltip>
          </q-btn>

          <q-btn
            flat
            round
            dense
            :icon="mode === 'grid' ? 'list' : 'grid_on'"
            @click="
              mode = mode === 'grid' ? 'list' : 'grid'
              separator = mode === 'grid' ? 'none' : 'horizontal'
            "
            v-if="!props.inFullscreen"
          >
            <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
              >{{ mode === 'grid' ? 'List' : 'Grid' }}
            </q-tooltip>
          </q-btn>

          <q-btn
            color="primary"
            icon-right="archive"
            label="导出"
            no-caps
            @click="exportTable"
          />
        </template>
      </q-table>
    </q-card>
    <q-dialog v-model="productDetailOpened" persistent>
      <q-card style="width: 600px; max-width: 80vw;">
        <q-form
          @submit="submitProductDialog"
          @reset="resetProductDialog"
          autocorrect="off"
          autocapitalize="off"
          autocomplete="off"
          spellcheck="false"
        >
          <q-card-section>
            <div class="text-h6">{{ dialogActiveName }}</div>
          </q-card-section>
          <q-card-section class="row q-col-gutter-md">
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodCode"
              label="商品编号"
              error-message="必填，且不超过20位"
              :error="$v.product.prodCode.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-barcode" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodName"
              label="名称"
              error-message="必填，且不超过30位"
              :error="$v.product.prodName.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-account" />
              </template>
            </q-input>
            <!-- <q-input
              class="col-6"
              outlined
              v-model.trim="product.orderId"
              label="序号"
              error-message="必填，且为整数"
              :error="$v.product.orderId.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-numeric" />
              </template>
            </q-input> -->
            <!-- <q-select
              class="col-6"
              outlined
              v-model="product.reviewSeasonId"
              label="所属评审会"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.reviewSeasonId.$error"
              :options="reviewSeasonOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select>
            <q-select
              class="col-6"
              outlined
              v-model="product.priceZoneId"
              label="价格带"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.priceZoneId.$error"
              :options="priceZoneOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select> -->
            <!-- <q-select
              class="col-6"
              outlined
              v-model="product.speId"
              label="规格"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.speId.$error"
              :options="speOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select> -->
            <!-- <q-select
              class="col-6"
              outlined
              v-model="product.middleTypeId"
              label="中类"
              emit-value
              map-options
              error-message="必选"
              :error="$v.product.middleTypeId.$error"
              :options="middleTypeOptions"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-format-list-bulleted" />
              </template>
            </q-select> -->
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodMat"
              label="材质"
              error-message="请输入有效值"
              :error="$v.product.prodMat.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-animation" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.retailPrice"
              label="零售价"
              error-message="请输入有效值"
              :error="$v.product.retailPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.supplyPrice"
              label="供应价"
              error-message="请输入有效值"
              :error="$v.product.supplyPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.costPrice"
              label="成本价"
              error-message="请输入有效值"
              :error="$v.product.costPrice.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-cash-usd" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.numModel"
              label="件数"
              error-message="请输入有效值"
              :error="$v.product.numModel.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-counter" />
              </template>
            </q-input>
            <q-input
              class="col-6"
              outlined
              v-model.trim="product.prodDesc"
              label="描述（备注）"
              error-message="请输入有效值"
              :error="$v.product.prodDesc.$error"
            >
              <template v-slot:prepend>
                <q-icon name="mdi-book" />
              </template>
            </q-input>
          </q-card-section>
          <q-card-actions align="right" class="bg-white text-teal">
            <q-btn flat label="取消" v-close-popup />
            <q-btn
              color="primary"
              type="reset"
              v-if="dialogActiveName === '新增产品'"
              label="重置"
            />
            <q-btn
              color="primary"
              type="submit"
              :loading="productDialogLoading"
              label="确定"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>
    <!-- image upload dialog -->
    <q-dialog v-model="imageDialogOpened" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <div class="text-h6">上传图片</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-uploader
            ref="imageUpload"
            :url="api + imageUploadUrl"
            accept=".jpg, .jpeg, .png"
            :headers="[{ name: 'id', value: this.expandId }]"
            style="max-width: 300px"
            @uploaded="imageUploaded"
            @failed="imageUploadFail"
            @added="addImageFile"
            field-name="file"
            name="file"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import { exportFile } from 'quasar'
function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val
  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)
  formatted = formatted.split('"').join('""')
  return `"${formatted}"`
}
import { date } from 'quasar'
import { getProductList, addProduct, getProductById } from 'src/api/product'
import {
  minLength,
  maxLength,
  minValue,
  maxValue,
  numeric,
  integer,
  decimal,
  required
} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      api: process.env.API,
      searchFormDialogOpened: false,
      searchForm: {
        page: 0,
        row: 0,
        prodCode: '',
        prodStyle: '',
        prodName: '',
        typeName: '',
        attrName: '',
        bigName: '',
        middleName: '',
        gmtCreateStart: null,
        gmtCreateEnd: null,
        gmtModifiedStart: null,
        gmtModifiedEnd: null
      },
      dialogOp: '',
      mode: 'list',
      loading: false,
      excelLoading: false,
      modifyLoading: false,
      newLoading: false,
      visibleColumns: [
        'prodCode',
        'codeThumbnail',
        'prodName',
        'prodStyle',
        'supplyPrice',
        'costPrice',
        'codeIsSync'
      ],
      columns: [
        {
          name: 'prodCode',
          label: '商品编号',
          field: 'prodCode',
          align: 'center'
        },
        {
          name: 'codeThumbnail',
          label: '简图',
          field: 'codeThumbnail',
          align: 'center'
        },
        {
          name: 'prodName',
          label: '商品名称',
          field: 'prodName',
          align: 'center'
        },
        { name: 'catName', label: '品类', field: 'catName', align: 'center' },
        {
          name: 'prodStyle',
          label: '款号',
          field: 'prodStyle',
          align: 'center'
        },
        {
          name: 'familyName',
          label: '商品归属',
          field: 'familyName',
          align: 'center'
        },
        {
          name: 'typeName',
          label: '商品类别',
          field: 'typeName',
          align: 'center'
        },
        { name: 'bigName', label: '大类', field: 'bigName', align: 'center' },
        {
          name: 'middleName',
          label: '中类',
          field: 'middleName',
          align: 'center'
        },
        {
          name: 'smallName',
          label: '小类',
          field: 'smallName',
          align: 'center'
        },
        { name: 'attrName', label: '属性', field: 'attrName', align: 'center' },
        { name: 'speName', label: '规格', field: 'speName', align: 'center' },
        {
          name: 'colorName',
          label: '花色',
          field: 'colorName',
          align: 'center'
        },
        {
          name: 'retailPrice',
          label: '零售价',
          field: 'retailPrice',
          align: 'center'
        },
        {
          name: 'supplyPrice',
          label: '供应价',
          field: 'supplyPrice',
          align: 'center'
        },
        {
          name: 'costPrice',
          label: '成本价',
          field: 'costPrice',
          align: 'center'
        },
        { name: 'numModel', label: '件数', field: 'numModel', align: 'center' },
        { name: 'boxNum', label: '装箱数', field: 'boxNum', align: 'center' },
        {
          name: 'boxModel',
          label: '装箱规格',
          field: 'boxModel',
          align: 'center'
        },
        {
          name: 'boxVolume',
          label: '装箱体积',
          field: 'boxVolume',
          align: 'center'
        },
        {
          name: 'boxWeight',
          label: '箱重量',
          field: 'boxWeight',
          align: 'center'
        },
        {
          name: 'boxWarn',
          label: '散货预警量',
          field: 'boxWarn',
          align: 'center'
        },
        {
          name: 'isRemind',
          label: '库存提醒',
          field: 'isRemind',
          align: 'center'
        },
        {
          name: 'isSecurity',
          label: '是否防伪码',
          field: 'isSecurity',
          align: 'center'
        },
        {
          name: 'isRate',
          label: '计算周转率',
          field: 'isRate',
          align: 'center'
        },
        {
          name: 'prodCycle',
          label: '生产周期(天)',
          field: 'prodCycle',
          align: 'center'
        },
        { name: 'yearName', label: '年份', field: 'yearName', align: 'center' },
        {
          name: 'seasonName',
          label: '季节',
          field: 'seasonName',
          align: 'center'
        },
        { name: 'unitName', label: '单位', field: 'unitName', align: 'center' },
        { name: 'prodMat', label: '材质', field: 'prodMat', align: 'center' },
        {
          name: 'levelName',
          label: '档次',
          field: 'levelName',
          align: 'center'
        },
        {
          name: 'designerName',
          label: '设计师',
          field: 'designerName',
          align: 'center'
        },
        {
          name: 'codeIsSync',
          label: '是否同步',
          field: 'codeIsSync',
          align: 'center'
        },
        { name: 'code69', label: '69码', field: 'code69', align: 'center' },
        {
          name: 'grossWeight',
          label: '单品毛重',
          field: 'grossWeight',
          align: 'center'
        },
        {
          name: 'singleWeight',
          label: '单品净重',
          field: 'singleWeight',
          align: 'center'
        },
        { name: 'pakMat', label: '包装材质', field: 'pakMat', align: 'center' },
        {
          name: 'pakSize',
          label: '单品包装尺寸',
          field: 'pakSize',
          align: 'center'
        },
        {
          name: 'gmtCreate',
          label: '创建时间',
          field: 'gmtCreate',
          align: 'center'
        },
        {
          name: 'gmtModified',
          label: '修改时间',
          field: 'gmtModified',
          align: 'center'
        }
      ],
      tableLoading: false,
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 20
        // specifying this determines pagination is server-side
      },
      serverData: [],
      //product dialog
      productDetailOpened: false,
      dialogActiveName: '',
      productDialogLoading: false,
      product: {
        name: '',
        devCode: '',
        reviewSeasonId: '',
        priceZoneId: '',
        speId: '',
        middleTypeId: '',
        prodMat: '',
        numModel: '',
        prodDesc: '',
        retailPrice: '',
        supplyPrice: '',
        costPrice: '',
        image: '',
        thumbnail: '',
        orderId: '',
        status: 1,
        isDel: 0
      },
      middleTypeOptions: [],
      priceZoneOptions: [],
      speOptions: [],
      reviewSeasonOptions: [],
      searchDetailOpened: false,
      //option
      optionDialogOpened: false,
      optionTitle: '',
      optionTableData: [],
      optionTableColumns: [
        {
          name: 'name',
          label: '名称',
          align: 'left',
          field: 'name'
        },
        {
          name: 'gmtCreate',
          label: '添加时间',
          align: 'center',
          field: 'gmtCreate'
        },
        {
          name: 'gmtModified',
          label: '修改时间',
          align: 'center',
          field: 'gmtModified'
        },
        {
          name: 'operation',
          label: '操作',
          align: 'center',
          field: 'operation'
        }
      ],
      //param
      paramDialogOpened: false,
      param: {
        id: '',
        name: ''
      },
      paramDialogActiveName: '',
      //image
      imageDialogOpened: false,
      expandId: 0,
      imageUploadUrl: '/imageUpload/product'
    }
  },
  validations: {
    product: {
      prodCode: { required, maxLength: maxLength(20) },
      prodName: { required, maxLength: maxLength(30) },
      retailPrice: {
        required
      },
      supplyPrice: {
        required
      },
      costPrice: {
        required
      },
      numModel: {},
      prodMat: {},
      prodDesc: {}
    }
  },
  methods: {
    //check thumbnail
    thumbnailCheck(id, styleId, codeThumbnail, styleThumbnail) {
      if (!(codeThumbnail === null) && !(codeThumbnail === '')) {
        return this.api + '/image/code/' + id + '/' + codeThumbnail
      } else if (!(styleThumbnail === null) && !(styleThumbnail === '')) {
        return this.api + '/image/style/' + styleId + '/' + styleThumbnail
      } else {
        return 'images/noImage.jpg'
      }
    },
    //FIXME:
    checkCode(xx) {
      return true
    },
    checkAuth(xx) {
      return true
    },
    notify(color, message) {
      this.$q.notify({
        position: 'top-right',
        message: message,
        color: color
      })
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm:ss')
    },
    request({ pagination }) {
      this.tableLoading = true
      this.searchForm.page = pagination.page
      this.searchForm.row = pagination.rowsPerPage
      getProductList(this.searchForm)
        .then((response) => {
          let data = response.data.data
          this.serverPagination.rowsNumber = data.total
          this.serverPagination.page = pagination.page
          this.serverPagination.rowsPerPage = pagination.rowsPerPage
          this.serverData = data.rows
          this.tableLoading = false
        })
        .catch((error) => {
          this.tableLoading = false
        })
    },
    resetSearchForm() {
      Object.assign(this.searchForm, this.$options.data.call(this).searchForm)
      this.$nextTick(() => {
        this.serverPagination.page = 1
        this.request({
          pagination: this.serverPagination
        })
      })
    },
    search() {
      this.serverPagination.page = 1
      this.request({
        pagination: this.serverPagination
      })
      this.searchDetailOpened = false
    },
    //dialog
    openProductDetailDialog(action, id) {
      this.$v.product.$reset()
      if (action == 'add') {
        Object.assign(this.product, this.$options.data.call(this).product)
        this.product.id = ''
        this.dialogActiveName = '新增产品'
        this.productDetailOpened = true
      } else {
        this.dialogActiveName = '修改产品'
        getProductById(id)
          .then((response) => {
            Object.assign(this.product, response.data.data)
          })
          .catch((error) => {})
        this.productDetailOpened = true
      }
    },
    resetProductDialog() {
      this.$v.product.$reset()
      Object.assign(this.product, this.$options.data.call(this).product)
    },
    submitProductDialog() {
      this.$v.product.$touch()
      if (this.$v.product.$invalid) {
        return
      }
      this.productDialogLoading = true
      if (this.dialogActiveName == '新增产品') {
        this.product.status = 1
        this.product.isDel = 0
      }
      addProduct(this.product)
        .then((response) => {
          this.notify('positive', response.data.msg)
          this.productDialogLoading = false
          this.productDetailOpened = false
          this.request({
            pagination: this.serverPagination
          })
        })
        .catch((error) => {
          this.productDialogLoading = false
        })
    },
    //image
    openImageDialog(id) {
      this.expandId = id
      this.imageDialogOpened = true
    },
    // when image has just bean uploaded
    imageUploaded(info) {
      let response = JSON.parse(info.xhr.response)
      if (response.code == 20000) {
        this.notify('positive', response.msg)
        this.$refs.imageUpload.reset()
        this.imageDialogOpened = false
        this.request({
          pagination: this.serverPagination
        })
      } else {
        this.notify('negative', response.msg)
        this.$refs.imageUpload.reset()
      }
    },
    // when it has encountered error while uploading
    imageUploadFail(info) {
      let response = JSON.parse(info.xhr.response)
      this.notify('negative', response.data.msg)
    },
    addImageFile(files) {
      if (files[0].size > 10 * 1024 * 1024) {
        this.$refs.imageUpload.reset()
        this.notify('warning', '图片不能大于10MB')
      }
    },
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map((col) => wrapCsvValue(col.label))]
        .concat(
          this.data.map((row) =>
            this.columns
              .map((col) =>
                wrapCsvValue(
                  typeof col.field === 'function'
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(',')
          )
        )
        .join('\r\n')
      const status = exportFile('customer-management.csv', content, 'text/csv')
      if (status !== true) {
        this.notify('nagetive', '浏览器拒绝了下载请求。。')
      }
    }
  },
  mounted() {
    this.request({
      pagination: this.serverPagination
    })
  }
}
</script>
