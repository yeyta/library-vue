<template>
    <div class="calendar-wrap">
        <div class="calendar-content">
            <zx-vue-calendar
                v-model="dateState.date"
                lang="en"
                titleFormatter="yyyy-MM"
                colors="green"
            />
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue";
import { ZxVueCalendar } from "zx-calendar/vue";
import moment from "moment";
import "zx-calendar/css";

const dateState = reactive({ date: moment().format("YYYY/MM/DD") });
// const testCalendar = new ZxCalendar({
//   el: '#testCalendar .test-wrapper',
//   defaultDate: '2020/02/21',
//   hideFooter: true,
// })
</script>

<style lang="scss" scoped>
</style>