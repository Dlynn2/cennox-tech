const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// tells express to look for functions in the functions.js file.
app.use('/functions', require('./functions'));
//console log for what port express is running on
app.listen(port, () => console.log(`Listening on port ${port}`));




