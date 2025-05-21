curl -X PATCH http://localhost:3000/api/shopping/[List_id] \
  -H "Authorization: Bearer [YOUR_JWT_TOKEN_HERE]" \
  -d '{
        "products": [ { "name": "Pizza", "quantity": 1, "category": "Alimentos" } ]
    }'