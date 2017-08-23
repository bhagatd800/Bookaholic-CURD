var express = require('express');
var router = express.Router();
var Students=require('../model/students');
var async = require ( 'async' );
var officegen = require('officegen');
var fs = require('fs');
var path = require('path');
var docx = require('docx');
//var Math = require('mathjs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/addStudent',function(req,res){
  var data;
  if(req.body.name==''){
    //console.log(req.body.Name);
    data={
      'errorcode':1,
      'message':"Name filed cannot be Empty"
    }
    res.json(data);
  }
  else if(req.body.lastName==''){
    //console.log(req.body.Name);
    data={
      'errorcode':1,
      'message':"Last Name cannot be Empty"
    }
    res.json(data);
  }
   else if(req.body.studentId==''){
   // console.log(req.body.Name);
    data={
      'errorcode':1,
      'message':"Student Id cannot be Empty"
    }
    res.json(data);
  }
   else if(req.body.phone==''){
    //console.log(req.body.Name);
    data={
      'errorcode':1,
      'message':"Phone cannot be Empty"
    }
    res.json(data);
  }
   else if(req.body.address==''){
   // console.log(req.body.Name);
    data={
      'errorcode':1,
      'message':"Address cannot be Empty"
    }
    res.json(data);
  }
  else{
    Students.addData(req.body,function(err,cb){
      console.log(err);
      if(err){
         data={
      'errorcode':1,
      'message':"Something went wrong please try again"
    }
    res.json(data);
      }
    else{
       data={
      'errorcode':1,
      'message':"Added Successfully"
    }
    res.json(data);
      }
    })
  }
});




 router.get('/getStudent/:_id',function(req,res){



      var studentId=req.params._id;

      console.log(studentId);


     Students.getStudentData(studentId, function (err, user) {
        if (err) {
            res.json({ "errorcode": 0 });
        }
        else {
            
            res.json(user)
        }

    });

    });


  router.get('/deleteStudent/:_id',function(req,res){



      var studentId=req.params._id;

      console.log(studentId);


     Students.deleteStudentData(studentId, function (err, user) {
        if (err) {
            res.json({ "errorcode": 0 })
        }
        else {
            
            res.json(user)
        }

    });

    });


router.get('/getDoc',function(req,res){
var data=[{
"question":"what is your name?",
"option":"Deepak"
},
{
  "question":"where do u belong from",
  "option":"nepal"
}

]
var date=Date.now();
var docx = officegen ( {
	type: 'docx',
	orientation: 'portrait'
	
} );


docx.on ( 'error', function ( err ) {
			console.log ( err );
		});

var pObj = docx.createP ();

for(i=0;i<data.length;i++){
  pObj.addText ((i+1) +")"+"");
  pObj.addText ( data[i].question);
  pObj.addLineBreak ();
  pObj.addText ( data[i].option,{ color: '000088' } );
  pObj.addLineBreak ();
};

var file='./public/tmp/'+date+'.docx'
var out = fs.createWriteStream ( file );

out.on ( 'error', function ( err ) {
	console.log ( err );
});

async.parallel ([
	function ( done ) {
		out.on ( 'close', function () {
			console.log ( 'Finish to create a DOCX file.' );
      done ( null );
      files='./public/tmp/'+date+'.docx';
      res.download(files);
		});
   docx.generate ( out );
    console.log("letter");
	}

], function ( err ) {
	if ( err ) {
		console.log ( 'error: ' + err );
	} 
});



})



router.get('/getDocument',function(req,res){
  //const numberedAbstract = numbering.createAbstractNumbering();
   var data=[{
    "question":"what is your name?",
    "option":"Deepak"
    },
    {
      "question":"where do u belong from",
      "option":"nepal"
    }
    
    ]
    const doc = new docx.Document();
    const numbering = new docx.Numbering();
    const numberedAbstract = numbering.createAbstractNumbering();
    numberedAbstract.createLevel(0, "lowerLetter", "%1)", "left");
    
    //const doc = new docx.Document();
    //const doc1 = new docx.Document();
    
     const letterNumbering = numbering.createConcreteNumbering(numberedAbstract);
    // data.forEach((opt) =>
    //     doc.createParagraph(opt.question,opt.option).setNumbering(letterNumbering, 0)
    // );
    for(i=0;i<data.length;i++){
      doc.createParagraph((i+1)+") "+data[i].question)
      doc.createParagraph(data[i].option);
     }
  
   
  // Used to export the file into a .docx file 
  //var exporter = new docx.LocalPacker(doc);
   
  // Or use the express packer to make the file downloadable. 
  // res is express' Response object 
  var exporter = new docx.ExpressPacker(doc, res);
   
  exporter.pack('My First Document');


})


router.get('/getDistance',function(req,res){


    // start and end are objects with latitude and longitude
    
    //decimals (default 2) is number of decimals in the output
    
    //return is distance in kilometers. 
    
// if(typeof(Number.prototype.toRad) === "undefined") {
  
//       Number.prototype.toRad = function () {
  
//           return this * Math.PI / 180;
  
//       }
  
//   }

    
        decimals = 2;
    
        var earthRadius = 6371; // km
    
        lat1 = parseFloat(12.907742577560865);//start latitude
    
        lat2 = parseFloat(12.907743577561234); //end latitude
    
        lon1 = parseFloat(77.61041992316195); //start longitude
    
        lon2 = parseFloat(77.63041992313445);  //end longitude
    
    
    
        var dLat = ((lat2 - lat1)*(22/7))/180
    
        var dLon = ((lon2 - lon1)*(22/7))/180;
    
        var lat1 = (lat1*(22/7))/180;
    
        var lat2 = (lat2*(22/7))/180;


//         var dLat = (lat2 - lat1).toRad();
        
//             var dLon = (lon2 - lon1).toRad();
        
//             var lat1 = lat1.toRad();
        
//             var lat2 = lat2.toRad();
    
    
    
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    
                Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        var d = earthRadius * c;
    
        var result= Math.round(d * Math.pow(10, decimals)) / Math.pow(10, decimals);
//var result =Math.sin(30)
console.log(result);
    


});

module.exports = router;
