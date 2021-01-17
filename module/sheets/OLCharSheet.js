export default class OLCharSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/openlegend-hb/templates/sheets/char.hbs",
            classes: ["openlegend", "sheet", "char"]
        });
    }

    getData() {
        const data = super.getData();

        data.config = CONFIG.openlegend;


        /** prepare any attribute related data entries for render */
        for (let [a, abl] of Object.entries(data.actor.data.attributes)) {
            //abl.icon = this._getProficiencyIcon(abl.proficient);
            //abl.hover = CONFIG.DND5E.proficiencyLevels[abl.proficient];

            /** Ability Score localization keys */
            abl.label = data.config.attributes[a];
        }
        
        // @todo guard: include armor and feats and other bonuses
        data.defenses = {
            guard:{
                value: 10+data.actor.data.attributes.agility.value+data.actor.data.attributes.might.value
            },
            toughness:{
                value: 10+data.actor.data.attributes.fortitude.value+data.actor.data.attributes.will.value
            },
            resolve:{
                value: 10+data.actor.data.attributes.presence.value+data.actor.data.attributes.will.value
            }
        }
        
        // @todo placeholders
        data.legendPoints = 0;
        data.wealthLevel = 0;

        return data;
    }
    
     /** @override */
	async activateListeners(html) {
        super.activateListeners(html);
        
        /** owner only listeners */
        if( this.actor.owner){
            html.find(".attribute-roll").click(this.onAttributeRoll.bind(this));
        }
    }

    /** Listeners */
    onAttributeRoll(event){
        const {score, attribute, label} = event.currentTarget.dataset;
       
        ChatMessage.create({
            content: `${game.i18n.format(label)} (${attribute}) was rolled with a score of ${score}.`
        })
        
        game.openlegend.dice.actionRoll(score);
    }
}