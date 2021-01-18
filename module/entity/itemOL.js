export default class ItemOL extends Item {
    ChatTemplate = {
        "boon": "systems/openlegend-hb/templates/partials/boon-card.hbs",
        "bane": "",
        "feat": ""
    };

    async roll() {
        let chat_data = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker()
        };

        const card_data = {
            ...this.data,
            owner: this.actor.id
        };

        const attribute_path = `data.data.attributes.${this.data.data.attribute}.value`;
        const attribute_score = getProperty(this.actor, attribute_path);
        chat_data.content = `A ${this.name} roll!`;
        //chat_data.content = await renderTemplate(this.ChatTemplate[this.type], card_data);

        chat_data.roll = await game.openlegend.dice.ActionRoll(attribute_score);
        chat_data.roll.roll().toMessage();

        return ChatMessage.create(chat_data);
    }
}