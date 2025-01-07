-- inserting dummy data for restaurants
INSERT INTO restaurants (name, location, hours)
VALUES 
('Marketplace', 'East Campus', '{"Monday-Friday": "7AM-8PM", "Saturday-Sunday": "8AM-9PM"}'),
('Bella Union', 'West Campus', '{"Monday-Friday": "8AM-6PM"}'),
('The Loop', 'West Campus', '{"Monday-Friday": "11AM-10PM", "Saturday-Sunday": "12PM-10PM"}'),
('Ginger & Soy', 'West Campus', '{"Monday-Friday": "11AM-8PM"}'),
('Divinity Café', 'Divinity School', '{"Monday-Friday": "7:30AM-3PM"}');

-- same for meals 
INSERT INTO meals (restaurant_id, name, description, nutrition_info, price_in_food_points, dietary_flags)
VALUES 
(1, 'Grilled Chicken Sandwich', 'Juicy chicken sandwich', '{"calories": 350, "protein": 25, "carbs": 40, "fat": 10}', 6, 'gluten-free'),
(1, 'Vegan Buddha Bowl', 'Mixed veggies with quinoa', '{"calories": 250, "protein": 10, "carbs": 35, "fat": 5}', 5, 'vegan'),
(2, 'Classic Cheeseburger', 'Beef patty with cheese', '{"calories": 600, "protein": 30, "carbs": 45, "fat": 30}', 7, 'high-protein'),
(3, 'Margherita Pizza', 'Thin crust with fresh basil', '{"calories": 400, "protein": 12, "carbs": 50, "fat": 15}', 6, 'vegetarian'),
(4, 'Chicken Pad Thai', 'Noodles with chicken and peanuts', '{"calories": 450, "protein": 20, "carbs": 55, "fat": 15}', 7, 'contains-nuts');
