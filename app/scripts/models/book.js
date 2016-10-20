var Backbone = require('backbone');


var Book = Backbone.Model.extend({
  idAttribute: '_id'
});

var BookCollection = Backbone.Collection.extend({
  model: Book,
  url: 'https://tiny-lasagna-server.herokuapp.com/collections/book/'
});


module.exports = {
  Book: Book,
  BookCollection: BookCollection
}
