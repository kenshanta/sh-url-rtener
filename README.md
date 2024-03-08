## `SH(URL)T` A history backed - shortened version of any legit url

This Node.js project is designed to shorten URLs and store their history, providing users with a convenient way to shorten and track their shortened links.

## Features

- **URL Shortening**: Easily shorten long URLs into more manageable forms.
- **History Tracking**: Maintain a record of all shortened URLs for future reference.
- **Basic User-Friendly Interface**: Just a regular nodeJS based dialog with inputs

### TODO:

- _Add styling_
  - _Fonts_ 
  - _Theme_
  - _Animations?_
  - _Toaster_

- **global IP for general international usage**

## Installation

To install and run the project, follow these steps:

1.# Clone the repository:

   ```bash
   git clone https://github.com/kenshanta/sh-url-t.git
   ```

2.# Install dependencies:

   ```bash
   npm install
   ```

3.# Start the server:

   ```bash
   npm start
   ```

4.# Access the application in your web browser at `http://localhost:3000`.

## Usage

1. **Shorten URL**: Enter a long URL into the input field and click the "Shorten" button to generate a shortened version.
2. **Customize URL (Optional)**: Optionally, customize the shortened URL to make it more memorable or branded.
3. **Copy Shortened URL**: Copy the shortened URL to use it in your projects or share it with others.
4. **View History**: Access the history page to see a list of all previously shortened URLs along with their original counterparts.

## Technologies Used

- **Node.js**: Backend environment for handling URL shortening and history tracking logic.
- **Express.js**: Web framework used for routing and handling HTTP requests.
- **MongoDB**: Database system for storing URL history data + _tracking number of clicks per URL_.
- **HTML/CSS/JavaScript**: Frontend development for the user interface and interaction.

## Contributors

Contributions are more than welcome, to do so you can mention your name in a `contributions.md` file with the following
info:
- [Your Name](https://github.com/kenshanta)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
