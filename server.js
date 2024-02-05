const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const port = 8000;
const storage = multer.diskStorage({
    destination: function (req, file, cb){
    return cb(null, "./uploads");
},
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage});

const uploads = multer({dest: "uploads/"});

app.use(express.urlencoded({ extended: false}));

app.get("/", (req, res) =>{
     res.sendFile(__dirname + '/public/index.html');
});

app.post("/upload", upload.single("profileImage") ,(req, res) => {
    console.log(req.body);
    console.log(req.file);

    return res.redirect("/");

});

app.listen(port, () => console.log(`Server Started at port:8000`));

