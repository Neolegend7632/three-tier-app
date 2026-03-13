# 1. Start with a tiny, secure, and fast web server image.
# 'alpine' is a lightweight Linux distribution that keeps our container size small.
FROM nginx:alpine

# 2. Clear out the default Nginx "Welcome" files.
# This ensures that when someone visits the site, they see YOUR app, not the Nginx landing page.
RUN rm -rf /usr/share/nginx/html/*

# 3. Copy your project files into the web server's "hosting" folder.
# In Nginx, '/usr/share/nginx/html/' is the standard place where it looks for files to serve.
COPY public/ /usr/share/nginx/html/

# 4. Apply your custom Nginx configuration.
# This file is critical! It tells Nginx how to handle web traffic and 
# how to forward "API" requests to your Flask backend container.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 5. Tell Docker that this container is designed to communicate on Port 80.
# Port 80 is the standard port for HTTP (web) traffic.
EXPOSE 80

# 6. Start the web server and keep it running.
# The "daemon off;" part tells Nginx to run in the foreground so the 
# Docker container stays active and doesn't shut down immediately.
CMD ["nginx", "-g", "daemon off;"]