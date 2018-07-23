docker exec -t backend_mongo_1 mongoexport -d osoc18 -c issues --out dump/output.json
docker cp backend_mongo_1:/dump mongodb
