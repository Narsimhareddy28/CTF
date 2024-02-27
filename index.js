// index.js
const express = require('express');
const mongoose=require('mongoose')
const Achievement=require('./AchieveSchema')
const path = require('path');
const app = express();
const port = 3000;






// DB connections
mongoose.connect('mongodb+srv://ksainarsimhareddy03:Saireddy28@cluster0.eyvi81t.mongodb.net/' )
.then(()=>{
  console.log("Connected to DB")
})
.catch((error)=>{
  console.error("Connection failed:",error)
})


const achievementSchema=new mongoose.Schema({
  ctfname : String,
  rank : String,
  Date : {type:Date, default:Date.now },
  ctfpoints : String

})
const Achievements=mongoose.model('Achievement',achievementSchema)




// DB route 
app.get('/achievements',async(req,res)=>{
  try{
    const achievements=await Achievements.find({});
    res.status(200).json({
      achievements
    })

  }
  catch(error){
    console.log('Error fetching achievements:',error)
    res.status(500).json({
      error:'Internal server error'
    })
  }
})

app.get('/achieve', (req, res) => {
  res.sendFile(path.join(__dirname, 'Achievements.html'));
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/TEAM', (req, res) => {
    res.sendFile(path.join(__dirname, 'team.html'));
  });
  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
  });




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

