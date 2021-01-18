/** die expression helpers*/
    
/**  */
function KeepExpression(keepNum, advantage){
    return advantage > -1 ? advantage == 0 ? "" : `kh${keepNum}` : `kl${keepNum}`
}

/** num d size (how many to keep) explode kept */
function BaseDieExpression(num,size,keepString){
    return `${num}d${size}${keepString}x`;
}
function UntrainedRollExpression(advantage) {
    const coredice = game.openlegend.config.dice.score[0];

    /** if we have any adv (or none) keep the highest single core die */
    const adv_mod = KeepExpression(coredice.num, advantage)
    
    /** if there is any advantage there can only be 1 extra die for an untrained roll */
    const num_core = advantage == 0 ? coredice.num : coredice.num+1;
    
    const core_expression = BaseDieExpression(num_core,coredice.size,adv_mod);

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
    const adv_mod = KeepExpression(num, advantage);
    const num_die = num+absAdv;
    
    /** attribute die explode */
    const attribute_die = BaseDieExpression(num_die,size,adv_mod);

    /** base die (i.e. 1d20) + attribute die including advantages */
    return [UntrainedRollExpression(0), attribute_die];
}


export async function ActionRoll(score = 0, advantage = 0) {
    console.log(`openlegend | Action Roll (${score}, ${advantage})`);

    /** construct an array of rollable dice (should be a Dice Pool?) */
    const parts = GenerateParts(score, advantage);

    /** "part[0] + part[1]x + ..." */
    const finalExpression = parts.reduce((prev, curr) => {
        return `${prev}+${curr}`
    });

    const roll = new Roll(finalExpression);

    /** return the promise of a new roll */
    return roll;
}