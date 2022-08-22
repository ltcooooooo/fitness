const { query } = require("express")
const fs = require("fs")
const path = require("path")
const os = require("os")


//获取用户打卡数据 
function getUserClickinData(id) {
    const filePath = path.join(__dirname, "../data/userData/", id + ".json")
    if (!fs.existsSync(filePath)) fs.writeFileSync(path.join(__dirname, `../data/userData/${id}.json`), `{"clockin":[]}`)
    return JSON.parse(fs.readFileSync(path.join(__dirname, `../data/userData/${id}.json`), { encoding: "utf8" })).clockin
}
//写入打卡数据
function writeClockin(data) {
    const userClickinData = getUserClickinData(data.id)
    if (userClickinData.length !== 0) { if (isRemoveClickin(data.id)) userClickinData.pop() }
    const addNewClockId = userClickinData.length == 0 ? 1 : Number(userClickinData[userClickinData.length - 1].clockId) + 1
    const addNewClickData = { clockId: addNewClockId, clockinTime: getDate("time"), movementTime: data.movementTime }
    userClickinData.push(addNewClickData)
    const jsonstr = `{"clockin":${JSON.stringify(userClickinData)}}`
    fs.writeFileSync(path.join(__dirname, `../data/userData/${data.id}.json`), jsonstr)
    return addNewClickData
}

//写入之前判断今天有没有打卡，打过卡，删除今天打卡记录
function isRemoveClickin(id) {
    const userClickinData = getUserClickinData(id)
    const lastClockinDate = (userClickinData[userClickinData.length - 1].clockinTime).substr(0, 10)
    const todyDate = getDate()
    return lastClockinDate == todyDate ? true : false
}

//获取最近一次打卡记录
function getUserLastClockin(id) {
    if (getUserClickinData(id).length == 0) {
        return "还妹有记录哦"
    } else {
        return getUserClickinData(id)[getUserClickinData(id).length - 1]
    }
}


//获取用户表
function getUser() {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "../data/user.json"), { encoding: "utf8" })).user
}
//获取用户信息
function getUserInfo(id) {
    const user = getUser()
    return user.find(item => item.id == id)
}

//检测用户是否存在
function userIsExist(name) {
    const user = getUser()
    return user.find(item => item.name == name)
}

//新建用户的id
function addNewUserId() {
    const user = getUser()
    if (user.length == 0) {
        return 1
    } else {
        return Number(user[user.length - 1].id) + 1
    }
}
//新增用户到表
function writeUser(data) {
    const jsonstr = `{"user":${JSON.stringify(data)}}`
    fs.writeFileSync(path.join(__dirname, "../data/user.json"), jsonstr)
}

//获取日期时间
function getDate(getTime) {
    const time = new Date().toTimeString().substr(0, 8)
    const datearr = new Date().toLocaleDateString().split("/")
    const date2 = datearr[2] + "/" + datearr[0] + "/" + datearr[1]
    let date = undefined
    if(os.platform() === "linux"){
        date = fillZero(date2);
    }else{
        date = fillZero(new Date().toLocaleDateString());
    }
    function fillZero(date) {
        const temp = date.split("/");
        temp[1] = Number(temp[1]) < 10 ? "0" + temp[1] : temp[1];
        temp[2] = Number(temp[2]) < 10 ? "0" + temp[2] : temp[2];
        return temp.join("-");
    }
    if (getTime) return (date + " " + time)
    return date
}
module.exports = {
    getUserInfo,
    getDate,
    addNewUserId,
    getUser,
    writeUser,
    userIsExist,
    writeClockin,
    getUserClickinData,
    getUserLastClockin
}