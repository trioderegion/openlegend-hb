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
        return `systems/openlegend-hb/templates/sheets/${this.item.data.type}.html`;
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
        // @todo find incantation for "this.actor.owner"
            html.find(".pl-select").click(this.onSelectPowerLevel.bind(this));
    }
    
    /** Listeners */
    onSelectPowerLevel(event){
        const dataset = event.currentTarget.dataset;
        const checked = event.currentTarget.checked;
        const powerLevel = parseInt(event.currentTarget.value);
        const isPresent = this.object.data.data.power.includes(powerLevel);
        
        if(checked && isPresent){
            /** do nothing, odds are a bad state... */
            return;
        }

        let powerUpdate = this.object.data.data.power;
        if (checked){
            //ensure this power level is present in the array
            powerUpdate.push(powerLevel);
            powerUpdate.sort();
            
        } else {
            /** ensure this power level is NOT present in the array (no need to resort) */
             powerUpdate = powerUpdate.filter( level => level !== powerLevel);
        }
        console.log("openlegend | Power Level list update");
        console.log(powerUpdate);
        return this.object.update({"data.power": powerUpdate})
    }

}