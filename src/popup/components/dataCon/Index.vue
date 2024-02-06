<template>
    <div>
        <el-table :data="list">
            <el-table-column label="日期" prop="createTime"></el-table-column>
            <el-table-column label="查看次数">
                <template #default="scope">
                    <span v-for="item in scope.row.list" :key="item.webName">
                        {{ item.webName }}:{{ item.times }}次&nbsp;
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import statUtil from './util';
export default {
    components: {},
    data() {
        return {
            list: [],
        };
    },
    created() {
        // table和echarts
        this.getList();
    },
    methods: {
        async getList() {
            this.list = await statUtil.getAll();
        },
    },
};
</script>
<style lang="scss" scoped></style>
