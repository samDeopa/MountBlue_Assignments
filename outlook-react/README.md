# MechaMail

MechaMail is a simple email client built with React. It fetches emails from a mock API and lets you mark emails as read or favorite. The application persists your preferences in the browser's localStorage and offers a clean, responsive UI using Tailwind CSS.

## Features

- **Email Fetching:** Retrieves a list of emails from the Flipkart Email Mock API.
- **Mark as Read:** Mark individual emails as read.
- **Favorite Emails:** Mark emails as favorite.
- **Caching Mechanism:** Caches the email body using `useRef` to prevent redundant API calls for the same email.
- **Persistent Preferences:** Stores your read and favorite preferences in localStorage.
- **Responsive Design:** Built with Tailwind CSS for a modern, responsive UI.

## Demo

[[Deployement](https://mecha-mail.vercel.app/)]

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm or yarn

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/samDeopa/MountBlue_Assignments/tree/main/outlook-react.git
   cd outlook-react
   ```

2. **Install Dependencies:**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Start the Development Server:**

   Using npm:

   ```bash
   npm start
   ```

   Or using yarn:

   ```bash
   yarn start
   ```

   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
outllok-react/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── MailList.jsx
│   │   └── MailBody.jsx
|   |   └── MechaMail.jsx
│   ├── App.js
│   ├── index.js
│   └── styles/
│       └── tailwind.css
├── package.json
└── README.md
```

- **Header:** Contains the top navigation or branding.
- **MailList:** Displays the list of emails and handles selection.
- **MailBody:** Renders the content of the selected email and allows marking it as favorite.

## Optimization Details

- **Caching Email Bodies:**  
  The `MailBody` component leverages the `useRef` hook to cache fetched email content. This ensures that if a user selects the same email multiple times, the content is loaded from the cache rather than re-fetching from the API.

- **LocalStorage Integration:**  
  User preferences for read and favorite emails are stored in localStorage, ensuring that the user's actions persist between sessions.

## Customization

### Updating Email Preferences

The project uses localStorage to persist your preferences. The code structure allows you to easily update how emails are marked as read or favorite. You can modify the logic in the corresponding functions (e.g., `markAsRead` and `markAsFavorite` in `MechaMail.jsx`).

### Styling

Tailwind CSS is used for styling. Feel free to customize the classes in your components or modify the Tailwind configuration to suit your design needs.

## Dependencies

- [React](https://reactjs.org/)
- [Axios](https://axios-http.com/) – for API requests.
- [Tailwind CSS](https://tailwindcss.com/) – for styling.

## Acknowledgments

- [Flipkart Email Mock API](https://flipkart-email-mock.now.sh/) for providing the email data.
