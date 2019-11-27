
--create database trading_network

use trading_network

drop table OrdersProducts;
drop table CustomerOrders;
drop table ShopsProducts;
drop table ShopsOrders;
drop table Orders;
drop table Shops;
drop table Customers;
drop table Products;


--drop table Shops
create table Shops (id int primary key, name varchar(30),shop_address varchar(50));

--TRUNCATE TABLE  Shops;
INSERT INTO Shops (id, name, shop_address)
     VALUES
           (1,'evroopt','minsk, belarus'),
           (2,'5element','grodno'),
           (3,'ikea','new york')


create table Products (id int primary key,name varchar(30),cost int)
--drop table Products

TRUNCATE TABLE  Products;
INSERT INTO Products
           (id
           ,name
           ,cost)
     VALUES
           (1,'banana',10),
           (2,'knife',95),
           (3,'toy',105),
           (4,'bread',15),
           (6,'beer',30),
           (7,'mobile phone',1000),
           (8,'bicycle',1500)


create table Orders (id int primary key, products_count int,order_date date,cost int)
--drop table Orders


TRUNCATE TABLE  Orders ;

INSERT INTO Orders 
           (id
           ,products_count
           ,order_date
           ,cost)
     VALUES
         (1,5,'2015-12-13',150),
         (2,1,'2015-01-5',30),
         (3,10,'2016-03-25',240),
         (4,7,'2015-01-17',180),
         (143,434,'2015-01-17',18000000),
         (654,64,'2014-01-17',500000),
         (655,345,'2014-06-01',500001),
         (10,5,'2014-12-11',350)



create table Customers (id int primary key, name varchar(30))
--drop table Customers

TRUNCATE TABLE  Customers ;
INSERT INTO Customers 
           (id
           ,name)
     VALUES
           (1,'Ilya'),
           (2,'Greg'),
           (3,'Roma'),
           (4,'Alex');


         
create table ShopsProducts 
	(shop_id int not null,
	 product_id int not null,
	 UNIQUE (shop_id , product_id),
	 FOREIGN KEY (shop_id) REFERENCES Shops (id),
	 FOREIGN KEY (product_id ) REFERENCES Products (id))

--drop table ShopsProducts

 INSERT INTO ShopsProducts 
           (shop_id
           ,product_id)
     VALUES
           (1,1),
           (2,1),
           (3,1),
           (3,2)





create table OrdersProducts 
	(order_id int not null,
	 product_id int not null,
	 product_count int not null,
	 UNIQUE (order_id , product_id),
	 FOREIGN KEY (order_id) REFERENCES Orders (id),
	 FOREIGN KEY (product_id ) REFERENCES Products (id))


--drop table OrdersProducts

 INSERT INTO OrdersProducts  
           (order_id
           ,product_id,
           product_count)
     VALUES
           (1,1,1),
           (1,2,2),
           (2,3,4),
           (2,4,3),
           (3,1,2),
           (3,6,4),
           (4,7,1),
           (4,4,3),
           (10,3,5)
           



create table CustomerOrders 
	(order_id int not null,
	 customer_id int not null,
	 UNIQUE (order_id),
	 FOREIGN KEY (order_id) REFERENCES Orders (id),
	 FOREIGN KEY (customer_id ) REFERENCES Customers (id))

--drop table CustomerOrdersid

 
 INSERT INTO CustomerOrders
           (order_id
           ,customer_id)
     VALUES
         (1,1),
         (2,2),
         (3,3),
         (4,4),
         (143,2),
         (654,3),
         (655,3)


create table ShopsOrders 
	(shop_id int not null,
	 order_id int not null,
	 UNIQUE (order_id),
	 FOREIGN KEY (order_id) REFERENCES Orders (id),
	 FOREIGN KEY (shop_id) REFERENCES Shops (id))


--drop table ShopsOrders 

 
 INSERT INTO ShopsOrders  
           (shop_id
           ,order_id)
     VALUES
		(1,1),
		(2,2),
		(2,3),
		(3,4),
		(3,143),
		(2,654),
		(1,655)
