# Use official nginx base image
FROM nginx:alpine

# Remove default nginx welcome page
RUN rm -rf /usr/share/nginx/html/*

# Copy our frontend files into nginx's serving directory
COPY public/ /usr/share/nginx/html/

# Copy custom nginx config (handles API proxy to backend)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]