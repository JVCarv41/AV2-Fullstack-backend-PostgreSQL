// filepath: c:\Users\jvfcs\VS-Code Workspace\FullStack\Atividades\Unidade 2\AV2.1-Fullstack\server.js
const app = require('./app');

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});