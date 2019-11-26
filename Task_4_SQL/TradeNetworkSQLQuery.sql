--create database trading_network

use trading_network

---------------------------------------1)+	�������� ��� ���������� ������� Product ---------------------------------------------------------------------

Select * from Products

---------------------------------------2)+	�������� ���� � �������� �������, ����������� ��������� ������� �� ��������� 500-----------------------------

-- <= instead of <
Select product_code,product_name from Products where (product_cost < 500);

---------------------------------------3)+	�������� ������� ��������� �������, ��������� � ������ 2015 ����---------------------------------------------

Select avg(order_cost) as 'average cost' from Orders where order_date between '20150101' and '20150201';

---------------------------------------4)+	�������� �������� ������ ������ ������-----------------------------------------------------------------------

Select TOP 1 product_name from Products order by product_cost desc;

---------------------------------------5)+	����� �������� �������, ������� ���� ������� � ������ 2015---------------------------------------------------

Select DISTINCT p.product_name
From Products p
Join OrdersProducts op ON op.product_code = p.product_code 
Join Orders o ON o.order_code = op.order_code
where o.order_date between '20150101' and '20150201';

---------------------------------------6)+	����� �������� �������, ������� ������� � ������ 2015 ����� �� ��������� � ���������� �������----------------

-- As I understand we can get rid of ProductSales and use Orders
Select  p.product_name
From Products p
Join ProductsSale jsales ON ( jsales.product_code = p.product_code) and ( jsales.sale_date between '20150101' and '20150201')
Join ProductsSale psales ON (psales.product_code = p.product_code) and (psales.sale_date between '20141201' and '20150101')
GROUP BY
    p.product_name
having
	sum(jsales.product_count)< sum(psales.product_count)

---------------------------------------7)+	����� ������� ��������� ������� � ������ ��������-------------------------------------------------------------

Select s.shop_name, AVG(p.product_cost)
From Shops s
Join ShopsProducts sp ON sp.shop_code = s.shop_code 
Join Products p ON p.product_code = sp.product_code
GROUP BY
    s.shop_name;

---------------------------------------8)+	����� �������� ������ � ������ �������� �� 2015-� ���---------------------------------------------------------

Select  s.shop_name, SUM(o.order_cost)
From Shops s
Join ShopsOrders so ON so.shop_code = s.shop_code
Join Orders o ON so.order_code = o.order_code
where o.order_date between '20150101' and '20160101'
group by 
	shop_name

---------------------------------------9)+	�������� ���� �����������, ������� ������� � 2014-� ��������� 1.000.000---------------------------------------

Select c.customer_name
From Customers c
Join UserOrders co ON co.customer_code = c.customer_code 
Join Orders o ON o.order_code = co.order_code
where o.order_date between '20140101' and '20150101'
group by
	c.customer_name
having
	sum(o.order_cost) > 1000000;

---------------------------------------10)+	��������� ��������� ��� ��������� � ������� ����, ���� ��� �� ��������� 100------------------------------------
/*
UPDATE Products SET product_cost = product_cost * 1.5 where product_cost <= 100
*/
---------------------------------------11)+	������� �� ������� order ��� ������ �� 2014 � ����� ������ ����------------------------------------------------
/*
Delete from Orders where order_date < '20150101'
*/