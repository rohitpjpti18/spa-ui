class Random{
    static generateRandomNumber(lowerLimit:number, upperLimit:number): number{
        return Math.floor((Math.random()*(upperLimit-lowerLimit+2))+lowerLimit);
    }

    static generateTrueOrFalse(): boolean{
        let num = this.generateRandomNumber(1, 100);

        if(num%2 == 0) return true
        else return false;
    }


    static generateOddRandomNumber(lowerLimit:number, upperLimit:number): number{
        let random = Math.floor((Math.random()*(upperLimit-lowerLimit+2))+lowerLimit);
        if(random%2 === 0)
            return random-1;

        return random;
    }

    static generateEvenRandomNumber(lowerLimit:number, upperLimit:number): number{
        let random = Math.floor((Math.random()*(upperLimit-lowerLimit+1))+lowerLimit);
        if(random%2 !== 0){
            if(random !== upperLimit)
                return random+1;
            else
                return random-1;
        }
        return random;
    }
}


export default Random;