import Page from "../components/Layout/Page";
import Editor from "../components/Editor/Editor";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Topic } from "../types";
import { getTopicByIDQuery, sanityClient } from "../utils";
import Spinner from "../components/Layout/Spinner";
import { useQuery } from "@tanstack/react-query";

const Write = () => {
  const [topic, setTopic] = useState<Topic | null>(null);
  const { topicID } = useParams();
  const navigate = useNavigate();

  // Fetch Topics using React Query
  const {
    isLoading: isTopicLoading,
    error: topicError,
    data: topicData,
  } = useQuery({
    queryKey: ["fetchTopicByID", topicID],
    queryFn: async () => {
      if (topicID) {
        let result: Topic[] = await sanityClient.fetch(
          getTopicByIDQuery(topicID)
        );
        return result;
      } else {
        throw Error;
      }
    },
  });

  useEffect(() => {
    if (topicData && topicData[0]) {
      setTopic(topicData[0]);
    }
    if (topicError) {
      console.log("Error fetching topic!");
      navigate("/");
    }
  }, [topicData, topicError]);

  return (
    <Page content={isTopicLoading ? <Spinner /> : <Editor topic={topic} />} />
  );
};

export default Write;
