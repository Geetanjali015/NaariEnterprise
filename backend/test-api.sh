#!/bin/bash

# Test Transaction API

echo "🧪 Testing NaariEnterprise Transaction API"
echo "==========================================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:5001"

echo -e "${YELLOW}Step 1: Testing server health${NC}"
curl -s "$API_URL/health" | grep -q "running" && echo -e "${GREEN}✓ Server is running${NC}" || echo -e "${RED}✗ Server is not running${NC}"

echo -e "\n${YELLOW}Step 2: Register a test user${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "9876543210",
    "city": "Test City",
    "business_type": "Testing",
    "business_name": "Test Business"
  }')

TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo -e "${RED}✗ Registration failed${NC}"
  echo "Response: $REGISTER_RESPONSE"
  exit 1
else
  echo -e "${GREEN}✓ User registered successfully${NC}"
  echo "Token: $TOKEN"
fi

echo -e "\n${YELLOW}Step 3: Create an income transaction${NC}"
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/transactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "type": "income",
    "amount": 10000,
    "category": "Product Sales",
    "description": "Test income",
    "date": "2026-03-30"
  }')

echo "Response: $CREATE_RESPONSE" | grep -q "created successfully" && echo -e "${GREEN}✓ Transaction created${NC}" || echo -e "${RED}✗ Transaction creation failed${NC}"

echo -e "\n${YELLOW}Step 4: Create an expense transaction${NC}"
curl -s -X POST "$API_URL/transactions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "type": "expense",
    "amount": 2000,
    "category": "Marketing",
    "description": "Test expense",
    "date": "2026-03-30"
  }' | grep -q "created successfully" && echo -e "${GREEN}✓ Expense created${NC}" || echo -e "${RED}✗ Expense creation failed${NC}"

echo -e "\n${YELLOW}Step 5: Fetch all transactions${NC}"
TRANSACTIONS=$(curl -s -X GET "$API_URL/transactions" \
  -H "Authorization: Bearer $TOKEN")

echo "Transactions: $TRANSACTIONS" | grep -q "Product Sales" && echo -e "${GREEN}✓ Transactions fetched${NC}" || echo -e "${RED}✗ Failed to fetch transactions${NC}"

echo -e "\n${YELLOW}Step 6: Get transaction summary${NC}"
SUMMARY=$(curl -s -X GET "$API_URL/transactions/summary" \
  -H "Authorization: Bearer $TOKEN")

echo "Summary: $SUMMARY" | grep -q "totalIncome" && echo -e "${GREEN}✓ Summary fetched${NC}" || echo -e "${RED}✗ Failed to fetch summary${NC}"

echo -e "\n${GREEN}==========================================="
echo "🎉 All tests completed!"
echo "===========================================\n${NC}"
