export const fcfs = (arrivalTime, burstTime) => {
    var processesInfo = arrivalTime.map(function (item, index) {
      return {
        job: (index + 10).toString(36).toUpperCase(),
        at: item,
        bt: burstTime[index],
      };
    }).sort(function (obj1, obj2) {
      if (obj1.at > obj2.at) {
        return 1;
      }
      if (obj1.at < obj2.at) {
        return -1;
      }
      return 0;
    });
  
    var finishTime = [];
    var ganttChartInfo = [];
  
    var solvedProcessesInfo = processesInfo.map(function (process, index) {
      if (index === 0 || process.at > finishTime[index - 1]) {
        finishTime[index] = process.at + process.bt;
  
        ganttChartInfo.push({
          job: process.job,
          start: process.at,
          stop: finishTime[index],
        });
      } else {
        finishTime[index] = finishTime[index - 1] + process.bt;
  
        ganttChartInfo.push({
          job: process.job,
          start: finishTime[index - 1],
          stop: finishTime[index],
        });
      }
  
      return {
        job: process.job,
        at: process.at,
        bt: process.bt,
        ft: finishTime[index],
        tat: finishTime[index] - process.at,
        wat: finishTime[index] - process.at - process.bt,
      };
    });
  
    return { solvedProcessesInfo: solvedProcessesInfo, ganttChartInfo: ganttChartInfo };
  }
  