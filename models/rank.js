Rank = [];

Rank.getRankValue = function(net_worth) {
    if(net_worth < 500) {
        return { title: "Nearly Homeless", image : "/images/scenery1_200x68.png"}
    }
    if(net_worth < 1000) {
        return { title: "Capable of buying lunch", image : "/images/scenery1_200x68.png"}
    }
    if(net_worth < 4000) {
        return { title: "Cash-strapped", image : "/images/scenery1_200x68.png"}
    }
    if(net_worth < 10000) {
        return { title: "Getting the hang of it", image : "/images/scenery1_200x68.png"}
    }
    if(net_worth < 20000) {
        return { title: "Landlordly", image : "/images/scenery1_200x68.png"}
    }
    if(net_worth < 50000) {
        return { title: "Straight outta Cleveland", image : "/images/scenery1_200x68.png"}
    }


    return {title: "Straight up rizich", image: "/images/scenery1_200x68.png"}
};

