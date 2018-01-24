Ext.namespace('Zarafa.plugins.refreshbutton');

/**
* @class Zarafa.plugins.refreshbutton.RefreshButtonPlugin
* @extends Zarafa.core.Plugin
*
*/
Zarafa.plugins.refreshbutton.RefreshButtonPlugin = Ext.extend(Zarafa.core.Plugin, {

	/**
	 * Initialize the plugin by calling {@link #registerInsertionPoint}.
	 * @protected
	 */
	initPlugin : function()
	{
			// Register the refresh button in the mainToolbar
			this.registerInsertionPoint('main.toolbar.actions', this.newRefreshButton, this);
	},

	newRefreshButton : function()
	{
		return [{
		xtype : 'button',
		scale : 'large',
		id : 'newRefreshButton',
		iconCls: 'icon_refresh_plugin',
		cls : 'x-btn',
		text : _('Refresh'),
		handler : this.OnNewRefreshButton,
		listeners: {
                render: this.OnRenderNewRefreshButton,
                scope: this
    },
		scope : this
		}]
	},

	OnNewRefreshButton : function()
	{
		var model = container.getCurrentContext().getModel();
    if (model) {
      model.reload();
    }
		container.getHierarchyStore().reload();
	},

	OnRenderNewRefreshButton : function()
	{
		document.getElementById('zarafa-maintoolbar-refresh').style.display = ' none'
	}

});

Zarafa.onReady(function() {
	container.registerPlugin(new Zarafa.core.PluginMetaData({
		name : 'refreshbutton',
		displayName : _('New Refresh Button'),
		pluginConstructor : Zarafa.plugins.refreshbutton.RefreshButtonPlugin
	}));
});
