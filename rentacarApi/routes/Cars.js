const { find } = require('../models/Car')
const Car = require('../models/Car')
const { Responsedata } = require('../models/Response')
const authorisation=require('./jwtauthorisation')
const router=require('express').Router()

router.post('/add',async (req,res)=>{
    const newCars=new Car({
        imageurl:req.body.imageurl,
        carName:req.body.carName,
        maxperson:req.body.maxperson,
        type:req.body.type,
        price:req.body.price,
        location:req.body.location,
        collectionName:req.body.collectionName,
        available:req.body.available
    })
    try{
        var result=await newCars.save()
        res.status(200).send(result)
    }
    catch (err){
        res.status(500).send("something went wrong"+err)
    }
})

router.put('/update/:id',async (req,res)=>{
    var id=req.params.id
    console.log(id)
    var car=await Car.findOne({_id:id})
    if(car !=null)
    {
    try{
        var result=await Car.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).send(result)
    }
    catch (err){
        res.status(500).send("something went wrong"+err)
    }
    
}
else{
    res.status(500).send("invalid id")    
}
})

router.delete('/delete/:id',async (req,res)=>{
    var id=req.params.id
    console.log(id)
    try{
        var result=await Car.findByIdAndDelete(id)
        res.status(200).send(result)
    }
    catch (err){
        res.status(500).send("something went wrong"+err)
    }
})

router.get('/getall',async (req,res)=>{
    let resp=new Responsedata();
    try{
        var allcars=await Car.find({})
        if(allcars.length==0){
            resp.statuscode=200
            resp.message="data is null"
        }
        else{
            resp.statuscode=200
        resp.message=allcars
        }
        
    }
    catch(err){
        resp.statuscode=500
        resp.message=err
    }
    res.status(resp.statuscode).send(resp.message)
    
})

router.get('/getbyid/:id',async (req,res)=>{
    var id=req.params.id
    let resp=new Responsedata();
    try{
        var allcars=await Car.findOne({_id:id})
        if(allcars == null){
            resp.statuscode=200
            resp.message="data is null"
        }
        else{
            resp.statuscode=200
        resp.message=allcars
        }
        
    }
    catch(err){
        resp.statuscode=500
        resp.message=err
    }
    res.status(resp.statuscode).send(resp.message)
    
})



router.get('/collection/:collection',async (req,res)=>{
    let resp=new Responsedata();
    var collection=req.params.collection
    // console.log(collection)ie
    try{
        var colCars=await Car.find({collectionName:collection})
        if(colCars.length==0){
            resp.statuscode=200
            resp.message="data is null"
        }
        else{
            const unique =[...new Map(colCars.map(item =>
                [item['carName'], item])).values()]
            resp.statuscode=200
        resp.message=unique
        }
        
    }
    catch(err){
        resp.statuscode=500
        resp.message=err
    }
    res.status(resp.statuscode).send(resp.message)

})


router.get('/location/:location',async (req,res)=>{
    let resp=new Responsedata();
    var location=req.params.location
    // console.log(collection)ie
    try{
        var colCars=await Car.find({location:location})
        if(colCars.length==0){
            resp.statuscode=200
            resp.message="data is null"
        }
        else{
        // const unique = [...new Set(colCars.map(item => item.carName))]
        const unique =[...new Map(colCars.map(item =>
            [item['carName'], item])).values()]
            resp.statuscode=200
        resp.message=unique
        }
        
    }
    catch(err){
        resp.statuscode=500
        resp.message=err
    }
    res.status(resp.statuscode).send(resp.message)

})

module.exports=router