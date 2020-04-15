create:
	docker-compose up -d --build
up:
	docker-compose up -d
exec:
	docker-compose exec vue ash
down:
	docker-compose down
destroy:
	docker-compose down --rmi all --volumes