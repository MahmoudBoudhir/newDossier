const path = require('path');
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const multer = require('multer');
const User = require('./../modules/user')


const app = express()

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

let filename = 'azer';
const storage = multer.diskStorage(
    {
        destination: './public',
        filename: function (req, file, cb) {
            date = Date.now();
            cb(null, date + '.' + file.mimetype.split('/')[1]);
            let fl = date + '.' + file.mimetype.split('/')[1];
            filename = fl;
        },
    }
);

const upload = multer({ storage: storage });






app.post('/login', (req, res) => {

    let data = req.body
    User
        .findOne({
            email:
                data.email
        })
        .then((userFromDb) => {
            if (!userFromDb) {
                res.status(404).send({ message: "not found" })
            }

            else {
                let compare = bcrypt.compareSync(data.password, userFromDb.password)
                if (!compare) {
                    res.status(404).send({ message: "not found" })
                }
                else {
                    let myToken = jwt.sign({ id: userFromDb._id, role: userFromDb.role }, "2K")
                    res.status(200).send({ token: myToken })
                }
            }
        }
        )
        .catch((e) => {
            res.status(400).send({ message: "not found", e })
        })
});




app.post('/register', upload.any('image'), async (req, res) => {

    try {
        let data = req.body
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))


        let user = new User({
            image: filename,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            age: data.age,
            password: data.password,


        })
        let userFromDb = await user.save()
        filename='';
        res.status(200).send({ message: 'user registred' })
    }
    catch (e) { console.log(e) }
})


app.get("/all", async (req, res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    }
    catch (e) { res.status(400).send({ message: 'not seccessfully' }) }

})

app.delete("/delete/:id", async (req, res) => {
    try {
        let userId = req.params.id
        let usere = await User.findByIdAndDelete({ _id: userId })
        if (!usere) {
            res.status(404).send({ message: "user not foun" })

        } else {
            res.status(200).send({ message: "user deleted succesefuly" })

        }
    }
    catch (e) { res.status(400).send({ message: 'user not deleted', e }) }
})


app.patch("/update-info/:id", (req, res) => {
    let data = req.body
    let userId = req.params.id
    User.findOneAndUpdate(
        { _id: userId }, data, { new: true }
    )
        .then((userId) => {
            if (!userId) {
                res.status(404).send({ message: "user not found" })

            } else {
                res.status(200).send({ message: "user updated seccessfully " })

            }

        }).catch((e) => {
            res.status(400).send("cannot update ;) ", e)
        })

})

module.exports = app