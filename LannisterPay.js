function LannisterPay(obj){
    console.log(`Initial Balance: \n${obj.Amount}\n`);
  
    let SplitBreakdown = [];
  
    let flatArr = obj.SplitInfo.filter(e => e.SplitType === "FLAT");
    let percArr = obj.SplitInfo.filter(e => e.SplitType === "PERCENTAGE");
    let ratioArr = obj.SplitInfo.filter(e => e.SplitType === "RATIO");
    
    // Copy the arrays before mutating them
    let cpflatArr = [...flatArr];
    let cppercArr = [...percArr];
    let cpratioArr = [...ratioArr];
    
    if (cpflatArr.length !== 0){
        console.log("FLAT TYPES FIRST");
    }else if(cppercArr.length !== 0){
        console.log("NO FLAT TYPES\nPERCENTAGE TYPES COME NEXT");
    }else if(cpratioArr.length !== 0){
        console.log("NO FLAT OR PERCENTAGE TYPES\nFINALLY, RATIO TYPES");
    }
  
    while(flatArr.length !== 0){
        currentEntity = flatArr.shift();
        splitAmount = currentEntity.SplitValue
        let oldAmount = obj.Amount
        obj.Amount -= splitAmount
        console.log(`Split amount for "${currentEntity.SplitEntityId}": ${splitAmount}`)
        console.log(`Balance after split calculation for "${currentEntity.SplitEntityId}": (${oldAmount} - ${splitAmount})\n${obj.Amount}\n`)
        SplitBreakdown.push({"SplitEntityId": currentEntity.SplitEntityId, "Amount": splitAmount})
    }
    
    if (cpflatArr.length !== 0 && cppercArr.length !== 0){
        console.log("PERCENTAGE TYPES COME NEXT");
    }
    
    while(percArr.length !== 0){
        currentEntity = percArr.shift();
        let oldAmount = obj.Amount
        splitAmount = currentEntity.SplitValue * oldAmount / 100
        obj.Amount -= splitAmount
        console.log(`Split amount for "${currentEntity.SplitEntityId}": (${currentEntity.SplitValue} % OF ${oldAmount} = ${splitAmount})`)
        console.log(`Balance after split calculation for "${currentEntity.SplitEntityId}": (${oldAmount} - (${splitAmount}))\n${obj.Amount}\n`)
        SplitBreakdown.push({"SplitEntityId": currentEntity.SplitEntityId, "Amount": splitAmount})
    }
  
    if (cpflatArr.length !== 0 && cpratioArr.length !== 0 || cppercArr.length !== 0 && cpratioArr.length !== 0){
        console.log("FINALLY, RATIO TYPES");
    }
    
    if (cpratioArr.length > 0){
        let ratioAddStr = `${cpratioArr[0].SplitValue}`;
        let totalRatio = cpratioArr[0].SplitValue;
        for (let i = 1; i < cpratioArr.length; i++){
            ratioAddStr += ` + ${cpratioArr[i].SplitValue}`
            totalRatio += cpratioArr[i].SplitValue
        }

        let balBeforeRatio = obj.Amount
        console.log(`TOTAL RATIO = ${ratioAddStr} = ${totalRatio}`)
        console.log(`Opening Ratio Balance = ${balBeforeRatio}\n`)
        while(ratioArr.length !== 0){
			let oldAmount = obj.Amount
            currentEntity = ratioArr.shift();
            splitAmount = currentEntity.SplitValue * balBeforeRatio / totalRatio;
            obj.Amount -= splitAmount
            console.log(`Split amount for "${currentEntity.SplitEntityId}": ((${currentEntity.SplitValue}/${totalRatio}) * ${balBeforeRatio} = ${splitAmount})`)
            console.log(`Balance after split calculation for "${currentEntity.SplitEntityId}": (${oldAmount} - (${splitAmount}))\n${obj.Amount}\n`)
            SplitBreakdown.push({"SplitEntityId": currentEntity.SplitEntityId, "Amount": splitAmount})
        }
    }
    console.log(`Final Balance: ${obj.Amount}\n`)
    
    return {"ID": obj.ID, "Balance": obj.Amount, "SplitBreakdown": SplitBreakdown}
}

/**
 * TEST
 */

let payLoad = {
    "ID": 13092,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        },
    ]
}

console.log(LannisterPay(payLoad))
