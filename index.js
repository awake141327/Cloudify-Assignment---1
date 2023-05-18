// Importing Modules and Framework.
import express from 'express' 
import path from 'path'
import fetch from 'node-fetch'

// Starting the server.
const app = express()

// Using Middlewares
app.use(express.static(path.join(path.resolve(),"./public")))
app.use(express.urlencoded({extended:true}))

// GET method
app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(),"./views/index.html"))
})

// POST method
app.post("/", (req, res) => {
    const {name, desc, due, start} = req.body // Destructuring the input object.
    
    // Fetching the Trello API to a Card with required/necessary query strings, API Key and Token.
    fetch(`https://api.trello.com/1/cards?name=${name}&desc=${desc}&due=${due}&start=${start}&idList=6466731e8dbc54c23dd80cfd&key=94fb049dce3575ad56532f95e5337200&token=ATTAae197a096a96a539786e035c9eae05b93d5a32a5e1952cea26ab3b10437ed144B2DB7DE7`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
    // Checking for status response.
    .then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
        })
	// Checking for errors.
        .then(text => console.log(text))
        .catch(err => console.error(err));
	
	// Resetting the form after Submission
	res.sendFile(path.join(path.resolve(),"./views/index.html"))
})
    
// Listening to the Server at port no. 8000
app.listen(8000, () => {
    console.log("Server is working")
})
