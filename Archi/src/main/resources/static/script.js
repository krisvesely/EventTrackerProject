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
		createProject(newProjectForm);
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
	let h2Title = document.createElement('h2');
	h2Title.textContent = project.referenceNumber + ': ' + project.title;
	projectDiv.appendChild(h2Title);
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

};


function createProject(form) {
	let project = {
		"referenceNumber": Number.parseInt(form.referenceNumber.value),
		"title": form.title.value,
		"client": form.client.value,
		"isActive": form.isActive.value,
		"contractPhase": form.contractPhase.value,
		"workingPhase": form.workingPhase.value,
		"phaseStatus": form.phaseStatus.value,
		"fee": Number.parseInt(form.fee.value),
		"note": form.note.value
	}
	console.log(project);
	addProject(project);
};

function addProject(project) {

	let xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/projects/');
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200 || xhr.status === 201) {
				let project = JSON.parse(xhr.responseText);
				//console.log(project);
				displayProject(project);
			}
			else {
				console.error("POST request failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				displayError('Reference Number already exists in database.');
			}
		}
	};
	let jsonProject = JSON.stringify(project);
	xhr.send(jsonProject);
};













