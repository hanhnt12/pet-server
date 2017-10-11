
SET PATH=%PATH%;%PROGRAMFILES%\MongoDB\Server\3.4\bin

rem set location
set server="E:\HanhNT\OneDriver\OneDrive\workspace\pet\pet-server"
set client="E:\HanhNT\OneDriver\OneDrive\workspace\pet-vue\client"

start "" npm run startdev --prefix %server%
start "" npm run dev --prefix %client%
start "" mongod --dbpath=C:/data/pet

rem lauch vs code
start "" code %server%
code %client%

exit