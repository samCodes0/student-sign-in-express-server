<script setup>
// this component is used to show a message after a student is set to present or absent from the class
// it makes use of mostRecentStudent from studentStore to do this. It chooses a different message depending on
// weather or not the mostRecentStudent is present or absent.
import {useStudentStore} from "../stores/StudentStore.js";
import {storeToRefs} from "pinia";
const studentStore = useStudentStore();
const {mostRecentStudent} = storeToRefs(studentStore);

</script>

<template>
  <div id="welcome-or-goodbye-message" class="m-2">

    <div v-if="mostRecentStudent.name">
      <div v-if="mostRecentStudent.present" class="alert alert-success">
        Welcome {{mostRecentStudent.name}}!
      </div>
      <div v-else class="alert alert-info">
        Goodbye {{mostRecentStudent.name}}, see you later.
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>