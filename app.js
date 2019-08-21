/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'app',

    extend: 'app.Application',

    requires: [
        'app.view.main.Main',
        'app.view.login.WindowLogin',
        'app.view.login.WindowLoginController',
        'app.view.clientes.PanelClientes',
        'app.view.clientes.form.FormCliente',
        'app.store.clientes.StoreClientes',
        'app.view.clientes.form.ComboClientes',
        'app.view.clientes.GridClientes',
        'app.model.clientes.ClienteModel',
        'app.view.clientes.PanelClientesController',
        'app.view.common.WindowStatusBar',
        'app.view.common.ModalWindow',
        'app.view.clientes.ClienteController',
        'app.store.telefonos.StoreTelefonos',
        'app.view.telefonos.GridTelefonos',
        'app.view.telefonos.FormTelefono',
        'app.store.operadores.StoreOperadores',
        'app.view.telefonos.TelefonoController',
        'app.view.correos.CorreoController',
        'app.store.correos.StoreCorreos',
        'app.view.clientes.correos.GridCorreos',
        'app.view.clientes.correos.FormCorreo',
        'app.model.correos.CorreoModel',
        'app.view.clientes.documents.GridDocuments',
        'app.model.clientes.DocumentModel',
        'app.view.clientes.DocumentController',
        'app.store.clientes.StoreDocuments',
        'app.view.clientes.documents.FormDocument',
        'app.store.productos.StoreProductos',
        'app.view.productos.GridProductos',
        'app.model.productos.ProductoModel',
        'app.view.productos.ProductoController',
        'app.store.productos.StoreDocuments',
        'app.model.productos.DocumentModel',
        'app.view.productos.documents.GridDocuments',
        'app.view.productos.form.FormProducto',
        'app.view.productos.documents.FormDocument',
        'app.store.productos.StoreNominaciones',
        'app.store.productos.StoreCategorias',
        'app.store.ubigeos.StoreDepartamentos',
        'app.store.ubigeos.StoreProvincias',
        'app.store.ubigeos.StoreDistritos'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'app.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to app.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});