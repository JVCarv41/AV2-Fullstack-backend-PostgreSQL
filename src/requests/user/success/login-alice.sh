# Faz login com usuário registrado corretamente
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"123456789"}'
