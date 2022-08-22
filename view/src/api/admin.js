import request from "@/api/request"
import { getUserInfo } from "@/utils/me"

function clockin(time) {
    return request({ url: "/admin/clockin", params: { movementTime: time, id: getUserInfo().id } })
}
function getUserLastClockin(id) {
    return request({ url: "/admin/getUserLastClockin", params: { id: getUserInfo().id } })
}
function getUserClickinData(id) {
    return request({ url: "/admin/getUserClickinData", params: { id: getUserInfo().id } })
}
export {
    clockin,
    getUserLastClockin,
    getUserClickinData
}