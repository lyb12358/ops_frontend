<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'blue_dark' : 'bg-blue-8'"
            class="text-white"
          >
            <div class="row">
              <div class="col-9">
                <div class="text-h6">本日新增</div>
                <div class="text-h5">160</div>
              </div>
              <div class="col-3">
                <q-icon size="62px" name="trending_up" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'green_dark' : 'bg-green-8'"
            class="text-white"
          >
            <div class="row">
              <div class="col-9">
                <div class="text-h6">本日修改</div>
                <div class="text-h5">140</div>
              </div>
              <div class="col-3">
                <q-icon size="62px" name="far fa-dot-circle" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section
            :class="$q.dark.isActive ? 'orange_dark' : 'bg-orange-9'"
            class="text-white"
          >
            <div class="row">
              <div class="col-9">
                <div class="text-h6">本日同步</div>
                <div class="text-h5">
                  40
                </div>
              </div>
              <div class="col-3">
                <q-icon size="62px" name="compare_arrows" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div>
      <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                销量 vs 目标
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('bar')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>下载</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts
                :option="barOptions"
                ref="bar"
                :resizable="true"
                style="height:220px"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                每日商品新增 & 每日商品修改
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('line')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>下载</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts
                ref="line"
                :option="lineChartOption"
                :resizable="true"
                style="height:220px"
              />
            </q-card-section>
          </q-card>
        </div>
        <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered class="">
            <q-card-section class="row">
              <div class="text-h6 col-12">
                完成率
                <q-btn
                  flat
                  dense
                  icon="fas fa-download"
                  class="float-right"
                  @click="SaveImage('gauge')"
                  :color="!$q.dark.isActive ? 'grey-8' : 'white'"
                >
                  <q-tooltip>下载</q-tooltip>
                </q-btn>
              </div>
            </q-card-section>

            <q-separator inset></q-separator>

            <q-card-section>
              <IEcharts
                :option="gaugeOptions"
                ref="gauge"
                :resizable="true"
                style="height:220px"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">
              商品类别占比
              <q-btn
                flat
                dense
                icon="fas fa-download"
                class="float-right"
                @click="SaveImage('pie')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'"
              >
                <q-tooltip>下载</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <IEcharts
              ref="pie"
              :option="pieOptions"
              :resizable="true"
              style="height:270px"
            />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-md-8 col-sm-12 col-xs-12">
        <q-card flat bordered class="">
          <q-card-section>
            <div class="text-h6">
              各品牌类别合计数量
              <q-btn
                flat
                dense
                icon="fas fa-download"
                class="float-right"
                @click="SaveImage('stack_bar')"
                :color="!$q.dark.isActive ? 'grey-8' : 'white'"
              >
                <q-tooltip>下载</q-tooltip>
              </q-btn>
            </div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <IEcharts
              ref="stack_bar"
              :option="stackedBarOptions"
              :resizable="true"
              style="height:270px"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-sm q-ma-xs">
      <div class="col-12">
        <q-card flat bordered class="bg-white">
          <q-table
            title="商品变动日志"
            :data="data"
            :hide-header="mode === 'grid'"
            :columns="columns"
            row-key="name"
            :grid="mode === 'grid'"
            :filter="filter"
            :pagination.sync="pagination"
            :class="$q.dark.isActive ? 'text-white' : 'text-grey-8'"
          >
            <template v-slot:top-right="props">
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
      </div>
    </div>
  </q-page>
</template>

<script>
import Vue from 'vue'
import IEcharts from 'vue-echarts-v3/src/full.js'
import { exportFile } from 'quasar'
import { wechatAuth } from 'src/api/auth'
Vue.component('IEcharts', IEcharts)

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val

  formatted =
    formatted === void 0 || formatted === null ? '' : String(formatted)

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

export default {
  data() {
    return {
      filter: '',
      mode: 'list',

      gaugeOptions: {
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            type: 'gauge',
            name: 'Sale',
            detail: { formatter: '{value}%' },
            data: [{ value: 80 }],
            min: 0,
            radius: '100%',
            axisLine: {
              show: true,
              lineStyle: {
                color: [
                  [0.35, '#293c55'],
                  [0.65, '#61a0a8'],
                  [1, '#c23731']
                ],
                width: 20
              }
            }
          }
        ]
      },
      columns: [
        {
          name: 'activity_id',
          align: 'left',
          label: '商品编号',
          field: 'activity_id',
          sortable: true
        },
        {
          name: 'desc',
          required: true,
          label: '商品名称',
          align: 'left',
          field: (row) => row.name,
          sortable: true
        },
        {
          name: 'regarding',
          align: 'left',
          label: '操作类别',
          field: 'regarding',
          sortable: true
        },
        {
          name: 'owner',
          align: 'left',
          label: '操作人',
          field: 'owner',
          sortable: true
        },
        {
          name: 'creation_date',
          align: 'left',
          label: '操作时间',
          field: 'creation_date',
          sortable: true
        }
      ],
      data: [
        {
          activity_id: 'C001',
          name: '海德蓝',
          regarding: '新增',
          owner: '王某',
          creation_date: '2020-11-01'
        },
        {
          activity_id: 'C002',
          name: '海德粉',
          regarding: '同步',
          owner: '李某',
          creation_date: '2020-11-01'
        },
        {
          activity_id: 'C003',
          name: '海德灰',
          regarding: '修改',
          owner: '张某',
          creation_date: '2020-11-01'
        },
        {
          activity_id: 'C004',
          name: '海德绿',
          regarding: '新增',
          owner: '王某',
          creation_date: '2020-11-01'
        },
        {
          activity_id: 'C005',
          name: '海德黄',
          regarding: '修改',
          owner: '李某',
          creation_date: '2020-11-01'
        }
      ],
      pagination: {
        rowsPerPage: 10
      }
    }
  },
  computed: {
    barOptions() {
      return {
        grid: {
          bottom: '20%',
          left: '15%',
          top: '3%'
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        tooltip: {},
        dataset: {
          dimensions: ['time_period', 'sale', 'goal'],
          source: [
            { time_period: 'Jan 2020', sale: 50, goal: 70 },
            { time_period: 'Feb 2020', sale: 80, goal: 75 },
            { time_period: 'Mar 2020', sale: 86, goal: 80 },
            { time_period: 'Apr 2020', sale: 72, goal: 85 }
          ]
        },
        xAxis: {
          type: 'category',
          // axisLabel: {
          //     rotate: 45
          // }
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        yAxis: {
          // name: 'Goal',
          // nameLocation: 'center',
          // nameGap: 30,
          // nameTextStyle:{
          //     fontWeight: 'bold'
          // }
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        series: [
          { type: 'bar', name: '销量' },
          { type: 'bar', name: '目标' }
        ]
      }
    },
    lineChartOption() {
      return {
        grid: {
          bottom: '20%',
          left: '15%',
          top: '3%'
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        tooltip: {
          // formatter:
          //     function (param) {
          //     console.log(param)
          //     // return param.seriesName + '<br />' + param.name + ': ';
          // }
        },
        dataset: {
          dimensions: ['product_name', 'share', 'growth'],
          source: [
            { product_name: '11.1', share: 20, growth: 25 },
            { product_name: '11.2', share: 22, growth: 18 },
            { product_name: '11.3', share: 40, growth: 45 }
          ]
        },
        xAxis: {
          type: 'category',
          // axisLabel: {
          //     rotate: 45
          // }
          axisLabel: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        yAxis: {
          axisLabel: {
            formatter: function(value, index) {
              return value + ' %'
            },
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        series: [
          { type: 'line', name: '新增' },
          { type: 'line', name: '修改' }
        ]
      }
    },
    pieOptions() {
      return {
        tooltip: {
          show: true
        },
        legend: {
          orient: 'horizontal',
          bottom: 0,
          width: 300,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        series: [
          {
            name: 'Competitor',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'inner',
                formatter: function(param, index) {
                  return param.value + ' %'
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            selectedMode: 'single',
            data: [
              { value: 40, name: '套件', selected: true },
              { value: 45, name: '芯类', selected: false },
              { value: 15, name: '家居', selected: false }
            ]
          }
        ]
      }
    },
    stackedBarOptions() {
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          backgroundColor: 'rgba(50,50,50,0.9)'
        },
        legend: {
          bottom: 0,
          textStyle: {
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        color: ['#3395dd', '#ed892d', '#34393b'],
        // legend: {
        //     y: "bottom",
        //     data: [{name: 'Territory Sales', icon: 'circle'}, {
        //         name: 'Remaining Nation Sales',
        //         icon: 'circle'
        //     }]
        // },
        grid: {
          bottom: '10%',
          left: '15%',
          top: '9%'
        },
        calculable: true,
        xAxis: {
          type: 'value',
          position: 'top',
          axisLine: {
            show: false
          },
          axisLabel: {
            formatter: function(value, index) {
              return value
            },
            color: this.$q.dark.isActive ? 'white' : '#676767'
          }
        },
        yAxis: [
          {
            type: 'category',
            data: ['团购', '生活', '七星', '大货'],
            axisLabel: {
              fontSize: 12,
              color: this.$q.dark.isActive ? 'white' : '#676767'
            }
          }
        ],
        series: [
          {
            name: '芯类',
            type: 'bar',
            stack: 'A',
            data: [300, 350, 400, 500]
          },
          {
            name: '套件',
            type: 'bar',
            stack: 'A',
            data: [100, 180, 250, 300]
          },
          {
            name: '家居',
            type: 'bar',
            stack: 'A',
            data: [100, 120, 200, 220]
          }
        ]
      }
    }
  },
  methods: {
    wechatLogin() {
      let appid = 'wx330c8ce022617d32'
      let appsecret = 'ce50cbbffcd667b94c3537b3528c4f9b'
      let code = this.getUrlCode().code // 截取code
      if ((code != null) & (code !== '')) {
        console.log(code)
      }
    },
    getUrlCode() {
      // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
        }
      }
      return theRequest
    },

    SaveImage(type) {
      const linkSource = this.$refs[type].getDataURL()
      const downloadLink = document.createElement('a')
      document.body.appendChild(downloadLink)
      downloadLink.href = linkSource
      downloadLink.target = '_self'
      downloadLink.download = type + '.png'
      downloadLink.click()
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

      const status = exportFile('activity.csv', content, 'text/csv')

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },
  mounted() {
    this.wechatLogin()
  }
}
</script>

<style scoped>
.blue_dark {
  background-color: #082f56;
}

.green_dark {
  background-color: #084a0b;
}

.orange_dark {
  background-color: #64350e;
}
</style>
