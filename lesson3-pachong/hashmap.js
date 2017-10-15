const map = new Map();
map.set("a", 1);
map.set("b", 2);
map.set("a", 3);

map.forEach(function(value, key){
    console.log(key+"="+value);
});


let a = map.get("a");
let c = map.get('c');


console.log(a == 3);
console.log(c==undefined);