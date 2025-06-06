# Start the FastAPI backend
Start-Process -NoNewWindow powershell -ArgumentList "uvicorn knapsack.api:app --reload"

# Start the Next.js frontend
Start-Process -NoNewWindow powershell -ArgumentList "npm run dev"

Write-Host "Services started!"
Write-Host "Frontend: http://localhost:3000"
Write-Host "Backend: http://localhost:8000"
Write-Host "Press Ctrl+C to stop all services"

# Keep the script running
while ($true) { Start-Sleep -Seconds 1 } 