<script setup>
import { onMounted } from "vue";
import NewStudentForm from "./components/NewStudentForm.vue";
import StudentMessage from "./components/StudentMessage.vue";
import StudentTable from "./components/StudentTable.vue";

import { useStudentStore } from "./stores/StudentStore";

const studentStore = useStudentStore();

/*
Extra Credit - Can you write student row and student table so that student row can update the store directly?
Remove props and emit from StudentRow and StudentTable, do everything with the store
You will need a unique property for each student
*/
// the onMounted function gets called when the component is first rendered to the page
onMounted(() => {
  // making a call to getAllStudents. This will load the data from the database into the store
  studentStore.getAllStudents();
})

</script>

<template>
  <!-- laying out all the components on the page -->
  <NewStudentForm></NewStudentForm>
  <StudentTable></StudentTable>
  <StudentMessage></StudentMessage>

</template>

<style scoped>
</style>
