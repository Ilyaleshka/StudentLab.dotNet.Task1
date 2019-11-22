--create database trading_network

use trading_network

--create table Shops (shop_code int primary key, shop_name varchar(30),shop_address varchar(50))
--create table Products (product_code int primary key, product_name varchar(30),product_cost int)
--create table Orders (order_code int primary key, products_count int,order_date date, order_cost int)
--create table Customers (customer_code int primary key, customer_name varchar(30))



--1)	�������� ��� ���������� ������� Product
Select * from Products

--2)	�������� ���� � �������� �������, ����������� ��������� ������� �� ��������� 500
Select product_code,product_name from Products where (product_cost < 500);

--3)	�������� ������� ��������� �������, ��������� � ������ 2015 ����
Select avg(order_cost) as average_cost from Orders where order_date between '20150101' and '20150201';

--4)	�������� �������� ������ ������ ������
Select TOP 1 product_name from Products order by product_cost desc;

--5)	����� �������� �������, ������� ���� ������� � ������ 2015
Select DISTINCT p.product_name
From Products p
Join OrdersProducts op ON op.product_code = p.product_code 
Join Orders o ON o.order_code = op.order_code
where o.order_date between '20150101' and '20150201';

--6)	����� �������� �������, ������� ������� � ������ 2015 ����� �� ��������� � ���������� �������


--7)	����� ������� ��������� ������� � ������ ��������
Select DISTINCT  s.shop_name, AVG(p.product_cost)
From Shops s
Join ShopsProducts sp ON sp.shop_code = s.shop_code 
Join Products p ON p.product_code = sp.product_code
GROUP BY
    s.shop_name;

--8)	����� �������� ������ � ������ �������� �� 2015-� ���


--9)	�������� ���� �����������, ������� ������� � 2014-� ��������� 1.000.000
Select DISTINCT  c.customer_name
From Customers c
Join UserOrders co ON co.customer_code = c.customer_code 
Join Orders o ON o.order_code = co.order_code
where o.order_date between '20140101' and '20150101'
group by
	c.customer_name
having
	sum(o.order_cost) > 1000000;

--10)	��������� ��������� ��� ��������� � ������� ����, ���� ��� �� ��������� 100
--UPDATE Products SET product_cost = product_cost * 1.5 where product_cost <= 100

--11)	������� �� ������� order ��� ������ �� 2014 � ����� ������ ����
