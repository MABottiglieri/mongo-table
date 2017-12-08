const {mongoose} = require('./../server/db/mongoose'); //seleziona la variabile "mongoose" presente nel file al percorso indicato
const {peopleData} = require('./../server/models/peopleData'); //seleziona la variabile "peopleData" presente nel file al percorso indicato

var id = '59f8a7396b2850f22a96d495';

//array di documenti corrispondenti alla ricerca
peopleData.find({ _id: id })
.then((docs) => {
  if (!docs){ return console.log('documents not found') };
  console.log('peopleData.find \n', docs)
})
.catch((e)=>{console.log(e)});

//documento singolo corrispondente alla ricerca
peopleData.findOne({ _id: id })
.then((doc) => { console.log('peopleData.findOne \n', doc) });

//documento singolo corrispondente alla ricerca tramite ID
peopleData.findById(id)
.then((doc) => { console.log('peopleData.findById \n', doc) });

//conteggio dei documenti
peopleData.count()
.then((number) => { console.log('peopleData.count \n', number) });

//conteggio dei documenti con le caratteristiche indicate
peopleData.count({ _id: id })
.then((number) => { console.log('peopleData.count \n', number) });

//array di documenti con proprietà filtrate alla selezione indicata
peopleData.find({ _id: id })
.select('name password')
.then((doc) => { console.log('peopleData.find.select \n', doc) });
