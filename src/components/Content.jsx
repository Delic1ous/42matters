import { Grid, Typography } from "@material-ui/core";
import uniqBy from "lodash.uniqby";
import React, { useMemo } from "react";
import { ALL_TAGS, SEARCH_TYPE, TAG_TYPE } from "./Sidebar";

export const Content = ({ data, selectedFilter }) => {
  const filteredSDKs = useMemo(() => {
    if (data) {
      const uniqSortedData = uniqBy(data, "id").sort((a, b) =>
        a.title?.localeCompare(b.title)
      );

      switch (selectedFilter.type) {
        case TAG_TYPE:
          if (selectedFilter.value === ALL_TAGS) {
            return uniqSortedData;
          } else {
            return uniqSortedData.filter((entity) =>
              entity.tags?.includes(selectedFilter.value)
            );
          }

        case SEARCH_TYPE:
          return uniqSortedData.filter((entity) =>
            entity.title?.toLocaleLowerCase().includes(selectedFilter.value)
          );

        default:
          return uniqSortedData;
      }
    } else {
      return [];
    }
  }, [data, selectedFilter]);

  return (
    <Grid spacing={3} container justify="flex-start">
      {filteredSDKs.map(
        (sdk) =>
          sdk.title && (
            <Grid item xs={12} md={6} lg={4} xl={2} key={sdk.id}>
              <Typography variant="h6">{sdk.title}</Typography>
              {sdk.tags && (
                <Typography
                  style={{ textTransform: "capitalize" }}
                  variant="subtitle1"
                >
                  {sdk.tags.sort().join(", ")}
                </Typography>
              )}
            </Grid>
          )
      )}
    </Grid>
  );
};
