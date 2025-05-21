# Tenta cadastrar usando e-mail inválido (sem @)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Carlos","email":"carlos-email-invalido","password":"123456"}'
