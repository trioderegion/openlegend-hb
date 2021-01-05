export default class OLItemSheet extends ItemSheet {
    

    static get defaultOptions(){
        return mergeObject(super.defaultOptions, {
            width: 530,
            height: 340,
            classes: ["openlegend", "sheet", "item"]
        })
    }
    get template(){
        return `systems/openlegend-hb/templates/sheets/${this.item.data.type}.html`;
    }
    
    getData() {
        const data = super.getData();

        data.config = CONFIG.openlegend;
        
        return data;
    }
}