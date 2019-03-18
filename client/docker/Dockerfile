FROM nginx:alpine

# Copy over the config file
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Copy over our actual content
COPY ./build /data/www

# Just use the default cmd to run nginx here