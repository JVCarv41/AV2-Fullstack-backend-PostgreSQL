# Tenta cadastrar com senha muito curta (exemplo: 2 caracteres)
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria","email":"maria@example.com","password":"12"}'
