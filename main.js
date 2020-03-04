const validate = (card) => {
    let luhnyToons = [];
    let i = card.length-1;
    let manipulate = 0;
    /***
    * We eventually want to use apply the algorithm to all Luhn-valid numbers
    * so we need a way to keep track of even and odd iterations separate from
    * the length of a CC number.
    ***/
    let iterCount = 1;
    while(i >= 0) {
        if (iterCount % 2 == 0) { //even iteration
            2*card[i] >= 10 ? luhnyToons.push((2*card[i]-9)) : luhnyToons.push(2*card[i]);
        } else { //odd iteration
            luhnyToons.push(card[i]);
        }
        i --;
        iterCount ++;
    }
    let checksum = 0;
    luhnyToons.forEach(digit => checksum += digit);
    if (checksum % 10 === 0) {
        return true;
    } else {
        return false;
    }
}

const findInvalid = (batch) => {
    let invalidCards = [];
    //Anti Patern alert: We want the INVALID cards so we keep the cards where validate returns FALSE
    batch.forEach(function(card) {
        if(!validate(card)) {invalidCards.push(card)};
    });
    return invalidCards;
}

const issuedInvalid = (batch) => {
    let issuers = new Set();
    batch.forEach(function(card) {
        switch (card[0]) {
            case 3:
                issuers.add('Amex');
                break;
            case 4:
                issuers.add('Visa');
                break;
            case 5:
                issuers.add('Mastercard');
                break;
            case 6:
                issuers.add('Discover');
                break;
            default:
                continue;
        }
    });
    return issuers;
}
