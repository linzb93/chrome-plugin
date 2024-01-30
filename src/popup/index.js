import Vue from 'vue';
import App from './App.vue';
import './plugins/element';
// import 'element-ui/lib/theme-chalk/index.css';
import './style/common.scss';

new Vue({
    el: '#app',
    render: (createElement) => {
        return createElement(App);
    },
});
