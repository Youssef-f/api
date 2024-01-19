import express from "express";
import ambulances from "./data/ambulances.json" with  { type: "json" };
import bodyParser from "body-parser";

const app = express();
const PORT = 3000; // Port number


app.use(bodyParser.json());

app.get("/api", (req, res) => {
  res.status(200).json(ambulances);
});

app.get('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id)
    
    if(!ambulance) {
        res.status(404).send('Ambulance not found')
    }
    res.status(200).json(ambulance)
})
app.post('/ambulances', (req, res) => {
    const ambulance = req.body
    ambulances.push(ambulance)
    res.status(201).send('Ambulance added')
})
app.put('/ambulances/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const ambulance = ambulances.find(ambulance => ambulance.id === id)
    ambulance.name = req.body.name;
    ambulance.date = req.body.date;
    res.status(200).json(ambulance)
})
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
