const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json()); //middleware

// app.get('/', (req, res) => {
//   res.status(200)
//     .json({ message: 'Hello from the server side!', app: 'Natours' }); //send method will basically give the text back
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); //parse will convert the JSON data into an array of javascript objects automatically

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    result: tours.length,
    data: {
      tours: tours, // we can simply use tours (ES6 syntax)
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body); //Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object.
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
}); //The JSON.stringify() method converts a JavaScript object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.

const port = 3000;
app.listen(port, () => {
  console.log(`App is listening on port ${port}...`);
});
