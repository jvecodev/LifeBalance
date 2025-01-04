const express = require('express');



const app = express();

app.use(express.static('./pages'));

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});




