const express=require('express')
const router=express.Router()


router.get('/',(req,res)=>{
    console.log("users")
    res.send("Hello" + req.body.name +" " +  req.body.age)
})
router.post('/use',(req,res)=>{
    console.log("POST users")
    res.send("Hello POST")
})

module.exports= router;