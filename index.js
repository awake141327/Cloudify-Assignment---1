import express from 'express'
import path from 'path'
import fetch from 'node-fetch'

const app = express()

app.use(express.static(path.join(path.resolve(),"./public")))
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.sendFile(path.join(path.resolve(),"./views/index.html"))
})

app.post("/", (req, res) => {
    const {name, desc, due, start} = req.body
    fetch(`https://api.trello.com/1/cards?name=${name}&desc=${desc}&due=${due}&start=${start}&idList=6466731e8dbc54c23dd80cfd&key=94fb049dce3575ad56532f95e5337200&token=ATTAae197a096a96a539786e035c9eae05b93d5a32a5e1952cea26ab3b10437ed144B2DB7DE7`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
        })
        .then(text => console.log(text))
        .catch(err => console.error(err));
	res.sendFile(path.join(path.resolve(),"./views/index.html"))
})
    

app.listen(8000, () => {
    console.log("Server is working")
})