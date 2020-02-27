const express = require('express')
const router = express.Router()
const fs = require('fs')

let count = 0

const createId = length => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' // 60^10 different possible userIds

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    const data = JSON.parse(fs.readFileSync('users'))
    if (data.includes(result)) {
        return createId(length) // If the userId is in use, recursively run the function again, n/60^10 chance of this happening
    }
    return result
}

router.get('/', (req, res) => { // Route for arriving at the home page
    const userId = req.cookies.user
    let data = JSON.parse(fs.readFileSync('users'))

    if (userId === undefined) {
        const newId = createId(10)
        res.cookie('user', newId, { maxAge: 1000 * 3600 * 24 * 365 }) // This cookie is "Strictly neccesary" under EU law, so it does not require user consent. Valid for one year.
        data.push({ user: newId, points: 20 }) // This data is anonymous, so user consent is not required
        console.log(data)
        fs.writeFileSync('users', JSON.stringify(data))
        res.json({
            'points': 20,
            'reward': 0
        })
        res.status(201).end
    } else { // If a use has the cookie, but they are not found in the list, reset them to 20 points so they can play
        let foundUser = 0
        for (i = 0; i < data.length; i++) {
            if (data[i].user === userId) {
                foundUser++
            }
        }
        if (foundUser === 0) {
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
            "points": data[index].points,
            'reward': 0
        })
        res.status(200).end
    }
})

router.get('/push', (req, res) => { // Route for pressing the button
    const userId = req.cookies.user
    let data = JSON.parse(fs.readFileSync('users'))
    let index = -1
    let reward = 0
    for (let i = 0; i < data.length; i++) {  // Find the user
        if (data[i].user === userId) {
            index = i
            break
        }
    }
    if (index !== -1) {
        count++
        data[index].points--
        if (count % 500 === 0) { // The highest possible reward is given
            data[index].points = data[index].points + 250
            reward = 250
        } else {
            if (count % 100 === 0) {
                data[index].points = data[index].points + 40
                reward = 40
            } else {
                if (count % 10 === 0) {
                    data[index].points = data[index].points + 5
                    reward = 5
                }
            }
        }
        fs.writeFileSync('users', JSON.stringify(data))
    }
    const toReward = 10 - count % 10 // All rewards are divisible by 10
    res.json({
        'count': count,
        'points': data[index].points,
        'toReward': toReward,
        'reward': reward
    })
    res.status(200).end
})

router.get('/reset', (req, res) => { // Route for resetting score to 20
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
        'points': data[index].points,
        'reward': 0
    })
    res.status(200).end
})
module.exports = router
