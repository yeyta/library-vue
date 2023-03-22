<template>
    <div class="centerschedule-wrap">
        <div class="centerschedule-content">
            <div class="calendar">
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.centerschedule-wrap {
    height: 790px;
    display: flex;
    align-items: center;
}
.centerschedule-content {
    width: 100%;
    height: 768px;
    background-color: #ffffff;
    background-color: #ffffff;
    border-radius: 16px;
    box-shadow: 0px 0px 2.5px 0px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
	align-items: center;
    padding: 10px 20px;
	.calendar{
		width: 100%;
		height: 400px;
		border: 1px solid red;

	}
}
</style>