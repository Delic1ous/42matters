import React, { useEffect, useState } from "react";
import { Content } from "../components/Content";
import { GitHubLink } from "../components/GitHubLink";
import { ALL_TAGS, Sidebar, TAG_TYPE } from "../components/Sidebar";
import { Wrapper } from "../components/Wrapper";
import { useFetch } from "../hooks/useFetch";
import { HOME_PAGE } from "../utils";

export const SDKViewer = () => {
  // HOME_PAGE is required due to specified homepage for Github Pages
  const { execute, data } = useFetch(`${HOME_PAGE}/sdks.json`);
  const [selectedFilter, setSelectedFilter] = useState({
    type: TAG_TYPE,
    value: ALL_TAGS,
  });

  useEffect(() => {
    // well, without fetching the same data every time it could be much more optimized,
    // but as it's 5th requirement, here it is)
    execute();
  }, [selectedFilter]);

  return (
    <>
    <Wrapper
      content={<Content data={data} selectedFilter={selectedFilter} />}
      sidebar={<Sidebar data={data} setSelectedFilter={setSelectedFilter} />}
    />
    <GitHubLink />
    </>
  );
};
