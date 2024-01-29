<template>
    <el-form :model="form">
        <el-form-item label="网站">
            <ul class="websites">
                <li v-for="web in form.websites" :key="web.url">{{ web.title }}({{ web.url }})</li>
            </ul>
        </el-form-item>
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
                websites: [],
            },
        };
    },
    created() {
        this.getStorage();
    },
    methods: {
        getStorage() {
            chrome.storage.local.get(['setting']).then(({ setting }) => {
                this.form = setting;
            });
        },
        save() {
            chrome.storage.local
                .set({
                    setting: this.form,
                })
                .then(() => {
                    console.log('设置成功');
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.el-form {
    margin-top: 20px;
}
</style>
