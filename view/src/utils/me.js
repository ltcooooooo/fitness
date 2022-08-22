import { getUserLastClockin } from "@/api/admin";

function getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo"))
}

function setToken(token) {
    localStorage.setItem("token", token)
}

function getToken() {
    return localStorage.getItem("token")
}

function setUserInfo(userInfo) {
    localStorage.setItem("userInfo", JSON.stringify(userInfo))
}

function clearUser() {
    localStorage.removeItem("userInfo")
    localStorage.removeItem("token")
}


function getDate(getTime) {
    const time = new Date().toTimeString().substr(0, 8)
    const date = fillZero(new Date().toLocaleDateString());
    function fillZero(date) {
        const temp = date.split("/");
        temp[1] = Number(temp[1]) < 10 ? "0" + temp[1] : temp[1];
        temp[2] = Number(temp[2]) < 10 ? "0" + temp[2] : temp[2];
        return temp.join("-");
    }
    if (getTime) return (date + " " + time)
    return date
}

async function todayIsMovement() {
    const date = getDate()
    let returnData = undefined
    await getUserLastClockin().then(res => {
        if (res.data.status) {
            if (res.data.data.clockinTime) {
                if (res.data.data.clockinTime.substr(0, 10) == date) {
                    res.data.data.clockinTime = res.data.data.clockinTime.substr(11)
                    returnData = res.data.data
                } else {
                    returnData = false
                }
            } else {
                returnData = false
            }
        } else {
            returnData = false
        }
    })
    return returnData
}

export {
    getUserInfo,
    getToken,
    setToken,
    setUserInfo,
    clearUser,
    getDate,
    todayIsMovement
}