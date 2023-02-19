FROM node:17.0.1-bullseye-slim as build
WORKDIR /app

RUN npm install --g @angular/cli@13

COPY ./package.json .
RUN npm install
COPY . .
RUN ng build

FROM nginx as runtime
COPY --from=build /app/dist/accounting /usr/share/nginx/html
COPY /nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]