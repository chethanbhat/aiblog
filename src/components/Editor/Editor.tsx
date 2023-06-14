import { Link } from "react-router-dom";
import { Topic } from "../../types";
import { useState, useEffect, KeyboardEvent, ChangeEvent, useRef } from "react";
import { openAIClient } from "../../utils";
import Spinner from "../Layout/Spinner";

const Editor = ({ topic }: { topic: Topic | null }) => {
  const [article, setArticle] = useState("");
  const [mood, setMood] = useState("none");
  const [undoStack, setUndoStack] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [generating, setGenerating] = useState(false);

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

  const generateBlog = async () => {
    setGenerating(true);
    let blogPrompt = `Please generate a paragraph for the topic ${topic?.title}. `;

    if (mood !== "none") {
      blogPrompt += `Set the mood of the article as ${mood}.`;
    }
    try {
      const res = await openAIClient.createCompletion({
        model: "text-davinci-003",
        prompt: blogPrompt,
        max_tokens: 250,
      });
      if (res?.data?.choices[0]?.text) {
        setArticle(res.data.choices[0].text.trim());
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGenerating(false);
    }
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
      {/* Editor */}
      <div className="mb-4">
        <textarea
          className="w-full h-[250px] overflow-y-auto rounded-md border border-gray-200 p-4"
          value={article}
          ref={textareaRef}
          onChange={handleChange}
        />
      </div>
      {/* AI Prompt */}

      <div className="mb-4">
        <label className="block mb-2">Mood of the Article</label>
        {/* Moods */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <input
              checked={mood === "none"}
              onChange={(e) => setMood(e.target.value)}
              value="none"
              className="mr-2 cursor-pointer"
              type="radio"
              name="blogMood"
            />
            <label>None</label>
          </div>
          <div className="flex items-center">
            <input
              checked={mood === "happy"}
              onChange={(e) => setMood(e.target.value)}
              value="happy"
              className="mr-2 cursor-pointer"
              type="radio"
              name="blogMood"
            />
            <label>Happy</label>
          </div>
          <div className="flex items-center">
            <input
              checked={mood === "sad"}
              onChange={(e) => setMood(e.target.value)}
              value="sad"
              className="mr-2 cursor-pointer"
              type="radio"
              name="blogMood"
            />
            <label>Sad</label>
          </div>
          <div className="flex items-center">
            <input
              checked={mood === "angry"}
              onChange={(e) => setMood(e.target.value)}
              value="angry"
              className="mr-2 cursor-pointer"
              type="radio"
              name="blogMood"
            />
            <label>Angry</label>
          </div>
          <div className="flex items-center">
            <input
              checked={mood === "funny"}
              onChange={(e) => setMood(e.target.value)}
              value="funny"
              className="mr-2 cursor-pointer"
              type="radio"
              name="blogMood"
            />
            <label>Funny</label>
          </div>
        </div>
        <button
          disabled={generating}
          onClick={() => generateBlog()}
          className="bg-amber-300 text-black px-2 py-1.5 rounded block shadow-sm disabled:bg-amber-100 disabled:cursor-pointer"
        >
          {generating ? (
            <span className="flex items-center">
              Generating
              <span className="ml-2">
                <Spinner />
              </span>
            </span>
          ) : (
            <>Generate with AI</>
          )}
        </button>
      </div>

      {/* Image Upload  */}
      <div className="mb-4">
        <label className="block mb-2">Featured Image</label>
        <input type="file" name="" id="" />
      </div>

      {/* Button */}
      <button
        disabled
        className="bg-purple-900 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed text-white px-2 py-1.5 rounded block ml-auto shadow-sm"
      >
        Create Blog
      </button>
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
