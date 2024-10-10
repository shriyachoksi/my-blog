import express from "express";
import {db,connectToDb} from './db.js';

const app = express();
app.use(express.json());

app.get('/api/articles/:name', async(req, res)=>{
    const { name } = req.params;
    
    const article = await db.collection('articles').findOne({ name});
    
    if(article)
     {res.json(article);}
    else{
        res.status(404).send(`No article found with the name ${name}`);
    }
});


app.put('/api/articles/:name/upvote',async(req,res)=>{
    const { name } = req.params;

    
    await db.collection('articles').updateOne({ name},{
        $inc: {upvotes: 1}, 
    
    });
    const article = await db.collection('articles').findOne({ name});


    if (article) {
        res.send(`The ${name} article now has ${article.upvotes} upvotes!!`);
    } else {
        res.status(404).send(`No article found with the name ${name}`);
    }
});
    



app.post('/api/articles/:name/comments',async(req,res)=>{
    const { name } = req.params;
    const {postedBy,text} = req.body;

    
    await db.collection('articles').updateOne({name},{
        $push: {comments: {postedBy, text}},
    });
    const article = await db.collection('articles').findOne({ name});

    if (article) {
       res.send(article.comments);
    } else {
        res.status(404).send(`No article found with the name ${name}`);
    }
    
})
connectToDb(()=>{
    console.log('Database connection successful!!');  // this line will be logged only if database connection is successful
    app.listen(8000, () => {
    
    console.log('Server is running on port 8000');
});
})
