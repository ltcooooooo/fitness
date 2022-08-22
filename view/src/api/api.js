import request from "@/api/request"

function login(name, weight) {
    return request({ url: "/api/login", params: { name: name, weight: weight } })
}

export {
    login
}