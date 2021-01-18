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

            /** die expression */
            const {
                num,
                size
            } = data.config.dice.score[abl.value]
            abl.die = abl.value > 0 ? `${num}d${size}` : "-";
        }

        // @todo guard: include armor and feats and other bonuses
        data.defenses = {
            guard: {
                value: 10 + data.actor.data.attributes.agility.value + data.actor.data.attributes.might.value
            },
            toughness: {
                value: 10 + data.actor.data.attributes.fortitude.value + data.actor.data.attributes.will.value
            },
            resolve: {
                value: 10 + data.actor.data.attributes.presence.value + data.actor.data.attributes.will.value
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
        if (this.actor.owner) {
            html.find(".attribute-roll").click(this.onAttributeRoll.bind(this));
            html.find(".item-roll").click(this.onItemRoll.bind(this));
            html.find(".item-edit").click(this.onItemEdit.bind(this));
            html.find(".item-delete").click(this.onItemDelete.bind(this));
        }

    }
    /** Listeners */
    async onAttributeRoll(event) {
        const {
            score,
            attribute,
            label
        } = event.currentTarget.dataset;

        ChatMessage.create({
            content: `${game.i18n.format(label)} (${attribute}) was rolled with a score of ${score}.`
        })

        const roll = await game.openlegend.dice.ActionRoll(score);
        roll.roll().toMessage();
    }

    onItemRoll(event) {
        event.preventDefault();
        const item = this.GetItemFromEntry(event.currentTarget);
        //@debug
        ui.notifications.info(`${item.name} was rolled!`);
        item.roll();
    }
    
    onItemEdit(event) {
        const item = this.GetItemFromEntry(event.currentTarget);
        item.sheet.render(true);
    }
    
    onItemDelete(event) {
        const item = this.GetItemFromEntry(event.currentTarget);
        item.delete();
    }
    
    /** listener helpers */
    GetItemFromEntry(currentTarget){
        const item_dataset = currentTarget.closest(".item-entry").dataset;
        const item_id = item_dataset.itemid;
        return this.actor.getOwnedItem(item_id);
    }
}