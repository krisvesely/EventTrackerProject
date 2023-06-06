# EventTrackerProject

## Overview

Allows the user to view and modify architectural projects (`events`), within a database using the REST route URIs charted below. 
The project tracker functions are designed for staff of an architectural firm, allowing them to add, update, and remove 
projects as they progress through design phases. Project inserts with id values 1-5 are pre-populated.

### Routes

| Return Type      | Route                    | Functionality                      |
|------------------|--------------------------|------------------------------------|
| `List<Project>`  |`GET api/projects`        | Gets all projects                  |
| `Project`        |`GET api/projects/{id}`   | Gets one project by id             |
| `Project`        |`POST api/projects`       | Creates a new project              |
| `Project`        |`PUT api/projects/{id}`   | Replaces an existing project by id |
| `void`           |`DELETE api/posts/{id}`   | Deletes an existing project by id  |

## Technologies Used

- JPA
- REST API
- Postman
- JSON
- Spring Tool Suite
- Git
- GitHub
- MySQL

## Lessons Learned

- Mapped a POJO entity class to a database table using JPA.
- Applied Spring REST annotations to the project controller, with GET, POST, PUT, and DELETE mappings with 
Path Variables and Request Bodies.
- Created a project repository, extending the Spring JPA Repository to complete create, read (all and by id), update, and delete functions.
- Tested functionality in Postman with JSON input/outputs.
