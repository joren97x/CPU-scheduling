export const fcfs = (arrivalTime, burstTime) => {
    var processesInfo = arrivalTime.map(function (item, index) {
        return {
            name: `P${index+1}`,
            job: (index + 10).toString(36).toUpperCase(),
            at: item,
            bt: burstTime[index],
        }
    }).sort(function (obj1, obj2) {
        if (obj1.at > obj2.at) {
            return 1
        }
        if (obj1.at < obj2.at) {
            return -1
        }
        return 0
    })
  
    var finishTime = []
    var ganttChartInfo = []
  
    var solvedProcessesInfo = processesInfo.map(function (process, index) {
        if (index === 0 || process.at > finishTime[index - 1]) {
            finishTime[index] = process.at + process.bt
    
            ganttChartInfo.push({
                name: process.name,
                job: process.job,
                start: process.at,
                stop: finishTime[index],
            })
        } 
        else {
            finishTime[index] = finishTime[index - 1] + process.bt
            ganttChartInfo.push({
                name: process.name,
                job: process.job,
                start: finishTime[index - 1],
                stop: finishTime[index],
            })
        }
  
        return {
            name: process.name,
            job: process.job,
            at: process.at,
            bt: process.bt,
            ct: finishTime[index],
            tat: finishTime[index] - process.at,
            wt: finishTime[index] - process.at - process.bt,
        }
    })

    ganttChartInfo.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })

    solvedProcessesInfo.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });

    solvedProcessesInfo.forEach((process, i) => {
        console.log(ganttChartInfo[i].start + " - " + process.at);
            process.rt = ganttChartInfo[i].start - process.at
            console.log(process)
            console.log(i)
    })

    const averageCt = solvedProcessesInfo.reduce((acc, val) => acc + val.ct, 0) / arrivalTime.length
    const averageTat = solvedProcessesInfo.reduce((acc, val) => acc + val.tat, 0) / arrivalTime.length
    const averageWt = solvedProcessesInfo.reduce((acc, val) => acc + val.wt, 0) / arrivalTime.length
    const averageRt = solvedProcessesInfo.reduce((acc, val) => acc + val.rt, 0) / arrivalTime.length
  
    return { solvedProcessesInfo, ganttChartInfo, averageCt, averageTat, averageWt, averageRt }
  }
  