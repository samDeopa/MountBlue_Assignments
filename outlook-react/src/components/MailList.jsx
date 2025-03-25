import formatDate from "../utils/formatDate";

const MailList = ({
  mails,
  setSelectedMailIndex,
  selectedMailIndex,
  preferences,
  markAsRead,
  filter,
  setFilter,
}) => {
  return (
    <main className=" flex flex-col min-w-2/5 gap-[20px] grow">
      <div className="flex items-center gap-5 text-[14px] text-black font-medium">
        <p>Filter By :</p>
        <button
          onClick={() => {
            if (filter != "unread") setFilter("unread");
            else setFilter(null);
          }}
          className={`${filter === "unread" && "bg-gray-400"} rounded-full p-2`}
        >
          Unread
        </button>
        <button
          onClick={() => {
            if (filter != "read") setFilter("read");
            else setFilter(null);
          }}
          className={`${filter === "read" && "bg-gray-400"} rounded-full p-2`}
        >
          Read
        </button>
        <button
          onClick={() => {
            if (filter != "favorite") setFilter("favorite");
            else setFilter(null);
          }}
          className={`${
            filter === "favorite" && "bg-gray-400"
          } rounded-full p-2`}
        >
          Favorites
        </button>
      </div>
      <div className="flex flex-col gap-[20px]  h-[80vh] overflow-auto grow">
        {mails
          .filter((mail) => {
            if (!filter) return true;
            else if (filter === "read") {
              return preferences.read.includes(mail.id);
            } else if (filter === "unread") {
              return !preferences.read.includes(mail.id);
            } else if (filter === "favorite") {
              return preferences.favorite.includes(mail.id);
            }
          })
          .map((mail, index) => {
            const read = preferences.read.includes(mail.id);
            const fav = preferences.favorite.includes(mail.id);
            return (
              <div
                key={mail.id}
                onClick={() => {
                  setSelectedMailIndex(mail.id);
                  markAsRead(mail.id);
                }}
                className={`flex gap-4  items-center  p-5 rounded-xl  ${
                  read ? "bg-white" : "bg-gray-300"
                } ${
                  mail.id === selectedMailIndex ? "border-1 border-red-500" : ""
                } `}
              >
                <div className="flex justify-center items-center bg-red-400 rounded-full h-14 w-14 text-white text-xl font-bold ">
                  {mail.from.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-2 max-w-4/5">
                  <p>
                    From :{" "}
                    <span className="font-semibold">
                      {mail.from.name}&lt;{mail.from.email}&gt;
                    </span>
                  </p>
                  <p>
                    Subject:{" "}
                    <span className="font-semibold">{mail.subject}</span>
                  </p>
                  <p className="  truncate ">{mail.short_description}</p>
                  <div className="flex  gap-10 ">
                    <p>{formatDate(new Date(mail.date))}</p>
                    {fav ? (
                      <p className="text-red-400 font-medium">Favorite</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default MailList;
