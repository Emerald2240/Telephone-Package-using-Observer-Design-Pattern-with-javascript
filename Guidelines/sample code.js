class Subject {
    constructor() {
        this.observers = new Set();
    }

    add(observer){
        if(observer.update){
            this.observers.add(observer)
        }else{
            console.log('This is not a valid observer.\n')
        }

    }

    remove(observer){
        this.observers.delete(observer)
    }

    notify(context){
        for(let observer of this.observers){
            observer.update(context)
        }
    }
}

class Observer{
    constructor(){}
    update(context){
        console.log(context)
    }
}

const ChiefNotifier = new Subject();
const mike = new Observer();

ChiefNotifier.add(mike);

for(let i = 0; i <= 100000; i++){
    console.log(i)
    if(i == 100000){
        ChiefNotifier.notify('i is now equal 100000');
    }
}