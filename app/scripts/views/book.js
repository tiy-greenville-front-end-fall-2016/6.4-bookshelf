var $ = require('jquery');
var Backbone = require('backbone');

// Templates
var bookAddFormTemplate = require('../../templates/add_book.hbs');
var bookTileTemplate = require('../../templates/book_tile.hbs');
var bookDetailTemplate = require('../../templates/book_detail.hbs');

/**
 * Add Book Form View
 *
 * This view provides a form that allows users to create
 * a new book
 */
var BookAddForm = Backbone.View.extend({
  tagName: 'form',
  className: 'well',
  template: bookAddFormTemplate,
  events: {
    'submit': 'add'
  },
  render: function(){
    this.$el.html(this.template());

    return this;
  },
  add: function(e){
    e.preventDefault();

    var newBook = {
      title: $('#title').val(),
      image: $('#image').val()
    };

    this.collection.create(newBook);
  }
});

/**
 * Book Listing View
 *
 * This view lists the availbable books in
 * the book library
 */
var BookListing = Backbone.View.extend({
  tagName: 'div',
  attributes: {
    'class': 'row'
  },
  initialize: function(){
    this.listenTo(this.collection, 'add', this.renderBookItem);
  },
  render: function(){
    return this;
  },
  renderBookItem: function(book){
    var bookItem = new BookItemView({model: book});
    this.$el.append(bookItem.render().el);
  }
});

/**
 * Book Item View
 *
 * Display a book as a tile
 */
var BookItemView = Backbone.View.extend({
  tagName: 'div',
  className: 'col-sm-6 col-md-4',
  template: bookTileTemplate,
  events: {
    'click .clickme': 'complete',
    'click .hideme': 'hide'
  },
  initialize: function(){
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'changed', this.render);
    this.listenTo(this.model, 'change:visible', this.toggleVisible);
  },
  render: function(){
    var context = this.model.toJSON();
    this.$el.html(this.template(context));

    return this;
  },
});

var BookDetail = Backbone.View.extend({
    tagName: 'div',
    template: bookDetailTemplate,
    initialize: function(){
      this.listenTo(this.model, 'changed', this.render);
    },
    render: function(){
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }
});


module.exports = {
  BookAddForm: BookAddForm,
  BookListing: BookListing,
  BookItemView: BookItemView,
  BookDetail: BookDetail
}
