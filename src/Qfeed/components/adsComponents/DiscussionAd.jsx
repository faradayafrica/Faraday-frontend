import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import "../../styles/adsComponents/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addDisccussionAds,
  addFeedAds,
} from "../../../common/features/ads/AdsSlice";

const DiscussionAd = () => {
  const dispatch = useDispatch();
  const { discussionAds } = useSelector((state) => state.ads);

  const base = new Airtable({
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
  }).base(process.env.REACT_APP_AIRTABLE_BASE);

  function fetchData() {
    try {
      base("app_ads")
        .select({ view: "Grid view" })
        .eachPage((records, fetchNextPage) => {
          // setAds(records);
          dispatch(addFeedAds(records.map((record) => record?.fields)));
          dispatch(
            addDisccussionAds(
              records
                .filter((record) => record?.fields?.discussion_active === true)
                .map((record) => record?.fields)[0]
            )
          );
          fetchNextPage();
        });
    } catch (e) {
      // console.log(e);
    }
  }

  useEffect(() => {
    if (!discussionAds?.link) {
      fetchData();
    }
  }, []);

  return (
    <>
      {discussionAds.link && (
        <div className="discussion-ad-wrapper">
          <a href={discussionAds?.link} target="_blank" rel="noreferrer">
            <img
              src={discussionAds?.discussion_design[0]?.url}
              alt={discussionAds?.discussion_design[0]?.advertiser_name}
            />
          </a>
        </div>
      )}
    </>
  );
};

export default DiscussionAd;
