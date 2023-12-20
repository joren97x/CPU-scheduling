export const sjf = (arrivalTime, burstTime) => {
    var processesInfo = arrivalTime.map(function (item, index) {
      return {
        job: (index + 10).toString(36).toUpperCase(),
        at: item,
        bt: burstTime[index],
      };
    }).sort(function (obj1, obj2) {
      if (obj1.at > obj2.at) return 1;
      if (obj1.at < obj2.at) return -1;
      if (obj1.bt > obj2.bt) return 1;
      if (obj1.bt < obj2.bt) return -1;
      return 0;
    });
  
    var finishTime = [];
    var ganttChartInfo = [];
    var solvedProcessesInfo = [];
    var readyQueue = [];
    var finishedJobs = [];
  
    for (var i = 0; i < processesInfo.length; i++) {
      if (i === 0) {
        readyQueue.push(processesInfo[0]);
        finishTime.push(processesInfo[0].at + processesInfo[0].bt);
        solvedProcessesInfo.push(Object.assign({}, processesInfo[0], {
          ft: finishTime[0],
          tat: finishTime[0] - processesInfo[0].at,
          wat: finishTime[0] - processesInfo[0].at - processesInfo[0].bt
        }));
  
        processesInfo.forEach(function (p) {
          if (p.at <= finishTime[0] && !readyQueue.includes(p)) {
            readyQueue.push(p);
          }
        });
  
        readyQueue.shift();
        finishedJobs.push(processesInfo[0]);
  
        ganttChartInfo.push({
          job: processesInfo[0].job,
          start: processesInfo[0].at,
          stop: finishTime[0]
        });
      } else {
        if (readyQueue.length === 0 && finishedJobs.length !== processesInfo.length) {
          var unfinishedJobs = processesInfo.filter(function (p) {
            return !finishedJobs.includes(p);
          }).sort(function (a, b) {
            if (a.at > b.at) return 1;
            if (a.at < b.at) return -1;
            if (a.bt > b.bt) return 1;
            if (a.bt < a.bt) return -1;
            return 0;
          });
          readyQueue.push(unfinishedJobs[0]);
        }
  
        var rqSortedByBT = readyQueue.slice().sort(function (a, b) {
          if (a.bt > b.bt) return 1;
          if (a.bt < b.bt) return -1;
          if (a.at > b.at) return 1;
          if (a.at < b.at) return -1;
          return 0;
        });
  
        var processToExecute = rqSortedByBT[0];
  
        var previousFinishTime = finishTime[finishTime.length - 1];
  
        if (processToExecute.at > previousFinishTime) {
          finishTime.push(processToExecute.at + processToExecute.bt);
          var newestFinishTime = finishTime[finishTime.length - 1];
          ganttChartInfo.push({
            job: processToExecute.job,
            start: processToExecute.at,
            stop: newestFinishTime
          });
        } else {
          finishTime.push(previousFinishTime + processToExecute.bt);
          var newestFinishTime = finishTime[finishTime.length - 1];
          ganttChartInfo.push({
            job: processToExecute.job,
            start: previousFinishTime,
            stop: newestFinishTime
          });
        }
  
        var newestFinishTime = finishTime[finishTime.length - 1];
  
        solvedProcessesInfo.push(Object.assign({}, processToExecute, {
          ft: newestFinishTime,
          tat: newestFinishTime - processToExecute.at,
          wat: newestFinishTime - processToExecute.at - processToExecute.bt
        }));
  
        processesInfo.forEach(function (p) {
          if (p.at <= newestFinishTime && !readyQueue.includes(p) && !finishedJobs.includes(p)) {
            readyQueue.push(p);
          }
        });
  
        var indexToRemove = readyQueue.indexOf(processToExecute);
        if (indexToRemove > -1) {
          readyQueue.splice(indexToRemove, 1);
        }
  
        finishedJobs.push(processToExecute);
      }
    }
  
    // Sort the processes by job name within arrival time
    solvedProcessesInfo.sort(function (obj1, obj2) {
      if (obj1.at > obj2.at) return 1;
      if (obj1.at < obj2.at) return -1;
      if (obj1.job > obj2.job) return 1;
      if (obj1.job < obj2.job) return -1;
      return 0;
    });
  
    return {
      solvedProcessesInfo: solvedProcessesInfo,
      ganttChartInfo: ganttChartInfo
    };
  }
  