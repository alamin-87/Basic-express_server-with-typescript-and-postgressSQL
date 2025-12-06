# Test Todos POST endpoint

# First, create a user
Write-Host "Creating a user..."
$userResponse = Invoke-RestMethod -Uri "http://localhost:5000/users" -Method POST `
  -ContentType "application/json" `
  -Body @{
    name = "John Doe"
    email = "john@example.com"
    age = 30
    phone = "1234567890"
    address = "123 Main St"
  } | ConvertTo-Json

Write-Host "User Response: $userResponse"

# Extract user ID (assuming the response has a data.id field)
$userId = ($userResponse | ConvertFrom-Json).data.id
Write-Host "Created user with ID: $userId"

# Now test the todos POST endpoint
Write-Host "`nCreating a todo..."
$todoResponse = Invoke-RestMethod -Uri "http://localhost:5000/todos" -Method POST `
  -ContentType "application/json" `
  -Body @{
    userId = $userId
    title = "Test Todo"
    description = "This is a test todo"
  } | ConvertTo-Json

Write-Host "Todo Response: $todoResponse"
