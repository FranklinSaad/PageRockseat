const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./datavideo")
const courses = require("./datacourse")


server.use(express.static('public'))

server.set("view engine", "njk")



nunjucks.configure("views", {
    express: server,
    //retirar código html na variável e aplicar funcionalidade//
    autoescape: false,

    NoCacher: true
})

server.listen(5000, function () {
    console.log("server is running")
})


server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://cdn-images-1.medium.com/max/1200/1*TkXVfLTwsHdwpUEjGzdi9w.jpeg",
        name: "ROCKETSEAT",
        description: "O objetivo da comunidade é ajudar a elevar o nível de cada profissional, seja em aspectos técnicos ou não, partindo do princípio de que compartilhar as experiências é a melhor forma de acelerar sua evolução como programador.",
        show: "As mesmas tecnologias utilizadas por empresas como:",
        examples: [
            { name: "Nubank;" },
            { name: "Netflix;" },
            { name: "Uber;" },
            { name: "Instagram;" },
            { name: "Airbnb." }
        ],
        links: [
            { name: "Facebook", url: "https://www.facebook.com/rocketseat" },
            { name: "Twitter", url: "https://twitter.com/rocketseat" },
            { name: "Instagram", url: "https://www.instagram.com/rocketseat_oficial/" },
            { name: "Youtube", url: "https://www.youtube.com/rocketseat" },
        ]
    }


    return res.render("about", { about })
})

server.get("/classes", function (req, res) {
    return res.render("classes", { items: videos })
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function (video) {
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!");
    }

    return res.render("video", { item: video })
})

server.get("/courses", function (req, res) {
    return res.render("courses", { items: courses })
})

server.get("/course", function(req, res) {
    const id = req.query.id;

    const course = courses.find(function (course) {
        return course.id == id
    })
  
    if (!course) {
        return res.send("Course not found!");
    }

    return res.render("course", { item: course })
})


server.use(function (req, res) {
    res.status(404).render("not-found");
});