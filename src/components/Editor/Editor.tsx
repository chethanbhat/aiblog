import { Link } from "react-router-dom";
import { Topic } from "../../types";
import { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from "react";

const Editor = ({ topic }: { topic: Topic | null }) => {
  const [article, setArticle] = useState("");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Undo the last change
  const undo = () => {
    if (undoStack.length > 0) {
      const lastText = undoStack.pop();
      setArticle(lastText || "");

      if (lastText) {
        const newTextAreaValue = textareaRef.current?.value.replace(
          lastText,
          ""
        );
        textareaRef.current!.value = newTextAreaValue || "";
      }
    }
  };

  useKeyboardShortcut("z", undo);

  // Update undo stack when article changes
  useEffect(() => {
    setUndoStack((prevState) => [...prevState, article]);
  }, [article]);

  // Handle text input
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    const lastChange = undoStack[undoStack.length - 1];

    if (lastChange && newValue.endsWith(lastChange)) {
      // If the new value ends with the last change, update the last change in the stack
      setUndoStack((prevState) => {
        const updatedStack = [...prevState];
        updatedStack[updatedStack.length - 1] =
          lastChange + newValue.substring(lastChange.length);
        return updatedStack;
      });
    } else {
      // Otherwise, add the new change to the stack
      setUndoStack((prevState) => [...prevState, newValue]);
    }

    setArticle(newValue);
  };

  if (!topic) {
    return <></>;
  }
  return (
    <div className="w-full h-full">
      <div className="flex justify-between">
        <h1 className="font-medium mb-8 text-gray-500">
          Write / Generate Blog
        </h1>
        <Link to="/">Back</Link>
      </div>

      <h2 className="text-2xl text-gray-600 font-semibold mb-4">
        {topic.title}
      </h2>
      <h5 className="text-sm mb-4">
        Category:{" "}
        <span className="font-semibold">{topic.category.category}</span>
      </h5>
      <div className="flex gap-2 mb-4">
        {topic.keywords.map((k) => (
          <span className="border border-purple-700 text-purple-900 rounded-md px-1.5 py-1 cursor-pointer text-xs">
            {k.keyword}
          </span>
        ))}
      </div>
      <div>
        <textarea
          className="w-full h-[250px] overflow-y-auto rounded-md border border-gray-200 p-4"
          value={article}
          ref={textareaRef}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default Editor;

const useKeyboardShortcut = (targetKey: string, callback: () => void) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === targetKey && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        savedCallback.current?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown as any);

    return () => {
      document.removeEventListener("keydown", handleKeyDown as any);
    };
  }, [targetKey]);
};
