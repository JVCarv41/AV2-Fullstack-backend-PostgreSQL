# Tenta cadastrar o mesmo e-mail novamente (vai dar erro)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"João","email":"joao@example.com","password":"123456"}'
