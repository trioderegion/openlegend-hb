Handlebars.registerHelper('ifIn', function(elem, list, options) {
    return (list?.indexOf(elem) ?? -1) > -1;
  });


export default class OLItemSheet extends ItemSheet {
    

    static get defaultOptions(){
        return mergeObject(super.defaultOptions, {
            width: 530,
            height: 340,
            classes: ["openlegend", "sheet", "item"]
        })
    }
    get template(){
        return `systems/openlegend-hb/templates/sheets/${this.item.data.type}.hbs`;
    }
    
    getData() {
        const data = super.getData();

        data.config = CONFIG.openlegend;
        
        return data;
    }
    
    /** @override */
	async activateListeners(html) {
        super.activateListeners(html);
        
        /** owner only listeners */
    }
    
    /** Listeners */
}