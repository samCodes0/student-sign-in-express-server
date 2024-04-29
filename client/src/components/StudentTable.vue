<script setup>
/*
This component is used to display the students and their starID's in a table format.
It also allows the user to delete rows and mark students as present or absent.
 */
import {useStudentStore} from "../stores/StudentStore.js";
import {storeToRefs} from "pinia";
import {computed} from 'vue';
import StudentRow from "./StudentRow.vue";

const studentStore = useStudentStore();

// getting references to the computed values, sortedStudents and studentCount from the student store
const {sortedStudents, studentCount} = storeToRefs(studentStore);

const deleteStudent = (student) => {
  studentStore.deleteStudent(student);
}

const arrivedOrLeft = (student, isStudentPresent) => {
  student.present = isStudentPresent
  studentStore.arrivedOrLeft(student);
}

// used to make sure the studentMessage is displayed with the correct grammar.
// If there is one student in the class it uses 'is' and if there are 0, or more than 1 student
// it uses 'are'
const pluralStudentMessage = computed(() => {
  if (studentCount.value === 1){
    return 'There is 1 student in the class';
  } else {
    return `There are ${studentCount.value} students in the class`;
  }
})
</script>

<template>
  <!-- Much of this code was copied from week-9 student form -->
  <div id="student-list-table" class="card m-2 p-2">
    <h4 class="card-title">Student List</h4>
    <!-- Display the number of students in the student list -->
    <h5 class="card-subtitle text-muted">{{pluralStudentMessage}}</h5>
    <div id="student-table">
      <table class="table">
        <thead>
        <tr>
          <th>Name</th>
          <th>StarID</th>
          <th>Present?</th>
        </tr>
        </thead>

        <tbody>
        <!-- Rendering a StudentRow component for every item in sortedStudents.
         Binding the emits: arrived-or-left and delete-student to appropriate methods within
         this component -->
          <StudentRow
              v-for="student in sortedStudents"
              v-bind:student="student"
              v-on:arrived-or-left="arrivedOrLeft"
              v-on:delete-student="deleteStudent"
          ></StudentRow>
        </tbody>

      </table>
    </div>
  </div>
</template>

<style scoped>
#student-table {
  max-height: 400px;
  overflow: scroll;
}

th, tr {
  width: 25%;
}
</style>