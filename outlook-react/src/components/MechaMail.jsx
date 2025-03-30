import { useEffect, useState } from "react";
import Header from "./Header";
import MailList from "./MailList";
import axios from "axios";
import MailBody from "./MailBody";

const MechaMail = () => {
  const [mails, setMails] = useState([]);
  const [selectedMail, setSelectedMail] = useState(null);
  const [filter, setFilter] = useState(null);
  const [preferences, setPreferences] = useState(
    JSON.parse(localStorage.getItem("preferences")) || {
      read: [],
      favorite: [],
    }
  );

  const markAsRead = (id) => {
    if (preferences.read.includes(id)) return;

    const updatedRead = [...preferences.read, id];
    const newPreferences = { ...preferences, read: updatedRead };

    setPreferences(newPreferences);
    localStorage.setItem("preferences", JSON.stringify(newPreferences));
  };

  const markAsFavorite = (id) => {
    if (preferences.favorite.includes(id)) return;

    const updatedFavorite = [...preferences.favorite, id];
    const newPreferences = { ...preferences, favorite: updatedFavorite };

    setPreferences(newPreferences);
    localStorage.setItem("preferences", JSON.stringify(newPreferences));
  };

  useEffect(() => {
    axios
      .get("https://flipkart-email-mock.now.sh/ ")
      .then(({ data }) => {
        setMails(data.list);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="text-[#333]">
      <Header />
      <div className="flex gap-10 px-15">
        <MailList
          mails={mails}
          selectedMail={selectedMail}
          setSelectedMail={setSelectedMail}
          preferences={preferences}
          markAsRead={markAsRead}
          filter={filter}
          setFilter={setFilter}
        />
        <MailBody
          key={selectedMail}
          mail={mails.find((mail) => mail.id === selectedMail)}
          markAsFavorite={markAsFavorite}
          setSelectedMail={setSelectedMail}
        />
      </div>
    </div>
  );
};
export default MechaMail;
