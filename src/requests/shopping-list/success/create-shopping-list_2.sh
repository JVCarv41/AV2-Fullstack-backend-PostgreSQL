curl -X POST http://localhost:3000/api/shopping \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN_HERE]" \
  -d '{
        "date": "2025-04-05",
        "products": [
            {
                "name": "Macarrão",
                "category": "Alimentos",
                "quantity": 4,
                "unit": "Pacote"
            },
            {
                "name": "Condicionador",
                "category": "Limpeza",
                "quantity": 1,
                "unit": "Unidade"
            },
            {
                "name": "Prato",
                "category": "Casa",
                "quantity": 5,
                "unit": "Unidade"
            }
        ]
    }'