--create database trading_network

use trading_network

---------------------------------------1)+	Получить все содержимое таблицы Product ---------------------------------------------------------------------

Select * from Products

---------------------------------------2)+	Получить код и название товаров, минимальная стоимость которых не превышвет 500-----------------------------

Select id, name from Products where (cost <= 500);

--------------------------------------3)+  Получить среднюю стоимость заказов, сделанных в январе 2015 года---------------------------------------------

Select avg(cost) as 'average cost' from Orders where order_date between '20150101' and '20150201';

---------------------------------------4)+	Получить название самого дорого товара, а также его возраст-----------------------------------------------------------------------

Select TOP 1 name from Products order by cost desc;

---------------------------------------5)+	Найти названия товаров, которые были куплены в январе 2015---------------------------------------------------

Select DISTINCT p.name
From Products p
Join OrdersProducts op ON op.product_id = p.id 
Join Orders o ON o.id = op.order_id
where o.order_date between '20150101' and '20150201';

---------------------------------------6)-	Найти названия товаров, продажи которых в январе 2015 упали по сравнению с предыдущим месяцем----------------

Select  p.name
From Products p
Join OrdersProducts jsales ON ( jsales.product_id = p.id)
Join Orders ojan ON (jsales.order_id = ojan.id) and (ojan.order_date  between '20150101' and '20150201')
Join OrdersProducts psales ON (psales.product_id = p.id)
Join Orders oprev ON (psales.order_id = oprev.id) and (oprev.order_date between '20141201' and '20150101')
GROUP BY
    p.name
having
	sum(ojan.products_count)< sum(oprev.products_count)

---------------------------------------7)+	Найти среднюю стоимость товаров в каждом магазине-------------------------------------------------------------

Select s.name, AVG(p.cost) as 'average cost'
From Shops s
Join ShopsProducts sp ON sp.shop_id = s.id 
Join Products p ON p.id = sp.product_id
GROUP BY
    s.name;

---------------------------------------8)+	Найти значение продаж в каждом магазине за 2015-й год---------------------------------------------------------

Select  s.name, SUM(o.cost)as 'sales volume'
From Shops s
Join ShopsOrders so ON so.shop_id = s.id
Join Orders o ON so.order_id = o.id
where o.order_date between '20150101' and '20160101'
group by 
	s.name

---------------------------------------9)+	Показать всех покупателей, покупки которых в 2014-м превысили 1.000.000---------------------------------------

Select c.name
From Customers c
Join CustomerOrders co ON co.customer_id = c.id 
Join Orders o ON o.id = co.order_id
where o.order_date between '20140101' and '20150101'
group by
	c.name
having
	sum(o.cost) > 1000000;

---------------------------------------10)+	Увеличить стоимость все продуктов в полтора раза, если она не превышает 100------------------------------------
/*
UPDATE Products SET product_cost = cost * 1.5 where cost <= 100
*/
---------------------------------------11)+	Удалить из таблицы order все записи за 2014 и более ранние годы------------------------------------------------
/*
Delete from Orders where order_date < '20150101'
*/