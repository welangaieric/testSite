const express = require('express')
const axios = require('axios')

const router = express.Router()

router.get('/',(req,res)=>{
    res.render('index',{title:'Home'})
})
router.get('/login',(req,res)=>{
    res.render('login',{title:'login'})
})
router.get('/admin',(req,res)=>{
    res.render('admin',{title:'admin'})
})
router.get('/user',(req,res)=>{
    res.render('users',{title:'user'})
})
router.get('/logout',(req,res)=>{
    res.redirect('/login')
})





router.post('/api/login/',async (req,res)=>{
    let result;
    let id = req.body.id
    let password = req.body.password
    
    // console.log(email,password)
    await axios.get(`http://212.224.93.159:3000/api/employees/${id}`)
    .then((data)=>{
        result = data.data
        let [employee] =result
        
        
        if(employee.id === id && employee.password == password ){
            if(employee.userType === 'admin') {
                res.render('admin',{title:'admin',data:employee})

            }
            else
            {
                res.render('users',{title:'user',data:employee})

            }

        }
        else{
             res.render('login',{title:'login',error:'incorrect Username or Password'})

        }

    })
    .catch(()=>{
        
        res.render('login',{title:'login',error:'No such User'})

    })

})
module.exports = router