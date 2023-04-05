<template>
  <div class="bar-charts">
    <div id="studentChart1" class="studentChart1"></div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from "vue";
import * as echarts from "echarts";
import {studentGet} from "@/utils/data.js";



const studentState =reactive({
        classData:[
            {
            name:"计1901",
            value:0,
            },
            {
            name:"计1902",
            value:0,
            },
            {
            name:"计1903",
            value:0,
            },
            {
            name:"计1904",
            value:0,
            },
            {
            name:"计1905",
            value:0,
            },
            {
            name:"计1906",
            value:0,
            },
            {
            name:"计1907",
            value:0,
            },
            {
            name:"计1908",
            value:0,
            },
            {
            name:"计1909",
            value:0,
            },
        ],
})










const chartState = reactive({
  pieOption: {
    legend: {
      top: 1,
      left: "center",
    },
     
    series: [
      {
        name: "studentChart1",
        type: "pie",
        radius: ["40%", "70%"],
        center:["50%","55%"],
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: studentState.classData,
      },
    ],
  },
});

const initeCharts = () => {
  let myChart = echarts.init(document.getElementById("studentChart1"));
  myChart.setOption(chartState.pieOption);
};

//计算每一个班有多少学生
const studentsInit=()=>{
    studentGet().then(
        (response)=>{
            console.log(response);
            //一个学生数组
            const resTemp =response.data.data;

            //清空
            studentState.classData.forEach((item)=>{
                item.value=0;
            })


            //填数
            resTemp.forEach((item) => {
                const curClass=item.attributes.class;

                studentState.classData.forEach((item)=>{
                    if(item.name===curClass){
                        item.value++;
                    }

            //配置
            chartState.pieOption.series.data= studentState.classData;
            initeCharts();


                })

            });

        },
        (error)=>{}
    )
}

onMounted(() => {
  initeCharts();
  studentsInit();
});
</script>

<style lang="scss" scoped>
.bar-charts {
  width: 100%;
  height: 380px;
  display: flex;
  align-items: center;
  justify-content: center;
  .studentChart1 {
    border: 1px solid blue;
    width: 560px;
    height: 360px;
  }
}
</style>