# Faz login com usuário registrado corretamente
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"eva@example.com","password":"789101112"}'
