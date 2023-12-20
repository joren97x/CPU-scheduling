<script setup>

    import {rr} from './algorithm/rr.js'
    import {fcfs} from './algorithm/fcfs.js'
    import {ref} from 'vue'

    // Example data
    const arrivalTime = ref([])
    const burstTime = ref([])
    const timeQuantum = ref(null)
    // const result = rr(arrivalTime, burstTime, timeQuantum)
    const result = ref(null)
    console.log(result)
    const showSolveButton = ref(true)
    const quantumTime = ref('')
    const showOutput = ref(false)
    const inputError = ref(false)
    const inputArrivalTime = ref('')
    const inputBurstTime = ref('')
    const algo = ref('')
    const algorithms = [
        'Round robin',
        'First come first serve'
    ]

    function solve() {

        // showOutput.value = true

        arrivalTime.value = inputArrivalTime.value.split(/\s+/).map(Number).filter(Number);
        burstTime.value = inputBurstTime.value.split(/\s+/).map(Number).filter(Number);

        if(algo.value == 'First come first serve') {
            // let x = [0, 4, 1, 4, 8]
            // let y = [8, 10, 5, 3, 2]
            result.value = fcfs(arrivalTime.value, burstTime.value)
            console.log(result.value)
            showOutput.value = true
        }
        if(algo.value == 'Round robin') {
            console.log("HERE!!")
            console.log(parseInt(timeQuantum.value))
            result.value = rr(arrivalTime.value, burstTime.value, parseInt(timeQuantum.value))
            showOutput.value = true
        }
    }

    // Display the results
    // console.log("Solved Processes Information:")
    // console.log(result.solvedProcessesInfo)


    // console.log("\nGantt Chart Information:")
    // console.log(result.ganttChartInfo)
        

</script>
<template>
    <div class="bg-grey-lighten-4" style="height: 100vh;">
        <v-container>
            <v-row class="mt-6">
                <v-col cols="12" md="12" sm="12" xs="12" lg="4" xl="8" xxl="8">
                    <v-card>
                        <v-card-item>
                            <p class="text-h4 my-3 font-weight-bold">Input</p>
                            <v-select density="comfortable" v-model="algo" variant="outlined" color="blue" :items="algorithms" item-title="name" label="Algorithm">
                            </v-select>
                            <v-text-field clearable density="comfortable" variant="outlined" color="blue" v-model="inputArrivalTime" label="Arrival Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                            <v-text-field clearable density="comfortable" variant="outlined" color="blue" v-model="inputBurstTime" label="Burst Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                            <v-text-field clearable density="comfortable" variant="outlined" color="blue" type="number" v-if="algo == 'Round robin'" v-model="timeQuantum" label="Quantum time" placeholder="eg. 3"></v-text-field>
                        </v-card-item>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue"  variant="flat" @click="solve">Solve</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="12" md="12" sm="12" xs="12" lg="8" xxl="8" xl="8">
                    <v-card>
                        <v-card-item>
                            <p class="text-h4 my-3 font-weight-bold">Output</p>
                            <p v-show="!showOutput">Gantt chart and table will be shown here</p>
                            <div v-if="showOutput">
                                <p class="text-h6 text-center">Gantt chart</p>
                                <div class="d-flex align-center justify-center mb-8">
                                    <div class="position-relative" v-for="(process, index) in result.ganttChartInfo" :key="process.name">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">{{ process.name }}</div>
                                        <span class="number">{{ process.start }}</span>
                                        <span class="last_number" v-if="index == result.ganttChartInfo.length - 1">{{ process.stop }}</span>
                                    </div>
                                </div>
                                
                                <v-table border hover>
                                    <thead>
                                        <tr>
                                            <th> Process </th>
                                            <th> Arrival Time </th>
                                            <th> Burst Time </th>
                                            <th> Completion Time</th>
                                            <th> Turnaround Time</th>
                                            <th> Waiting Time </th>
                                            <th> Response Time </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="process in result.solvedProcessesInfo" :key="process.name">
                                            <td>{{ process.name }}</td>
                                            <td>{{ process.at }}</td>
                                            <td>{{ process.bt }}</td>
                                            <td>{{ process.ct }}</td>
                                            <td>{{ process.tat }}</td>
                                            <td>{{ process.wt }}</td>
                                            <td>{{ process.rt }}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td> {{ result.averageCt + " ms" }} </td>
                                            <td> {{ result.averageTat + " ms" }} </td>
                                            <td> {{ result.averageWt + " ms" }} </td>
                                            <td> {{ result.averageRt + " ms" }} </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <v-dialog v-model="inputError" width="50vw">
            <v-card>
                <v-card-text class="text-center">
                    <v-icon color="red" size="69">mdi-close-circle</v-icon>
                    <br>
                    <p class="text-h4 text-red">Invalid input</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" block @click="inputError = false">Okayy</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
 .position-relative {
    position: relative;
}

.number {
    position: absolute;
    bottom: -30px; 
    left: -11px; 
    padding: 3px 8px;
    border-radius: 4px;
}

.last_number {
    position: absolute;
    bottom: -30px;
    right: -15px; 
    padding: 3px 8px;
    border-radius: 4px;
}

.gantt-box {
    border: 1px solid skyblue;
}


</style>