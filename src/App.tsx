import { useEffect, useState } from "react"
import { Table } from "@chakra-ui/react"
import { GetAllTodos } from "@/lib/todo"
import { Todo } from "@/domain/todo"

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const getAllTodos = async () => {
      const todoData =  await GetAllTodos();
      setTodos(todoData);
    }

    getAllTodos();
  }, [])

  return (
    <>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Title</Table.ColumnHeader>
            <Table.ColumnHeader>Done</Table.ColumnHeader>
            <Table.ColumnHeader>CreatedAt</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map((todo) => (
            <Table.Row key={todo.id}>
              <Table.Cell>{todo.title}</Table.Cell>
              <Table.Cell>{todo.done ? "TRUE" : "FALSE"}</Table.Cell>
              <Table.Cell>{todo.created_at}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  )
}

export default App
