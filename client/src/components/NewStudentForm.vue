<script setup>
/*
This component is used to enter the information for the new student
Much of this code was copied from the week-9 student form
 */
import {ref, watch} from "vue";
import {useStudentStore} from "../stores/StudentStore.js";
import { storeToRefs } from "pinia";
// getting a reference to the student store
const studentStore = useStudentStore();
const newStudentName = ref('');
const newStarID = ref('');

const formErrors = ref([]);

// getting a reference to the addNewStudentErrors from the student store
const {addNewStudentErrors} = storeToRefs(studentStore);

// watch means that every time the addNewStudentErrors changes, it will run the function
watch(addNewStudentErrors, () => {
  // if the addNewStudentErrors is not empty, we will alert the user of the errors
  // we will use the array.join function to turn the array of errors into a string
  if (addNewStudentErrors.value && addNewStudentErrors.value.length > 0) {
    alert(addNewStudentErrors.value.join('\n'));
  }
})

function addStudent() {
  // resetting the form errors
  formErrors.value = [];

  if (newStudentName.value.length === 0) {
    formErrors.value.push('Student name must be entered');
  }

  if (newStarID.value.length === 0) {
    formErrors.value.push('StarID must be entered');
  }

  if (formErrors.value.length === 0) {
    let student = {
      name: newStudentName.value,
      starID: newStarID.value,
      present: false
    }

    studentStore.addNewStudent(student);
    // resetting the field values
    newStudentName.value = "";
    newStarID.value = "";
  }
}
</script>

<template>
  <div id="new-student-form-errors" class="m-2">
    <div v-if="formErrors.length > 0" class="alert alert-danger">
      <li v-for="error in formErrors">
        {{error}}
      </li>
    </div>
  </div>


  <div id="new-student-form" class="card add-student m-2 p-2">
    <h4 class="card-title">Add new student</h4>

    <div class="form-group mb-3">
      <label for="name">Name</label>
      <!-- The v-model.trim makes the input automatically trim anything we type -->
      <input v-model.trim="newStudentName" id="name" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label for="starID">Star ID</label>
      <input v-model.trim="newStarID" id="starID" class="form-control">
    </div>

    <!-- The button for adding a new student -->
    <button v-on:click="addStudent" class="btn btn-primary">Add</button>
  </div>
</template>

<style scoped>

</style>