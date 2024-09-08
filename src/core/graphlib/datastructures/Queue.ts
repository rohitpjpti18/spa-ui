class Queue<T>{
    items: T[];

    constructor(){
        this.items = [];
    }

    isEmpty(){
        return this.items.length == 0;
    }

    printQueue(){
        let str = "[";
        for(let i = 0; i<this.items.length; i++)
            str += this.items + " ";
        return str;
    }

    enqueue(item: T){
        this.items.push(item);
    }

    dequeue(){
        return this.isEmpty() ? null : this.items.shift();
    }

    front(){
        return this.isEmpty() ? null : this.items[0];
    }
}

export default Queue;