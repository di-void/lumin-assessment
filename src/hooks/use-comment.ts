import { useState, useEffect } from "react";
import { useLocalStorage } from "./use-local";
import { toast } from "./use-toast";

const defaultFeedback = {
  text: "",
  name: "",
  id: "",
  timeStamp: "",
};

export type Comment = {
  id: string;
  text: string;
  name: string;
  timeStamp: string;
};

export function useComment() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<Comment>(defaultFeedback);
  const [loading, setLoading] = useState({
    isSubmitting: false,
    isFetching: false,
  });
  const { getFromLocalStorage, saveToLocalStorage } = useLocalStorage();

  useEffect(() => {
    async function work() {
      //   get stuff from local storage
      setLoading((old) => ({ ...old, isFetching: true }));
      const comments = await getFromLocalStorage<Comment[]>("comments");

      if (!comments) {
        setLoading((old) => ({ ...old, isFetching: false }));
        return;
      }

      setComments(comments);
      setLoading((old) => ({ ...old, isFetching: false }));
    }

    work();
    //   eslint-disable-next-line
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading((old) => ({ ...old, isSubmitting: true }));

    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // update state first
    const newComment = {
      id: crypto.randomUUID(),
      text: comment.text,
      timeStamp: new Date().toLocaleDateString(),
      name: comment.name,
    };

    setComments((old) => {
      const newComments = [...old, newComment];

      //   save to local last
      saveToLocalStorage("comments", newComments);
      return newComments;
    });

    // feedback complete
    setLoading((old) => ({ ...old, isSubmitting: false }));
    setComment(defaultFeedback);
    toast({
      title: "Feedback submitted",
      description: "Thank you for your feedback!",
    });
  }

  function setState(key: keyof Pick<Comment, "name" | "text">, value: string) {
    setComment((old) => ({ ...old, [key]: value }));
  }

  return { loading, comments, handleSubmit, setState, comment };
}
