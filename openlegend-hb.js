import { openlegend } from "./module/config.js";
import ItemOL from "./module/entity/itemOL.js"
import OLItemSheet from "./module/sheets/OLItemSheet.js";
import OLCharSheet from "./module/sheets/OLCharSheet.js";

import * as dice from "./module/dice.js";

Hooks.once("init", function() {
    console.log("openlegend-hb | Initializing Open Legend System");
    
    CONFIG.openlegend = openlegend;
    CONFIG.Item.entityClass = ItemOL;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("openlegend-hb", OLItemSheet, {makeDefault:true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("openlegend-hb", OLCharSheet, {makeDefault:true});
    
    
    // Create a namespace within the game global
    game.openlegend = {
        config: openlegend,
        dice: dice
    }
})