<template>
  <q-page class="q-pa-sm">
    <q-card>
      <q-table
        title="角色管理"
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
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="account" :props="props">{{ props.row.account }}</q-td>

            <q-td key="status" :props="props">
              <q-icon
                :name="
                  props.row.status == 1
                    ? 'mdi-check-circle'
                    : 'mdi-close-circle'
                "
                size="1.5rem"
                :color="props.row.status == 1 ? 'positive' : 'negative'"
              />
            </q-td>
            <q-td key="gmtCreate" :props="props">{{
              formatDate(props.row.gmtCreate)
            }}</q-td>
            <q-td key="gmtModified" :props="props">{{
              formatDate(props.row.gmtModified)
            }}</q-td>
            <q-td colspan="100%">
              <div class="text-center no-padding">
                <q-btn-group>
                  <q-btn dense color="primary" label="修改" icon="mdi-pencil" />
                  <!-- <q-btn label="启用/停用" icon="mdi-eraser" /> -->
                </q-btn-group>
              </div>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:top-right="props">
          <q-btn
            @click="userDialog = true"
            outline
            color="primary"
            label="新增"
            class="q-mr-xs"
          />

          <q-input
            outlined
            dense
            debounce="300"
            v-model="filter"
            placeholder="搜索"
          >
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
    <q-dialog v-model="userDialog">
      <q-card style="width: 600px; max-width: 60vw;">
        <q-card-section>
          <div class="text-h6">
            {{ dialogOp }}
            <q-btn
              round
              flat
              dense
              icon="close"
              class="float-right"
              color="grey-8"
              v-close-popup
            ></q-btn>
          </div>
        </q-card-section>
        <q-separator inset></q-separator>
        <q-card-section class="q-pt-none">
          <q-form class="q-gutter-md">
            <q-list>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Customer Name</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="customer.name"
                    label="Customer Name"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">City</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="customer.city"
                    label="City"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">State</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="customer.state"
                    label="State"
                  />
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-item-label class="q-pb-xs">Last Call</q-item-label>
                  <q-input
                    dense
                    outlined
                    v-model="customer.last_call"
                    mask="date"
                    label="Last Call"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy
                          ref="lastCallProxy"
                          transition-show="scale"
                          transition-hide="scale"
                        >
                          <q-date
                            v-model="customer.last_call"
                            @input="() => $refs.lastCallProxy.hide()"
                          />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-teal">
          <q-btn label="Save" type="submit" color="primary" v-close-popup />
        </q-card-actions>
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
import { getRoleList } from 'src/api/userManage'
export default {
  data() {
    return {
      dialogOp: '',
      filter: '',
      customer: {},
      userDialog: false,
      mode: 'list',
      columns: [
        {
          name: 'name',
          required: true,
          label: '名称',
          align: 'left',
          field: 'name'
        },
        {
          name: 'status',
          label: '状态',
          align: 'center',
          field: 'status'
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
          name: 'op',
          label: '操作',
          align: 'center',
          field: 'op'
        }
      ],
      visibleColumns: [
        'name',
        'account',
        'type',
        'status',
        'gmtCreate',
        'gmtModified',
        'op'
      ],
      tableLoading: false,
      searchForm: {
        page: 0,
        row: 0,
        account: '',
        name: ''
      },
      serverPagination: {
        page: 1,
        rowsNumber: 10,
        rowsPerPage: 20
        // specifying this determines pagination is server-side
      },
      serverData: []
    }
  },
  methods: {
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
      getRoleList(this.searchForm)
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
