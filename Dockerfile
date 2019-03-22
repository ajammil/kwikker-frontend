#########################
### build environment ###
#########################
# base image
FROM node

WORKDIR '/app'
# install and cache app dependencies

COPY package.json .
RUN npm install
RUN npm install -g @angular/cli@7.1.2
# install chrome for protractor tests
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'
RUN apt-get update && apt-get install -yq google-chrome-stable



# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH


# add app
COPY . .


# generate build
RUN npm run build

##################
### production ###
##################

# base image
FROM nginx:alpine

# copy artifact build from the 'build environment'
COPY --from=builder /app/dist /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]