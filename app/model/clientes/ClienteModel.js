Ext.define('app.model.clientes.ClienteModel', {
    extend: 'Ext.data.Model',
    fields: [
        { name: "idCliente", type: 'int', defaultValue: 0 },
        { name: "razonSocial", type: 'string' },
        { name: "ruc", type: 'string' },
        { name: "direccion", type: 'string' },
        { name: "idDepartamento", type: 'int' },
        { name: "idProvincia", type: 'int' },
        { name: "idDistrito", type: 'int' },
        { name: "fechaNacimiento", type: 'date', dateFormat: 'Y-m-d' }
    ]
});