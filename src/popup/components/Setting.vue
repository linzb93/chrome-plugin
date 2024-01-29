<template>
    <el-form :model="form">
        <el-form-item label="选择时间">
            <el-time-select v-model="form.time"></el-time-select>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    components: {},
    props: {},
    data() {
        return {
            form: {
                time: '',
            },
        };
    },
    created() {},
    methods: {},
};
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 20px;
}
</style>
