App.BaseNetworkManager = (function () {

  // options: an object containing configuration options for the singleton
  // e.g var options = { name: "test", pointX: 5};  
  function Singleton( options )  {

    options = options || {};

    // set some properties for our singleton
    this.name = "BaseNetworkManager";
    this.baseURL = options.baseURL;

    var POST_METHOD = "POST", GET_METHOD = "GET";

  	this.getArrayOfModel = function ( className ){
  	  	return $.ajax({
  	  		url: this.baseURL + className,
  	  		type: GET_METHOD,
  	  		dataType: "json"
  	  	})
  	};

  };

  // our instance holder  
  var instance;

  // an emulation of static variables and methods
  var _static  = {   

    name:  "BaseNetworkManager",

    // Method for getting an instance. It returns 
    // a singleton instance of a singleton object
    getInstance:  function( options ) {    

      if( instance  ===  undefined )  {     
        instance = new Singleton( options );    
      }    

      return  instance;  
       
    }  
  };  

  return  _static;

})();

BaseNetworkManager = App.BaseNetworkManager.getInstance({
	baseURL: "http://orangefashion.vn/api/" 
})

App.BaseObject = Em.Object.extend({

	className: function(){
		return "";
	}.property(),

	fetch: function(){
		return BaseNetworkManager.getArrayOfModel(this.get("className"));
	},

	toString: function(){
		return this.toString();
	}

})

Product = App.BaseObject.extend({

	className: function(){
		return "products";
	}.property()
	
});

ProductSharedInstance = Product.create();

ProductSharedInstance.fetch().done(function(data){
	console.log(data);
});