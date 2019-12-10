export NODE_ENV=production
export APP=*:4000
dev:
	. ./.env && NODE_ENV=development PORT=4000 npm run watch
run:
	npm run start
build:
	npm run bundle
