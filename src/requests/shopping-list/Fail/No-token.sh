# This request lacks the token header
curl -X POST http://localhost:3000/api/shopping \
  -d '{
        "date": "2025-05-05",
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