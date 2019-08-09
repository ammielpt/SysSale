Ext.define('app.model.Personnel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: "nombre", type: 'string'},
        {name: "matricula", type: 'string'},
        {name: "apellido", type: 'string'}
    ],
    nombreToHtml: function () {
        return this.data.nombre + ' ' + this.data.apellido_paterno;
    }
});