<?php
/*

  /------- INDEX PAGE ---------/

	    # if set to false, you will be unable to set folder paths to get specific templates.
	    # By default is set to false so you don't need to call this function , 
	    # but if you have some chainy tempalte engine system going on you need to turn it on
	    # you could have 
	    
	    $LiteFramePHP->SetTemplateEngine(false);
	
	    # There is always going to be an action that the framework is going to be pointing to.
	    $LiteFramePHP->SetPreAction("LoadPages");  // Set your default action here for the beginning of your project!
	    
	    
	    
	    # $LiteFramePHP->SetPreActionWithTemplate("homepage","homepage2");
	    $LiteFramePHP->SmartyPath("/var/www/phplib/smarty_vortal/Smarty.class.php");
	    
	    
	    
	    # Grab all $yAction and make it to a json obj
	     $LiteFramePHP->JavaScriptActionInfo();
	                                    
	    
	    # if you want all your javascript on the bottom of the page                                    
	    $LiteFramePHP->JavascriptBottomPage();
	

	     # Adding JS / CSS files with the same Action name to the DOM if they exist
    	$LiteFramePHP->AddingRelatedFilesToDOM();
	
		#to run the application
	    $LiteFramePHP->RunApplication();
 
  /------- ACTION PAGE ---------/
 
         
         #How to Require a page :
         require_once(LiteFramePHP::GetFileSystemPath()."includes/StaticPage.class.php");
        
         
         #IncludeJavascript :
         LiteFramePHP::IncludeJavascript('jslib/jquery/jquery.js', 'jslib/tiny_mce/jquery.tinymce.js', 'LoadPage.js'); 
        
         #This is the javascript files that you specifically want for the page. Order of load based on the element index : 
         //  LiteFramePHP::IncludeJavascript(array('test.js','test2.js'));
         
         #IncludeJavascript assigning to a json variable:
         LiteFramePHP::InlineJavascript("var jsonObj = ". json_encode($pageInformation)  . ";");        

        
        # This is going to have all the head and script tags
           LiteFramePHP::SetTemplateLayoutName('index2');
        
        # In the folder 'actions' here you can point to a specific folder.
            LiteFramePHP::SetTemplateFolderName("Classic A");
        
        # This is if you want to point to a subdirectory.    
           LiteFramePHP::SetTemplateColorName("B");
        
        # This is if you want just a blank layout.
           LiteFramePHP::NoTemplateLayout() 
        
        # Basic json layout..you'll be getting $yAction as a json return.
           LiteFramePHP::JSONLayout();
        
        # no template layout, just raw data from php.      
            LiteFramePHP::AJAXLayout();
            
        # This is if you want to change the action template.  Its default is the action name plus ".tpl.html"
            LiteFramePHP::SetTemplateAction('C');
        
        # This is where you load variables for smarty to use.
          LiteFramePHP::$yAction['tt'] = 'tt';
        
            
        # These are the external css files that you are going to be loading.    
         LiteFramePHP::IncludeStyle('test.css','test2.css');
        
        # This is going to add css to your head tag.    
         LiteFramePHP::InlineStyle(' a{ text-decoration : none; } ');
        
        # Include a style into the document's head
 		LiteFramePHP::IncludeLibraryStyle('jquery/jquery-treeview/jquery.treeview.css');
 		
 		# Include a style into the document's head
		LiteFramePHP::IncludeLibraryJavascript('jquery/jquery-treeview/jquery.treeview.js');
 
 
 	
 */  
/**
 * LiteFrame BOX DOCUMENTATION
 * 
 * 
 * 
 * 
 * VARIABLE PROCESSING 
 * 
 *  	
 *  	JAVASCRIPT VARIABLES
 *  
 * 	    	$_LiteFrame_.GetVariables(); // It is gonna return the list of variables
 *	    	$_LiteFrame_.GetVariable('actionTemplate');  OR $_LiteFrame_.var.actionTemplate;
 *			$_LiteFrame_.GetActionVariables() // Returns ActionInfo as a JSON Object  You have to call this LiteFramePHP::IncludeJson()  
 *											 in you PHP side to have your php variables avaiable in your javascript 
 *
 *
 *		SMARTY VARIABLES 
 *
 *			<!--{$applicationPath}-->
 *			<!--{$includeTemplate}-->
 *
 *
 *			OPTIONS : 
 *				
				  applicationPath             	Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/"
				  includeTemplate				Sample : "/var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/includes/"
				  actionTemplate				Sample : "/var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/actions/"
				  layoutTemplate				Sample : "/var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/layouts/"
				  settingsTemplate				Sample : "/var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/_settings/"
				  javascriptPath				Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/javascript/"
				  javascriptLibraryPath			Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/jslib/"
				  javascriptLibraryIncludes     Sample : 0 => "jquery/jquery.js" , 1 => "jquery/jquery2.js"
				  javascriptIncludes            Sample : 0 => "socialBlogging.js" , 1 =>"socialBlogging2.js"
				  javascriptInline              Sample : "var i =2 ;"   
				  stylePath						Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/style/"
				  styleLibraryPath				Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/jslib/"
				  styleLibraryIncludes			Sample : 0 => "serverJslib/jquery/ui_themes/current_theme/stylesheet.css"
				  styleIncludes					Sample : 0 => "socialBlogging.css"
				  styleInline					Sample : ".red{color:red};"
				  imagePath  					Sample : "http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/style/images/"
				  
				  
		PHP VARIABLES 
		
			LiteFramePHP::GetFileSystemPath();      Sample :  /var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/
			LiteFramePHP::GetApplicationPath();     Sample :  http://inventory.vortalgroup.com/blogging/socialBlogging2/
			
			LiteFramePHP::GetTemplateIncludePath()  Sample : /var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/includes/
			LiteFramePHP::GetTemplateActionPath()   Sample : /var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/actions/
			LiteFramePHP::GetTemplateLayoutPath()   Sample : /var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/layouts/
			LiteFramePHP::GetTemplateSettingsPath() Sample : /var/www/backend/inventory.vortalgroup.com/blogging/socialBlogging2/templates/_settings/
			LiteFramePHP::GetJavascriptPath();      Sample : http://inventory.vortalgroup.com/blogging/GenomeSocialBlogging/javascript/	  
 			LiteFramePHP::GetJavascriptModulePath();Sample :  
 			LiteFramePHP::GetJavascriptLibraryPath(); Sample : http://inventory.vortalgroup.com/blogging/socialBlogging2/jslib/
 			
 			LiteFramePHP::GetImagePath();	  	   Sample : http://inventory.vortalgroup.com/blogging/socialBlogging2/style/images/
 			
 			LiteFramePHP::GetStylePath();     	   Sample : http://inventory.vortalgroup.com/blogging/socialBlogging2/style/
 			LiteFramePHP::GetStyleLibraryPath();   Sample : http://inventory.vortalgroup.com/blogging/socialBlogging2/jslib/
 			
 * 
 * 
 * 			LiteFramePHP::FetchRequestVariable();		// Returns all the variables in $_POST, $_GET and $_REQUEST in a single array.
 * 
 * 
 * 		TEMPLATE OUTPUT
 * 
 * 					LiteFramePHP::AJAXLayout()   		 // It is gonna return the HTML excluding the Layout Template 
 * 					LiteFramePHP::JSONLayout()   		 // It is gonna have JSON layout of all variables in the framework
 * 					LiteFramePHP::NoTemplateLayout()     // Ignores the template Layout , its good for CRONs and php Scripts
 * 					LiteFramePHP::IncludeJson()          // It will add the yAction Variable to the DOM . 
 * 
 * 
 * 		SET TEMPLATE ENGINE
 * 
 *  				LiteFramePHP::SetTemplateLayoutName();
 *  				LiteFramePHP::SetTemplateFolderName();
 *  				LiteFramePHP::SetTemplateColorName();
 *  				LiteFramePHP::SetTemplateLayoutName();
 *  				LiteFramePHP::SetTemplateAction();
 *  				LiteFramePHP::$yAction ;
 *  				
 *  
 *  
 *  	JAVSCRIPT
 *  
 *  			   $LiteFramePHP->JavascriptBottomPage();   // Make LightFrame Varibale avaible as a javsacript variable in the DOM 
 *      
 * 
 * 
 * 		
 * 
 * 					
 * 
 *         
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
	public  function SetTemplateEngine($bool){      $this->templateEngine   =  $bool;	}
	
    
    
    
    public  function SetLogFolder($folder){         $this->logFolder        = $folder;	}
	
    
    
    
    public  function SetJavascriptFolder($folder){  $this->javascriptFolder = $folder;	}
    
    
    
    public  function SetJavascriptModuleFolder($folder){  $this->javascriptModuleFolder = $folder;	}
    
    
    
    public  function SetJavascriptLibraryFolder($folder){  
    	
    	if(isset(self::$yAction)){
    		
    		self::$yAction['_YOTTA_']['VARS']['javascriptLibraryFolder'] = $folder."/";
    		self::$yAction['_YOTTA_']['VARS']['javascriptLibraryPath'] = self::$yAction['_YOTTA_']['VARS']['applicationPath'].$folder."/";
    	
    	}else{
    		
    		$this->javascriptLibraryFolder = $folder.'/';
    	
    	}
    	
    }
    

    
    
    public  function SetStyleLibraryFolder($folder){  
    	if(isset(self::$yAction)){
    		
    		self::$yAction['_YOTTA_']['VARS']['styleLibraryFolder'] = $folder."/";
    		self::$yAction['_YOTTA_']['VARS']['styleLibraryPath'] = self::$yAction['_YOTTA_']['VARS']['applicationPath'].$folder."/";
    	
    	}else{
    		
    		$this->styleLibraryFolder = $folder.'/';
    	
    	}
    	
    }    
    
	
    public  function SetIncludeFolder($folder){     $this->includeFolder    = $folder;	}
	
    
    
    
    public  function SetActionFolder($folder){      $this->actionFolder     = $folder;	}
	
    
    
    
    public  function SetImagesFolder($folder){      $this->imagesFolder     = $folder;	}
	
    
    
    
    public  function SetTemplateFolder($folder){    $this->templateFolder   = $folder;	}
	
    
    
    
    public  function SetTemplateCFolder($folder){   $this->templateCFolder  = $status;	}
	
    
    
    
    public  function SetSmartyPath($folder){        $this->smartyPath  = $folder;	}
	
    
    
    
    public  function SetPreAction($action){  $this->action = $action;  }   
    
    
    
    
    public function SetPreActionWithTemplate($action,$template){
        
         $this->action = $action;
         $this->templateAction = $template; 
    
    }
    
    
    
    
    public function JavaScriptActionInfo(){ $this->javaScriptActionInfo = true; }
    
    
    
    
    public function SmartyPath($path){ $this->smartyPath = $path;  }
    
    
    
    public function AddingRelatedFilesToDOM(){ $this->RelatedFiles = true; }
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */
?>
