### Clean Architecture: TypeScript Fastify API

By employing clean architecture, you can design applications with very low coupling and independent of technical implementation details. That way, the application becomes easy to maintain and flexible to change. Clean architecture allows us to create architectural boundaries between dependencies which allows components to be swapped in and out and be intrinsically testable.

### Prepare Installation, setup enviroment

- install Nodejs >= 16.0 LTS
- install mysql >= 8.0
- check configration in file .env
- check run on file package.json
- npm install
- create folder public/purchasing, sejajar dengan folder src
- alter table vendor : pic(string), phone_pic(int), file_npwp(text), file_pkp(text)
- alter table vendor_bank : file_rekbank(text)
- alter table freight : pic(string), phone_pic(int), id_user_stockpile(int), file_npwp(text), file_pkp(text), file_ktp(text)
- alter table freight_bank : file_rekbank(text)
- alter table freight_cost : file_pkhoa(text)
- create table user_purchasing : user_id(int), deviced_id(string), kode_akses(string), active(int), entry_date(date)
- create table set_ups : nama(string), nilai(double 18,2)
- setup config nginx on /nginx/sites-enabled/jpj-api-fastify.config:

===============================================================================
upstream jpjapiservices {
server 127.0.0.1:4005
}
server {
listen 4006 default_server;
server_name jpj-api-fastify.test;
root "C:/laragon/www/jpj-api-fastify"; (lokasi sesuaikan dengan OS server)

    index index.html index.htm index.php;

    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied no-cache no-store private expired auth;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_min_length 20;

    client_max_body_size 1000M;

    # set custom access and errors logs file #
    # access_log /var/log/nginx/jpj-api/access.log main;
    # error_log /var/log/nginx/jpj-api/error.log;

    location /api/v1 {
        proxy_pass http://jpjapiservices; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 3600;
        proxy_connect_timeout 3600;
        proxy_send_timeout 3600;
    }

    location /jpj {
    	root "C:/laragon/www/jpj-api-fastify/public/"; (lokasi sesuaikan dengan OS server)
    }

    charset utf-8;

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
    location ~ /\.ht {
        deny all;
    }

}
This file is auto-generated.
If you want Laragon to respect your changes, just remove the [auto.] prefix
If you want to use SSL, enable it at: Menu > Nginx > SSL > Enabled

===============================================================================

- untuk running services, "npm run dev:build", setelah itu, "npm run dev:server"
- untuk running di PM2, "npm run dev:build", setelah itu, didalam folder projectnya, " pm2 start dist/app.js --name='jpj-api' "

### Folder Structure

Let's use files and folders to structure our application. Doing this allows us to communicate architecture intent:

```
/public
|── purchasing
/src
│── app.ts
│── presentation
│   ├── routers
│   ├── schema
│   ├── interfaces
│   └── handlers
├── domain
│   ├── interfaces
│   │   ├── repositories
│   │   └── use-cases
│   ├── entity
│   ├── repositories
│   └── use-cases
|── external
│   ├── helpers
└── data
    ├── interfaces
    ├── database
    ├── middleware
    └── data-sources
```

The presentation layer would mainly be used for inputting and outputting user data (API routes).

The inner core domain layer holds all business logic (use cases, repositories).

The data layer holds all infrastructure implementations (data sources).

The external layer functions helpers

### The Plan

![alt text](https://github.com/cobategit/jpj-api-fastify/blob/master/public/documentation/img/flow%20jpj%20api%20clean%20architecture.drawio.png?raw=true)
