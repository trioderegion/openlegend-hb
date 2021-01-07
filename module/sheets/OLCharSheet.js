export default class OLCharSheet extends ActorSheet {

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "systems/openlegend-hb/templates/sheets/char.html",
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
        data.legendpoints = 0;
        data.wealthLevel = 0;

        return data;
    }
}