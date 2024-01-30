<template>
    <div class="box" :class="{ 'is-dev': isDev }">
        <div class="tabs">
            <span
                class="tab"
                v-for="tab in tabs"
                :key="tab.id"
                :class="{ on: tab.id === activeValue }"
                @click="changeTab(tab)"
                >{{ tab.title }}</span
            >
        </div>
        <div class="content">
            <setting v-if="activeValue === 0" />
            <data-con v-else-if="activeValue === 1" />
        </div>
    </div>
</template>

<script>
import Setting from './components/Setting.vue';
import DataCon from './components/DataCon';
export default {
    components: {
        Setting,
        DataCon,
    },
    data() {
        return {
            tabs: [
                { title: '设置', id: 0 },
                { title: '统计', id: 1 },
            ],
            activeValue: 0,
            isDev: process.env.NODE_ENV === 'development',
        };
    },
    methods: {
        changeTab(tab) {
            if (this.activeValue === tab.id) {
                return;
            }
            this.activeValue = tab.id;
        },
    },
};
</script>
<style lang="scss" scoped>
.box {
    width: 600px;
    height: 300px;
    padding: 10px 0 0 10px;

    &.is-dev {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    }
}
.tabs {
    text-align: center;
    .tab {
        margin: 0 20px;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.on {
            position: relative;
            &:after {
                position: absolute;
                background: #ff3131;
                left: 50%;
                transform: translate(-50%, 0);
                bottom: -10px;
                width: 24px;
                height: 4px;
                content: '';
            }
        }
    }
}
.content {
    max-height: 256px;
    margin-top: 10px;
    overflow: auto;
    padding-right: 10px;
    padding-bottom: 10px;
}
</style>
