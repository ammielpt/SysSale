<?php
include_once './libs/database.php';
include_once './libs/controller.php';
include_once './libs/model.php';
include_once './libs/view.php';
include_once './libs/app.php';
require_once './config/config.php';
$var = new App();
?>
<!DOCTYPE HTML>
<html>
    <head>
        <meta charset="UTF-8">

        <title>app</title>

        <script type="text/javascript">
            Sales = {};
            Sales.Config = {};
            Sales.Config.HOME_URL = "http://localhost/SysSale"
            var Ext = Ext || {}; // Ext namespace won't be defined yet...

            // This function is called by the Microloader after it has performed basic
            // device detection. The results are provided in the "tags" object. You can
            // use these tags here or even add custom tags. These can be used by platform
            // filters in your manifest or by platformConfig expressions in your app.
            //
            Ext.beforeLoad = function (tags) {
                var s = location.search, // the query string (ex "?foo=1&bar")
                        profile;

                // For testing look for "?classic" or "?modern" in the URL to override
                // device detection default.
                //
                if (s.match(/\bclassic\b/)) {
                    profile = 'classic';
                } else if (s.match(/\bmodern\b/)) {
                    profile = 'modern';
                } else {
                    profile = tags.desktop ? 'classic' : 'modern';
                    //profile = tags.phone ? 'modern' : 'classic';
                }

                Ext.manifest = profile; // this name must match a build profile name

                // This function is called once the manifest is available but before
                // any data is pulled from it.
                //
                //return function (manifest) {
                // peek at / modify the manifest object
                //};
            };
        </script>

        <!-- The line below must be kept intact for Sencha Cmd to build your application -->
        <script id="microloader" data-app="55c55f52-2223-4e8c-8f15-b186e15eb648" type="text/javascript" src="bootstrap.js"></script>
    </head>
    <body>
        <div id="backload" style="display: table; background-color: white; position: absolute; left: 0; top: 0; z-index: 100000; width:100%;height:100%;">
            <div style="display: table-cell; vertical-align: middle; text-align: center;">
                <img src="resources/img/loading-home.gif"/><br/>
                <span style="font-family: helvetica,arial,verdana,sans-serif; font-size: 43px; color: #5fa2dd;">Iniciando...</span>
            </div>
        </div>
    </body>
</html>