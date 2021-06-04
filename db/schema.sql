DROP DATABASE IF EXISTS userwilldata_db ;
CREATE DATABASE userwilldata_db;
USE userwilldata_db;

SELECT beneficiary.name as "beneficiary_name", CONCAT(user.first_name," ",user.last_name) as "user_name", beneficiary.relationship FROM user JOIN beneficiary ON user.id=beneficiary.user_id;

