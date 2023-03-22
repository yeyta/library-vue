<template>
    <div class="flex-center main">
        <div class="calendar">
            <header>
                <div class="button-nav">
                    <button class="prev">
                        <i class="ri-arrow-left-s-line"></i>
                    </button>
                    <button class="next">
                        <i class="ri-arrow-right-s-line"></i>
                    </button>
                </div>
                <p id="title"></p>
                <button id="today" class="today">今天</button>
            </header>
            <div class="week">
                <li>日</li>
                <li>一</li>
                <li>二</li>
                <li>三</li>
                <li>四</li>
                <li>五</li>
                <li>六</li>
            </div>
            <div id="content" class="content">
                <div id="bg" class="bg flex-center"></div>
            </div>
        </div>
    </div>
</template>

<script setup>
const calendarGrid = 42; // 7 * 6宫格;
let date = new Date();
// 是否为闰年
const isLeap = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 100 === 0;
};

// 获取[month]月有几天
const getDays = (year, month) => {
    const feb = isLeap(year) ? 29 : 28;
    const daysPerMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysPerMonth[month];
};

// 获取下个月/上个月有多少天
const getNextOrLastMonthDays = (date, type) => {
    const month = date.getMonth();
    const year = date.getFullYear();
    if (type === "last") {
        // 如果当前月份为一月(month = 0), 则上个月为前一年的12月(month = 11)
        const lastMonth = month === 0 ? 11 : month - 1;
        const lastYear = lastMonth === 11 ? year - 1 : year;
        return {
            year: lastYear,
            month: lastMonth,
            days: getDays(lastYear, lastMonth),
        };
    }
    // 如果当前月份为12月(month = 11), 则上个月为下一年的1月(month = 0)
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = nextMonth === 0 ? year + 1 : year;
    return {
        year: nextYear,
        month: nextMonth,
        days: getDays(nextYear, nextMonth),
    };
};
// 生成日历数据
generateCalendar = (date) => {
    const currentYear = date.getFullYear();
    const currentMonth = date.getMonth();
    // 当月天数
    const days = getDays(currentYear, currentMonth);
    // 获取上月末尾天数和下月开头的天数，用于填补当月日历空白
    const {
        days: lastMonthDays,
        year: lastMonthYear,
        month: lastMonth,
    } = getNextOrLastMonthDays(date, "last");
    const { year: nextMonthYear, month: nextMonth } = getNextOrLastMonthDays(
        date,
        "next"
    );
    // 1号是星期几
    const weekIndex = new Date(`${currentYear}/${currentMonth + 1}/1`).getDay();
    // 显示在当月末尾的下月天数
    const trailDays = calendarGrid - weekIndex - days;
    let trailVal = 0;
    const calendarTable = [];
    for (let i = 0; i < calendarGrid; i++) {
        // 补充上月天数
        if (i < weekIndex) {
            calendarTable[i] = {
                year: lastMonthYear,
                month: lastMonth,
                day: lastMonthDays - weekIndex + i + 1,
                isCurrentMonth: false,
            };
            // 补充下月天数
        } else if (i >= days + weekIndex) {
            if (trailVal < trailDays) {
                trailVal += 1;
            }
            calendarTable[i] = {
                year: nextMonthYear,
                month: nextMonth,
                day: trailVal,
                isCurrentMonth: false,
            };
        }
    }
    // 填充当月日期
    for (let d = 1; d <= days; d++) {
        calendarTable[weekIndex + d - 1] = {
            year: currentYear,
            month: currentMonth,
            day: d,
            isCurrentMonth: true,
        };
    }

    return calendarTable;
};
// 几个工具函数
function addClassNames(docNode, classNames) {
    classNames.split(" ").forEach((c) => {
        c && docNode.classList.add(c);
    });
}

function removeClassNames(docNode, classNames) {
    classNames.split(" ").forEach((c) => {
        c && docNode.classList.remove(c);
    });
}
// 渲染日历
function renderCalendar(date = new Date(), create = false) {
    const calendarData = generateCalendar(date);
    const today = new Date();
    enabledTodatBtn();
    setDateInfo();
    const content = document.getElementById("content");
    // 动态创建标签，初始化时调用
    if (create) {
        const fragment = document.createDocumentFragment();
        calendarData.forEach((item) => {
            const li = document.createElement("li");
            const div = document.createElement("div");
            const isActive = [
                item.day === today.getDate(),
                item.month === today.getMonth(),
                item.year === today.getFullYear(),
                item.isCurrentMonth,
            ].every(Boolean);
            const liClass = `date flex-center ${isActive ? "active" : ""} ${
                item.isCurrentMonth ? "" : "light"
            }`;
            addClassNames(div, "date-num flex-center");
            addClassNames(li, liClass);
            div.innerText = item.day;
            li.appendChild(div);
            fragment.appendChild(li);
        });

        content.append(fragment);
    } else {
        const children = Array.from(content.children).slice(1);

        calendarData.forEach((item, index) => {
            const isActive = [
                item.day === today.getDate(),
                item.month === today.getMonth(),
                item.year === today.getFullYear(),
                item.isCurrentMonth,
            ].every(Boolean);

            children[index].childNodes[0].innerText = item.day;
            isActive
                ? addClassNames(children[index], "active")
                : removeClassNames(children[index], "active");
            item.isCurrentMonth
                ? removeClassNames(children[index], "light")
                : addClassNames(children[index], "light");
        });
    }
}

function changeMonth(type) {
    let month = 0;
    let year = 1970;
    if (type === "prev") {
        month = date.getMonth() === 0 ? 11 : date.getMonth() - 1;
        year = month === 11 ? date.getFullYear() - 1 : date.getFullYear();
    } else {
        month = date.getMonth() === 11 ? 0 : date.getMonth() + 1;
        year = month === 0 ? date.getFullYear() + 1 : date.getFullYear();
    }
    date.setDate(1);
    date.setMonth(month);
    date.setFullYear(year);
    renderCalendar(date);
}

function enabledTodatBtn() {
    const current = new Date();
    const isToday =
        date.getFullYear() === current.getFullYear() &&
        date.getMonth() === current.getMonth() &&
        date.getDate() === current.getDate();
    if (isToday) {
        document.getElementById("today").setAttribute("disabled", true);
    } else {
        document.getElementById("today").removeAttribute("disabled");
    }
}

function setDateInfo() {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    document.getElementById("title").innerText = `${year}年${month}`;
    document.getElementById("bg").innerText = month;
}
window.onload = function () {
    renderCalendar(date, true);
};

function changeToToday() {
    date = new Date();
    renderCalendar(date);
}

document.querySelector(".prev").addEventListener("click", function () {
    changeMonth("prev");
});
document.querySelector(".next").addEventListener("click", function () {
    changeMonth("next");
});
document.getElementById("today").addEventListener("click", changeToToday);
</script>

<style lang="scss" scoped>
.main {
    font-family: "Noto Sans SC", sans-serif;
    height: 100vh;
    color: #333;
    background: linear-gradient(
        225deg,
        rgba(255, 154, 158, 1) 0%,
        rgba(250, 208, 196, 1) 99%,
        rgba(250, 208, 196, 1) 100%
    );
}

li {
    list-style: none;
}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.calendar {
    width: 520px;
    padding: 32px;
    border-radius: 24px;
    background-color: #fff;
    box-shadow: 2px 12px 24px rgba(0, 0, 0, 0.12);
}
.button-nav {
    display: flex;
}

header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.button-nav button:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
}
.button-nav button:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
}
.button-nav button:not(:first-child):not(:last-child) {
    border-radius: 0;
    border-left: 0;
}
button {
    width: 42px;
    height: 28px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    color: #c9c9c9;
    background-color: #fff;
    border: 1px solid currentColor;
    font-size: 18px;
    cursor: pointer;
}

button:active:not(:disabled) {
    background-color: rgba(0, 0, 0, 0.06);
}

button:disabled {
    background-color: rgba(0, 0, 0, 0.08);
    cursor: not-allowed;
}

button.today {
    width: 64px;
    font-size: 12px;
}

.week {
    margin-top: 20px;
    display: flex;
}
.week li {
    flex: 1;
    text-align: center;
    color: #b3b3b3;
    font-size: 14px;
}

.content {
    min-height: 336px;
    margin-top: 12px;
    display: grid;
    grid-template-columns: repeat(7, auto);
    position: relative;
    z-index: 1;
}

.content .bg {
    width: 100%;
    height: 100%;
    color: #ebebeb;
    font-size: 120px;
    position: absolute;
    z-index: -1;
}

.date {
    height: 56px;
    transition: background-color 0.1s ease;
    cursor: pointer;
}

.date:hover {
    background: rgba(133, 142, 151, 0.05);
}

.date-num {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    font-size: 14px;
}
.date.active .date-num {
    background-color: #117af2;
    color: #fff;
}

.date.light {
    color: #c9c9c9;
}
</style>