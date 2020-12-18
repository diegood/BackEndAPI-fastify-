-- ADD UUID EXTENSION
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE SCHEMAS
CREATE SCHEMA IF NOT EXISTS logistics;
CREATE SCHEMA IF NOT EXISTS products;
CREATE SCHEMA IF NOT EXISTS upload;
CREATE SCHEMA IF NOT EXISTS users;
CREATE SCHEMA IF NOT EXISTS roles;
CREATE SCHEMA IF NOT EXISTS tags;
CREATE SCHEMA IF NOT EXISTS orders;
CREATE SCHEMA IF NOT EXISTS stores;
CREATE SCHEMA IF NOT EXISTS categories;
CREATE SCHEMA IF NOT EXISTS carts;
CREATE SCHEMA IF NOT EXISTS payments;

-- CREATE MAIN TABLES
CREATE TABLE roles.role (
    id              uuid        DEFAULT uuid_generate_v4 (),
    name            varchar     NOT NULL UNIQUE,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);


CREATE TABLE products.product_base (
    id       			uuid DEFAULT uuid_generate_v4(),
    image				varchar		not null,
    name        		varchar     not null,
    description         TEXT        null,       
    available           boolean     DEFAULT TRUE,
    recommended_portion varchar     null default '0.5',
	filters 			json		null,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE upload.images (
    id       		uuid DEFAULT uuid_generate_v4 (),
	path			varchar 	not null,
	alt				varchar,
    name           	varchar     NOT NULL,
    belongs_to      varchar,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS logistics.postals_codes (
    id                uuid DEFAULT uuid_generate_v4 (),
    country           varchar(3) NOT NULL,
    postal_code       varchar(10)  NOT NULL,
    neighborhoods     varchar(100) NOT NULL,
    region_name       varchar(100) NOT NULL,
    region_code       varchar(5)  NOT NULL,
    city_name         varchar(100) NOT NULL,
    city_code         varchar(5) NOT NULL,
    local_town        varchar(100),
    local_town_code   varchar(5),
    lat               real NOT NULL,
    lng               real NOT NULL,
    accuracy          char NOT NULL,
    creation_date     timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date      timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE tags.tag (
    id              uuid DEFAULT uuid_generate_v4(),
    name            varchar     NOT NULL,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE users.user (
    id              uuid        DEFAULT uuid_generate_v4 (),
    email           varchar     NOT NULL unique,   
    password        varchar     NOT NULL,
    first_name      varchar     NULL,
    last_name       varchar     NULL,
    document_type   varchar     NULL,
    document_number varchar     NULL,
    phone_number    varchar     NULL,
    avatar          varchar     NULL,
    active          boolean     NULL DEFAULT true,
    settings        JSON        null,
    birth_date      date        null,
    gender          varchar(1)  null,
    locale          varchar     NULL DEFAULT 'es-ES',
    accept_terms    boolean     null,
    accept_cookies  boolean     null,
    last_login_date timestamp   NULL,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT users_pk PRIMARY KEY (id)
);

-- CREATE RELATED TABLES

CREATE TABLE stores.store (
    id       			uuid DEFAULT uuid_generate_v4(),
    uri_name        	varchar     null,
    name        		varchar     null,
    description        	varchar     NULL   ,
    phone_number        varchar     null,   
    images              json        null,
    bussines_hours      json        null,
    fiscal_data         json        null,
    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    CONSTRAINT store_un UNIQUE (uri_name)
);

CREATE TABLE stores.users_store (
    id       			uuid DEFAULT uuid_generate_v4(),
    user_id             uuid        not null,
    store_id            uuid        not null,
    primary key (id),
    foreign key (user_id) references users.user(id),
    foreign key (store_id) references stores.store(id)
);

CREATE TABLE logistics.address (
    id       			uuid DEFAULT uuid_generate_v4(),
    type                varchar             ,
    country             varchar default 'ES',
    city                varchar     not null,
    street              varchar     not null,
    street_number       varchar     not null,
    postal_code         varchar     not null,
    extra               varchar             ,
    local_town          varchar             ,
    default_address     boolean             ,
    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
);

CREATE TABLE users.users_address (
    id       			uuid DEFAULT uuid_generate_v4(),
    user_id             uuid        not null,
    address_id          uuid        not null,
    name                VARCHAR     null,
    priority            BOOLEAN     NOT null,
    enabled             BOOLEAN     NULL DEFAULT TRUE,
    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (user_id) references users.user(id),
    foreign key (address_id) references logistics.address(id)
);

CREATE TABLE users.roles (
    id              uuid DEFAULT uuid_generate_v4(),
    user_id         uuid        NOT NULL ,
    role_id         uuid        NOT NULL ,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (user_id, role_id),
    foreign key (role_id) references roles.role(id),
    foreign key (user_id)   references users.user(id)
);

CREATE TABLE logistics.store (
    id       		   uuid DEFAULT uuid_generate_v4(),
    address_id         uuid,
    store_id           uuid not null,
    ownCourier         boolean default false,
    pickup             boolean default false,
    preparation_time   varchar default '1:00',
    postal_codes       json null,
    contact_phone      varchar,
    contact_email      varchar,
    creation_date      timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (address_id) references logistics.address(id),
    foreign key (store_id) references stores.store(id)
);


CREATE TABLE IF NOT EXISTS products.product_store (
    id       			uuid DEFAULT uuid_generate_v4(),
    store_id			uuid		not null,
    product_base_id     uuid        not null,
    uri_name            VARCHAR     not null,
    images           	json        NOT NULL,
    name        		varchar     not null,
    quantity            int			null,
    status 				varchar(10) not null,
    price				decimal	    not null,
    variant             json		not null,
    filters 			json		null,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (product_base_id) references products.product_base(id),
    foreign key (store_id) references stores.store(id),
    CONSTRAINT product_store_un UNIQUE (uri_name)
);

CREATE TABLE IF NOT EXISTS products.tags (
    id              uuid DEFAULT uuid_generate_v4(),
    product_id      uuid        NOT NULL,
    tag_id          uuid        NOT NULL,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (tag_id) references tags.tag(id),
    foreign key (product_id) references products.product_base(id)
);

CREATE TABLE IF NOT EXISTS categories.category (
	id       		uuid DEFAULT uuid_generate_v4 (),
    name           	varchar     NOT NULL,
    parent_id       uuid 		null,
    creation_date   timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date    timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS products.categories (
	id       		        uuid DEFAULT uuid_generate_v4 (),
    category_id             uuid 		not null,
    category_parent_id      uuid        not null,
    product_id              uuid 		not null,
    creation_date           timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date            timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    foreign key (category_id, category_parent_id) references categories.category(id, parent_id),
    foreign key (product_id) references products.product_base(id)
);

CREATE TABLE IF NOT EXISTS orders.request(
    id                  uuid DEFAULT uuid_generate_v4(),
    user_id             uuid       NOT NULL,
    status              varchar,
    retained_price      decimal,
    real_price          decimal,
    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    FOREIGN key (user_id) REFERENCES users.user(id)
);

CREATE TABLE IF NOT EXISTS orders.order (
    id                 uuid DEFAULT uuid_generate_v4(),
    store_id           uuid          not NULL       ,
    request_id         uuid          not null       ,
    address_id         uuid                         ,
    preparation_date   date          not null       ,
    status             varchar(30)   default 'NEW'  ,
    delivery_date      date                         ,
    logistic_type      varchar       not null       ,
    track_number       varchar                      ,
    retained_price     decimal       not null       ,
    real_price         decimal                      ,
    ticket_number      varchar                      ,
    ticket_image_id    varchar                      ,
    creation_date      timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    FOREIGN key (request_id) REFERENCES orders.request(id),
    FOREIGN key (address_id) REFERENCES logistics.address(id),
    FOREIGN key (store_id) REFERENCES stores.store(id)
);

CREATE TABLE IF NOT EXISTS orders.items(
    id                  uuid DEFAULT uuid_generate_v4 (),
    order_id            uuid      not null,
    product_store_id    uuid      not null,
    done                boolean   default false,
    quantity            int       not null,
    quantity_pakages    real      NULL DEFAULT 1;
    variant             json,
    price               decimal   not null,
    max_price           decimal,
    substitution        varchar,
    clarifications      varchar,
    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    FOREIGN KEY (order_id) references orders.order(id),
    FOREIGN KEY (product_store_id) references products.product_store(id)
);

CREATE TABLE IF NOT EXISTS carts.cart(
    id                uuid DEFAULT uuid_generate_v4 (),
    user_id              uuid        NULL,
    currency             VARCHAR(4)  NOT NULL,
    items                JSON        NULL,
    billing_address_id   uuid        NULL,
    shipping_address_id  uuid        NULL,
    pickup               BOOLEAN     NULL DEFAULT false,
    creation_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date         timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    FOREIGN key (user_id) REFERENCES users.user(id),
    foreign key (shipping_address_id) references logistics.address(id)
);


CREATE TABLE IF NOT EXISTS payments.customer_payment(
    id                      uuid DEFAULT uuid_generate_v4 (),
    request_id              uuid        NOT NULL,
    transaction_date        timestamp   NOT NULL,
    transaction_type        VARCHAR     NOT NULL,
    transaction_code        VARCHAR     NOT NULL,
    transaction_code_RAW    VARCHAR     NOT NULL,
    currency                VARCHAR(4)  NOT NULL,
    amount                  money       NOT NULL,
    is_secure               BOOLEAN     NOT NULL,
    gateway_order           VARCHAR     NOT NULL,
    card_country            VARCHAR     null,
    card_type               VARCHAR     null,
    card_brand              VARCHAR     null,
    creation_date           timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_date            timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id),
    FOREIGN key (request_id) REFERENCES orders.request(id)
);

CREATE TABLE products.presentation(
    id                   uuid DEFAULT uuid_generate_v4 (),
    name_key             VARCHAR     NOT NULL,
    name                 VARCHAR     NOT NULL,
    created_at           timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at           timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
    primary key (id)
);









-- CREATE TABLE carts.items(
--    id                  uuid DEFAULT uuid_generate_v4 (),
--    cart_id             uuid      not null,
--    product_store_id    uuid      not null,
--    quantity            int       not null,
--    variant             json,
--    price               decimal   not null,
--    max_price           decimal,
--    substitution        varchar,
--    clarifications      varchar,
--    creation_date       timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
--    updated_date        timestamp   NULL DEFAULT CURRENT_TIMESTAMP,
--    primary key (id),
--    FOREIGN KEY (cart_id) references carts.cart(id),
--    FOREIGN KEY (product_store_id) references products.product_store(id)
-- );

-- INSERT BASE DATA TO MANAGE ROLES

INSERT INTO roles."role" ("name")
	VALUES 
		('CUSTOMER'),
		('ADMIN'),
		('BACKOFFICE'),
        ('GUEST');

INSERT INTO categories.category ("parent_id", "name")
    VALUES
        (null, 'seafood'),
        (null, 'fish'),
        (null, 'wines'),
        ('422bfc0c-f8d8-4028-865c-96d0a30dbb92', 'fresh_seafood'),
        ('422bfc0c-f8d8-4028-865c-96d0a30dbb92', 'frozen_seafood'),
        ('422bfc0c-f8d8-4028-865c-96d0a30dbb92', 'crustaceans'),
        ('422bfc0c-f8d8-4028-865c-96d0a30dbb92', 'mollusks'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','mollusks_fish'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','blue_fish'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','white_fish'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','fat_fish'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','cephalopods'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492','frozen_fish'),
        ('a27e594c-e8cd-4e7c-ac52-7567df77d492', 'fresh_fish');

INSERT INTO tags.tag ("name")
    VALUES
        ('a_vitamin'),
        ('b_vitamin'),
        ('b1_vitamin'),
        ('b2_vitamin'),
        ('b3_vitamin'),
        ('b4_vitamin'),
        ('b5_vitamin'),
        ('b6_vitamin'),
        ('b7_vitamin'),
        ('b9_vitamin'),
        ('b12_vitamin'),    
        ('c_vitamin'),
        ('d_vitamin'),
        ('e_vitamin'),
        ('diet'),
        ('childrens'),
        ('potassium'),
        ('phosphorus'),
        ('iron'),
        ('magnesium'),
        ('omega_3'),
        ('iodine'),
        ('zinc'),
        ('sodium'),
        ('calcium'),
        ('selenium');