<template>
    <div>
        <el-table :data="list">
            <el-table-column label="日期" prop="date"></el-table-column>
            <el-table-column label="查看次数"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            list: [],
        };
    },
    created() {
        // table和echarts
    },
    methods: {},
};
</script>
<style lang="scss" scoped></style>
