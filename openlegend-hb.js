import { openlegend } from "./module/config.js";
import OLItemSheet from "./module/sheets/OLItemSheet.js";
import OLCharSheet from "./module/sheets/OLCharSheet.js";

Hooks.once("init", function() {
    console.log("openlegend-hb | Initializing Open Legend System");
    
    CONFIG.openlegend = openlegend;

    Items.unregisterSheet("core", ItemSheet);
    Items.registerSheet("openlegend-hb", OLItemSheet, {makeDefault:true});

    Actors.unregisterSheet("core", ActorSheet);
    Actors.registerSheet("openlegend-hb", OLCharSheet, {makeDefault:true});
})