const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors({
    origin: '*' 
}));

app.use(express.json());


app.get('/api', (req, res) => {
    res.json({ mensagem: "Olá do backend no Render!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
