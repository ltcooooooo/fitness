import Vue from "vue"
import 'vant/lib/index.css';
import { Button } from 'vant';
import { Tabbar } from 'vant';
import { TabbarItem } from 'vant';
import { Popup } from 'vant';
import { Picker } from 'vant';
import { Field } from 'vant';
import { Notify } from 'vant';
import { Dialog } from 'vant';
import { Toast } from 'vant';
import { NavBar } from 'vant';
import { List } from 'vant';
import { Cell } from 'vant';

Vue.use(Cell);
Vue.use(List);
Vue.use(NavBar);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.prototype.Notify = Notify
Vue.prototype.Dialog = Dialog
Vue.prototype.Toast = Toast