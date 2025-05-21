# This request lacks the date
curl -X POST http://localhost:3000/api/shopping \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN_HERE]" \
  -d '{
        "products": [
            {
                "name": "Arroz",
                "category": "Alimentos",
                "quantity": 2,
                "unit": "Kg"
            },
            {
                "name": "Sabão",
                "category": "Limpeza",
                "quantity": 1,
                "unit": "Unidade"
            }
        ]
    }'