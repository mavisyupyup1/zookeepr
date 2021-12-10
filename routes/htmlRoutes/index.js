const path = require('path')
const router = require('express').Router()
//'/' brings to the root route of the server to create a homepage for a server.and it returns an html file. telling them where to find the find and send back to the client
router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/index.html'));
  })
  
  //set up GET route for animals.html page too
router.get('/animals',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/animals.html'));
  })
  
router.get('/zookeepers',(req,res)=>{
    res.sendFile(path.join(__dirname,'../../public/zookeepers.html'));
  });
router.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname,'../../public/index.html'))
  })
 module.exports=router