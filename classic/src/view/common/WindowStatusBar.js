Ext.define('app.view.common.WindowStatusBar', {
    extend: 'app.view.common.ModalWindow',

   // requires: ['Ext.ux.StatusBar'],

    initComponent: function () {

//        this.statusbar = Ext.create('Ext.ux.StatusBar', {
//            text: 'Listo',
//            iconCls: 'ready-icon'
//        });
//
//        this.bbar = this.statusbar;

        this.callParent();
    },

    //TODO metodos para cambiar mensajes
    mostrarCargando: function (text, icon) {
        this.statusbar.setText(text);
        this.statusbar.setIcon(icon);
    }
});	