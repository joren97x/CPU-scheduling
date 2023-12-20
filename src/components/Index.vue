<script setup>

    import {rr} from './algorithm/rr.js'

// Example data
const arrivalTime = [0, 4, 1, 4, 8]
const burstTime = [8, 10, 5, 3, 2]
const timeQuantum = 3

// Call the rr function
const result = rr(arrivalTime, burstTime, timeQuantum)

// Display the results
console.log("Solved Processes Information:")
console.log(result.solvedProcessesInfo)
console.log("\nGantt Chart Information:")
console.log(result.ganttChartInfo)

  

</script>
<template>
    <div class="bg-grey-lighten-4" style="height: 100vh;">
        <v-container>
            <v-row class="mt-6">
                <v-col cols="12" md="12" sm="12" xs="12" lg="4" xl="8" xxl="8">
                    <v-card>
                        <v-card-item>
                            <p class="text-h4 my-3 font-weight-bold">Input</p>
                            <v-select density="comfortable" variant="outlined" color="blue" :items="algorithms" item-title="name" v-model="algorithm" label="Algorithm">
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props" :disabled="item.raw.disabled" :title="item.raw.name"></v-list-item>
                                </template>
                            </v-select>
                            <v-text-field clearable density="comfortable" variant="outlined" color="blue" v-model="arrivalTimes" label="Arrival Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                            <v-text-field clearable density="comfortable" variant="outlined" color="blue" v-model="burstTimes" label="Burst Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                        </v-card-item>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue" v-if="showSolveButton" variant="flat" @click="solveFCFS">Solve</v-btn>
                            <v-btn color="blue" v-if="showSolveButton" variant="flat" @click="solveSJF">SolveSJF</v-btn>
                            <v-btn color="red" v-else variant="flat" @click="reset">Reset</v-btn>
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
                                    <div class="position-relative" v-for="(process, i) in processes" :key="process.process_name">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">{{ process.process_name }}</div>
                                        <span class="number">{{ ganttChartTimes[i] }}</span>
                                        <span class="last_number" v-if="i == processes.length-1">{{ ganttChartTimes[processes.length] }}</span>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <tr v-for="process in processes" :key="process.process_name">
                                            <td>{{process.process_name}}</td>
                                            <td>{{process.arrival_time}}</td>
                                            <td>{{process.burst_time }}</td>
                                            <td>{{ process.completion_time }}</td>
                                            <td>{{ process.turn_around_time }}</td>
                                            <td>{{ process.waiting_time }}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td>{{averageCompletionTime.toFixed(3)}}</td>
                                            <td>{{averageTurnAroundTime.toFixed(3)}}</td>
                                            <td>{{averageWaitingTime.toFixed(3)}}</td>
                                        </tr> -->
                                        <tr v-for="process in processes" :key="process.process_name">
                                            <td>{{ process.process_name }}</td>
                                            <td>{{process.arrival_time}}</td>
                                            <td>{{process.burst_time}}</td>
                                            <td>{{n}}</td>
                                            <td>{{n}}</td>
                                            <td>{{n}}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td>h</td>
                                            <td>h</td>
                                            <td>h</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                                <v-table border hover>
                                    <thead>
                                        <tr>
                                            <th> Process </th>
                                            <th> Arrival Time </th>
                                            <th> Burst Time </th>
                                            <th> Completion Time</th>
                                            <th> Turnaround Time</th>
                                            <th> Waiting Time </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- <tr v-for="process in processes" :key="process.process_name">
                                            <td>{{process.process_name}}</td>
                                            <td>{{process.arrival_time}}</td>
                                            <td>{{process.burst_time }}</td>
                                            <td>{{ process.completion_time }}</td>
                                            <td>{{ process.turn_around_time }}</td>
                                            <td>{{ process.waiting_time }}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td>{{averageCompletionTime.toFixed(3)}}</td>
                                            <td>{{averageTurnAroundTime.toFixed(3)}}</td>
                                            <td>{{averageWaitingTime.toFixed(3)}}</td>
                                        </tr> -->
                                        <tr v-for="process in sortedProcessesSJF" :key="process.process_name">
                                            <td>{{ process.process_name }}</td>
                                            <td>{{process.arrival_time}}</td>
                                            <td>{{process.burst_time}}</td>
                                            <td>{{n}}</td>
                                            <td>{{n}}</td>
                                            <td>{{n}}</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td>h</td>
                                            <td>h</td>
                                            <td>h</td>
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
                    <v-icon color="red" size="100">mdi-close-circle</v-icon>
                    <br>
                    <p class="text-h4 text-red">Invalid input</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="inputError = false">AWW IKAW GUD</v-btn>
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