# Firsthand Marketplace
<img width="50%" alt="Firsthand logo" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/5e6e920f-5b29-4c99-8926-6cb93fa19bbf0">

## About
The Firsthand Marketplace is a user-friendly web platform designed to facilitate the sale and purchase of secondhand items. With a focus on simplicity and user experience, it enables users to discover, purchase, and sell items with ease.

## Technologies used
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Apollo GraphQL](https://www.apollographql.com/)
- [Postgresql](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Cloudinary](https://cloudinary.com/)
- [Dpcker](https://www.docker.com/)
- [VS Code](https://code.visualstudio.com/)

### Getting Started
#### Instructions to get the project up and running.

Run the development server:
```bash
pnpm dev
```
Build a production build:
```bash
pnpm build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Site Overview and Features
### Home
The homepage showcases a hero section with a title and a search bar, followed by a showcase of the newest user listings.
- **Hero**:
  - Title (Text)
  - Search bar (Input Text)
  - Search button (Button)
- **Newest Listings**:
  - Listing
    - Userimage (DaisyUI Avatar)
    - Username (Link to User Listings)
    - Listing Image (CldImage)
    - Listing Title (Text)
    - Listing Price (Text)
<img width="30%" alt="Home" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/eb13e471-3ad5-4c44-8ee7-adffd2c70d42">

<hr />

### Register
A straightforward registration form that includes all the necessary fields to sign up a new user.
- **Form fields**:
  - Username (Input Text) [*]
  - Password (Input Password) [*]
  - Email (Input Email) [Regex controlled] [*]
  - Newsletter Sign Up (Input Checkbox) 
  - Accept TOS and Privacy Policy (Input Checkbox) [*]
  - Register Button (Button)
- Link to Login (if already has a user)
<img width="30%" alt="Create new listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/4703feb0-cbf4-4686-8c03-53fd427944a0">
<img width="30%" alt="Create new listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/f7743caf-589c-4ea3-bf5f-83e68a86cca0">

<hr />

### Login
A user-friendly login form with the essential fields
Link to registration form and password recovery.
- **Form fields**:
  - Username (Input - Text)
  - Password (Input - Text)
  - Remember me (Input - Checkbox)
- Forgot Password (Link)
- Link to Sign Up
<img width="30%" alt="Create new listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/61caffe6-6c92-416c-b6d5-269486b55b10">

<hr />

### View Single Listing
A detailed view of a single listing from a user, including all relevant information.
- **Details**:
  - Category (Link to Single Category)
  - Listing Image (CldImage)
  - Listing Title (Text)
  - Listing Description (Text)
  - Listing Status (Text)
  - Listing updated on (Text)
  - Listing Created on (Text)
  - Edit (Button) (Link to Edit Listing) 
  - Delete (Button)
  - Listing ID
<img width="30%" alt="Create new listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/497de179-9587-4044-a1b6-73fccd6776d9">

<hr />

### View/Edit Profile
An editable form for users to update their listing.
- Settings (Selection)
  - Currently Selected Name (Link)
- Profile
  - User Information
    - Username (Input Text)
    - Password (Input Password)
    - Profile Type (Dropdown Select)
  - Personal Information
    - First name (Input Text)
    - Last name (Input Text)
    - Birth Date (Input Date)
  - Contact Information
    - Email (Input Email)
    - Phone (Input Text)
  - Address
    - Street (Input Text)
    - City (Input Text)
    - Country (Input Text)
    - Postal Code (Input Text)
  - Edit (Button) (Enables Input Fields)
  - Save (Button)
  - Cancel (Button) (Disables Input Fields)
- Profile picture
  - User Image (CldImage)
  - Upload (CldButton)
  - Update (Button)

<img width="30%" alt="View-Edit Profile blank" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/f2d889f4-0115-4141-87b4-60ead861f7e2">
<img width="30%" alt="View-Edit Profile - edit mode" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/a4772a06-df3b-41bc-b76e-218125a8527a">
<img width="30%" alt="View-Edit Profile - image edit" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/ea63c6e2-e21b-4c79-acbf-b3a5ed92b5fa">

<hr />

### Manage Listings
A management section for users to view and control their listings.
Edit and delete functionalities for each offer.
  - Listing Image (CldImage)
  - Listing Title (Text)
  - Listing Price (Text)
  - Listing Status (Text)
  - Listing updated on (Text)
  - Listing Created on (Text)
  - Edit (Button) (Link to Edit Listing) 
  - Delete (Button)
  - Listing ID
<img width="30%" alt="Manage Listings" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/fd717a34-e75c-44f4-bcd3-0f803e0e4974">

<hr />

### Edit Listing
A comprehensive form for users to edit their listings.
  - Listing Title (Input Text)
  - Price (Input Text)
  - Category (Button) (Opens Modal Dialog)
    - Single Category [] (Input Radiobox)
    - Button (Closes Modal Dialog)
  - Currently Selected Category (Text)
  - Description (Textbox)
  - Status
    New Status (Dropdown Select)
  - Current status (Text)
  - Listing Image (CldImage)
  - Upload (Button)
  - Update (Button)
  - Contact and Place of Sale
    - Profile Settings (Link) 
  - Save (Button)
<img width="30%" alt="Edit User Listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/d91c7225-e446-4cc3-8625-4e82c2e73542">

<hr />

### Create New Listing
An intuitive form for users to create a new listing.
- **Form fields**:
- Title (Input Text)
- Price (Input Text)
- Category (Button) (Opens Modal Dialog)
    - Single Category [] (Input Radiobox)
    - Button (Closes Modal Dialog)
- Description (Textbox)
- Image (CldImage)
- Upload (Button)
- Contact (If Profile/Address Information set)
  - Name (Text)
  - Email (Email)
  - Phone (Text)
  - Profile Settings (Link) 
- Place of sale
  - Country
  - City
  - Address
  - Postal Code
  - Profile Settings (Link)
Contact (If no Profile/Address Information set)
  - Profile Settings (Link)
- Publish (Button)
<img width="30%" alt="Create new listing" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/951a8892-4220-4f2c-9c97-ebd8dbe1c899">
<img width="30%" alt="Create new listing - Categories " src="https://github.com/Tatli/final-project-upleveled/assets/9433075/234494d1-9c2f-42ba-b935-9eef18669820">
<img width="30%" alt="Create new listing - Cloudinary Upload " src="https://github.com/Tatli/final-project-upleveled/assets/9433075/ad3d9a5e-c35a-4fb2-9898-15fe6ecd6126">

<hr />

### Categories
A view of individual categories, displaying related images and the number of listings.
- Single Category (Multiple Categories)
  -  Image of Category (CldImage)
  -  Name of Category (Text)
  -  Number of listings inside Category (Text) (to be implemented)

<img width="30%" alt="Categories responsive" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/c4e29a9d-4da4-4883-a231-157ce61c4ad0">
<img width="30%" alt="Categories" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/fb41b82f-6b50-4d0a-a76c-00ebf66735e4">
<img width="30%" alt="Categories - full width" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/17f45265-64df-4082-aae7-14d44911e7f3">

<hr />

### Single User Listings
A collection of listings from a single user.
- **Listings**:
  - Header with Count of users active listings
  - User Image (CldImage) necessary?
  - Username (Text) necessary?
  - Listing image (CldImage)
  - Listing title (Text)
  - Listing price (Text)
<img width="30%" alt="Single User Newest Listings" src="https://github.com/Tatli/final-project-upleveled/assets/9433075/2062a78c-5d01-4300-961a-cde1396f8bd7">
