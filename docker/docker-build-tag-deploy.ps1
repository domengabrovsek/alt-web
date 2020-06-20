# script to build and push docker image for alt-web app

# build the image
Write-Host "Building docker image..." -ForegroundColor Cyan;
Invoke-Expression "docker build -t alt-web-app . --no-cache";
Write-Host "Docker image built." -ForegroundColor Cyan;

# tag the image
Write-Host "Tagging docker image..." -ForegroundColor Cyan;
Invoke-Expression "docker tag alt-web-app domengabrovsek/alt-web:app"
Write-Host "Docker image for tagged." -ForegroundColor Cyan;

# push the image to docker hub
Write-Host "Pushing docker image to docker hub..." -ForegroundColor Cyan;
Invoke-Expression "docker push domengabrovsek/alt-web:app"
Write-Host "Docker image pushed to docker hub." -ForegroundColor Cyan;
