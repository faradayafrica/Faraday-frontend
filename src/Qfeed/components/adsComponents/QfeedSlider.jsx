import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import "../../styles/adsComponents/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addDisccussionAds,
  addFeedAds,
} from "../../../common/features/ads/AdsSlice";

// import AliceCarousel from "react-alice-carousel";
// import "react-alice-carousel/lib/alice-carousel.css";

const QfeedSlider = () => {
  const dispatch = useDispatch();
  const { feedAds } = useSelector((state) => state.ads);

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
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //   const handleDragStart = (e) => e.preventDefault();

  //   const ads = feedAds.map((ad) => (
  //     <img src={ad?.url} onDragStart={handleDragStart} role="presentation" />
  //   ));

  return (
    <div className="ad-hero-wrapper">
      <a href={feedAds[0]?.link} target="_blank" rel="noreferrer">
        <img
          src={feedAds[0]?.feed_design[0]?.url}
          alt={feedAds[0]?.advertiser_name}
        />
      </a>

      {/* <AliceCarousel
        mouseTracking
        animationDuration
        // autoWidth
        // autoPlayControls={false}
        controlsStrategy="responsive"
        disableButtonsControls
        disableDotsControls
        items={ads}
      /> */}
    </div>
  );
};

export default QfeedSlider;
