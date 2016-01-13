var model = {
    init: function() {
      console.log('Model Initialized');
    }
};

var helper = {

};

var view = {
  init: function() {
    console.log('View Initialized');
  }

};


var app = {
  init: function() {
    model.init();
    view.init();
  }

};


app.init();
