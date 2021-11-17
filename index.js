const express= require('express');
var bodyParser = require('body-parser')
const users=require('./Routes/users')
const cors=require('cors')
const fs=require('fs')
const path=require('path')
const formidable = require('express-formidable');
const app=express()
const PORT=5000;
const aws = require('aws-sdk');

// ##############  S3 Bucket Code starts Here ############################

const Access_Key_ID = 'AKIAYMVANH6UD27NRCZN';
const Secret_Access_Key = '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';
const Bucket_Name='myfirsts3bucket8499';

const s3 = new aws.S3({
    accessKeyId : Access_Key_ID,
    secretAccessKey : Secret_Access_Key,
});

const uploadFile = (myfileName) =>{
    const fileContent = fs.readFileSync(myfileName);
    const params = {
        Bucket : Bucket_Name,
        Key : 'Arvinder.jpg',
        Body : fileContent,
        ContentType : 'image/JPG'
    } 

    s3.upload(params, (err, data)=>{
        if(err){
            console.log("Failed to upload to S3 bucket :( ");
        }
        else{
            console.log("Successfully uploaded to s3 bucket ;) ");
            console.log(data.Location);
        }
    })
}

uploadFile('Arvinder.jpg');

// ##############  S3 Bucket Code ends Here ############################

app.use(
    cors({
        origin: "*",
    })
)

app.use(bodyParser.json());
// app.use(formidable());
app.use(formidable({
    // encoding: 'utf-8',
    uploadDir: 'save',
    // multiples: true, // req.files to be arrays of files
  }));
app.get('/',(req,res)=>{
    res.send("Hello Home Page ")
})
const dir = 'C:/Users/Robin/Desktop/WEB DEV/RestApi/save'
app.post('/users',(req,res)=>{
    
    // console.log(req.body)
    // res.send(req.body )
    // console.log("File in next line")
    // console.log(req.files)
    const name=req.files.file.name;
    // console.log(name)
    // const files = fs.readdirSync(dir)
    // console.log("files: - " + files)
    // let fileName=files[0];
    
    const getMostRecentFile = (dir) => {
    const files = orderRecentFiles(dir);
    return files.length ? files[0].file : undefined;
    };

    const orderRecentFiles = (dir) => {
        return fs.readdirSync(dir)
        .filter((file) => fs.lstatSync(path.join(dir, file)))
        .map((file) => ({ file, mtime: fs.lstatSync(path.join(dir, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };
    let fileName=getMostRecentFile(dir)
    console.log("FILENAME *************")
    console.log(fileName);

    // for (const file of files) {
    //     fileName=file;
    //     // console.log("filename :- " + fileName + " " + typeof fileName)
    //   }
    //   console.log("name : " + req.files)
    const extension=name.split(".");
    console.log(extension)
    const newFileName=fileName+"."+extension[extension.length-1]
    console.log(newFileName)
    const oldPath='./save'+"/"+fileName;
    const newPath='./save'+"/"+newFileName;
    fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
        console.log('File Renamed!');
      });

    
})
app.use('/users',users)
app.listen(PORT, ()=> console.log(`Server listening ${PORT}`))



/*
    passport
    jwt
    fe & server api on same port
    env variable
    redis
    cors
    file upload ------ done
    eviction policy redis-------
    redis persistence ---
    GIT----
*/
// frontend file and server api on the same port express
// app.use(function(req,res,next){ // CORS (read : https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
//     res.statusCode = 200;
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-Access-Token, X-Socket-ID, Content-Type");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
//     next();
//   });