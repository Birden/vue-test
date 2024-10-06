const request = require('supertest');
const {app, server} = require('../src/index');
const {db} = require('../src/utils/db');

const getRandom = () => Math.round(Math.random() * 10000000);
const productDtos = [
    {
        brand: 'Toyota',
        model: 'RAV4',
        price: getRandom(),
        name: 'Фастар',
        phone: '330-00-00'
    },
    {
        brand: 'Mazda',
        model: 'CX-5',
        price: getRandom(),
        name: 'Автомир',
        phone: '330-01-00'
    },
    {
        brand: 'Nissan',
        model: 'Patrol',
        price: getRandom(),
        name: 'Автомир',
        phone: '330-01-00'
    },
    {
        brand: 'Lexus',
        model: 'GX460',
        price: getRandom(),
        name: 'Дром',
        phone: '332-01-00'
    },
    {
        brand: 'Toyota',
        model: 'Camry',
        price: getRandom(),
        name: 'Фастар',
        phone: '330-00-01'
    },
    {
        brand: 'Suzuki',
        model: 'SX4',
        price: getRandom(),
        name: 'Авторынок',
        phone: '332-00-01'
    }
];

describe('App', () => {
    beforeAll(async () => {
        await db.query('DELETE FROM products;');
        await db.query('DELETE FROM sellers;');
        await db.query('DELETE FROM dealers;');
        await db.query('DELETE FROM cars;');
    });
    it('app should be defined ', () => {
        expect(app).toBeDefined();
    });
    it('Fetch products should response an empty array', async () => {
        const {statusCode, body: products} = await request(app).get('/api/product');
        expect(statusCode).toEqual(200);
        expect(products).toBeDefined();
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toEqual(0);
    });

    it('Create product without brand should response an error', async () => {
        const dto = {...productDtos[0]};
        delete dto.brand;
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Отсутствует параметр: brand');
    });

    it('Create product without model should response an error', async () => {
        const dto = {...productDtos[0]};
        delete dto.model;
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Отсутствует параметр: model');
    });

    it('Create product without name should response an error', async () => {
        const dto = {...productDtos[0]};
        delete dto.name;
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Отсутствует параметр: name');
    });
    it('Create product without phone should response an error', async () => {
        const dto = {...productDtos[0]};
        delete dto.phone;
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Отсутствует параметр: phone');
    });
    it('Create product without price should response an error', async () => {
        const dto = {...productDtos[0]};
        delete dto.price;
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Отсутствует параметр: price');
    });
    it('Create product with incorrect price value should response an error', async () => {
        const dto = {
            ...productDtos[0],
            price: 'bad value'
        };
        const {statusCode, body} = await request(app)
            .post('/api/product')
            .send(dto);
        expect(statusCode).toEqual(500);
        expect(body.error).toEqual('Некорректное значение параметра: price');
    });

    it('Create product should response product', async () => {
        for (const dto of productDtos) {
            const {statusCode, body: product} = await request(app)
                .post('/api/product')
                .send(dto);
            expect(statusCode).toEqual(201);
            expect(product.id).toBeDefined();
            expect(product.carid).toBeDefined();
            expect(product.sellerid).toBeDefined();
            expect(product.price).toEqual(dto.price);
        }
    });
    it('Fetch products should response an non-empty array', async () => {
        const {statusCode, body: products} = await request(app).get('/api/product');
        expect(statusCode).toEqual(200);
        expect(products).toBeDefined();
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toEqual(productDtos.length);
    });
    afterAll(async () => {
        server.close();
    });
});
