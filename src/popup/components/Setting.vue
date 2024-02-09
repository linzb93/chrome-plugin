<template>
    <el-form :model="form" label-width="90px" label-suffix="：">
        <el-form-item label="网站">
            <ul class="websites">
                <li v-for="(web, index) in form.websites" :key="web.url">
                    {{ web.name }}({{ web.url }}) <i class="el-icon-remove ml10" @click="remove('websites', index)"></i>
                </li>
            </ul>
            <el-link type="primary" v-if="!isAdded.website" @click="isAdded.website = true">+ 添加网站</el-link>
            <div class="add-input" v-else>
                <el-input
                    size="small"
                    placeholder="请输入网站名称"
                    v-model.trim="tempForm.name"
                    style="width: 140px"
                    @keypress.native.enter="$refs.inputUrl.focus()"
                />
                <el-input
                    ref="inputUrl"
                    size="small"
                    placeholder="请输入网址"
                    v-model.trim="tempForm.url"
                    style="width: 200px"
                    class="ml10"
                    @keypress.native.enter="submitWebsite"
                />
                <el-button class="ml10" size="small" @click="isAdded = false">取消</el-button>
            </div>
        </el-form-item>
        <el-form-item label="选择时间">
            <div v-for="(timeItem, index) in form.timeList" :key="index">
                <span>{{ timeItem }}</span>
                <i class="el-icon-remove ml10" @click="remove('timeList', index)"></i>
            </div>
            <el-link type="primary" v-if="!isAdded.time" @click="isAdded.time = true">+ 添加时间</el-link>
            <div v-else>
                <el-time-select
                    size="small"
                    v-model="tempForm.startTime"
                    style="width: 100px"
                    :picker-options="{
                        start: '00:00',
                        step: '00:30',
                        end: '23:30',
                    }"
                />
                ~
                <el-time-select
                    size="small"
                    v-model="tempForm.endTime"
                    style="width: 100px"
                    :picker-options="{
                        start: '00:30',
                        step: '00:30',
                        end: '24:00',
                        minTime: tempForm.startTime,
                    }"
                />
                <el-button class="ml10" type="primary" size="small" @click="submitTime">确认</el-button>
                <el-button class="ml10" size="small" @click="isAdded.time = false">取消</el-button>
            </div>
        </el-form-item>
        <el-form-item label="提醒方式">
            <el-radio-group v-model="form.remindType">
                <el-radio :label="0">弹出层</el-radio>
                <el-radio :label="1">重定向至新窗口</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="save">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import { setStroage, getStorage } from '../plugins/utils';
import { isTimeOverlay, timeIsSmaller } from '../plugins/time';
export default {
    components: {},
    props: {},
    data() {
        return {
            isAdded: {
                website: false,
                time: false,
            },
            form: {
                timeList: [],
                websites: [],
                remindType: 0,
            },
            tempForm: {
                url: '',
                name: '',
                startTime: '',
                endTime: '',
            },
        };
    },
    created() {
        this.getStorage();
    },
    methods: {
        async getStorage() {
            const setting = await getStorage('setting');
            if (setting && setting.websites) {
                this.form = setting;
            }
        },
        submitWebsite() {
            if (!/^https?:\/\//.test(this.tempForm.url)) {
                this.$message.error('请输入正确的网址');
                return;
            }
            this.form.websites.push({
                ...this.tempForm,
            });

            this.isAdded.website = false;
            this.initTemp();
            this.$message.success('添加成功');
        },
        submitTime() {
            if (timeIsSmaller(this.tempForm.endTime, this.tempForm.startTime)) {
                this.$message.error('开始时间不能小于结束时间');
                return;
            }
            if (this.form.timeList.length) {
                for (let rawTime of this.form.timeList) {
                    if (isTimeOverlay(rawTime, `${this.tempForm.startTime}~${this.tempForm.endTime}`)) {
                        this.$message.error('存在时间重叠，请重新选择');
                        return;
                    }
                }
            }

            this.form.timeList.push(`${this.tempForm.startTime}~${this.tempForm.endTime}`);
            this.isAdded.time = false;
            this.initTemp();
            this.$message.success('添加成功');
        },
        remove(key, index) {
            this.$confirm('确认删除？', '温馨提醒', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
            })
                .then(() => {
                    this.form[key].splice(index, 1);
                    this.$message.success('删除成功');
                })
                .catch(() => {
                    //
                });
        },
        initTemp() {
            this.tempForm = {
                url: '',
                name: '',
                startTime: '',
                endTime: '',
            };
        },
        async save() {
            await setStroage({
                setting: this.form,
            });
            this.$message.success('保存成功');
        },
    },
};
</script>
<style lang="scss" scoped>
.el-link {
    line-height: 1;
    &:after {
        display: none;
    }
}
.el-icon-remove {
    cursor: pointer;
    color: #f56c6c;
}
</style>
