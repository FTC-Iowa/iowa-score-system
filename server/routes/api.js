var express = require('express');
var fs = require('fs')

const { exec } = require('child_process');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/teamlist', (req, res, next) => {

})

router.get('/event', (req, res, next) => {
  // console.log('req:', req)
  let id = req.query.id
  let file = fs.readFileSync('event_'+id+'.json')
  let eventData = JSON.parse(file)
  res.status(200).send(JSON.stringify(eventData))
})

router.post('/event', (req, res, next) => {
  console.log('post')
  var name = "event_" + req.body.id + ".json";
  fs.writeFileSync(name,JSON.stringify(req.body))
  res.status(200).send('Saved')
})

router.get('/event/list', (req, res, next) => {
  console.log('load event list');
  var files = fs.readdirSync(".");
  var eventList = [];
  files.forEach(file => {
    if(file.startsWith("event_")) {
      console.log('length:', file.length)
      var id = file.slice(6, file.length - 5)
      var event = {
        id: id,
        name: id.replace(/_/g, " ")
      };
      eventList.push(event)
    }
  })
  res.status(200).send(JSON.stringify(eventList))
})

router.get('/matchlist/generate', (req, res, next) => {
  res.send('match list...')
  // read team list
})

module.exports = router;



// generateMatchList(arg, event) {
//   var {teams, rounds, returnChannel} = arg;
//   logger.log('Starting to generate match list...')
//   //wine ./src/MatchMaker/MatchMaker.exe  -a 2 -t 12 -r 5 -o -s
//   // "./src/MatchMaker/run.sh"
//   exec('wine ./src/MatchMaker/MatchMaker.exe  -a 2 -t ' + teams + ' -r ' + rounds + ' -o -s', {shell: true}, (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command
//       console.log(JSON.stringify(err))
//       logger.error(JSON.stringify(err))
//       return;
//     }

//     // ipcMain.send(returnChannel, stdout)
//     if(arg.returnChannel) {
//       event.sender.send(arg.returnChannel, stdout)
//     }
  
//     // the *entire* stdout and stderr (buffered)
//     logger.log(`stdout: ${stdout}`);
//     logger.warn(`stderr: ${stderr}`);
//     return stdout;
//   });
//   logger.log('Finished generating match list')
// }

