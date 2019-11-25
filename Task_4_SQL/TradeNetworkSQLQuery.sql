--create database trading_network

use trading_network

---------------------------------------1)+	Получить все содержимое таблицы Product ---------------------------------------------------------------------

Select * from Products

---------------------------------------2)+	Получить коды и названия товаров, минимальная стоимость которых не превышают 500-----------------------------

Select product_code,product_name from Products where (product_cost < 500);

---------------------------------------3)+	Получить среднюю стоимость заказов, сделанных в январе 2015 года---------------------------------------------

Select avg(order_cost) as 'average cost' from Orders where order_date between '20150101' and '20150201';

---------------------------------------4)+	Получить название самого дорого товара-----------------------------------------------------------------------

Select TOP 1 product_name from Products order by product_cost desc;

---------------------------------------5)+	Найти названия товаров, которые были куплены в январе 2015---------------------------------------------------

Select DISTINCT p.product_name
From Products p
Join OrdersProducts op ON op.product_code = p.product_code 
Join Orders o ON o.order_code = op.order_code
where o.order_date between '20150101' and '20150201';

---------------------------------------6)+	Найти названия товаров, продажи которых в январе 2015 упали по сравнению с предыдущим месяцем----------------

Select  p.product_name
From Products p
Join ProductsSale jsales ON ( jsales.product_code = p.product_code) and ( jsales.sale_date between '20150101' and '20150201')
Join ProductsSale psales ON (psales.product_code = p.product_code) and (psales.sale_date between '20141201' and '20150101')
GROUP BY
    p.product_name
having
	sum(jsales.product_count)< sum(psales.product_count)

---------------------------------------7)+	Найти среднюю стоимость товаров в каждом магазине-------------------------------------------------------------

Select s.shop_name, AVG(p.product_cost)
From Shops s
Join ShopsProducts sp ON sp.shop_code = s.shop_code 
Join Products p ON p.product_code = sp.product_code
GROUP BY
    s.shop_name;

---------------------------------------8)+	Найти значение продаж в каждом магазине за 2015-й год---------------------------------------------------------

Select  s.shop_name, SUM(o.order_cost)
From Shops s
Join ShopsOrders so ON so.shop_code = s.shop_code
Join Orders o ON so.order_code = o.order_code
where o.order_date between '20150101' and '20160101'
group by 
	shop_name

---------------------------------------9)+	Показать всех покупателей, покупки которых в 2014-м превысили 1.000.000---------------------------------------

Select c.customer_name
From Customers c
Join UserOrders co ON co.customer_code = c.customer_code 
Join Orders o ON o.order_code = co.order_code
where o.order_date between '20140101' and '20150101'
group by
	c.customer_name
having
	sum(o.order_cost) > 1000000;

---------------------------------------10)+	Увеличить стоимость все продуктов в полтора раза, если она не превышает 100------------------------------------
/*
UPDATE Products SET product_cost = product_cost * 1.5 where product_cost <= 100
*/
---------------------------------------11)+	Удалить из таблицы order все записи за 2014 и более ранние годы------------------------------------------------
/*
Delete from Orders where order_date < '20150101'
*/