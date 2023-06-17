import { Link, useNavigate } from "react-router-dom";
import { Topic } from "../../types";
import { useState } from "react";
import { openAIClient, sanityClient } from "../../utils";
import Spinner from "../Layout/Spinner";
import EditorTextArea from "./EditorTextArea";
import MoodBox from "./MoodBox";
import ImageUploader from "./ImageUploader";
import { useUser } from "../../context";
import { AirplaneIcon, WriteIcon } from "../Icons/SVGIcons";

const Editor = ({ topic }: { topic: Topic | null }) => {
  const [article, setArticle] = useState("");
  const [mood, setMood] = useState("none");
  const [imageAsset, setImageAsset] = useState<any>(null);
  const [generating, setGenerating] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const createBlog = async () => {
    if (user && topic && article && imageAsset?._id) {
      await sanityClient
        .create({
          _type: "blog",
          article: article,
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: imageAsset?._id,
            },
          },
          topic: {
            _type: "reference",
            _ref: topic?._id,
          },
          keywords: topic?.keywords.map((sk) => {
            return { _type: "reference", _ref: sk._id, _key: sk._id };
          }),
          category: {
            _type: "reference",
            _ref: topic?.category._id,
          },
          createdBy: {
            _type: "reference",
            _ref: user?.id,
          },
        })
        .then((res) => {
          console.log(res);
          // Close Modal
          navigate("/blog");
        })
        .catch((err) => console.log("something went wrong => ", err));
    }
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
    <div className="w-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4 text-gray-600">
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
          <span className="border border-violet-700 text-violet-900 rounded-md px-1.5 py-1 text-xs">
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
          className="flex items-center bg-amber-300 text-black px-2 py-1.5 rounded shadow-sm disabled:bg-amber-100 disabled:cursor-pointer"
        >
          {generating ? (
            <span className="flex items-center">
              Generating
              <span className="ml-2">
                <Spinner />
              </span>
            </span>
          ) : (
            <>
              Generate with AI{" "}
              <span className="ml-2">
                <AirplaneIcon />
              </span>
            </>
          )}
        </button>
      </div>

      {/* Image Upload  */}
      <div className="mb-8">
        <ImageUploader imageAsset={imageAsset} setImageAsset={setImageAsset} />
      </div>

      {/* Button */}
      <button
        onClick={createBlog}
        disabled={!imageAsset || article === ""}
        className="w-[250px] flex justify-center items-center  bg-violet-900 hover:bg-violet-700 disabled:bg-gray-200 disabled:text-black disabled:cursor-not-allowed text-white px-2 py-1.5 rounded shadow-sm"
      >
        <span className="mr-2">
          <WriteIcon />
        </span>
        Create Blog
      </button>
    </div>
  );
};

export default Editor;
