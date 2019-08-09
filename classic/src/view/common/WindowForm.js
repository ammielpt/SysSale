Ext.define('app.view.common.WindowForm', {
    extend: 'app.view.common.WindowStatusBar',
    

    initComponent: function (){

    	Ext.apply(this, {

    		items: this.form,

    		buttons:[{
    			text: 'Guardar',
                scope: this,
                handler: this.doSubmit
    		},{
    			text: 'Cancelar',
                scope: this,
                handler: this.doCancel
    		}]

    	});

    	this.callParent();
    },

    doSubmit: function (){
    	if( this.form.isValid() )
    		this.form.doSubmit(); 
    },

    doCancel: function (){
    	this.hide();
    }

});