export const rr = (arrivalTime, burstTime, timeQuantum) => {
    const processesInfo = arrivalTime
        .map((item, index) => {
            return {
                name: `P${index+1}`,
                job: (index + 10).toString(36).toUpperCase(),
                at: item,
                bt: burstTime[index],
            }
        })
        .sort((obj1, obj2) => {
            if (obj1.at > obj2.at) return 1
            if (obj1.at < obj2.at) return -1
            return 0
        })

    const solvedProcessesInfo = []
    const ganttChartInfo = []

    const readyQueue = []
    let currentTime = processesInfo[0].at
    const unfinishedJobs = [...processesInfo]

    const remainingTime = processesInfo.reduce((acc, process) => {
        acc[process.job] = process.bt
        return acc
    }, {})

  readyQueue.push(unfinishedJobs[0])

    while (
        Object.values(remainingTime).reduce((acc, cur) => {
        return acc + cur
        }, 0) &&
        unfinishedJobs.length > 0
    ) {
        if (readyQueue.length === 0 && unfinishedJobs.length > 0) {
            readyQueue.push(unfinishedJobs[0])
            currentTime = readyQueue[0].at
        }

        const processToExecute = readyQueue[0]

        console.log("ready queue length: " + readyQueue.length)
        console.log("unfinishedJobs queue length: " + unfinishedJobs.length)

        if(readyQueue.length == 1 && unfinishedJobs.length == 1) {
            console.log("GO")
            console.log(processToExecute)
            const prevCurrentTime = currentTime
            currentTime += (processToExecute.bt - timeQuantum)
            console.log(currentTime )
            ganttChartInfo.push({
                name: processToExecute.name,
                job: processToExecute.job,
                start: prevCurrentTime,
                stop: currentTime,
            })
            solvedProcessesInfo.push({
                ...processToExecute,
                ft: prevCurrentTime + (processToExecute.bt - timeQuantum),
                tat: currentTime - processToExecute.at,
                wat: currentTime - processToExecute.at - processToExecute.bt,
            })
            break;
        }

        if (remainingTime[processToExecute.job] <= timeQuantum) {
            const remainingT = remainingTime[processToExecute.job]
            remainingTime[processToExecute.job] -= remainingT
            const prevCurrentTime = currentTime
            currentTime += remainingT

            ganttChartInfo.push({
                name: processToExecute.name,
                job: processToExecute.job,
                start: prevCurrentTime,
                stop: currentTime,
            })
        } else {
            remainingTime[processToExecute.job] -= timeQuantum
            const prevCurrentTime = currentTime
            currentTime += timeQuantum

            ganttChartInfo.push({
                name: processToExecute.name,
                job: processToExecute.job,
                start: prevCurrentTime,
                stop: currentTime,
            })
        }

        const processToArriveInThisCycle = processesInfo.filter((p) => {
            return (
                p.at <= currentTime &&
                p !== processToExecute &&
                !readyQueue.includes(p) &&
                unfinishedJobs.includes(p)
            )
        })

    readyQueue.push(...processToArriveInThisCycle)
    readyQueue.push(readyQueue.shift())

    if (remainingTime[processToExecute.job] === 0) {
      const indexToRemoveUJ = unfinishedJobs.indexOf(processToExecute)
      if (indexToRemoveUJ > -1) {
        unfinishedJobs.splice(indexToRemoveUJ, 1)
      }

      const indexToRemoveRQ = readyQueue.indexOf(processToExecute)
      if (indexToRemoveRQ > -1) {
        readyQueue.splice(indexToRemoveRQ, 1)
      }

      solvedProcessesInfo.push({
        ...processToExecute,
        ft: currentTime,
        tat: currentTime - processToExecute.at,
        wat: currentTime - processToExecute.at - processToExecute.bt,
      })
    }
  }

    solvedProcessesInfo.sort((obj1, obj2) => {
            if (obj1.at > obj2.at) return 1
            if (obj1.at < obj2.at) return -1
            if (obj1.job > obj2.job) return 1
            if (obj1.job < obj2.job) return -1
            return 0
    })

    return { solvedProcessesInfo, ganttChartInfo }
}