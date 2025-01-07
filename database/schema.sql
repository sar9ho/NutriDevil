-- restaurants table
CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    hours JSONB
);

-- meals table
CREATE TABLE meals (
    id SERIAL PRIMARY KEY,
    restaurant_id INT REFERENCES restaurants(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    nutrition_info JSONB,
    price_in_food_points INT,
    dietary_flags VARCHAR(255)
);
