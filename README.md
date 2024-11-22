# Impact Electron

Impact Electron is a cross-platform desktop application built using [Electron.js](https://www.electronjs.org/). It supports Windows, macOS, and Linux platforms with streamlined development, building, and distribution workflows.

---

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Build and Distribution](#build-and-distribution)
- [License](#license)
- [Author](#author)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [npm](https://www.npmjs.com/) (comes with Node.js).

### Steps to Install

1. Clone the Repository:
   ```bash
   git clone https://github.com/kararAcode/Impact-Electron.git
   cd Impact-Electron
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Run the Application:
   ```bash
   npm start
   ```

---

## Usage

To run the application in development mode:
```bash
npm start
```

---

## Development

### File Structure
- **`src/`**: Contains the source code of the application.
- **`resources/`**: Contains build resources like icons.
- **`build/`**: Output directory for built application files.

### Scripts
- **`npm start`**: Runs the application in development mode.
- **`npm run build`**: Builds the application for all platforms.
- **`npm run build-mac`**: Builds the application for macOS.
- **`npm run build-win`**: Builds the application for Windows.

---

## Build and Distribution

### Build Requirements
- **Windows**: Install [Windows Build Tools](https://github.com/felixrieseberg/windows-build-tools).
- **macOS**: Xcode Command Line Tools are required.
- **Linux**: Ensure required dependencies for `AppImage`, `deb`, and `rpm` are installed.

### Building the App
To build the application for your platform:
```bash
npm run build
```

For platform-specific builds:
```bash
npm run build-mac    # macOS
npm run build-win    # Windows
```

### Distribution
The application uses `electron-builder` for packaging and `electron-updater` for publishing updates. Releases are uploaded to the GitHub repository.

---

## License

This project is licensed under the **ISC License**. See the `LICENSE` file for details.

---

## Author

**Karar Acode**  
- [GitHub Profile](https://github.com/kararAcode)  
- Email: [alkarar975@gmail.com](mailto:alkarar975@gmail.com)
