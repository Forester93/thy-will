DROP DATABASE IF EXISTS userwilldata_db ;
CREATE DATABASE userwilldata_db;
USE userwilldata_db;

SELECT beneficiary.name as "beneficiary_name", user.name as "user_name", beneficiary.relationship FROM user JOIN beneficiary ON user.id=beneficiary.user_id;

SELECT 
beneficiary.name as "beneficiary_name",
asset.description as "asset_description",
asset_apportion.apportion_instructions,
asset_apportion.percentage,
(asset.value*asset_apportion.percentage) as "estimated_portion"
FROM 
beneficiary JOIN asset JOIN asset_apportion 
ON beneficiary.id=asset_apportion.beneficiary_id 
AND asset.id=asset_apportion.asset_id 
AND beneficiary.user_id=(SELECT user.id FROM user WHERE name="John Smith") ORDER by beneficiary.name ;