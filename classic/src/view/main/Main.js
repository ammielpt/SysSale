/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('app.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'app.view.main.MainController',
        'app.view.main.MainModel',
        'app.view.main.List'
    ],
    plugins: 'viewport',
    controller: 'main',
    viewModel: 'main',
    ui: 'navigation',
    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'bottom'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 10,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [
        {
            title: 'Clientes',
            iconCls: 'fa-user',
            xtype: 'gridclientes'
        },
        {
            title: 'Productos',
            iconCls: 'fa-home',
            xtype: 'gridproductos'
        }, {
            title: 'Facturas',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        },
        {
            title: 'Boletas',
            iconCls: 'fa-users',
            bind: {
                html: '{loremIpsum}'
            }
        },
        {
            title: 'Reportes',
            iconCls: 'fa-file',
            bind: {
                html: '{loremIpsum}'
            }
        },
        {
            title: 'Configuracion',
            iconCls: 'fa-cog',
            bind: {
                html: '{loremIpsum}'
            }
        }]
});
