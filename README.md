# Form Builder 

## Overview

This project is the frontend of a dynamic Form Builder application, built using React. It allows users to create, customize, and share forms. Users can drag and drop form elements, preview forms, save them, and generate embeddable HTML or shareable links.

## Features

- **Drag-and-Drop Interface**: Easily add form fields using a toolbox.
- **Form Preview**: Preview forms before saving.
- **Share/Embed**: Generate and copy embeddable HTML for forms.
- **Authentication**: Register, log in, and manage forms.

## Installation

1. Clone the repository:

   ```bash
   git https://github.com/peterdgreat/form-builder
   cd form-builder
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root of your project with the following variables:

   ```env
   REACT_APP_API_URL=http://localhost:3001
   ```

   Adjust the `REACT_APP_API_URL` to match your backend API URL.

4. Start the development server:

   ```bash
   npm start
   ```

   The app should be running on `http://localhost:3000`.

## Usage

- **Form Builder**: Navigate to `/form-builder` to create new forms.
- **View Forms**: View all created forms at `/view-forms`.
- **Authentication**: Register at `/register` and log in at `/login`.

## Deployment

To deploy the frontend for production:

1. Build the project:

   ```bash
   npm run build
   ```

2. Deploy the `build` directory to your preferred hosting service (e.g., Netlify, Vercel).

## Technologies

- React
- React Router
- React DnD
- FontAwesome

## Contributing

Feel free to fork the repository and submit pull requests. Issues and feature requests are welcome.

## License

This project is licensed under the MIT License.

---

This README covers the essential aspects of your frontend project, helping others understand, set up, and contribute to it.