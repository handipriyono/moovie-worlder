**React Movie App**

deploy version: https://moovie-worlder.vercel.app/

Here's how to set up and run the React Movie App:

1. **Clone Repository**:

   - First, clone the repository to your local machine using Git:
     ```
     git clone <repository_url>
     ```

2. **Set Up Environment Variables**:

   - Create a `.env` file in the root directory of your project.
   - Add the following line to your `.env` file, replacing `<your_api_key>` with your actual TMDB API key:
     ```
     VITE_APP_API_KEY=<your_api_key>
     ```

3. **Install Dependencies**:

   - Open your terminal and navigate to the project directory.
   - Run the following command to install the required dependencies:
     ```
     yarn install
     ```

4. **Run Locally**:

   - To start the development server, run:
     ```
     yarn dev
     ```
   - The app will be available at `http://localhost:5173/`.

5. **List of Pages**:
   - Here are the paths for different pages within the project: - `/login`: Login & register page - `/dashboard`: Shows a list of movies (popular, top rated, now playing, upcoming) - `/favorites`: Displays a list of favorite movies ( local storage data)
     🎬🍿
