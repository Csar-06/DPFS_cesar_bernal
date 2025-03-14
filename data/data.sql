USE nexxusDB;

-- Insertando Roles
INSERT INTO ROLES (role_name) VALUES ('admin'), ('customer');

-- Insertando Usuarios
INSERT INTO USERS (first_name, last_name, email, password, join_date, avatar) VALUES
('Carlos', 'Perez', 'carlos@example.com', 'hashed_password', NOW(), 'avatar1.png'),
('Ana', 'Gomez', 'ana@example.com', 'hashed_password', NOW(), 'avatar2.png');

-- Asignando Roles a Usuarios
INSERT INTO USER_ROLES (user_id, role_id, created_at) VALUES
(1, 1, NOW()), -- Carlos es admin
(2, 2, NOW()); -- Ana es cliente

-- Insertando Marcas
INSERT INTO BRANDS (brand_name) VALUES ('Apple'), ('Samsung'), ('Google'), ('OnePlus'), ('Xiaomi'), ('Huawei');

-- Insertando Modelos
INSERT INTO MODELS (brand_id, model) VALUES
(1, 'iPhone 15'),
(1, 'iPhone 15 Pro'),
(2, 'Galaxy S21 Ultra'),
(2, 'Galaxy S22 Ultra'),
(3, 'Pixel 8'),
(4, '11');

-- Insertando Productos
INSERT INTO PRODUCTS (brand_id, model_id, description, image, render, unit_price) VALUES
(1, 1, 'iPhone 15 - Segunda mano, en excelente estado.', '/uploads/product_image/iphone-15.png', '/uploads/product_model/iphone_15_azul.glb', 499.99),
(1, 2, 'iPhone 15 Pro - Reparado, con garantía.', '/uploads/product_image/iphone-15-pro.png', '/uploads/product_model/apple_iphone_15_pro_black.glb', 399.99),
(2, 3, 'Samsung Galaxy S21 Ultra - Segunda mano, con detalles estéticos.', '/uploads/product_image/galaxy-s21-ultra.png', '/uploads/product_model/samsung_galaxy_s21_ultra.glb', 450.00),
(2, 4, 'Galaxy S22 Ultra - Reparado, batería cambiada.', '/uploads/product_image/galaxy-s22-ultra.png', '/uploads/product_model/samsung_galaxy_s22_ultra.glb', 420.00),
(3, 5, 'Pixel 8 - Segunda mano, pantalla impecable.', '/uploads/product_image/google-pixel-8.png', '/uploads/product_model/google_pixel_8.glb', 430.00),
(4, 6, 'OnePlus 11 - Usado, rendimiento óptimo.', '/uploads/product_image/onePlus-11.png', '/uploads/product_model/onePlus_11.glb', 380.00);


-- Insertando Colores
INSERT INTO COLORS (color) VALUES ('black'), ('white'), ('blue'), ('darkred'), ('pink'), ('yellow'), ('papayawhip'), ('paleturquoise'), ('gold'), ('steelblue'), ('slategrey'), ('darkolivegreen'), ('silver'), ('purple'), ('lightgreen');

-- Relación Producto - Color
INSERT INTO PRODUCT_COLOR (product_id, color_id, stock) VALUES
(1, 1, 10), (1, 8, 5), (1, 15, 15), (1, 6, 5), (1, 5, 10), -- iPhone 15 (negro, celeste, verde claro, amarillo, rosa)
(2, 3, 8),(2, 2, 16),(2, 10, 20), -- iPhone 15 Pro (negro, blanco, azul metalico, titaneo(no se como ponerle a eso))
(3, 1, 12), (3, 10, 6), (3, 11, 12), -- Galaxy S21 Ultra (negro, azul metalico, gris)
(4, 1, 16), (4, 2, 14), (4, 4, 8), (4, 12, 4), -- Galaxy S22 Ultra (verde oscuro, blanco, negro, rojo)
(5, 1, 21), (5, 15, 14), (5, 8, 7), (5, 11, 7),  -- Pixel 8 (negro, verde, celeste, gris)
(6, 1, 9), (6, 12, 18), (6, 7, 9); -- OnePlus 11 (negro, verde oscuro, crema)


-- Insertando Carritos
INSERT INTO CART (user_id, quantity, created_at) VALUES
(2, 1, NOW());

-- Insertando Productos en el Carrito
INSERT INTO PRODUCT_CART (cart_id, product_id) VALUES
(1, 1), -- iPhone 15
(1, 3); -- Galaxy S21 Ultra

-- Insertando Ordenes
INSERT INTO ORDERS (user_id, total_price, status, created_at, updated_at) VALUES
(2, 849.99, 'completed', NOW(), NOW());

-- Insertando Detalles de Orden
INSERT INTO ORDERS_DETAILS (order_id, product_id, quantity, unit_price) VALUES
(1, 1, 1, 499.99),
(1, 3, 1, 450.00);