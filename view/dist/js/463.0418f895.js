"use strict";(self["webpackChunkfitness"]=self["webpackChunkfitness"]||[]).push([[463],{6463:function(e,t,s){s.r(t),s.d(t,{default:function(){return l}});var i=function(){var e=this,t=e._self._c;return t("div",{attrs:{id:"mine"}},[t("div",{staticClass:"userInfo"},[t("div",{staticClass:"name"},[e._v(e._s(e.user.name))]),t("div",{staticClass:"info"},[t("div",[e._v(" 体重："),t("span",{staticStyle:{"font-weight":"600",color:"#ff1744"}},[e._v(e._s(e.user.weight))])]),t("div",[e._v(" 今日运动时间："),t("span",{staticStyle:{"font-weight":"600",color:"#2979ff"}},[e._v(e._s(`${e.user.movementTime} ${"0"==e.user.movementTime?"":"分钟"}`))])])])]),t("div",{staticClass:"function"},[t("div",{staticClass:"item",on:{click:e.goRecord}},[e._v("打卡记录")]),t("div",{staticClass:"quit",on:{click:e.quit}},[e._v("退出登录")])])])},n=[],a=s(1779),r={data(){return{user:{name:"",weight:"",movementTime:"0"}}},methods:{quit(){(0,a.pn)(),this.$router.replace("/login")},goRecord(){this.$router.push("/clockinRecord")}},created(){this.user.name=(0,a.bG)().name,this.user.weight=(0,a.bG)().weight,(0,a.xV)().then((e=>{e&&(this.user.movementTime=e.movementTime)}))}},c=r,o=s(3736),u=(0,o.Z)(c,i,n,!1,null,"e8c31dba",null),l=u.exports}}]);
//# sourceMappingURL=463.0418f895.js.map