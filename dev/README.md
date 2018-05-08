### Develop Enviroment

# Local MongoDB 설정
- UP MongoDB
```
docker-compose -f docker-compose-mongo.yaml up -d
```
- CHECK MongoDB container
```
docker container ls
```
- DOWN MongoDB
```
docker-compose -f docker-compose-mongo.yaml down
```