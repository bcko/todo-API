const express = require('express');
const router = express.Router();

const redis = require('redis');

const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();
const async = require('async');


const client = redis.createClient({
    retry_strategy: function (options) {
        if (options.error && options.error.code === 'ECONNREFUSED') {
            // End reconnecting on a specific error and flush all commands with
            // a individual error
            return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
            // End reconnecting after a specific timeout and flush all commands
            // with a individual error
            return new Error('Retry time exhausted');
        }
        if (options.attempt > 10) {
            // End reconnecting with built in error
            return undefined;
        }
        // reconnect after
        return Math.min(options.attempt * 100, 3000);
    }
});

router.route('/Items')
    // list all items
    .get(function (req, res){
        client.keys('*', function (err, keys) {
            if (err) {
                return console.log(err);
            }
            if (keys) {
                async.map(keys, function(key, cb) {
                    client.get(key, function (error, value) {
                         if (error) return cb(error);
                         var todoItem = {};
                         todoItem['itemID']=key;
                         todoItem['itemMessage']=value;
                         cb(null, todoItem);
                     }); 
                 }, function (error, results) {
                    if (error) return console.log(error);
                    res.json({ items:results });
                 });
            }
        })
    })
    // batch creation. 
    .post(function (req, res){
        for (const item of req.body.items) {
            client.set(item.itemID, item.itemMessage);
        }
        res.status(200).json({message: "batch update success"});
    })
    .put(function (req, res) {

    })
    // batch delete.
    .delete(function (req, res){
        for (const item of req.body) {
            client.del(item.itemID, function(err, results){
                if (err) {
                    return res.status(500).json({ errors: ['error while deleting']});
                }
            });
        }
        res.sendStatus(204);
    })



function lookupNoteItems(req, res, next) {
    const itemsID = req.params.ItemsID

    client.get(itemsID, function(err, results){
        if (err) {
            console.error(err);
            return res.status(500).json({ errors: ['Could not retrieve item']});
        }
        if (results === null) {
            return res.status(404).json({ errors: ['Note item not found']});
        } 
        req.noteItem = results
        next()

    })
}

router.route('/Items/:ItemsID')
    // read todo item 
    .get(lookupNoteItems, function (req, res) {
        // A successful GET method typically returns HTTP status code 200 (OK). If the resource cannot be found, the method should return 404 (Not Found).
        res.status(200).json({noteItem: req.noteItem});
  
    })
    // create todo item
    .post(jsonParser, function (req, res) {
        // If a POST method creates a new resource, it returns HTTP status code 201 (Created)
        // If the method does some processing but does not create a new resource, the method can return HTTP status code 200 and include the result of the operation in the response body. Alternatively, if there is no result to return, the method can return HTTP status code 204 (No Content) with no response body.
        // If the client puts invalid data into the request, the server should return HTTP status code 400 (Bad Request). The response body can contain additional information about the error or a link to a URI that provides more details.
        const itemsID = req.params.ItemsID
        if (!req.body) {
            return res.sendStatus(400)
        }
        console.log(req.body);
        client.get(itemsID, function(err, results){
            if (err) {
                console.error(err);
                return res.status(500).json({ errors: ['Could not retrieve item']});
            }
            if (results === null) {
                client.set(itemsID, req.body.noteItem, redis.print);
                return res.status(201).json({ message: ['successfully created']});
            } else {
                return res.status(400).json({ errors: ['item already exists']});
            }
        
        })        
    })
    // update todo item
    .put(jsonParser, function (req, res){
        const itemsID = req.params.ItemsID
        if (!req.body) {
            return res.sendStatus(400)
        }
        client.get(itemsID, function(err, results){
            if (err) {
                console.error(err);
                res.status(500)
                return res.json({ errors: ['Could not retrieve item']});
            }
            if (results === null) {
                client.set(itemsID, req.body.noteItem)
                res.status(201)
                return res.json({ message: ['successfully created']});
            } else {
                client.set(itemsID, req.body.noteItem )
                res.status(200)
                return res.json({ message: ['note Item changed']});
            }
        
        })  
// If a PUT method creates a new resource, it returns HTTP status code 201 (Created), as with a POST method.
    // If the method updates an existing resource, it returns either 200 (OK) or 204 (No Content).
    // In some cases, it might not be possible to update an existing resource. In that case, consider returning HTTP status code 409 (Conflict)
    
    // Consider implementing bulk HTTP PUT operations that can batch updates to multiple resources in a collection. The PUT request should specify the URI of the collection, and the request body should specify the details of the resources to be modified. This approach can help to reduce chattiness and improve performance 
    })
    // delte todo item
    .delete(lookupNoteItems, function (req, res){
        client.del(req.noteItems, function(err, results) {
            if (err) {
                res.status(500)
                return res.json({ errors: ['error while deleting']})
            }
        });
        res.sendStatus(204)


        // If the delete operation is successful, the web server should respond with HTTP status code 204, indicating that the process has been successfully handled, but that the response body contains no further information.
//  If the resource doesn't exist, the web server can return HTTP 404 (Not Found).
    })


module.exports = router;