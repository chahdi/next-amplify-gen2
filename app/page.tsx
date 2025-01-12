// app/page.tsx

import { revalidatePath } from "next/cache";

import { AuthGetCurrentUserServer, cookiesClient } from "@/utils/amplify-utils";
import {TodoCreateForm} from "@/ui-components/index";
import Logout from "@/components/Logout";


async function App() {
  const user = await AuthGetCurrentUserServer();
  const { data: todos } = await cookiesClient.models.Todo.list();

  

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