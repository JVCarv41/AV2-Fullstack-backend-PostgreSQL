curl -X PUT http://localhost:3000/api/shopping/[List_id] \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN_HERE]" \
  -d '{
        "date": "2025-05-06",
        "products": [ { "name": "Pão", "quantity": 3, "category": "Alimentos" } ]
    }'