 // JavaScript Document
/*
    :: http://inventory.vortalgroup.com 
    :: core.js - javascrip singleton OOP( jQuery Library 1.3.1 )
    :: All Code and design by Seyed-Mahdi PedramRazi
    :: Version 1.0 - Oct 2009
    :: Copyright @ 2009 http://receiving.vortalgroup.com | All rights reserved.
    :: Email : pedramphp@gmail.com

*/


if (!console) { var console = {log:function(){}}; }


Function.prototype.method = function(name, fn) {
  this.prototype[name] = fn;
  return this;
};  
if (!$_LiteFrame_) var $_LiteFrame_ = {};



(function($Y){
	
	
	
		
	$Y.Initialize = function(){
		
		$Y.SetVariables();
		$Y.Application.init();  
	};
	
	
	/*---------------------------*
	 * ***************************
	 *   < VARIABLE PROCESSING  >
	 * ***************************
	 *---------------------------*/
	
	
			 /**********************
			 *  SET LiteFrame VARIABLES *
			 ************************/   	
			$Y.SetVariables = function(){
		
				  $Y.vars ={};
				  $Y.vars.applicationPath  = $Y.applicationPath;
				  
				  $Y.vars.includeTemplate  = $Y.LiteFrameVars.fileSystemPaths.templateIncludePath;
				  $Y.vars.actionTemplate   = $Y.LiteFrameVars.fileSystemPaths.templateActionPath;
				  $Y.vars.layoutTemplate   = $Y.LiteFrameVars.fileSystemPaths.templateLayoutPath;
				  $Y.vars.settingsTemplate = $Y.LiteFrameVars.fileSystemPaths.settingsPath;
				  
				  $Y.vars.javascriptPath 		= $Y.LiteFrameVars.javascriptPath;
				  $Y.vars.javascriptLibraryPath = $Y.LiteFrameVars.javascriptLibraryPath;
				 
				  $Y.vars.javascriptLibraryIncludes = $Y.javascriptLibraryIncludes;
				  $Y.vars.javascriptIncludes 		= $Y.javascriptIncludes;
				  $Y.vars.javascriptInline 			= $Y.javascriptInline;
				  $Y.vars.javascriptModulePath 		= $Y.javascriptModulePath;
				  
				  $Y.vars.stylePath 		= $Y.LiteFrameVars.stylePath;
				  $Y.vars.styleLibraryPath  = $Y.LiteFrameVars.styleLibraryPath;
				  
				  $Y.vars.styleLibraryIncludes = $Y.styleLibraryIncludes;
				  $Y.vars.styleIncludes		   = $Y.styleIncludes;
				  $Y.vars.styleInline 		   = $Y.LiteFrameVars.styleInline;
				  	  
				  $Y.vars.imagePath = $Y.LiteFrameVars.imagePath;		
				
			};
			
			
			
			
			/**********************
			 *  GET LiteFrame VARIABLES *
			 ************************/     	
			 $Y.GetVariables = function(){ return $Y.vars; 	 }	
			 
			 
			 
			 
			/************************
			 *  GET LiteFrame VARIABLE  *
			 ************************/     	
			 $Y.GetVariable = function($var){ return $Y.vars[$var]; 	 }				 
	

			 
			/**********************
			 *  GET LiteFrame Action VARIABLES *
			 ************************/     	
			 $Y.GetActionVariables = function(){ return $Y.yActionJson; 	 }				 
			 
	/*---------------------------*
	 * ***************************
	 *   </ VARIABLE PROCESSING  >
	 * ***************************
	 *---------------------------*/
			 

			 
			 

			 
	/*---------------------------*
	****************************
	*   < MODULES  >
	****************************
	*---------------------------*/
					
			 
			 
			 $Y.module = false;
			 
			 $Y.SetModule = function( module ){ $Y.module = module; }
			 
			 
			 $Y.GetModule = function( module ){ return $Y.module  }		
			 
			 
			 
	/*---------------------------*
	 ****************************
	 *   </ MODULES  >
	 ****************************
	 **---------------------------*/	
			 
			 
			 
			 
			 
			 
	/*******************************************************************
	Function: IsObjEmpty
	Inputs: Any type of javascript object
	Output: return true if the obj has anything in it, otherwise false.
	********************************************************************/   
	$Y.IsObjEmpty = function(obj){
	       
	    for(var i in obj){ return false;}
	    return true;
	   
	 };  
	 
	 
	 
	 $Y.noop = function(){};
	
	

	
	/*****************************************************************************
	*                        Application Object                                  *
	*****************************************************************************/
	  //$Y.Application.GetApplicationURL('',{ action :"loadCharacterDropdown" })
	    $Y.Application = {};
	    $Y.Application.Path  =  '';
	    $Y.Application.File  =  'index.php';
	    $Y.Application.init  =  function(){ this.Path = $Y.applicationPath;  };
	    $Y.Application.GetApplicationURL = function(action, parameters){
	                
	                var valuePairs = [];
	                if (action) { valuePairs.push('action='+action); }
	                for (var property in parameters) { valuePairs.push(property + '=' + parameters[property]);  }
	                var getString = '';
	                if (valuePairs.length) { getString = '?' + valuePairs.join('&'); }
	                return this.Path  + this.File + getString;
	                
	    };    
	
	/*****************************************************************************
	*                        Application Object Ends                             *
	*****************************************************************************/    
	
	
	   
	$Y.Application.QueryStringObject = function(){    
	         
	   // var params = window.location.search.split("?")[1].split("&");
	    var params = window.location.search.split("?"); 
	    if (params.length <= 1){return false;}
	    params = params[1].split("&");  
	    if (params.length == 0){return false;}   
	    var newParam = new Object();  
	    for ( var i = 0 ; i < params.length ; i++){
	        data  = params[i].split("=");
	        newParam[data[0]] = data[1]  ;
	    }        
	    return  newParam;
	    
	}    
	
	
	/*****************************************************************************
	*                        Ajax Object                                        *
	*****************************************************************************/
	    
	    $Y.Ajax = {};
	    $Y.Ajax.init    = function(){ $Y.InitializeAjax();   };
	    $Y.Ajax.run     = function(AjaxVars){ $.ajax(AjaxVars); }
	    $Y.Ajax.loading = function(){ console.log("Ajax Loding"); }              
	    
	/*****************************************************************************
	*                        Ajax Object Ends                                    *
	
	*****************************************************************************/
	
	// Function that formats a number like US currency (no $ sign)
	// addCommas = true will add thousands separator
	$Y.FormatCurrency = function(value, addCommas){
		
	        var currency = parseFloat(value);
	        if (!currency) { return '0.00'; }
	
	        var currencyStr = currency.toFixed(2).toString();
	        if (!addCommas) { return currencyStr; }
	
	        var elements = currencyStr.split('.', 2);
	
	        var dollars = '';
	        for (var i = 0; i < elements[0].length; i++)
	        {
	                if (i != 0 && i % 3 == 0) { dollars = ',' + dollars; }
	                dollars = elements[0][elements[0].length - (i+1)] + dollars;
	        }
	
	        return dollars + '.' + elements[1];
	}
	
	/*****************************************************************************/
	
	
	
	/*****************************************************************************
	*                        Dialog Object                                        *
	*****************************************************************************/
	
	    $Y.Dialog = {};
	    $Y.Dialog.init = function(){};
	    $Y.Dialog.SelectorId  = 'DialogMessage';
	    $Y.Dialog.TextMessage = function(msg,jOptions){
	        
	            $.vortal.dialog({
	            	SelectorId  :  $_LiteFrame_.Dialog.SelectorId+Math.floor(Math.random()*100),
	                Type        : "Message" ,
	                Message     :  msg
	            },jOptions);
	                            
	    };    
	    
	    
	    $Y.Dialog.ErrorMessage = function(msg,redirect){ 
	                   
                 $.vortal.dialog({
                	 SelectorId  :  $_LiteFrame_.Dialog.SelectorId+Math.floor(Math.random()*100),
                    Type        : "Alert" ,          
                    Message     :  msg       ,
                    AlertButtonCallback  : $.noop  
                },{modal:true});  
	                        
	    };
	    
	    
	    $Y.Dialog.ActionBox = function(content,yesCallback,noCallback,jOptions){ 
	        
	        $.vortal.dialog({
	        	
	            SelectorId  :  $_LiteFrame_.Dialog.SelectorId+Math.floor(Math.random()*100),
	            Type        : "Confirm" ,
	            Message     :  content  ,
	      	  	ConfirmYesButtonName 	   : 'Submit'    ,
	       	  	ConfirmNoButtonName 	   : 'Cancel'     ,
	            ConfirmYesCallback  :  yesCallback , 
	            ConfirmNoCallback  :  noCallback
	            
	        },jOptions); 
	               
	    };   
	    
	     
	    
	    
	/************************************************************************************
	*                              AJAX DEFAULTS                                        *
	************************************************************************************/
	  $Y.InitializeAjax = function(){   
	        
	        Ajax = {
	                
	                init : function(){
	                    $.ajaxSetup(Ajax.IntializeVars());
	                }, 
	                
	                IntializeVars : function(){
	
	                    return ({
	                          type       : 'POST'     ,
	                          dataType   : 'html'     ,
	                          beforeSend : Ajax.BeforeSend ,
	                          error      : Ajax.Error
	                    });
	                                
	                },   
	                
	                BeforeSend : function(){
	                    
	                    //console.log("Ajax Before Send");
	                    
	                },  
	                
	                Error : function(){
	                    
	                    console.log("Error Occured ( BY AJAX Object in jquery.vortal.js file )");
	                    
	                }
	                
	        }; // Ajax Object Ends     
	        return Ajax.init();
	  };
	
	  
	  /************************************************************************************
	  *                              GenerateObject                                      *
	  ************************************************************************************/  
	  
	  $Y.GenerateObject = function(){  
			
		    var ChainableObject = function(){ return new ChainableObject.fn.init();  };
			ChainableObject.fn = ChainableObject.protoype = {};
			ChainableObject.fn.init = function(){};
			ChainableObject.fn.init.prototype = ChainableObject.fn;
			return ChainableObject;
	  }  
	  
	  
	  /************************************************************************************
	   *                              LiteFrame Tools                                         *
	   ************************************************************************************/  	  
	  
	  $Y.ArrayMax = function( array ){ return Math.max.apply( Math, array ); };
	  $Y.ArrayMin = function( array ){ return Math.min.apply( Math, array );  };
	  
	  $Y.CountWords = function(string){
	  		
	  	    string = string.split(" ");
	  	    return string.length;
	  };
	  
	  
	  /*
	   * 
	   * Fix Events in jQuery Events
	   */
	  $Y.fixedEvent = function( event ){
		  
		  
		  if( jQuery ){
			  	
			    event.stopImmediatePropagation();
			    event.data.action.call( this , event);
		  
		  }
		  
	  };
	  
	  
	  return($Y.Initialize());

})($_LiteFrame_);


