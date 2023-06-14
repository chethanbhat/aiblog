import { Link } from "react-router-dom";
import { Topic } from "../../types";
import { useState } from "react";
import { openAIClient } from "../../utils";
import Spinner from "../Layout/Spinner";
import EditorTextArea from "./EditorTextArea";
import MoodBox from "./MoodBox";

const Editor = ({ topic }: { topic: Topic | null }) => {
  const [article, setArticle] = useState("");
  const [mood, setMood] = useState("none");

  const [generating, setGenerating] = useState(false);

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
        <EditorTextArea article={article} setArticle={setArticle} />
      </div>
      {/* AI Prompt */}

      <div className="mb-4">
        <label className="block mb-2">Mood of the Article</label>
        {/* Moods */}
        <MoodBox selectedMood={mood} setMood={setMood} />
        {/* Blog Generator Button */}
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
