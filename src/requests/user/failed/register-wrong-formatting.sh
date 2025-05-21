# Tenta cadastrar com campos errados (nome e senha no lugar de name e password)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"nome":"Ana","email":"ana@example.com","senha":"123456"}'
