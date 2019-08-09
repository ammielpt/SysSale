Ext.define('app.view.login.WindowLoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.windowlogin',
    hacerLogin: function () {
        localStorage.setItem("TutorialLoggedIn", true);
        // Remove Login Window
        this.getView().destroy();
        // Add the main view to the viewport
        Ext.create({
            xtype: 'app-main'
        });
//
//        var datos = this.lookupReference('formulario').getValues();
//        Ext.Ajax.request({
//            url: 'server/dologin.json',
//            scope: this,
//            params: datos,
//            success: function (response, opts) {
//                var obj = Ext.decode(response.responseText);
//                console.dir(obj);
//                Ext.Msg.alert('Hola', 'Bienvenido de nuevo usuario' + obj.fullname, function () {
//                    this.getView().close();
//                }, this);
//            },
//            failure: function (response, opts) {
//                console.log('server-side failure with status code ' + response.status);
//            }
//        });
    }
});