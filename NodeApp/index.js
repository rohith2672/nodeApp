const { application, request } = require('express');
const mysql=require('mysql');
const express=require('express');
const ejs = require('ejs');
const multer=require('multer');
const app=express();
app.set('view engine', 'ejs');
app.set('views','./views');
app.use(express.static('public'));
app.use(express.json());
var bodyParser = require('body-parser');
const { render } = require('pug');
let alert=require('alert');
let window=require('window');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extend:false}));


//database connection 
const db = mysql.createConnection({
    host     : "auctiondatabase.c5xfieorp2bw.ap-south-1.rds.amazonaws.com" ,
    user     : "rohith26721",
    password : "Rohith1290",
    port     : "3306",
    database : "auctionHouse"
  });
  
  db.connect(function(err){
    console.log("Connected!");
    });

app.listen(5000);




//PAGE ROUTES.... 


let uname;
let sname;
let EnameSeller;
let itemId;
let path;
let iName;
let iDescription;
let iSeller;
let iImage;
let iTime;
 let iName1;
let iSeller1;
let iTime1;
let iName2;
let iSeller2;
let iTime2;
let iName3;
let iSeller3;
let iTime3;
let iName4;
let iSeller4;
let iTime4;
let iAmount1;
let iAmount2;
let iAmount3;
let iAmount4;
let creditsUser;
let iUser1;
let iUser2;
let iUser3;
let iUser4;
let cBidname;
let cSeller;
let cEndTime;




app.get('/',function(req,res){
    res.render("index.ejs");
});




// user signin route....




// variable to take in userlogin values at the time of login request

app.post('/Usignin',function(req,res){
    uname=req.body.UserName;
    var pword=(req.body.PassWord); 
    var firstnameUser;
    var lastnameUser;
    var emailUser;
    var phonenumberUser;
    var address1User;
    var address2User;
    var address3User;
    var cityUser;
    var stateUser;
    var countryUser;
    var pincodeUser;
    var usernameUser;
    var passwordUser;


    db.query("select * from userInfo where username = ? ",[uname],function(err,results,fields){
    firstnameUser=results[0].firstName;
    lastnameUser=results[0].lastName;
    emailUser=results[0].email;
    phonenumberUser=(results[0].phoneNumber);
    creditsUser=results[0].credits;
    address1User=results[0].Address1;
    address2User=results[0].Address2;
    address3User=results[0].Address3;
    cityUser=results[0].city;
    stateUser=results[0].state;
    countryUser=results[0].country;
    pincodeUser=results[0].pincode;
    creditsUser=results[0].credits;
    });
  

    db.query("select * from item",function(err,result,fields){
      if(err)
      console.log("value not updated");
      iName1=result[0].itemName;
      iSeller1=result[0].seller;
      iTime1=result[0].endtime;
      iUser1=result[0].currentBidder;
      iAmount1=result[0].currentBidAmount;

      iName2=result[1].itemName;
      iSeller2=result[1].seller;
      iTime2=result[1].endtime;
      iUser2=result[1].currentBidder;
      iAmount2=result[1].currentBidAmount;


      iName3=result[2].itemName;
      iSeller3=result[2].seller;
      iUser3=result[2].currentBidder;
      iTime3=result[2].endtime;
      iAmount3=result[2].currentBidAmount;

      iName4=result[3].itemName;
      iSeller4=result[3].seller;
      iUser4=result[3].currentBidder;
      iTime4=result[3].endtime;
      iAmount4=result[3].currentBidAmount;
      


     });

    db.query("select * from userInfo where username = ? and password = ?",[uname,pword], function(err, result, fields) {
      if(err){
        console.log("error evaded");
        res.redirect('/');
      }
      if(result.length>0){
         res.render("UserLogin.ejs",
         {"firstname" : firstnameUser ,
         "lastname" : lastnameUser,
         "email" : emailUser,
          "phonenumber" :phonenumberUser,
          "credits" :  creditsUser,
          "address1" : address1User,
          "address2" : address2User,
          "address3" : address3User,
          "city" :     cityUser,
          "state" : stateUser,
          "country" : countryUser,
          "pincode" : pincodeUser,
          "username" : uname,
          "password" : pword,
          "credits" : creditsUser,
          "name1":iName1,
          "seller1":iSeller1,
          "time1":iTime1,
          "name2":iName2,
          "seller2":iSeller2,
          "time2":iTime2,
          "name3":iName3,
          "seller3":iSeller3,
          "time3":iTime3,
          "name4":iName4,
          "seller4":iSeller4,
          "time4":iTime4,
          "amount1":iAmount1,
          "amount2":iAmount2,
          "amount3":iAmount3,
          "amount4":iAmount4,


        });


         
         console.log("user logged in successfully");
        }
         else
         res.sendStatus(404);
         res.end();
       });
  
});



// Seller signin route ...


app.post('/Ssignin',function(req,res){
    sname=req.body.Sid;
    let spword=(req.body.SPwd); 

    db.query("select * from sellerInfo where username = ? ",[sname],function(err,results,fields){
      EnameSeller=results[0].enterpriseName;
      emailSeller=results[0].email;
      phonenumberSeller=(results[0].phoneNumber);
      creditsSeller=results[0].credits;
      });

      db.query("select * from item where seller = ? ",[sname],function(err,result,fields){
         iName=result[0].itemName;
         iDescription=result[0].description;
         iSeller=result[0].seller;
         iImage=result[0].image;
         iTime=result[0].endtime;
        });


    db.query("select * from sellerInfo where username = ? and password = ?",[sname,spword], function(err, result, fields) {
         if(result.length>0){
          res.render("sellerLogin.ejs",
         {"enterpriseName" : EnameSeller ,
         "email" : emailSeller,
          "phonenumber" :phonenumberSeller,
          "credits" :  creditsSeller,
          "username" : sname,
          "password" : spword,
          "itemName" :iName,
          "description": iDescription,
          "seller": iSeller,
          "image" : iImage,
          "time" : iTime
        });
         console.log("seller logged in successfully");
        }
         else
         res.sendStatus(404);
       });
});

app.post('/item1Bid',function(req,res){
  let bid=req.body.item1BidAmount;
  let prevUser;
  if(bid>iAmount1&&creditsUser>=bid){
    creditsUser=creditsUser-bid;
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[iAmount1,iUser1]);
    db.query("UPDATE item SET currentBidder = ?, currentBidAmount = ? WHERE (itemId = '1');",[uname,bid]);
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[creditsUser,uname]);
    alert("congratulations!! your bid is successful");
  }
  else{
    alert("Enter the correct bid Amount");
    res.redirect('/Usignin');
  }
});

app.post('/item2Bid',function(req,res){
  let bid=req.body.item2BidAmount;
  if(bid>iAmount2&&creditsUser>=bid){
    creditsUser=creditsUser-bid;
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[iAmount2,iUser2]);
    db.query("UPDATE item SET currentBidder = ?, currentBidAmount = ? WHERE (itemId = '2');",[uname,bid]);
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[creditsUser,uname]);
    alert("congratulations!! your bid is successful");
  }
  else{
    alert("Enter the correct bid Amount");
  }
});

app.post('/item3Bid',function(req,res){
  let bid=req.body.item3BidAmount;
  if(bid>iAmount3&&creditsUser>=bid){
    creditsUser=creditsUser-bid;
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[iAmount3,iUser3]);
    db.query("UPDATE item SET currentBidder = ?, currentBidAmount = ? WHERE (itemId = '3');",[uname,bid]);
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[creditsUser,uname]);
    alert("congratulations!! your bid is successful");
  }
  else{
    alert("Enter the correct bid Amount");
  }
})

app.post('/item4Bid',function(req,res){
  let bid=req.body.item4BidAmount;
  if(bid>iAmount4&&creditsUser>=bid){
    creditsUser=creditsUser-bid;
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[iAmount4,iUser4]);
    db.query("UPDATE item SET currentBidder = ?, currentBidAmount = ? WHERE (itemId = '4');",[uname,bid]);
    db.query("UPDATE userInfo SET credits = ? WHERE (username = ?);",[creditsUser,uname]);
    alert("congratulations!! your bid is successful");
  }
  else{
    alert("Enter the correct bid Amount");
  }
})




app.get('/signout',function(req,res){
    res.render("index.ejs");
})

app.post('/addBid',function(req,res){
  var newBidName=req.body.newBidName;
  var newBidId=req.body.newBidId;
  var newBidDescription=req.body.newBidDescription;
  const newBidT=req.body.newBidTime;
  
  var newBidAmount=req.body.newBidAmount;
  var imageLocation='/public/uploads';

  db.query("insert into item values(?,?,?,'NULL','0',?,?,?);",[newBidName,newBidDescription,sname,newBidT,imageLocation,newBidId],function(err,results,fields){
    
    });
  
});





