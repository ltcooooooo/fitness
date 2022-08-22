import Vue from "vue"
import axios from "axios"
import router from "@/router/index"
import { Toast, Dialog } from 'vant';
import { getToken, clearUser } from '@/utils/me'


const baseURL = "http://192.168.61.183"   //本地
// const baseURL = "http://47.97.172.119"  //公网

const request = axios.create({
    baseURL: baseURL,
    timeout: 5000
});
request.interceptors.request.use(config => {
    if (/^\/admin/.test(config.url)) {
        config.headers.Authorization = `Bearer ${getToken()}`
    }
    console.log("config", config)
    Toast.loading({
        message: '加载中...',
        forbidClick: true,
    })
    return config
})

request.interceptors.response.use(response => {
    console.log("response.data", response.data)
    if (response.data.status) {
        if (response.data.message === "登录成功" || response.data.message === "注册成功") {
            Toast.success('登录成功');
        }
    } else {
        if (response.data.errmsg === "token过期，请重新登录") {
            console.log("token过期，请重新登录8888888888888888")
            Dialog.alert({
                title: '提示',
                message: '登陆已过期，请重新登陆',
            }).then(() => {
                clearUser()
                router.replace("/login")
            })
        }
    }
    Toast.clear()
    return response
}, (error) => {
    if (error) Toast.fail('失败');
    return Promise.reject("请求失败");
})


export default request