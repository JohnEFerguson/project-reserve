
`
select a.patient_id, cc_1, cc_2, cc_3, nc_1, nc_2, nc_3
from 
(

	select a.patient_id, nc_1, nc_2, nc_3
	from 
	(
		select a.patient_id, nc_1 
		from 		
		(
			select patient_id 
			from patient_reserve_category prc 
			where reserve_category_id = 1
		) a
		left join
		(
			select bucket_order as nc_1, patient_id
			from numeric_criteria nc 
			inner join
			(
				select ncpv.patient_id, numeric_criterium_id, ncb.`order` as bucket_order
				from numeric_criteria_patient_value ncpv
				inner join numeric_criteria_bucket ncb 
				on ncpv.numeric_criteria_bucket_id = ncb.id
				order by bucket_order
			) a
			on nc.id = a.numeric_criterium_id
			where `order` = 1		
		) b
		on a.patient_id = b.patient_id
	) a
	left join 
	(
		select a.patient_id, nc_2, nc_3 
		from 
		(
			select a.patient_id, nc_2 
			from 		
			(
				select patient_id 
				from patient_reserve_category prc 
				where reserve_category_id = 1
			) a
			left join
			(
				select bucket_order as nc_2, patient_id
				from numeric_criteria nc 
				inner join
				(
					select ncpv.patient_id, numeric_criterium_id, ncb.`order` as bucket_order
					from numeric_criteria_patient_value ncpv
					inner join numeric_criteria_bucket ncb 
					on ncpv.numeric_criteria_bucket_id = ncb.id
					order by bucket_order
				) a
				on nc.id = a.numeric_criterium_id
				where `order` = 2		
			) b
			on a.patient_id = b.patient_id
		) a
		left join 
		(
			select a.patient_id, nc_3
			from 		
			(
				select patient_id 
				from patient_reserve_category prc 
				where reserve_category_id = 1
			) a
			left join
			(
				select bucket_order as nc_3, patient_id
				from numeric_criteria nc 
				inner join
				(
					select ncpv.patient_id, numeric_criterium_id, ncb.`order` as bucket_order
					from numeric_criteria_patient_value ncpv
					inner join numeric_criteria_bucket ncb 
					on ncpv.numeric_criteria_bucket_id = ncb.id
					order by bucket_order
				) a
				on nc.id = a.numeric_criterium_id
				where `order` = 3		
			) b
			on a.patient_id = b.patient_id
		) b
		on a.patient_id = b.patient_id
	) b
	on a.patient_id = b.patient_id
				
) a 

inner join (	

	select a.patient_id, cc_1, cc_2, cc_3 
	from 
	(
		select a.patient_id, cc_1 
		from 		
		(
			select patient_id 
			from patient_reserve_category prc 
			where reserve_category_id = 1
		) a
		left join
		(
			select patient_id, element_order as cc_1
			from category_criteria cc 
			inner join
			(
				select ccpv.patient_id, category_criterium_id, cce.`order` as element_order
				from category_criteria_patient_value ccpv
				inner join category_criteria_element cce 
				on ccpv.category_criteria_element_id = cce.id
			) c
			on cc.id = c.category_criterium_id
			where `order` = 1		
		) b
		on a.patient_id = b.patient_id
	) a
	left join 
	(
		select a.patient_id, cc_2, cc_3
		from
		(
			select a.patient_id, cc_2
			from 		
			(
				select patient_id 
				from patient_reserve_category prc 
				where reserve_category_id = 1
			) a
			left join
			(
				select patient_id, element_order as cc_2
				from category_criteria cc 
				inner join
				(
					select ccpv.patient_id, category_criterium_id, cce.`order` as element_order
					from category_criteria_patient_value ccpv
					inner join category_criteria_element cce 
					on ccpv.category_criteria_element_id = cce.id
				) c
				on cc.id = c.category_criterium_id
				where `order` = 2	
			) b
			on a.patient_id = b.patient_id
		) a
		inner join
		(
			select a.patient_id, cc_3
			from 		
			(
				select patient_id 
				from patient_reserve_category prc 
				where reserve_category_id = 1
			) a
			left join
			(
				select patient_id, element_order as cc_3
				from category_criteria cc 
				inner join
				(
					select ccpv.patient_id, category_criterium_id, cce.`order` as element_order
					from category_criteria_patient_value ccpv
					inner join category_criteria_element cce 
					on ccpv.category_criteria_element_id = cce.id
				) c
				on cc.id = c.category_criterium_id
				where `order` = 3	
			) b
			on a.patient_id = b.patient_id
		) b
		on a.patient_id = b.patient_id
	) b
	on a.patient_id = b.patient_id
) b 
on a.patient_id = b.patient_id
order by cc_1, nc_1, cc_2, nc_2, cc_3, nc_3

`
