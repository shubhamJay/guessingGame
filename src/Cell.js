const { Actor, ActorSystem, Topic } = require('tarant');

class Listenable{
  listen(num){}
}

class Cell extends Actor{
  constructor(row, column,updateFunc,topic){
    super(`${row}+${column}`);
    this.row = row;
    this.column = column;
    this.updateFunc = updateFunc;
    this.topic = topic;
    this.value=0;
  }

  update(num){
    this.topic.listen(num);
  }

  listen(num){
    this.value = this.updateFunc(num);
    console.log(`value at ${this.row}-${this.column} = ${this.value}`);
  }
}

let system = ActorSystem.default();

let topic = Topic.for(system, "update", Listenable);

console.log("subscribing");

let first = system.actorOf(Cell,[1,1,n=>n+1,topic]);
let second = system.actorOf(Cell,[1,2,n=>n+2,topic]);
let third = system.actorOf(Cell,[2,1,n=>n+3,topic]);
let fourth = system.actorOf(Cell,[2,2,n=>n+4,topic])
console.log("subscribed");


topic.subscribe(first)
topic.subscribe(second)
topic.subscribe(third)
topic.subscribe(fourth)

let a = first.update(3);

setTimeout(() => {
  second.update(4);
}, 3000);
