import Page from "../components/Layout/Page";
import Editor from "../components/Editor/Editor";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Topic } from "../types";
import { getTopicByIDQuery, sanityClient } from "../utils";
import Spinner from "../components/Layout/Spinner";

const Write = () => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loading, setLoading] = useState(false);
  const { topicID } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (topicID) {
      setLoading(true);
      getTopic(topicID);
    }
  }, [topicID]);

  const getTopic = async (topicID: string) => {
    try {
      const _topic = await sanityClient.fetch(getTopicByIDQuery(topicID));
      setTopic(_topic[0]);
      setLoading(false);
    } catch (error) {
      navigate("/");
      setLoading(false);
    }
  };

  return <Page content={loading ? <Spinner /> : <Editor topic={topic} />} />;
};

export default Write;
