class Statistics{
  private i: number;
    constructor(person){
        this.person = person
    }

    split(data){
        //sépare les différents types de données dans différentes variables de type list
    }

    lastWeek(data){
        //récupère les données, isole celles de la dernière semaine, et les sépare dans différentes variables de type list
    }

    mean(array){
        //Retourne la moyenne d'un ensemble
        const average = array => array.reduce((a,b) => a+b)/array.length;
        return(average)
    }

    trend(array){
        // Retourne la moyenne des dérivées d'un ensemble
        const mod = new array(array.length-1)
        for (this.i = 0 ; i<array.length-1; i++){
            mod[i] = array[i+1]-array[i]
        }
        return this.mean(mod)
    }

    setData(){
        //Renvoie une list contenant les évolutions moyennes des données, pour permettre d'afficher l'évolution
        //des données dans l'interface, et de faire un code couleur premettant d'indiquer si l'utilisateur se rapproche de ses objectifs
        let pdata = person.physiologicaldata
        return(his.trend(this.lastWeek(pdata)))
    }
}
