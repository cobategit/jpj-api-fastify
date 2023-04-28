### Clean Architecture: TypeScript Fastify API

By employing clean architecture, you can design applications with very low coupling and independent of technical implementation details. That way, the application becomes easy to maintain and flexible to change. Clean architecture allows us to create architectural boundaries between dependencies which allows components to be swapped in and out and be intrinsically testable.

### Prepare Installation and Run it

- install Nodejs >= 16.0 LTS
- check configration in file .env
- alter table vendor : pic, phone_pic, file_npwp, file_pkp
- alter table vendor_bank : file_rekbank
- alter table freight : pic, phone_pic, id_user_stockpile, file_npwp, file_pkp, file_ktp
- alter table freight_bank : file_rekbank
- alter table freight_cost : file_pkhoa
- create table user_purchasing : user_id, deviced_id, kode_akses, active, entry_date
- create table set_ups : nama, nilai
-

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
