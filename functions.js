const router = require("express").Router();
var db = require("./db");
module.exports = router;

var contactsAtt = "`id`, `fName`, `lName`, `phoneNum` FROM `contacts` WHERE `email` IS NULL AND `birthday` IS NULL"
var coworkersAtt = "`id`, `fName`, `lName`, `phoneNum`,`email` FROM `contacts` WHERE `email` IS NOT NULL AND `birthday` IS NULL"
var friendsAtt = "`id`, `fName`, `lName`, `phoneNum`,`email`,`birthday` FROM `contacts` WHERE `email` IS NOT NULL AND `birthday` IS NOT NULL"

function getAttributes(tableName) {
    // console.log(tableName)
    switch (tableName) {
        case '3':
            return friendsAtt;
            break;
        case '2':
            return coworkersAtt;
            break;
        default:
            return contactsAtt;
    }
}

router.post("/addContact", (req, res) => {
    let reqArr = req.body
    Object.keys(reqArr).forEach((element, index, value) => {
        if (reqArr[element.toString()] == '') {
            reqArr[element.toString()] = null
        }
    });
    fName = req.body.fName
    lName = req.body.lName
    phoneNum = req.body.phoneNum
    email = req.body.email
    birthday = req.body.birthday
    id = req.body.id
        db.query({
            sql: 'INSERT INTO `contacts`(`fName`, `lName`, `phoneNum`,`email`,`birthday`) VALUES (?,?,?,?,?)',
            timeout: 4000,
            values: [req.body.fName, req.body.lName, req.body.phoneNum, req.body.email, req.body.birthday]
        }, function (error, results, fields) {
            if (error)
                res.send(error)
            res.send(results)
        })
})


router.put("/updateContact", (req, res) => {
    let reqArr = req.body
    Object.keys(reqArr.body).forEach((element, index, value) => {
        console.log(element)
        if (reqArr.body[element.toString()] == '') {
            reqArr.body[element.toString()] = null
        }
    });
    fName = reqArr.body.fName
    lName = reqArr.body.lName
    phoneNum = reqArr.body.phoneNum
    email = reqArr.body.email
    birthday = reqArr.body.birthday
    id = reqArr.body.id
    console.log(reqArr.body)
    db.query({
        sql: 'UPDATE `contacts` SET `fName` = ?, `lName`= ?, `phoneNum` = ?,`email` = ?,`birthday` = ?  WHERE `id` = ?',
        timeout: 4000,
        values: [fName, lName, phoneNum, email, birthday, id]
    }, function (error, results, fields) {
        res.send(error)
    })



})

router.delete("/deleteContact", (req, res) => {
    console.log(req.query)
    db.query({
        sql: 'DELETE FROM `contacts` WHERE `id` = ?',
        timeout: 4000,
        values: [req.query.id]
    }, function (error, results, fields) {
        res.send(results)
    })
})

router.get("/getContacts", (req, res) => {
    console.log(req.query)
    db.query({
        sql: "SELECT "+ getAttributes(req.query.tableName),
        timeout: 4000, // 4s
    }, function (error, results, fields) {
        if (error)
            console.log(error)
        res.send(results)
        // error will be an Error if one occurred during the query
        // results will contain the results of the query
        // fields will contain information about the returned results fields (if any)
    });
})
