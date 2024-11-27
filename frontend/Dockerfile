FROM node:20-alpine as build

WORKDIR /frontend/

COPY frontend/ .

RUN yarn

RUN yarn build

RUN ls -lha

FROM nginx:1.23.4-alpine

COPY --from=build /frontend/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

COPY frontend/nginx/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]