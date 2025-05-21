# Tenta fazer login com e-mail que não existe no banco
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"emailnaoexiste@example.com","password":"123456"}'
