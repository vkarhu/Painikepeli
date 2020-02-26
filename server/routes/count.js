const express = require('express')
const router = express.Router()
const fs = require('fs')

let count = 0

const createId = length => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const data = JSON.parse(fs.readFileSync('users'))
    if (data.includes(result)) {
        return createId(length)
    }
    return result
}

router.get('/', (req, res) => {
    let foundCookie = false
    const userId =  req.cookies.user
    let data = JSON.parse(fs.readFileSync('users'))

    if (userId !== undefined) {
        foundCookie = req.headers.cookie.includes('user=')
    }
    if (!foundCookie) {
        const newId = createId(10)
        // res.setHeader('Cache-Control', 'private')
        res.cookie('user', newId, { maxAge: 1000 * 3600 * 24 * 365 }) // cookie is valid for a year
        console.log('newId on ' + newId)
        data.push({ user: newId, points: 20 })
        console.log(data)
        fs.writeFileSync('users', JSON.stringify(data))
        res.json({
            "points": 20
        })
        res.status(201).end
    } else {
        let foundUser = 0
        for (i=0; i < data.length; i++) {
           if  (data[i].user === userId){
            foundUser++
           }
        }
        if (foundUser===0) {
            data.push({ user: userId, points: 20 })
            fs.writeFileSync('users', JSON.stringify(data))
        }

        
    let index = -1
    for (let i = 0; i < data.length; i++) {
        if (data[i].user === userId) {
            index = i
            break
        }
    }

        res.json({
            "points": data[index].points
        })
        res.status(200).end
    }
})


router.get('/push', (req, res) => {
    const userId = req.cookies.user
    let data = JSON.parse(fs.readFileSync('users'))
    let index = -1
    for (let i = 0; i < data.length; i++) {
        if (data[i].user === userId) {
            index = i
            break
        }
    }
    if (index !== -1) {
        count++
        data[index].points--
        if (count % 500 === 0) {
            data[index].points = data[index].points + 250
        } else {
            if (count % 100 === 0) {
                data[index].points = data[index].points + 40
            } else {
                if (count % 10 === 0) {
                    data[index].points = data[index].points + 5
                }
            }
        }
        fs.writeFileSync('users', JSON.stringify(data))
    } else {
        console.log('-1, no user')
    }
    const toReward = 10 - count % 10 // all rewards are divisible by 10
    res.json({
        'count': count,
        'points': data[index].points,
        'toReward': toReward
    })
    res.status(200).end

})

router.get('/reset', (req, res) => {
    const userId = req.cookies.user
    let data = JSON.parse(fs.readFileSync('users'))
    let index = -1
    for (let i = 0; i < data.length; i++) {
        if (data[i].user === userId) {
            index = i
            break
        }
    }
    if (index !== -1) {
        count++
        data[index].points = 20
        fs.writeFileSync('users', JSON.stringify(data))
    } else {
        console.log('-1, no user')
    }
    res.json({
        'count': count,
        'points': data[index].points
    })
    res.status(200).end
})
module.exports = router
