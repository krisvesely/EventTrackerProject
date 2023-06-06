# EventTrackerProject

## Overview

Allows the user to view and modify architectural projects (`events`), within a database using the URIs charted below. 
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

- Spring Tool Suite
- Git
- GitHub
- MySQL

## Lessons Learned

- 

