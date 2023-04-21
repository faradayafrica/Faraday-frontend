export default function LazyReply() {
  return (
    <div className="animate-pulse">
      <div className="content-wrapper">
        <div style={{ textDecoration: "none" }} className="profile-img">
          <img
            className="bg-slate-300"
            // src=""
            style={{ objectFit: "cover" }}
            alt=""
          />
        </div>

        <div className="offset">
          <div className="user mb-3">
            <div className="h-2 w-32 rounded-md bg-slate-300 mr-2"></div>
            <div className="h-2 w-14 rounded-md bg-slate-300"></div>
          </div>

          {/* Render the content */}
          <div className="pb-4">
            <div className="h-2 w-full rounded-l-md bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-full bg-slate-300 mb-[6px]"></div>
            <div className="h-2 w-24 rounded-r-md bg-slate-300 mb-[6px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
