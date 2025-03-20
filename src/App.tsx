import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Check, ChevronRight } from 'lucide-react'
import { supabase } from './lib/supabase'

interface Todo {
  id: string
  text: string
  completed: boolean
  created_at: string
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching todos:', error)
    } else {
      setTodos(data || [])
    }
    setLoading(false)
  }

  const addTodo = async () => {
    if (!inputValue.trim()) return

    const newTodo = {
      text: inputValue,
      completed: false
    }

    const { data, error } = await supabase
      .from('todos')
      .insert([newTodo])
      .select()

    if (error) {
      console.error('Error adding todo:', error)
    } else if (data) {
      setTodos([...todos, data[0]])
      setInputValue('')
    }
  }

  const toggleTodo = async (id: string) => {
    const todo = todos.find(t => t.id === id)
    if (!todo) return

    const { error } = await supabase
      .from('todos')
      .update({ completed: !todo.completed })
      .eq('id', id)

    if (error) {
      console.error('Error updating todo:', error)
    } else {
      setTodos(todos.map(t => 
        t.id === id ? { ...t, completed: !t.completed } : t
      ))
    }
  }

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting todo:', error)
    } else {
      setTodos(todos.filter(t => t.id !== id))
    }
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-surface-100/50 p-8">
          {/* Rest of the UI remains the same */}
        </div>
      </div>
    </div>
  )
}

export default App
