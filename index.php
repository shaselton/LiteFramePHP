<?php

    require_once(realpath('.')."/liteframe/php/index.php");    
    $LightFramePHP =  new LightFramePHP;
   
    // if set to false, you will be unable to set folder paths to get specific templates.
 	//$LightFramePHP->SetTemplateEngine(false);

    // There is always going to be an action that the framework is going to be pointing to.
    $LightFramePHP->SetPreAction("DEFAULT ACTION HERE");  // Set your default action here for the beginning of your project!
    

    // $LightFramePHP->SetPreActionWithTemplate("homepage","homepage2");
    $LightFramePHP->SmartyPath("/var/www/phplib/smarty_vortal/Smarty.class.php");
    
    // Grab all $yAction and make it to a json obj
     $LightFramePHP->JavaScriptActionInfo();
                                    
    // if you want all your javascript on the bottom of the page                                    
     //$LightFramePHP->JavascriptBottomPage();

     // Adding JS / CSS files with the same Action name to the DOM if they exist
     $LightFramePHP->AddingRelatedFilesToDOM();
    
    
     $LightFramePHP->SetJavascriptLibraryFolder("jslib");
     $LightFramePHP->SetStyleLibraryFolder("jslib");
     
     $LightFramePHP->RunApplication();
    


?>
