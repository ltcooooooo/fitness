const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require('body-parser')
const expressJWT = require("express-jwt")
const router = require("./router/router")
app.use(cors())

const secretKey = "梁天赐666"
// app.use("/", express.static("../webView/"))
app.use(expressJWT.expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({ path: [/^\/api\//] }))
app.use(router)

// console.log(getDate())
const port = 80
app.use((err, req, res, next) => {
	// console.log("Error中间件：", err)
	console.log(err)
	if (err.name == "UnauthorizedError") {
		return res.send({
			status: false,
			errmsg: "token过期，请重新登录"
		})
	}
	res.send({
		status: false,
		errmsg: err.message
	})
	next()
})
app.listen(port, () => {
	console.log("http://127.0.0.1:" + port)
})
