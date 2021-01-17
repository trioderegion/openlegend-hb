/** num d size (how many to keep) */
function baseDieExpression(num,size,keepString){
    return `${num}d${size}${keepString}`;
}
function UntrainedRollExpression(advantage) {
    const coredice = game.openlegend.config.dice.core;

    /** if we have any adv (or none) keep the highest single core die */
    const adv_mod = advantage>-1 ? `kh${coredice.num}` : `kl${coredice.num}`;
    
    /** if there is any advantage there can only be 1 extra die for an untrained roll */
    const num_core = advantage == 0 ? coredice.num : coredice.num+1;
    
    const core_expression = baseDieExpression(num_core,coredice.size,adv_mod);

    return core_expression;
}

function GenerateParts(score, advantage) {
    
    /** untrained are special */
    if (score < 1) {
        return [UntrainedRollExpression(advantage)];
    }

    /** grab the information for this score's die */
    const {
        num,
        size
    } = game.openlegend.config.dice.score[score];

    const absAdv = Math.abs(advantage);

    /** only keep the number of dice according to your attribute, but pick best/worst of pool */
    const adv_mod = (advantage > -1 ? `kh${num}` : `kl${num}`)
    const num_die = num+absAdv;
    
    /** attribute die explode */
    const attribute_die = baseDieExpression(num_die,size,adv_mod)+"x";

    /** base die (i.e. 1d20) + attribute die including advantages */
    return [UntrainedRollExpression(0), attribute_die];
}


export async function ActionRoll(score = 0, advantage = 0) {
    console.log(`openlegend | Action Roll (${score}, ${advantage})`);

    /** construct an array of rollable dice (should be a Dice Pool?) */
    const parts = GenerateParts(score, advantage);

    const finalExpression = parts.reduce((prev, curr) => {
        return `${prev}+${curr}`
    });

    const roll = new Roll(finalExpression).roll();

    roll.toMessage();
}