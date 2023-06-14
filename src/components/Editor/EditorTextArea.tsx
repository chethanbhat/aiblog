import { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from "react";

const EditorTextArea = ({
  article,
  setArticle,
}: {
  article: string;
  setArticle: (a: string) => void;
}) => {
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Update undo stack when article changes
  useEffect(() => {
    setUndoStack((prevState) => [...prevState, article]);
  }, [article]);

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

  useKeyboardShortcut("z", undo);

  return (
    <textarea
      className="w-full h-[200px] overflow-y-auto rounded-md border border-gray-200 p-4"
      value={article}
      ref={textareaRef}
      onChange={handleChange}
    />
  );
};

export default EditorTextArea;

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
