Ext.define('app.view.login.WindowLogin', {
    extend: 'Ext.window.Window',
    title: 'Bienvenido Usuario',
    height: 190,
    width: 300,
    layout: 'fit',
    modal: true,
    buttonAlign: 'center',
    controller: 'windowlogin',
    items: [
        {
            xtype: 'form',
            bodyPadding: 10,
            reference: 'formulario',
            defaults: {
                xtype: 'textfield',
                allowBlank: false
            },
            items: [
                {
                    fieldLabel: 'Usuario',
                    name: 'usuario',
                    vtype: 'email'
                },
                {
                    fieldLabel: 'Password',
                    name: 'pass'
                }
            ]
        }
    ],
    buttons: [
        {iconCls: 'x-fa fa-user',
            text: 'Ingresar',
            handler: 'hacerLogin'
        }
    ]
});