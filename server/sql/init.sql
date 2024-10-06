drop table if exists products;
drop table if exists sellers;
drop table if exists dealers;
drop table if exists cars;

create table cars
(
    id SERIAL PRIMARY KEY,
    brand CHARACTER VARYING(64) NOT NULL,
    model CHARACTER VARYING(64) NOT NULL
);

create table dealers
(
    id SERIAL PRIMARY KEY,
    name CHARACTER VARYING(64) NOT NULL UNIQUE
);

create table sellers
(
    id SERIAL PRIMARY KEY,
    dealerId INT NOT NULL,
    FOREIGN KEY (dealerId) REFERENCES dealers (id) ON DELETE CASCADE,
    phone CHARACTER VARYING(64) NOT NULL UNIQUE
);

create table products
(
    id SERIAL PRIMARY KEY,
    sellerId INT NOT NULL,
    FOREIGN KEY (sellerId) REFERENCES sellers (id) ON DELETE CASCADE,
    carId INT NOT NULL,
    FOREIGN KEY (carId) REFERENCES cars (id) ON DELETE CASCADE,
    price REAL NOT NULL
);

insert into cars (model, brand)
values
('Camry', 'Toyota'),
('RAV4', 'Toyota'),
('Granta', 'Lada'),
('Tiggo 7 Pro', 'Chery'),
('Sportage', 'Kia'),
('CX-5', 'Mazda');

insert into dealers (name)
values
('Автомир'),
('Диавто'),
('Дром'),
('Авто.ру'),
('АвтоГермес');

insert into sellers (phone, dealerId)
values
('+7 495 345 76 44', (select id from dealers where name='Автомир')),
('+7 903 567 99 88', (select id from dealers where name='Диавто')),
('+7 843 600 39 49', (select id from dealers where name='Автомир')),
('+7 905 890 66 55', (select id from dealers where name='Дром')),
('+7 912 456 78 99', (select id from dealers where name='Авто.ру')),
('+7 843 320 44 25', (select id from dealers where name='АвтоГермес')),
('+7 912 456 55 29', (select id from dealers where name='Авто.ру'));

insert into products (sellerId, carId, price)
values
(
    (select id from sellers where phone='+7 495 345 76 44'),
    (select id from cars where brand='Toyota' and model='RAV4'),
    2559000
),
(
    (select id from sellers where phone='+7 903 567 99 88'),
    (select id from cars where brand='Toyota' and model='Camry'),
    2358000
),
(
    (select id from sellers where phone='+7 843 600 39 49'),
    (select id from cars where brand='Lada' and model='Granta'),
    2980000
),
(
    (select id from sellers where phone='+7 905 890 66 55'),
    (select id from cars where brand='Chery' and model='Tiggo 7 Pro'),
    5720000
),
(
    (select id from sellers where phone='+7 905 890 66 55'),
    (select id from cars where brand='Toyota' and model='Camry'),
    2120000
),
(
    (select id from sellers where phone='+7 912 456 78 99'),
    (select id from cars where brand='Kia' and model='Sportage'),
    2633000
),
(
    (select id from sellers where phone='+7 843 320 44 25'),
    (select id from cars where brand='Lada' and model='Granta'),
    2230000
),
(
    (select id from sellers where phone='+7 912 456 55 29'),
    (select id from cars where brand='Mazda' and model='CX-5'),
    3180000
);
