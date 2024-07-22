/*
	1.2 Minimum of 20 referrals in and out of the hub
*/
 
SELECT
	map.label AS 'Service provider type',
	COUNT(data.id) AS '# of referrals'
FROM
(
	SELECT 'Expert Service Provider Panel' AS label, 2 AS value UNION ALL
	SELECT 'Commonwealth Funded Programs', 3 UNION ALL
	SELECT 'NTG Funded Programs', 4
) map
LEFT JOIN
(
	SELECT
		hs.cr67a_hubserviceid AS id,
		hs.socoro_serviceprovidertype AS serviceprovidertype
	FROM dbo.cr67a_hubservice hs
	LEFT JOIN dbo.opportunity o ON hs.socoro_opportunity = o.opportunityid
	WHERE (
		--service created within reporting period
		(
			hs.createdon >= (select cr67a_value from cr67a_configuration WHERE cr67a_variable = 'QUARTER_START_DATE')
			AND hs.createdon < (select cr67a_value from cr67a_configuration WHERE cr67a_variable = 'QUARTER_END_DATE')
		)
		--service created prior to reporting period, opportunity open
		OR (
			hs.createdon < (select cr67a_value from cr67a_configuration WHERE cr67a_variable = 'QUARTER_START_DATE')
			AND o.statecode = 0
		)
	)
) data
ON map.value = data.serviceprovidertype
GROUP BY map.label, map.value
ORDER BY map.value;