# Next.js E-commerce Admin Panel

This repository contains the admin panel for the e-commerce website[https://github.com/KirtiYadav1681/nextjs-ecommerce-frontend] built using Next.js. The admin panel provides functionalities for managing products, categories, and orders, as well as handling authentication and image uploads.

## Features

- **Product Management**: Create, update, and delete products.
- **Category Management**: Create, update, and delete categories.
- **Order Management**: View all orders with detailed information.
- **Authentication**: Admin login and logout using NextAuth.
- **Image Uploads**: Upload product images using Cloudinary.
- **Responsive Design**: Fully functional and user-friendly interface with spinners and loaders.

## Tech Stack

- **Framework**: Next.js 14.2
- **Authentication**: NextAuth
- **API Integration**: Axios
- **Database**: Local MongoDB
- **Image Uploads**: Cloudinary 2.0.0
- **Styling**: CSS, Tailwind CSS (optional)

## Prerequisites

To run this project on your local system, you need to set up the following environment variables in a `.env` file:

```env
GOOGLE_ID=your-google-id
GOOGLE_SECRET=your-google-secret
MONGODB_URI=your-mongodb-uri
SECRET=your-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
```

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/KirtiYadav1681/nextjs-ecommerce.git
cd nextjs-ecommerce
```

### Install Dependencies

```bash
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

- `GOOGLE_ID`: Google OAuth client ID.
- `GOOGLE_SECRET`: Google OAuth client secret.
- `MONGODB_URI`: URI for connecting to MongoDB.
- `SECRET`: Secret key for NextAuth.
- `CLOUDINARY_CLOUD_NAME`: Cloud name for Cloudinary.
- `CLOUDINARY_API_KEY`: API key for Cloudinary.
- `CLOUDINARY_API_SECRET`: API secret for Cloudinary.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.