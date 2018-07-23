# todo-API

## API endpoints

HTTP route prefix : http://localhost:3000/api/v1/

Route      | Method | Description
-----------|--------|--------------------
/Items     | GET    | read all items
/Items     | POST   | batch update items
/Items     | DELETE | batch delete items
/Items/:id | GET    | read item
/Items/:id | POST   | create item
/Items/:id | DELETE | delete item

## HTTP Request Body Example


## HTTP Response Body Example
### GET http://localhost:3000/api/v1/Items
```javascript
{
  "items" : [
    { 
      "itemsID" : "1",
      "itemMessage" : "item 1"
    },
    {
      "itemsID" : "2",
      "itemMessage" : "item 2"
    }
  ]
}
```


## Optional Tasks
- [] Implement JWT authorization using PassportJS
- [] Test
  - [] MochaJS
  - [] SinonJS
  - [] Cypress
- [] Implement web security best practices (e.g. XSS)
- [] Implement web performance best practices (e.g. compression) 
- [] Deploy to Google Kubernetes Engine


## References
### API design
* [Google Cloud API Design Guide](https://cloud.google.com/apis/design/)
  * [Resource Oriented Design](https://cloud.google.com/apis/design/resources)
  * [Standard Methods](https://cloud.google.com/apis/design/standard_methods)
* [Microsoft Azure API Design Guide](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design)
  * [API Implementation](https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-implementation)
