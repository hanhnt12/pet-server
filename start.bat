
SET PATH=%PATH%;%PROGRAMFILES%\MongoDB\Server\3.4\bin

rem set location
set server="E:\HanhNT\OneDriver\OneDrive\workspace\pet\pet-server"
set client="E:\HanhNT\OneDriver\OneDrive\workspace\pet\client"

rem set db url connect
set DB_URL=mongodb://localhost:27017/petshop

rem set base url for connect API
set API_BASE_URL=http://localhost:3000/api/

start "" npm run startdev --prefix %server%
start "" npm run dev --prefix %client%
start "" mongod --dbpath=C:/data/pet

rem lauch vs code
start "" code %server%
code %client%

exit