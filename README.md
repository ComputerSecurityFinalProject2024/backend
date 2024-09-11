## Setup:

#### MySQL database:

-   Start the database container in Docker:
    `docker run --name kerberos -e MYSQL_ROOT_PASSWORD=kerberos_admin -p 3306:3306 -d mysql:8.4.2`
-   Test database connection using MySQL client:
    `mysql -h localhost -P 3306 --protocol=tcp -u root --password=kerberos_admin`
-   Using Prisma to populate the newly-created database server:
    `npx prisma migrate dev --name init`
-   Reset the database:
    `npx prisma db push --force-reset`
