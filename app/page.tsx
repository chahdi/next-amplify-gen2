// app/page.tsx

import { revalidatePath } from "next/cache";

import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";
import {TodoCreateForm} from "@/ui-components/index";
import Logout from "@/components/Logout";
import { ThemeProvider } from "@aws-amplify/ui-react";

async function App() {
  const user = await AuthGetCurrentUserServer();
  const { data: todos } = await cookiesClient.models.Todo.list();

  async function addTodo(data: FormData) {
    "use server";
    const title = data.get("title") as string;
    await cookiesClient.models.Todo.create({
      content: title,
      done: false,
      priority: "medium",
    });
    revalidatePath("/");
  }

  return (
    <>
    <h1>Hello, Amplify 👋</h1>
      {user && <Logout />}
      <TodoCreateForm />
      <ul>
        {todos && todos.map((todo) => <li key={todo.id}>{todo.content}</li>)}
      </ul>
    </>
  );
}

export default App;