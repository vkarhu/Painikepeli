const express = require('express')
const router = express.Router()
const cookieParser = require('cookie-parser')
const fs = require('fs')

const createId = length => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
}
let count = 0

router.get('/', (req, res) => {
    console.log('evästeet: ' + req.headers.cookie)
    // console.log('evästeet2: '+req.cookies.user)
    if (!req.headers.cookie) { // parse later
        const newId = createId(10)
        res.cookie('user', newId, { expires: new Date(Date.now() + 3600 * 24 * 365) })
       // res.clearCookie('user')
        let data = JSON.parse(fs.readFileSync('users'))
        console.log(data)
        data.push({ user: newId, points: 20 })
        fs.writeFileSync('users', JSON.stringify(data))
    } else {
        console.log('cookie already present')
    }
    res.json({
        'count': count++
    })

})
module.exports = router
