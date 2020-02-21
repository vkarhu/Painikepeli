const express = require('express')
const router = express.Router()

const fs = require('fs')

let count = 0

const createId = length => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.round(Math.random() * characters.length))
    }
    const data = JSON.parse(fs.readFileSync('users'))
    if (data.includes(result)) {
        return createId(length)
    }
    return result
}

router.get('/', (req, res) => {
    console.log('evästeet: ' + req.headers.cookie)
    // console.log('evästeet2: '+req.cookies.user)
    let  found = false 
    if (req.headers.cookie !== undefined) {
        found = req.headers.cookie.includes('user=')
    }
    console.log('found'+ found)
    if (!found) {
        const newId = createId(10)
        res.cookie('user', newId, { expires: new Date(Date.now() + 3600 * 24 * 365) })
        console.log('newId on ' + newId)
        console.log("cookie should be set")
       // res.clearCookie('user')
        let data = JSON.parse(fs.readFileSync('users'))
        console.log(data)
        data.push({ user: newId, points: 20 })
        fs.writeFileSync('users', JSON.stringify(data))
    } else {
        console.log('cookie already present')
    }

 
    res.status(200).end
    })

router.get('/push', (req, res) => {
    console.log('keksit ')
    console.log(typeof(req.cookies))
    
    const userId = req.cookies.user
    console.log('keksi '+ userId)
    let data = JSON.parse(fs.readFileSync('users'))
    let index = -1
    for(let i = 0; i<data.length;i++) {
        if (data[i].user===userId) {
            index = i
            break
        }
    }
    data[index].points
     if (index !== -1) {
        data[index].points--
        fs.writeFileSync('users', JSON.stringify(data))
     } else {
      console.log('-1, no user')
     }

     res.json({
        'count': count++
    })
    res.status(200).end

})
module.exports = router
