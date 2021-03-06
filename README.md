# todo-API

## Dependencies
* ubuntu 18.04
* nodejs v10.7.0
* npm v6.1.0
* redis v4.0.10 [docker image](https://hub.docker.com/_/redis/)
    * start docker image with persistent storage
    * have port 6379 open for redis docker image
* others see [package.json](https://github.com/bcko/todo-API/blob/master/package.json)

## How to run
```
# start server
node app.js
```

## How to test
Install [Postman](https://www.getpostman.com/)


## API endpoints

HTTP route prefix : http://localhost:3000/api/v1/

### API endpoints summary
Route      | Method | Description
-----------|--------|--------------------
/Items     | GET    | read all items
/Items     | POST   | batch update/create items (idempotent)
/Items     | DELETE | batch delete items (idempotent)
/Items/:id | GET    | read item
/Items/:id | POST   | create item. (update not possible)
/Items/:id | PUT    | update item. (creation not possible) 
/Items/:id | DELETE | delete item

### GET http://localhost:3000/api/v1/Items

##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
```javascript
{
  "items" : [
    { 
      "itemsID" : "1",
      "itemMessage" : "item 1 message"
    },
    {
      "itemsID" : "2",
      "itemMessage" : "item 2 message"
    }
  ]
}
```

### POST http://localhost:3000/api/v1/Items
##### HTTP Request Body Example

```javascript 
{
  "items" : [
    { 
      "itemsID" : "1",
      "itemMessage" : "item 1 message"
    },
    {
      "itemsID" : "2",
      "itemMessage" : "item 2 message"
    }
  ]
}

```

##### HTTP Response Body Example
```javascript


```

### DELETE http://localhost:3000/api/v1/Items
##### HTTP Request Body Example

```javascript 
{
  "items" : [
    { "itemsID" : "1"},
    { "itemsID" : "2"}
  ]
}
```


##### HTTP Response Body Example
```javascript

```

### GET http://localhost:3000/api/v1/Items/:itemID
##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
```javascript
{
  "itemsID" : "2",
  "itemMessage" : "item 2 message"
}
```

### POST http://localhost:3000/api/v1/Items/:itemID
##### HTTP Request Body Example
```javascript 
{
  "itemsID" : "2",
  "itemMessage" : "item 2 message"
}
```

##### HTTP Response Body Example
```javascript


```

### PUT http://localhost:3000/api/v1/Items/:itemID
##### HTTP Request Body Example
```javascript 
{
  "itemsID" : "2",
  "itemMessage" : "item 2 updated message"
}
```

##### HTTP Response Body Example
```javascript


```
### DELETE http://localhost:3000/api/v1/Items/:itemID
##### HTTP Request Body Example
N/A

##### HTTP Response Body Example
```javascript


```

## Optional Tasks
- [] Implement JWT authorization using PassportJS
- [] API pagination
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
