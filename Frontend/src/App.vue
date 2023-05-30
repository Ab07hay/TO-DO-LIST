<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import card from './components/card.vue'
import { onMounted, ref } from 'vue'
import { useToast } from 'vue-toastification'

import axios from 'axios'
const toast = useToast()
const addtodo = ref()
const todoList = ref([])
const url = 'http://localhost:8000/api'
const add = (task: any) => {
  addtodo.value = ''
  try {
    if (task.trim()) {
      axios
        .post(`${url}/todo/create`, {
          task: task,
          author: 'Abhay M'
        })
        .then((response: any) => {
          todoList.value = response.data
          toast.success('To-do successfully added', {
            timeout: 2000
          })
          getTodoList()
        })
        .catch((e: any) => {
          toast.error('Something went wrong', {
            timeout: 2000
          })
        })
    } else {
      toast.warning('TO-DO should not be empty', {
        timeout: 2000
      })
    }
  } catch (error) {
    toast.warning('Something went wrong', {
      timeout: 2000
    })
  }
}
const edit = (payload: any) => {
  console.log(payload)
  try {
    if (payload.task.trim()) {
      axios
        .patch(`${url}/todo/${payload.id}`, {
          task: payload.task,
          author: 'Abhay M'
        })
        .then((response: any) => {
          todoList.value = response.data
          toast.success('Updated Successfully', {
            timeout: 2000
          })
          getTodoList()
        })
    } else {
      toast.warning('TO-DO should not be empty', {
        timeout: 2000
      })
    }
  } catch (error) {
    toast.warning('Something went wrong', {
      timeout: 2000
    })
  }
}
const getTodoList = () => {
  axios.get(`${url}/todos`).then((response: any) => {
    todoList.value = response.data
  })
}

const deleteTodo = (id: string) => {
  axios.delete(`${url}/todo/${id}`).then((response: any) => {
    todoList.value = response.data
    toast.success('Deleted Successfully', {
      timeout: 2000
    })
    getTodoList()
  })
}
onMounted(() => {
  getTodoList()
})
</script>

<template>
  <nav-bar></nav-bar>
  <div class="mockup-window border justify-center border-base-300 flex">
    <div class="flex justify-center gap-5 flex-col px-4 py-16 border-t border-base-300">
      <div class="inline-flex sticky">
        <input
          type="text"
          maxlength="80"
          v-model="addtodo"
          placeholder="Enter to-do"
          class="input input-bordered input-success w-full max-w-xs"
        />
        <button class="btn btn-outline btn-info" @click="add(addtodo)">ADD</button>
      </div>
      <h1 class="card-title">The TO-DO's</h1>
      <div class="m-1 inline-block" v-for="todo in todoList" :key="todo">
        <card :todoList="todo" @editbyId="edit" @deletebyId="deleteTodo"></card>
      </div>
    </div>
  </div>
</template>
