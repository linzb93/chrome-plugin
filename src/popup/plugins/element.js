import Vue from 'vue';
import {
    Button,
    Input,
    TimeSelect,
    Icon,
    Message,
    Radio,
    RadioGroup,
    MessageBox,
    Form,
    FormItem,
    Table,
    TableColumn,
    Link,
} from 'element-ui';

Vue.use(Button);
Vue.use(Input);
Vue.use(TimeSelect);
Vue.use(Icon);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Link);
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
