
create database trading_network

use trading_network

--drop table Shops
create table Shops (shop_code int primary key, shop_name varchar(30),shop_address varchar(50))

TRUNCATE TABLE  Shops;
INSERT INTO Shops
           (shop_code
           ,shop_name
           ,shop_address)
     VALUES
           (1,'evroopt','minsk, belarus'),
           (2,'5element','grodno'),
           (3,'ikea','new york')


create table Products (product_code int primary key, product_name varchar(30),product_cost int)
--drop table Products

TRUNCATE TABLE  Products;
INSERT INTO Products
           (product_code
           ,product_name
           ,product_cost)
     VALUES
           (1,'banana',10),
           (2,'knife',95),
           (3,'toy',105),
           (4,'bread',15),
           (6,'beer',30),
           (7,'mobile phone',1000),
           (8,'bicycle',1500)


create table Orders (order_code int primary key, products_count int,order_date date, order_cost int)
--drop table Orders


TRUNCATE TABLE  Orders ;

INSERT INTO Orders 
           (order_code
           ,products_count
           ,order_date
           ,order_cost)
     VALUES
        --  (1,5,'2015-12-13',150),
        --  (2,1,'2015-01-5',30),
        --  (3,10,'2016-03-25',240),
        --  (4,7,'2015-01-17',180),
        --(143,434,'2015-01-17',18000000),
        (654,64,'2014-01-17',500000),
        (655,345,'2014-06-01',500001)



create table Customers (customer_code int primary key, customer_name varchar(30))
--drop table Customers

TRUNCATE TABLE  Customers ;
INSERT INTO Customers 
           (customer_code
           ,customer_name)
     VALUES
           (1,'Ilya'),
           (2,'Greg'),
           (3,'Roma'),
           (4,'Alex');





         
create table ShopsProducts 
	(shop_code int not null,
	 product_code int not null,
	 UNIQUE (shop_code , product_code),
	 FOREIGN KEY (shop_code) REFERENCES Shops (shop_code),
	 FOREIGN KEY (product_code ) REFERENCES Products (product_code))

--drop table ShopsProducts

 INSERT INTO ShopsProducts 
           (shop_code
           ,product_code)
     VALUES
           (1,1),
           (2,1),
           (3,1),
           (3,2)





create table OrdersProducts 
	(order_code int not null,
	 product_code int not null,
	 UNIQUE (order_code , product_code),
	 FOREIGN KEY (order_code) REFERENCES Orders (order_code),
	 FOREIGN KEY (product_code ) REFERENCES Products (product_code))


--drop table OrdersProducts

 INSERT INTO OrdersProducts  
           (order_code
           ,product_code)
     VALUES
           (1,1),
           (1,2),
           (2,3),
           (2,4),
           (3,1),
           (3,6),
           (4,7),
           (4,4)



create table UserOrders 
	(order_code int not null,
	 customer_code int not null,
	 UNIQUE (order_code),
	 FOREIGN KEY (order_code) REFERENCES Orders (order_code),
	 FOREIGN KEY (customer_code ) REFERENCES Customers (customer_code))

--drop table UserOrders

 
 INSERT INTO UserOrders 
           (order_code
           ,customer_code)
     VALUES
         --  (1,1),
         --  (2,2),
         --  (3,3),
         --  (4,4),
         --(143,2),
         --(654,3),
         --(655,3)


create table ShopsOrders 
	(shop_code int not null,
	 order_code int not null,
	 UNIQUE (order_code),
	 FOREIGN KEY (order_code) REFERENCES Orders (order_code),
	 FOREIGN KEY (shop_code) REFERENCES Shops (shop_code))


--drop table ShopsOrders 

 
 INSERT INTO ShopsOrders  
           (shop_code
           ,order_code)
     VALUES
		(1,1),
		(2,2),
		(2,3),
		(3,4),
		(3,143),
		(2,654),
		(1,655)



create table ProductsSale 
	(product_code int not null,
	 product_count int not null,
	 sale_date date)


--drop table ProductsSale  


 INSERT INTO ProductsSale  
           (product_code
            ,product_count
            ,sale_date)
     VALUES
		(1,8,'2015-01-17'),
		(2,5,'2015-01-03'),
		(1,4,'2014-12-17'),
		(3,5,'2014-12-28'),
		(2,6,'2014-12-02'),
		(4,7,'2016-01-21'),
		(5,15,'2014-03-17')
		