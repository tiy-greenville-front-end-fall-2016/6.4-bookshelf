var $ = require('jquery');
var Backbone = require('backbone');
var models = require('./models/book');
var views = require('./views/book')

var AppRouter = Backbone.Router.extend({
  routes: {
    '': 'index',
    'book/:id/': 'getBook',
  },
  initialize: function(){
    this.collection = new models.BookCollection();
    this.collection.fetch();
  },
  index: function(){
    var addBookForm = new views.BookAddForm({collection: this.collection});
    var bookListing = new views.BookListing({collection: this.collection});

    $('.app')
      .html(addBookForm.render().el)
      .append(bookListing.render().el);
  },
  getBook: function(id){
    var self = this;
    var book = this.collection.get(id);

    // If we don't have a book, fetch and bail
    if(!book){
      this.collection.fetch().then(function(){
        self.getBook(id);
      });
      return;
    }

    var bookDetail = new views.BookDetail({model: book});

    $('.app').html(bookDetail.render().el);
  }
});

var router = new AppRouter();

module.exports = router;
