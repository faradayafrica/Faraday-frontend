import { useEffect, useState, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import NotificationItem from "../components/notificationComponents/NotificationItem";
import NotificationLoader from "../components/notificationComponents/NotificationLoader";
import SecondaryButton from "../components/styledComponents/SecondaryButton";
import http from "../services/httpService";
import gsap from "gsap";

import "../styles/notification.css";
import caretIcon from "../images/caret.svg";

const Notification = () => {
  const apiEndpoint = process.env.REACT_APP_API_URL + `/notifications/`;

  const [filter, setFilter] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const el = useRef();
  const filter_modal = useRef();
  const q = gsap.utils.selector(el);

  const markAsRead = async (notificationId) => {
    console.log("Mark me as read");
    try {
      await http.put(apiEndpoint + `${notificationId}/read/`);
    } catch (e) {
      throw e;
    }
  };

  const toggleFilterDropDown = () => {
    if (!showFilter) {
      setShowFilter(true);
      setTimeout(() => {
        gsap.fromTo(
          filter_modal.current,
          { y: +100, opacity: 0 },
          { y: 0, opacity: 1, ease: "power2.inOut" }
        );
      }, 50);
    } else {
      gsap.fromTo(
        filter_modal.current,
        { y: 0, opacity: 1 },
        { y: +100, opacity: 0.3, ease: "power2.inOut" }
      );
      setTimeout(() => {
        setShowFilter(false);
      }, 200);
    }
  };

  const filterNotification = async (type) => {
    toggleFilterDropDown();

    if (type === "read") {
      setFilter("Read");
    } else if (type === "unread") {
      setFilter("Unread");
    } else {
      setFilter("All");
    }
  };

  const fetchNotifications = async (pageParam) => {
    const resp = await http.get(apiEndpoint + `?page=${pageParam}`);
    return resp;
  };

  const {
    data,
    isSuccess,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery(
    ["notification"],
    ({ pageParam = 1 }) => fetchNotifications(pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages?.length + 1;
        return lastPage?.data?.next ? nextPage : undefined;
      },
    }
  );

  // Check for the kind of error
  // console.log(error?.response.status, "Error");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    gsap.fromTo(
      q(".notification-item"),
      {
        y: +200,
        ease: "power2.inOut",
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.04,
      }
    );
  }, [isSuccess]);

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) {
          console.log(hasNextPage, "hasNextPage");
          await fetchNextPage();
        }
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="relative w-full route-wrapper" id="notification-wrapper">
      <div className="min-h-[70px] sm:min-h-[0px] bg-transparent"> </div>
      <div className="flex justify-between items-center m-3">
        <h1 className="text-2xl sm:text-2xl font-bold">Notification</h1>

        <div className="relative">
          <button
            onClick={() => {
              toggleFilterDropDown();
            }}
            className={
              filter
                ? "border-y border-x border-brand rounded-lg py-2 bg-brand-highlight"
                : "border-y border-x border-faraday-night rounded-lg py-2 "
            }
          >
            <p className="m-0 pl-3 pr-2 inline">{filter ? filter : "Filter"}</p>{" "}
            <img className="inline px-2" src={caretIcon} alt="" />
          </button>
          {showFilter ? (
            <div
              ref={filter_modal}
              className="p-1 border rounded-xl filter-dropdown absolute right-0 top-12 bg-white z-40 ask-shadow w-28 opacity-0"
            >
              <p
                className="border-b px-3 py-2 m-0 rounded-t-lg"
                onClick={() => filterNotification("unread")}
              >
                Unread{" "}
              </p>
              <p
                className="border-b px-3 py-2 m-0"
                onClick={() => filterNotification("read")}
              >
                Read{" "}
              </p>
              <p
                className=" px-3 py-2 m-0 rounded-b-lg"
                onClick={() => {
                  filterNotification("all");
                }}
              >
                All{" "}
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

      {isLoading && <NotificationLoader />}

      {isError && (
        <div className="p-3 border-brand-highlight rounded-lg border bg-background m-3 text-center">
          <>
            <p className="text-xs sm:text-base ">
              Something went wrong, please try again later
            </p>
            <SecondaryButton cta="Retry" action={refetch} />
          </>
        </div>
      )}

      {
        <div ref={el}>
          <>
            {isSuccess &&
              (filter === "" || filter === "All") &&
              data?.pages?.map((page) =>
                page?.data?.results.data.map((item) => (
                  <NotificationItem
                    key={item.id}
                    id={item.id}
                    is_read={item.is_read}
                    notification_type={item.notification_type}
                    message={item.content}
                    created={item.created}
                    markAsRead={markAsRead}
                    // notification type content
                    que={item.que}
                    follow_by={item.followed_by}
                    commentQue={item.que_with_comment}
                  />
                ))
              )}

            {isSuccess &&
              filter === "Read" &&
              data?.pages?.map((page) =>
                page?.data?.results.data
                  .filter((item) => item.is_read === true)
                  .map((item) => (
                    <NotificationItem
                      key={item.id}
                      id={item.id}
                      is_read={item.is_read}
                      notification_type={item.notification_type}
                      message={item.content}
                      created={item.created}
                      markAsRead={markAsRead}
                      // notification type content
                      que={item.que}
                      follow_by={item.followed_by}
                      commentQue={item.que_with_comment}
                    />
                  ))
              )}

            {isSuccess &&
              filter === "Unread" &&
              data?.pages?.map((page) =>
                page?.data?.results.data
                  .filter((item) => item.is_read === false)
                  .map((item) => (
                    <NotificationItem
                      key={item.id}
                      id={item.id}
                      is_read={item.is_read}
                      notification_type={item.notification_type}
                      message={item.content}
                      created={item.created}
                      markAsRead={markAsRead}
                      // notification type content
                      que={item.que}
                      follow_by={item.followed_by}
                      commentQue={item.que_with_comment}
                    />
                  ))
              )}
          </>
        </div>
      }

      {isFetchingNextPage && hasNextPage ? (
        <>
          <div className="animate-pulse border-b notification-loader-item">
            <div className="w-full p-3 flex  bg-white">
              <div className="w-6 h-6 mr-2 bg-background2"></div>

              <div className="w-full">
                <div className="w-8 h-8 rounded-full  bg-background2"></div>
                <div className=" h-3 rounded-xl  bg-background2 mt-2"></div>
                <div className="w-[140px] h-3 rounded-xl  bg-background2 mt-2"></div>
              </div>
            </div>
          </div>
        </>
      ) : null}

      {!hasNextPage && data?.pages.length && (
        <>
          <div className="p-3 m-3 mr-1 rounded-lg border bg-background  text-center">
            <p className="text-xs sm:text-base m-0 ">
              No more notification to fetch
            </p>
          </div>
          <div className="h-[65px] w-full sm:hidden"></div>
        </>
      )}
    </div>
  );
};

export default Notification;
