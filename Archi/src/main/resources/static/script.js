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
};

function displayProject(project) {
	let projectDiv = document.getElementById('projectData');
	projectDiv.textContent = '';
	let hr = document.createElement('hr');
	projectDiv.appendChild(hr);
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
	
	projectDiv.appendChild(updateForm(project));
	projectDiv.appendChild(deleteForm(project.id, project.referenceNumber, project.title));
	
	let updateDiv = document.getElementById('updateFormDiv');
	updateDiv.style.display = 'none';
	let createDiv = document.getElementById('newFormDiv');
	createDiv.style.display = 'flex';
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

function updateForm(project) {
	let updateFormBtn = document.createElement('form');
	updateFormBtn.name = 'updateProjectFormBtn';
	let projectIdInput = document.createElement('input');
	projectIdInput.type = 'hidden';
	projectIdInput.name = 'projectId';
	projectIdInput.value = project.id;
	updateFormBtn.appendChild(projectIdInput);	
	let updateButton = document.createElement('button');
	updateButton.textContent = 'Update this Project';
	updateFormBtn.appendChild(updateButton);
	updateButton.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('Update project ' + project.id);
		updateProjectForm(project);
	});
	return updateFormBtn;	
};

function updateProjectForm(project) {
	let updateDiv = document.getElementById('updateFormDiv');
	updateDiv.style.display = 'flex';
	let createDiv = document.getElementById('newFormDiv');
	createDiv.style.display = 'none';
	
	let updateForm = document.updateProjectForm;
	let referenceNumber = updateForm.referenceNumber;
	referenceNumber.value = `${project.referenceNumber}`;
	let title = updateForm.title;
	title.value =  `${project.title}`;
	let client = updateForm.client;
	client.value =  `${project.client}`;
	let isActive = updateForm.isActive;
	console.log(isActive);
	console.log(isActive.children);
	console.log(isActive.children.length);
	console.log(`${project.isActive}`);
	for (let i = 0; i < isActive.children.length; i++) {
		if (isActive.children[i].value === `${project.isActive}`) {
			isActive.children[i].selected = true;
		}	
	}
	let contractPhase = updateForm.contractPhase;
	for (let i = 0; i < contractPhase.children.length; i++) {
		if (contractPhase.children[i].value === `${project.contractPhase}`) {
			contractPhase.children[i].selected = true;
		}	
	}
	let workingPhase = updateForm.workingPhase;
	for (let i = 0; i < workingPhase.children.length; i++) {
		if (workingPhase.children[i].value === `${project.workingPhase}`) {
			workingPhase.children[i].selected = true;
		}	
	}
	let phaseStatus = updateForm.phaseStatus;
	for (let i = 0; i < phaseStatus.children.length; i++) {
		if (phaseStatus.children[i].value === `${project.phaseStatus}`) {
			phaseStatus.children[i].selected = true;
		}	
	}
	let fee = updateForm.fee;
	fee.value =  `${project.fee}`;
	let note = updateForm.note;
	note.value =  `${project.note}`;
	let submitUpdateBtn = updateForm.updateProject;
	submitUpdateBtn.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('Create project update ' + project.id);
		createUpdateProject(project.id, updateForm);
	});
//	  		<button name="createProject">Create Project</button>
};

function createUpdateProject(projectId, form) {
	let updatingProject = {
		"id": projectId,
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
	updateProject(updatingProject);		
};


function updateProject(project) {
	let xhr = new XMLHttpRequest();
	xhr.open('PUT', 'api/projects/' + project.id);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 200) {
				let project = JSON.parse(xhr.responseText);
				displayProject(project);
				console.log(project);
			}
			else {
				displayError();
				console.error("Project update failed.");
				console.error(xhr.status + ': ' + xhr.responseText);
				displayError('Project update failed.');
			}
		}
	};
	let jsonProject = JSON.stringify(project);
	xhr.send(jsonProject);
};

function deleteForm(projectId, projectRefNum, projectTitle) {
	let deleteForm = document.createElement('form');
	deleteForm.name = 'deleteProjectForm';
	let projectIdInput = document.createElement('input');
	projectIdInput.type = 'hidden';
	projectIdInput.name = 'projectId';
	projectIdInput.value = projectId;
	deleteForm.appendChild(projectIdInput);	
	let deleteButton = document.createElement('button');
	deleteButton.textContent = 'Delete this Project';
	deleteForm.appendChild(deleteButton);
	deleteButton.addEventListener('click', function(event) {
		event.preventDefault();
		console.log('Delete project ' + projectId);
		deleteProject(projectId, projectRefNum, projectTitle);
	});
	return deleteForm;	
};

function deleteProject(projectId, projectRefNum, projectTitle) {
	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', 'api/projects/' + projectId);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status == 204) {
				let successMessage = projectRefNum + ': ' + projectTitle + ' deleted.';
				console.log(successMessage);
				displayDeleteSuccess(successMessage);
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
};

function displayDeleteSuccess(successMessage) {
	let projectDiv = document.getElementById('projectData');
	projectDiv.textContent = '';
	let hr = document.createElement('hr');
	projectDiv.appendChild(hr);
	let messageElement = document.createElement('h4');
	messageElement.textContent = successMessage;
	messageElement.style.fontStyle = 'italic';
	projectDiv.appendChild(messageElement);
};

function displayError(errorMessage) {
	let projectDiv = document.getElementById('projectData');
	projectDiv.textContent = '';
	let messageElement = document.createElement('h4');
	messageElement.textContent = errorMessage;
	messageElement.style.color = 'red';
	projectDiv.appendChild(messageElement);
};









