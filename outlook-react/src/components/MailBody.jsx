import { useEffect, useState } from "react";
import axios from "axios";
import formatDate from "../utils/formatDate";
const MailBody = ({ mail, markAsFavorite }) => {
  const [mailBody, setMailBody] = useState(null);
  useEffect(() => {
    if (mail !== null) {
      setMailBody(null);
      axios
        .get(`https://flipkart-email-mock.vercel.app/?id=${mail.id}`)
        .then(({ data }) => {
          setMailBody(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mail]);
  return mail != undefined ? (
    mailBody != null ? (
      <aside className="h-[80vh] mt-14  w-3/4 bg-white rounded-xl">
        <div className="flex p-5  justify-between items-center">
          <div className="flex items-center gap-5">
            <div className="flex justify-center  items-center bg-red-400 rounded-full h-14 w-14 text-white text-xl font-bold ">
              {mail.from.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-[20px]">{mail.subject}</h1>
              <p>{formatDate(new Date(mail.date))}</p>
            </div>
          </div>
          <button
            className="p-2 bg-red-400 rounded-full text-white font-bold "
            onClick={() => markAsFavorite(mail.id)}
          >
            Mark As Favorite
          </button>
        </div>
        <div
          className="px-25  mail-content overflow-auto max-h-[65vh]"
          dangerouslySetInnerHTML={{ __html: mailBody.body }}
        ></div>
      </aside>
    ) : (
      <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg
          className="text-gray-300 animate-spin"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          />
        </svg>
      </div>
    )
  ) : (
    <></>
  );
};
export default MailBody;

<div>
  <p>
    Nulla at euismod erat. Donec fermentum dui ut scelerisque rhoncus. Aliquam
    erat volutpat. Nunc ut tortor sit amet lectus gravida dictum. Morbi eget
    ultricies eros, nec mollis arcu. Quisque nunc massa, gravida quis sem et,
    dignissim ultrices nulla. Quisque non venenatis dui, nec volutpat magna.
    Vivamus porttitor, arcu sed euismod faucibus, mauris lacus interdum orci, et
    ultrices augue leo id lorem. Ut lectus leo, finibus quis urna vitae, auctor
    mollis nulla. Aliquam auctor nulla tristique lectus placerat, ac commodo ex
    egestas. Ut venenatis, eros eu tristique maximus, libero nisi fermentum mi,
    at sollicitudin quam lorem in felis.
  </p>
  <p>
    Integer lacinia, ante ut mattis tincidunt, quam augue laoreet elit, vitae
    consequat arcu lacus ac magna. Nunc euismod in magna eget molestie.
    Phasellus lacinia in sapien id ultricies. Nulla ac rhoncus nulla. Donec
    pellentesque tortor iaculis dolor mollis laoreet. Nunc magna orci, suscipit
    ut nunc fringilla, imperdiet tempus libero. Mauris sed nunc mattis urna
    tempor tempor vitae eget lorem. Sed pellentesque, tellus vel sagittis
    dignissim, ipsum erat tempor turpis, id tristique augue mi tincidunt nunc.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec ipsum quis
    nibh scelerisque pretium vitae ac turpis. Cras porta vestibulum lorem sit
    amet lacinia. Phasellus accumsan est sagittis, scelerisque ligula at, porta
    arcu. Vestibulum metus justo, tempus eget feugiat id, iaculis tincidunt
    elit.
  </p>
  <p>
    Aliquam diam mauris, porttitor non commodo at, viverra id dui. Proin finibus
    a nulla id posuere. Donec ultricies cursus metus, at egestas tortor
    dignissim eu. Aliquam a massa eu erat gravida ultrices. Vivamus venenatis
    imperdiet purus, at egestas enim elementum quis. Nunc ultricies sapien
    sapien, gravida porttitor diam porta non. Fusce pretium sodales erat. Donec
    interdum ipsum odio, sit amet luctus est pharetra non. Mauris euismod neque
    eu malesuada scelerisque. In ultricies lectus eu libero accumsan, ultricies
    commodo nibh consequat. Pellentesque condimentum, neque id sollicitudin
    egestas, risus est lobortis diam, in faucibus sapien tortor eu felis. Cras a
    turpis aliquam, tristique eros at, ullamcorper tellus. Maecenas at tortor
    magna.
  </p>
</div>;
