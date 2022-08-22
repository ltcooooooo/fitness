const express = require("express")
const app = express()
const jsonwebtoken = require("jsonwebtoken")
const router = express()
const { getUser, addNewUserId, writeUser, userIsExist, writeClockin, getUserLastClockin, getUserClickinData } = require("../meFn")
app.use(express.urlencoded({ extended: false }))
const secretKey = "梁天赐666"

router.get("/api/login", (req, res) => {
    const userExist = userIsExist(req.query.name)
    //该用户未注册
    if (!userExist) {
        console.log(req.query)
        //注册用户，并返回用户信息和token
        if (req.query.weight) {
            const user = getUser()
            const addUser = { id: addNewUserId().toString(), name: req.query.name, weight: req.query.weight }
            user.push(addUser)
            writeUser(user)
            const token = jsonwebtoken.sign(addUser, secretKey, { expiresIn: "30 days" })
            res.send({ status: true, message: "注册成功", token: token, user: addUser })
        } else {
            res.send({ status: true })
        }
    } else {
        //登陆成功，返回用户信息和token
        const token = jsonwebtoken.sign({ name: req.query.name }, secretKey, { expiresIn: "30 days" })
        res.send({ status: true, message: "登录成功", token: token, user: userExist })
    }
})
router.get("/admin/clockin", (req, res) => {
    const addNewClickData = writeClockin(req.query)
    res.send({
        status: true,
        data: addNewClickData
    })
})
router.get("/admin/getUserLastClockin", (req, res) => {
    const LastClockin = getUserLastClockin(req.query.id)
    res.send({
        status: true,
        data: LastClockin
    })
})
router.get("/admin/getUserClickinData", (req, res) => {
    const clockinRecord = getUserClickinData(req.query.id)
    console.log(clockinRecord)
    console.log(clockinRecord.sort((a, b) => b.clockId - a.clockId))
    res.send({
        status: true,
        data: clockinRecord.sort((a, b) => b.clockId - a.clockId)
    })
})

module.exports = router