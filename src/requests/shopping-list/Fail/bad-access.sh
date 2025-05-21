# This request has a valid token, but it tries to access a shopping list from user A
curl -X GET http://localhost:3000/api/shopping/[List_id_User_A] \
  -H "Authorization: Bearer [User_B_JWT_TOKEN_HERE]" \
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