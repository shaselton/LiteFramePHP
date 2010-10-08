if(!console){
	var console = {};
	console.log = function(message){
		//alert(message);
		// ignoring it if doesn't support console.log
	}
}


jQuery.moduleLoaded = true;

(function($){

	
	
	
	$.module = function(path){
		

		
		var _core = {};
		
		_core.ObjectLength = function(obj){
			
			var counter= 0 ;
			for (i in obj){ counter++; } 
			return counter;
			
		};
		
		
		_core.removeArrayValue = function(arr,value){
	  		
	  	    var r = new Array();
	  	  
	  	    for(var i = 0, n = arr.length; i < n; i++){
	  	        if( arr[i] != value){ r.push(arr[i]); }
	  	    }

	  	    return r;
	  	}
		
		
		var _module = {
				
				callback : $.noop,
				requestedModule : null,
				requestedScripts : null,
				path : null	,
				modules : null,
				modulesLength : 0,
				selectedModuleFiles : [] ,
				selectedModuleDetail : null ,
				loadedFiles : ['test2.js','test4.js']
				
		};
		

		_module.initialize = function(){
			
			_module.SetPath(path);
			
		};
		
		
		
		_module.SetPath = function(path){
			
			if($.trim(path) != ''){
				
				_module.path = path;
						
			}
	
		};
		
		
		
		_module.GetPath = function(){
			
			return _module.path;
		
		};
		
		
		
		_module.Create = function(moduleRules){
			
			_module.modules = moduleRules;
			_module.SetModuleLength();
			
		};
		
		
		
		_module.SetModuleLength = function(){
			
			if( _module.HasBeenCreatedModules()){

				_module.modulesLength = _core.ObjectLength(_module.modules);
				
			}
			
		};
		
		
		

		
		
		/******************************************
		 * 		
		 * 			<	Loading Module  >
		 * 
		 *****************************************/
		
		_module.Load = function( moduleName ){
			
			_module.SetRequestedModule( moduleName );
			if(!_module.IsValidate()){ return _module.Callback();  }
			_module.LoadModule();
			
		};	
		

		
		_module.IsValidate = function(){
			
			
			// $.trim(undefined) --> an empty string
			if( _module.requestedModule 		== ''   || 
				_module.requestedModule 		== null || 
				typeof _module.requestedModule  != 'string' ||
				_module.HasBeenCreatedModules() === false ||
				_module.HasBeenLoadedBefore()   ===  true ){
				
				return false;
			
			}
			return true;
			
			
		};
		
		
		_module.SetRequestedModule = function( moduleName ){
			
			_module.requestedModule = $.trim( moduleName ); 
			
		};

		
		
		_module.HasBeenCreatedModules= function(){
			
			if(!_module.modules instanceof Object ||  $.isEmptyObject(_module.modules)){ 
					
				return false;  
				
			}			
			return true;
			
		};
		
		
		
		
		_module.HasBeenLoadedBefore = function(){
			
			var loaded = true;
			_module.SetSelectedModuleFiles();
			if(_module.selectedModuleFiles.length == 0){ return true; }
			for(var i = 0 ; i < _module.selectedModuleFiles.length; i++){
				if( $.inArray(_module.selectedModuleFiles[i] , _module.loadedFiles ) == -1){
					loaded = false;
					//i = _module.selectedModuleFiles.length;
					break;
				}
			}
			return loaded;
		
		};
		
			
			
		
		_module.SetSelectedModuleFiles = function(){
				

				if( _module.GetModuleLength() > 0 ){
					
					_module.selectedModuleDetail = _module.FindModuleIn( _module.modules );
					if( _module.selectedModuleDetail !==  false ){
							
							_module.FetchModuleFiles(_module.selectedModuleDetail);
							
					}

					
				}
				
		};
		
		
		
		_module.FetchModuleFiles = function(obj){
			
			
			if(typeof _module.selectedModuleDetail == 'string'){
				
				_module.selectedModuleFiles.push(_module.selectedModuleDetail)
			
			}else if( obj instanceof Object ){
				
				for( i in obj ){
					
					if(typeof obj[i] == 'string'){
						
						_module.selectedModuleFiles.push(obj[i]);
					
					}else if(typeof obj[i] == "object"){   
						
						_module.FetchModuleFiles(obj[i]); 
						
					}
						
				}
				
				
			}else if (obj instanceof Array ){

				for( var i = 0 ; i < obj.length; i++ ){
					
						_module.selectedModuleFiles.push(obj[i]);
						
				}
			}
			
		};
		
		
		
		_module.GetSelectedModuleFiles = function(){
			
			return _module.selectedModuleFiles;
			
		}
		
		
		
		
		_module.FindModuleIn = function(obj){
			
			var foundObject, result;
			if(obj instanceof Object){
				
				for ( i in obj){
					
					if( obj[_module.requestedModule] ){
						
						foundObject = obj[_module.requestedModule];
						return foundObject;
						
					}
					else if(typeof obj[i] == "object"){   
						
						result = _module.FindModuleIn(obj[i]); 
						if( result !== false ){ return result; } 
						
					}
					
					
				}/* </ for > */
				
				return false;
				
			} /* </ If Statement > */
			
		} /* </ FindModule > */
		
		
		
		_module.GetModuleLength = function(){
			
			return _module.modulesLength;
			
		};
	
		
		
		_module.Callback = function(){
			
			jQuery.moduleLoaded = true;
			if(typeof _module.callback == 'function'){

					
				_module.callback.call(this);
			
			}
			
			
		};
		
		
		
		_module.SaveCallback = function(callback){
			
			_module.callback = callback;
			
		};
		
		
		
		
		_module.LoadModule = function(){

			_module.PureSelectedModuleFiles();
			_module.ApplyPathToSelectedModuleFiles();
			
			$.FileLoader( _module.selectedModuleFiles ,_module.Callback);
			
			
		};
		
		
		
		_module.PureSelectedModuleFiles = function(){
			
			
			
			if(_module.selectedModuleFiles.length == 0){ return; }
			var temp = _module.selectedModuleFiles;
			for(var i = 0 ; i < temp.length; i++){
				
				if( $.inArray(temp[i] , _module.loadedFiles ) >= 0){
					_module.selectedModuleFiles = _core.removeArrayValue(_module.selectedModuleFiles , temp[i] );
				}
				
			}	
			
		};
		
		
		
		_module.ApplyPathToSelectedModuleFiles = function(){

			if( $.trim(_module.path) == '' ) return; 
			for(var i = 0 ; i < _module.selectedModuleFiles.length; i++){
				
				_module.selectedModuleFiles[i] = _module.path + _module.selectedModuleFiles[i];
			}				
			
		};
		
		
		/******************************************
		 * 		
		 * 			< /	Loading Module  >
		 * 
		 *****************************************/
		
		
		
		
		
		var module = {};
		module.Initialize = function(){
			
			_module.initialize();
			
		};
		
		
		module.SetPath = function(path){
			
			_module.SetPath(path);
		
		};
		
		
		module.GetPath = function(){
			
			return _module.GetPath();
		
		};
		
		
		
		module.Create = function(moduleRules){
			
			_module.Create(moduleRules);
			
		};
		
		
		
		module.Load = function(moduleName , callback){
			

			jQuery.moduleLoaded = false;
			var callback = callback || $.noop ;
			_module.SaveCallback(callback);
			_module.Load(moduleName );
		
		};

		
		module.Initialize();
		return module;
	
	};
	
	
	
	
	jQuery.ready = function(){

		// Attach the listeners
		jQuery.bindReady();

		// If the DOM is already ready
		if ( jQuery.isReady ) {
			
			if( jQuery.moduleLoaded ){
				// Execute the function immediately
				fn.call( document, jQuery );
			}
		// Otherwise, remember the function for later
		} else if ( jQuery.readyList ) {
			// Add the function to the wait list
			jQuery.readyList.push( fn );
		}

		return this;

		
	};	
	
	
})(jQuery);




