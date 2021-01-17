export const openlegend = {};

/** maps attribute name to translation path */
openlegend.attributes = {
    agility: "openlegend.attributes.agility",
    fortitude: "openlegend.attributes.fortitude",
    might: "openlegend.attributes.might",
    learning: "openlegend.attributes.learning",
    logic: "openlegend.attributes.logic",
    perception: "openlegend.attributes.perception",
    will: "openlegend.attributes.will",
    deception: "openlegend.attributes.deception",
    persuasion: "openlegend.attributes.persuasion",
    presence: "openlegend.attributes.presence",
    alteration: "openlegend.attributes.alteration",
    creation: "openlegend.attributes.creation",
    energy: "openlegend.attributes.energy",
    entropy: "openlegend.attributes.entropy",
    influence: "openlegend.attributes.influence",
    movement: "openlegend.attributes.movement",
    prescience: "openlegend.attributes.prescience",
    protection: "openlegend.attributes.protection"
}

/** maps defense related terms to translation path */
openlegend.defense = {
    guard: "openlegend.common.guard",
    toughness: "openlegend.common.toughness",
    resolve: "openlegend.common.resolve"
}

openlegend.powerLevels = Array.from({
    length: 9
}, (_, i) => i + 1);

/** dice information */
openlegend.dice = {
    core: {
        num: 1,
        size: 20
    },
    score: {
        0: {
            num: 0,
            size: 0
        },
        1: {
            num: 1,
            size: 4
        },
        2: {
            num: 1,
            size: 6
        },
        3: {
            num: 1,
            size: 8
        },
        4: {
            num: 1,
            size: 10
        },
        5: {
            num: 2,
            size: 6
        },
        6: {
            num: 2,
            size: 8
        },
        7: {
            num: 2,
            size: 10
        },
        8: {
            num: 2,
            size: 8
        },
        9: {
            num: 2,
            size: 10
        }
    }
}