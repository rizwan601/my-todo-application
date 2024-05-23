"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash, Edit } from 'lucide-react';

interface TodoItem {
  text: string;
  isImportant: boolean;
}

export default function Home() {
  const [Todo, SetTodo] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [Todos, setTodos] = useState<TodoItem[]>([]);
  const [Alert, setAlert] = useState(false);
  const [UpdateAlert, setUpdateAlert] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [updatedText, setUpdatedText] = useState("");

  const addTodo = () => {
    if (Todo.trim() === "") {
      setAlert(true);
      return;
    }
    setTodos([...Todos, { text: Todo, isImportant }]);
    SetTodo("");
    setIsImportant(false);
  };

  const updateTodo = (index: number) => {
    if (updatedText.trim() === "") {
      setAlert(true);
      return;
    }
    const updatedTodos = Todos.map((todo, i) => i === index ? { ...todo, text: updatedText } : todo);
    setTodos(updatedTodos);
    setUpdateAlert(false);
    setUpdatedText("");
  };

  return (
    <main className="flex flex-col justify-center items-center relative min-h-screen p-4">
      <div className="my-8 font-bold text-3xl">
        Todo Application
      </div>
      <form className="flex flex-col w-full max-w-md gap-4">
        <Input
          className="border-2 border-black w-full p-2"
          placeholder="Enter your Todo"
          onChange={(e) => {
            SetTodo(e.target.value);
            setAlert(false); // Reset alert when user starts typing
          }}
          value={Todo}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="important"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          <label htmlFor="important">Mark as Important</label>
        </div>
        <Button
          className="w-full p-2 bg-blue-500 text-white"
          onClick={(e) => {
            e.preventDefault();
            addTodo();
          }}
        >
          Add Todo
        </Button>
      </form>
      <div className="my-5 w-full max-w-md">
        <h1 className="font-bold text-center">My Todos</h1>
        <hr className="border-black" />
        <div className="w-full">
          <ul className="flex flex-col w-full gap-y-2.5 list-disc py-5">
            <h2 className="font-bold text-left">Regular Todos</h2>
            {Todos.filter(todo => !todo.isImportant).map((todo, index) => (
              <li
                className="flex list-disc border border-black/50 justify-between items-center p-1 w-full gap-x-2.5"
                key={index}
              >
                <span>{todo.text}</span>
                <div className="flex gap-2">
                  <Button
                    className="rounded-full text-xs bg-yellow-500 p-1"
                    size="icon"
                    onClick={() => {
                      setUpdateAlert(true);
                      setCurrentIndex(index);
                      setUpdatedText(todo.text);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    className="rounded-full text-xs bg-red-600 p-1"
                    size="icon"
                    onClick={() => {
                      setTodos(Todos.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <ul className="flex flex-col w-full gap-y-2.5 list-disc py-5">
            <h2 className="font-bold text-left">Important Todos</h2>
            {Todos.filter(todo => todo.isImportant).map((todo, index) => (
              <li
                className="flex list-disc border border-black/50 justify-between items-center p-1 w-full gap-x-2.5"
                key={index}
              >
                <span>{todo.text}</span>
                <div className="flex gap-2">
                  <Button
                    className="rounded-full text-xs bg-yellow-500 p-1"
                    size="icon"
                    onClick={() => {
                      setUpdateAlert(true);
                      setCurrentIndex(index);
                      setUpdatedText(todo.text);
                    }}
                  >
                    <Edit />
                  </Button>
                  <Button
                    className="rounded-full text-xs bg-red-600 p-1"
                    size="icon"
                    onClick={() => {
                      setTodos(Todos.filter((_, i) => i !== index));
                    }}
                  >
                    <Trash />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {Alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 rounded shadow-lg ">
            <h2>Input required</h2>
            <p className="text-black-600">Please enter a todo before adding.</p>
            <Button className="mt-4 bg-red-600" onClick={() => setAlert(false)}>Close</Button>
          </div>
        </div>
      )}
      {UpdateAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-4 rounded shadow-lg ">
            <h2>Update Todo</h2>
            <Input
              className="border-2 border-black w-full p-2"
              placeholder="Update your Todo"
              onChange={(e) => setUpdatedText(e.target.value)}
              value={updatedText}
            />
            <Button
              className="mt-4 mr-2 bg-blue-600"
              onClick={() => {
                if (currentIndex !== null) {
                  updateTodo(currentIndex);
                }
              }}
            >
              Update
            </Button>
            <Button className="mt-4 bg-red-600" onClick={() => setUpdateAlert(false)}>Cancel</Button>
          </div>
        </div>
      )}
    </main>
  );
}
