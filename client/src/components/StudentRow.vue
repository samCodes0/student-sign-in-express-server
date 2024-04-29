<script setup>
// this component is used to represent one single student in the list of students
// it communicates with its parent 'StudentTable' using emits
import {ref} from 'vue';

const props = defineProps({
  student: Object
})

const emit = defineEmits([
    'arrived-or-left',
    'delete-student'
])

const isStudentPresent = ref(props.student.present);

const notifyArrivedOrLeft = () => {
  // tell the parent that the student has arrived or left
  emit('arrived-or-left', props.student, isStudentPresent.value);
}

const confirmThenDeleteStudent = () => {
  emit('delete-student', props.student);
}
</script>

<template>
  <tr class="align-middle" v-bind:class="{present: student.present, absent: !student.present}">

    <td>{{student.name}}</td>
    <td>{{student.starID}}</td>
    <td>
      <input type="checkbox" v-model="isStudentPresent" v-on:change="notifyArrivedOrLeft">
      <!-- Showing a span saying "Here!" if the student is present
       Showing a span saying "Not present" if the student is not present-->
      <span v-if="student.present" class="mx-3">Here!</span>
      <span v-else class="mx-3">Not present</span>
    </td>
    <td>
      <button class="btn btn-danger" v-on:click="confirmThenDeleteStudent">
        <!-- This is how you can show a bootstrap icon
         put the name of the icon in the class attribute -->
        <i class="bi bi-trash-fill"></i> Delete
      </button>
    </td>
  </tr>
</template>

<style scoped>
.present {
  color: grey;
  font-style: italic;
}

.absent {
  color: black;
  font-weight: bold;
}
</style>