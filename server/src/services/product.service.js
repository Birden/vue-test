const {db} = require('../utils/db');

const SELECT_PRODUCTS_QUERY = `
    SELECT products.price, cars.model, cars.brand, sellers.phone, dealers.name
    FROM products
    JOIN cars on cars.id=products.carId
    JOIN sellers on sellers.id=products.sellerId
    JOIN dealers on dealers.id=sellers.dealerId
    ORDER BY products.id ASC`;
const GET_CAR_QUERY = 'SELECT id FROM cars WHERE brand = $1 AND model = $2;';
const CREATE_CAR_QUERY = 'INSERT INTO cars(brand, model) VALUES ($1,$2) RETURNING id;';
const GET_DEALER_QUERY = 'SELECT id FROM dealers WHERE name = $1;';
const CREATE_DEALER_QUERY = 'INSERT INTO dealers(name) VALUES ($1) RETURNING id;';
const GET_SELLER_QUERY = 'SELECT id FROM sellers WHERE dealerId = (SELECT id FROM dealers WHERE name = $1) AND phone = $2;';
const CREATE_SELLER_QUERY = 'INSERT INTO sellers(dealerId, phone) VALUES ($1, $2) RETURNING id;';
const GET_PRODUCT_ID_QUERY = 'SELECT id FROM products WHERE carId = $1 AND sellerId = $2 AND price = $3;';
const CREATE_PRODUCT_QUERY = 'INSERT INTO products(sellerId, carId, price) VALUES ($1, $2, $3) RETURNING *;';

/**
 * Получение всех продуктов
 * @return {Promise<Array<*>>}
 */
async function getAll () {
    const res = await db.query(SELECT_PRODUCTS_QUERY);
    return res?.rows;
}

/**
 * Выбор или создание сущности Car по марке и модели
 * @param {string} brand марка
 * @param {string} model модель
 * @return {Promise<*>}
 */
async function getOrCreateCar (brand, model) {
    // Проверяем наличие машины с таким названием
    let car = (await db.query(GET_CAR_QUERY, [brand, model])).rows[0];
    if (car == null) {
        // создаем, если нет такой машины
        car = (await db.query(CREATE_CAR_QUERY, [brand, model])).rows[0];
    }
    return car;
}

/**
 * Выбор или создание сущности Seller по имени и номеру телефона
 * @param {string} name имя
 * @param {string} phone номер телефона
 * @return {Promise<*>}
 */
async function getOrCreateSeller (name, phone) {
    // Проверяем наличие продавца с таким именем и контактом
    let seller = (await db.query(GET_SELLER_QUERY, [name, phone])).rows[0];
    if (seller == null) {
        // Если нет, проверим наличие такого дилера
        let dealer = (await db.query(GET_DEALER_QUERY, [name])).rows[0];
        if (dealer == null) {
            // нет дилера - создаем
            dealer = (await db.query(CREATE_DEALER_QUERY, [name])).rows[0];
        }
        // Создаем нового продовца
        seller = (await db.query(CREATE_SELLER_QUERY, [dealer.id, phone])).rows[0];
    }
    return seller;
}

/**
 * Получение Product из БД
 * @param {number} carId car id
 * @param {number} sellerId seller id
 * @param {number} price price
 * @return {Promise<*>}
 */
async function getProduct (carId, sellerId, price) {
    return (await db.query(GET_PRODUCT_ID_QUERY, [carId, sellerId, price])).rows[0];
}
/**
 * Создание продукта
 * @param {object} dto dto
 * @param {string} dto.brand бренд
 * @param {string} dto.model модель
 * @param {string} dto.name продавец
 * @param {string} dto.phone телефон продавца
 * @param {number|string} dto.price стоимость
 * @return {Promise<object>}
 */
async function create (dto) {
    if (dto == null) {
        throw new Error('Отсутсвуют параметры');
    }
    const {brand, model, name, phone, price} = dto;
    if (brand == null || brand === '') {
        throw new Error('Отсутствует параметр: brand');
    }
    if (model == null || model === '') {
        throw new Error('Отсутствует параметр: model');
    }
    if (name == null || name === '') {
        throw new Error('Отсутствует параметр: name');
    }
    if (phone == null || phone === '') {
        throw new Error('Отсутствует параметр: phone');
    }
    if (price == null) {
        throw new Error('Отсутствует параметр: price');
    }
    const priceValue = parseFloat(price);
    if (Number.isNaN(priceValue)) {
        throw new Error('Некорректное значение параметра: price');
    }
    const car = await getOrCreateCar(brand, model);
    const seller = await getOrCreateSeller(name, phone);
    const product = await getProduct(car.id, seller.id, priceValue);
    if (product != null) {
        throw new Error('Продукт с данными параметрами уже присутствует');
    }
    return (await db.query(CREATE_PRODUCT_QUERY, [seller.id, car.id, price])).rows[0];
}
module.exports = {
    getAll, create
};
