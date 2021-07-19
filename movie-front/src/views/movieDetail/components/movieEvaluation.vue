<template>
  <div class="evaluationList">
    <el-row
      v-for="(evalution, index) in evaluationList"
      :key="index"
      class="company-info"
    >
      <div>
        <el-col :span="4">
          <!-- <el-avatar shape="square" :size="80" fit="fill" :src="task.logo"></el-avatar> -->
        </el-col>
        <el-col :span="20">
          <el-row>
            <div style="float: left">
              <h2 style="float: left;">{{ evalution.name }}</h2>
              <!-- <span>release date: {{ evalution.publishTime }}</span> -->
              <span
                v-if="type == 1"
                style="line-height: 36px; font-size: 18px; color: #ff7720;margin-left:10px;"
                >{{ evalution.title }}</span
              >
            </div>
            <div style="float: right">
              <el-rate :value="rate(evalution.rate)" disabled text-color="#ff9900"></el-rate>
            </div>
          </el-row>

          <el-row>
            <div>
              <p style="text-align: left">{{ evalution.description }}</p>
            </div>
          </el-row>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    evaluationList: {
      default: () => [],
      type: Array,
    },
    //person or other
    type: {
      default: 0,
      type: Number,
    },
  },
  // computed: {

  // },
  methods: {
    rate(data) {
      return parseFloat(data / 2);
    },
  },
};
</script>


<style scoped>
.evaluationList {
  width: 1200px;
  margin:0 auto;
}
.company-info {
  padding: 20px;
  border-bottom: 1px solid #f3f3f3;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}
.company-info:hover {
  position: relative;
  z-index: 1;
  -webkit-box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
  box-shadow: 0 4px 5px -3px rgba(0, 0, 0, 0.06),
    0 4px 12px 4px rgba(0, 0, 0, 0.06);
}
.company-info:hover h2 {
  color: #0084ff;
}
.company-info .el-row {
  margin-bottom: 10px;
}
</style>