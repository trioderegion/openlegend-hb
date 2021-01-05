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


        // Ability Scores
        for (let [a, abl] of Object.entries(data.actor.data.abilities)) {
            //abl.icon = this._getProficiencyIcon(abl.proficient);
            //abl.hover = CONFIG.DND5E.proficiencyLevels[abl.proficient];
            abl.label = data.config.attributes[a];

            return data;
        }
    }
}