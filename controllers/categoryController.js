const express = require('express');
const Category = require('./../modules/category');

const app = express()
app.get('/all', async (req, res) => {
    try {
        let categories = await Category.find()
        res.status(200).send(categories)
    }
    catch (e) { res.status(400).send({ message: 'category not found' }) }

})
//gaditha

//mazelt hedhi

app.delete("/delete/:id", async (req, res) => {
    try {
        let categoryId = req.params.id
        let categoria = await Category.findOneAndDelete({ _id: categoryId })
        if (!category) {
            res.status(400).send({ message: "category not found" })

        } else {
            res.status(200).send({ message: "category deleted succesefuly" })

        }
    }
    catch (e) {
        res.status(400).send("cannoot deleted ", e)
    }
})




//gaditha b try


app.get("/one/:id", (req, res) => {
    let categoryId = req.params.id

    Category.findOne({ _id: categoryId }).then((category) => {
        if (!category) {
            res.status(404).send({ message: "category not found" })

        } else {
            res.status(200).send(category)

        }

    }).catch((e) => {
        res.status(400).send("cannoot deleted ", e)
    })
})
//gaditha

app.patch("/update/:id", (req, res) => {
    let data = req.body
    let categoryId = req.params.id
    Category.findOneAndUpdate(
        { _id: categoryId }, data, { new: true }
    )
        .then((category) => {
            if (!category) {
                res.status(404).send({ message: "category not found" })

            } else {
                res.status(200).send({ message: "success " })

            }

        }).catch((e) => {
            res.status(400).send("cannoot deleted ", e)
        })

})
//gaditha

app.post("/add", (req, res) => {
    let data = req.body
    let category = new Category({
        name: data.name
    })
    category.save().then(() => {
        res.status(201).send({ message: 'seccessfully' })
    }).catch(() => {
        res.status(400).send({ message: 'not seccessfully' })
    })
})
//gaditha

module.exports = app