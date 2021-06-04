const executorTemplate = (executors) => {
	const executorArray = [];
	for (i = 0; i < executors.length; i++) {
		executorArray.push(
			`Executor #${i + 1}
        
            Name: ${executors[i].name}
            Date of Birth: ${executors[i].DOB}
            Relationship: ${executors[i].relationship}
            Address: ${executors[i].address}
        
        `
		);
	}
	const executorString = executorArray.join('');
	return executorString;
};

module.exports = executorTemplate;
