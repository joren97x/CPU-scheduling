<script setup>

    import {ref} from 'vue'

    const showOutput = ref(false)

</script>
<template>
    <div class="bg-grey-lighten-4" style="height: 100vh;">
        <v-container>
            <v-row class="mt-6">
                <v-col cols="4">
                    <v-card>
                        <v-card-item>
                            <p class="text-h4 my-3 font-weight-bold">Input</p>
                            <v-select variant="outlined" color="blue" :items="['First Come First Serve']" label="Algorithm"></v-select>
                            <v-text-field variant="outlined" color="blue" label="Arrival Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                            <v-text-field variant="outlined" color="blue" label="Burst Times" placeholder="eg. 0 2 4 5 6"></v-text-field>
                        </v-card-item>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue" variant="flat" @click="showOutput = !showOutput">Solve</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
                <v-col cols="8">
                    <v-card>
                        <v-card-item>
                            <p class="text-h4 my-3 font-weight-bold">Output</p>
                            <p v-show="!showOutput">Gantt chart and table will be shown here</p>
                            <!-- <div class="d-flex align-center flex-column">
                                <strong class="text-h6">Gantt chart</strong>
                                <v-btn-toggle variant="outlined" divided class="bg-blue">
                                    <v-btn>P1 </v-btn>
                                    <v-btn>P2</v-btn>
                                    <v-btn>P3</v-btn>
                                    <v-btn>P4</v-btn>
                                </v-btn-toggle>
                            </div> -->
                            <div v-if="showOutput">
                                <p class="text-h6 text-center">Gantt chart</p>
                                <div class="d-flex align-center justify-center mb-8">
                                    <div class="position-relative">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">P1</div>
                                        <span class="number">1</span>
                                    </div>
                                    <div class="position-relative">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">P2</div>
                                        <span class="number">2</span>
                                    </div>
                                    <div class="position-relative">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">P3</div>
                                        <span class="number">3</span>
                                    </div>
                                    <div class="position-relative">
                                        <div class="pa-3 bg-blue-lighten-4 gantt-box">P4</div>
                                        <span class="last_number">5</span>
                                        <span class="number">4</span>
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
                                        <tr v-for="n in 4" :key="n">
                                            <td>P{{n}}</td>
                                            <td>{{n}}</td>
                                            <td>{{ n * 2 }}</td>
                                            <td>7</td>
                                            <td>2</td>
                                            <td>4</td>
                                        </tr>
                                        
                                        <tr>
                                            <td colspan="3" class="text-end">Average</td>
                                            <td>10</td>
                                            <td>9</td>
                                            <td>8</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </div>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<style scoped>
 .position-relative {
    position: relative;
}

.number {
    position: absolute;
    bottom: -30px; /* Adjust this value to change the distance from the bottom */
    left: -11px; 
    padding: 3px 8px;
    border-radius: 4px;
}

.last_number {
    position: absolute;
    bottom: -30px; /* Adjust this value to change the distance from the bottom */
    right: -11px; 
    padding: 3px 8px;
    border-radius: 4px;
}

.gantt-box {
    border: 1px solid skyblue;
}


</style>