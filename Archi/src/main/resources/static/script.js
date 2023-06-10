console.log('js loaded');

window.addEventListener('load', function(e) {
	console.log('document loaded');
	init();
});

function init() {
	document.searchByIdForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		let projectId = document.searchByIdForm.projectId.value;
		if (!isNaN(projectId) && projectId > 0) {
			getProject(projectId);
		}
	});
	document.newProjectForm.createProject.addEventListener('click', function(event) {
		event.preventDefault();
		let newProjectForm = document.newProjectForm;
//		createProject(newProjectForm);
	});
};

	function getProject(projectId) {
		let xhr = new XMLHttpRequest();
		xhr.open('GET', 'api/projects/' + projectId);
		xhr.onreadystatechange = function() {
			if (xhr.readyState === 4) {
				if (xhr.status == 200) { 
					let project = JSON.parse(xhr.responseText);
					displayProject(project);
					console.log(project);
				}
				else {
					displayError();
					console.error("Project not Found.");
					console.error(xhr.status + ': ' + xhr.responseText);
					displayError('Project not found.');
				}
			}
		};
		xhr.send();
	}
	
	function displayError(errorMessage) {
		let projectDiv = document.getElementById('projectData');
		projectDiv.textContent = '';
		let messageElement = document.createElement('h4');
		messageElement.textContent = errorMessage;
		messageElement.style.color = 'red';
		projectDiv.appendChild(messageElement);
	};
	
	function displayProject(project) {
		let projectDiv = document.getElementById('projectData');
		projectDiv.textContent = '';
		let h1Title = document.createElement('h1');
		h1Title.textContent = project.referenceNumber + ': ' + project.title;
		projectDiv.appendChild(h1Title);
		let dataList = document.createElement('ul');
		let clientLI = document.createElement('li');
		clientLI.textContent = 'Client: ' + project.client;
		dataList.appendChild(clientLI);
		let isActiveLI = document.createElement('li');
		isActiveLI.textContent = 'Active: ' + project.isActive;
		dataList.appendChild(isActiveLI);
		let contractPhaseLI = document.createElement('li');
		contractPhaseLI.textContent = 'Contract Phase: ' + project.contractPhase;
		dataList.appendChild(contractPhaseLI);
		let workingPhaseLI = document.createElement('li');
		workingPhaseLI.textContent = 'Working Phase: ' + project.workingPhase;
		dataList.appendChild(workingPhaseLI);
		let phaseStatusLI = document.createElement('li');
		phaseStatusLI.textContent = 'Phase Status: ' + project.phaseStatus;
		dataList.appendChild(phaseStatusLI);
		let feeLI = document.createElement('li');
		feeLI.textContent = 'Fee: $' + project.fee;
		dataList.appendChild(feeLI);
		let updatedAtLI = document.createElement('li');
		updatedAtLI.textContent = 'Last Updated: ' + project.updatedAt;
		dataList.appendChild(updatedAtLI);
		projectDiv.appendChild(dataList);
		let noteBlockquote = document.createElement('blockquote');
		noteBlockquote.textContent = 'Note: ' + project.note;
		projectDiv.appendChild(noteBlockquote);
	
	}