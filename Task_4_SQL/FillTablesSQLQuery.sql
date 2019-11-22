use trading_network


--create table Shops (shop_code int primary key, shop_name varchar(30),shop_address varchar(50))
--drop table Shops
/*
TRUNCATE TABLE  Shops;
INSERT INTO Shops
           (shop_code
           ,shop_name
           ,shop_address)
     VALUES
           (1,'evroopt','minsk, belarus'),
           (2,'5element','grodno'),
           (3,'ikea','new york')
*/

--create table Products (product_code int primary key, product_name varchar(30),product_cost int)
--drop table Products
/*
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
*/

--create table Orders (order_code int primary key, products_count int,order_date date, order_cost int)
--drop table Orders

/*
TRUNCATE TABLE  Orders ;
INSERT INTO Orders 
           (order_code
           ,products_count
           ,order_date
           ,order_cost)
     VALUES
           (1,5,'2015-12-13',150),
           (2,1,'2015-01-5',30),
           (3,10,'2016-03-25',240),
           (4,7,'2015-01-17',180);
*/

--create table Customers (customer_code int primary key, customer_name varchar(30))
--drop table Customers
/*
TRUNCATE TABLE  Customers ;
INSERT INTO Customers 
           (customer_code
           ,customer_name)
     VALUES
           (1,'Ilya'),
           (2,'Greg'),
           (3,'Roma'),
           (4,'Alex');
*/



/*
         
create table ShopsProducts 
	(shop_code int not null,
	 product_code int not null,
	 UNIQUE (shop_code , product_code),
	 FOREIGN KEY (shop_code) REFERENCES Shops (shop_code),
	 FOREIGN KEY (product_code ) REFERENCES Products (product_code))
*/
--drop table ShopsProducts
 /*
 INSERT INTO ShopsProducts 
           (shop_code
           ,product_code)
     VALUES
           (1,1),
           (2,1),
           (3,1),
           (3,2)
*/




/*create table OrdersProducts 
	(order_code int not null,
	 product_code int not null,
	 UNIQUE (order_code , product_code),
	 FOREIGN KEY (order_code) REFERENCES Orders (order_code),
	 FOREIGN KEY (product_code ) REFERENCES Products (product_code))
*/

--drop table OrdersProducts
/*
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
*/


/*create table UserOrders 
	(order_code int not null,
	 customer_code int not null,
	 UNIQUE (order_code),
	 FOREIGN KEY (order_code) REFERENCES Orders (order_code),
	 FOREIGN KEY (customer_code ) REFERENCES Customers (customer_code))
*/

--drop table UserOrders

 /*
 INSERT INTO UserOrders 
           (order_code
           ,customer_code)
     VALUES
           (1,1),
           (2,2),
           (3,3),
           (4,4)
*/
