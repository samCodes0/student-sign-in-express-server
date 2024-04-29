import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import {mande} from 'mande';

// setting up mande. We are passing the url that we want to use for requests into the mande function
const studentAPI = mande('api/students');

// this is where we define the stores as export variables. We can import these into our different components
// to access their data

// this is the store containing data about the students in our program, as well as functionality add and delete
// students
export const useStudentStore = defineStore('students', () => {
    const sortedStudents = ref([]);

    // the most recent student that was either added or removed from the class
    const mostRecentStudent = ref({});

    const addNewStudentErrors = ref()

    function getAllStudents() {
        // make an api request to get all students and save in store - studentList
        studentAPI.get().then(students => {  // students is the JSON response from the API
            sortedStudents.value = students;
        }).catch(err => {
            console.log(err);
        })
    }

    function addNewStudent(student) {
        // making api call to add a new student
        studentAPI.post(student).then(() => {
            // re-querying the database to sync the studentList with the data from the database
            getAllStudents();
        }).catch(err => {
            addNewStudentErrors.value = err.body;
        })
    }

    function deleteStudent(studentToDelete) {
        // TODO: Make API call
        const deleteStudentAPI = mande('api/students/' + studentToDelete.id);
        deleteStudentAPI.delete().then(() => {
            // re-querying the database to sync the studentList with the data from the database
            getAllStudents();
        }).catch(err => {
            console.log(err);
        })
        mostRecentStudent.value = {}; // resetting most recent student
    }

    function arrivedOrLeft(student) {
        const editStudentAPI = mande('api/students/' + student.id);
        editStudentAPI.patch(student).then(() => {
            // re-querying the database to sync the studentList with the data from the database
            getAllStudents();
        }).catch(err => {
            console.log(err);
        })
    }

    const studentCount = computed(() => {
        return sortedStudents.value.length;
    })

    // const sortedStudents = computed(() => {
    //     return studentList.value.toSorted((s1, s2) => {
    //         return s1.name.localeCompare(s2.name);
    //     })
    // })

    // returning the data we want to use from this component here
    return {
        mostRecentStudent,
        addNewStudentErrors,
        getAllStudents,
        addNewStudent,
        deleteStudent,
        arrivedOrLeft,
        studentCount,
        sortedStudents
    }
})