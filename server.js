const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// PUBLIC FOLDER MIDDLEWARE
app.use(express.static("public"))

// ENDPOINTS
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

// LISTENER
app.listen(PORT, () => {
    console.log(`App listening on PORT: http://localhost:${PORT}`)
})