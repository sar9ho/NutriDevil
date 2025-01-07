import psycopg2
from faker import Faker
import random
import json

#connecting to PostgreSQL
conn = psycopg2.connect(
    dbname="nutridevil",
    user="postgres",
    password="icyleopard",
    host="localhost",
    port="5432"
)
cursor = conn.cursor()


fake = Faker()

# clear data currently in tables before generating data (to prevent potential duplicates)
cursor.execute("TRUNCATE TABLE meals, restaurants RESTART IDENTITY;")

# to generate dummy restaurants
def generate_restaurants(n):
    restaurant_ids = []
    for _ in range(n):
        name = fake.company()
        location = fake.address()
        hours = json.dumps({
            "Monday-Friday": f"{random.randint(6, 10)}AM-{random.randint(6, 10)}PM",
            "Saturday-Sunday": f"{random.randint(8, 11)}AM-{random.randint(5, 9)}PM"
        })
        cursor.execute(
            "INSERT INTO restaurants (name, location, hours) VALUES (%s, %s, %s) RETURNING id",
            (name, location, hours)
        )
        restaurant_ids.append(cursor.fetchone()[0])
    return restaurant_ids

# generate dummy restaurants
def generate_meals(restaurant_ids, n_per_restaurant):
    for restaurant_id in restaurant_ids:
        for _ in range(n_per_restaurant):
            name = fake.sentence(nb_words=3)
            description = fake.text(max_nb_chars=50)
            nutrition_info = json.dumps({
                "calories": random.randint(200, 800),
                "protein": random.randint(10, 50),
                "carbs": random.randint(20, 100),
                "fat": random.randint(5, 30)
            })
            price_in_food_points = random.randint(4, 10)
            dietary_flags = random.choice(['vegan', 'vegetarian', 'gluten-free', 'high-protein', 'contains-nuts'])
            cursor.execute(
                "INSERT INTO meals (restaurant_id, name, description, nutrition_info, price_in_food_points, dietary_flags) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                (restaurant_id, name, description, nutrition_info, price_in_food_points, dietary_flags)
            )

# choose # of each to generate
restaurant_ids = generate_restaurants(10)  
generate_meals(restaurant_ids, 15)         

# commit changes + close connection-------------------------------------------
conn.commit()
cursor.close()
conn.close()

print("Dummy data generated successfully!") #success msg
