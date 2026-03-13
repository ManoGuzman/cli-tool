<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![project_license][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ManoGuzman/cli-tool">
    <img src="https://img.icons8.com/?size=100&id=WbRVMGxHh74X&format=png&color=000000" alt="CLI Tool Logo" width="80" height="80">
  </a>

<h3 align="center">CLI Tool</h3>

  <p align="center">
    A Node.js CLI tool for running app lifecycle commands with config file validation. Supports a <code>--start</code> command that loads and validates a <code>tool.config.js</code> file from the consuming project, with colored terminal output and structured error reporting.
    <br />
    <a href="https://github.com/ManoGuzman/cli-tool"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ManoGuzman/cli-tool">View Demo</a>
    &middot;
    <a href="https://github.com/ManoGuzman/cli-tool/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    &middot;
    <a href="https://github.com/ManoGuzman/cli-tool/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

`cli-tool` is a Node.js command-line interface tool that accepts command-line flags, loads and validates a user-supplied `tool.config.js` config file against a JSON schema, and dispatches to command handlers. It serves as both a functional tool and a reference project for building your own CLI with Node.js.

**Key capabilities:**
- Parses CLI flags using `arg`
- Loads `tool.config.js` from the consuming project's working directory
- Validates the config against a JSON Schema (via AJV) with human-friendly error messages
- Outputs colored, leveled terminal messages via a `chalk`-powered logger
- Redacts sensitive arguments (e.g. `--password`) from debug logs automatically

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Node.js][Node.js-badge]][Node-url]
* [![ESLint][ESLint-badge]][ESLint-url]
* [![pnpm][pnpm-badge]][pnpm-url]

| Package                                                                    | Purpose                                  |
| -------------------------------------------------------------------------- | ---------------------------------------- |
| [`arg`](https://github.com/vercel/arg)                                     | CLI argument parsing                     |
| [`chalk`](https://github.com/chalk/chalk)                                  | Colored terminal output                  |
| [`ajv`](https://ajv.js.org/)                                               | JSON Schema config validation            |
| [`better-ajv-errors`](https://github.com/nicolo-ribaudo/better-ajv-errors) | Human-friendly validation error messages |
| [`cosmiconfig`](https://github.com/cosmiconfig/cosmiconfig)                | Config file loading                      |
| [`debug`](https://github.com/debug-js/debug)                               | Debug logging                            |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
  ```sh
  node --version
  ```
- **pnpm** v8+
  ```sh
  npm install -g pnpm
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ManoGuzman/cli-tool.git
   ```
2. Navigate to the tool directory
   ```sh
   cd cli-tool/tool
   ```
3. Install dependencies
   ```sh
   pnpm install
   ```
4. (Optional) Link the CLI globally so it can be used as `cli-tool` from anywhere
   ```sh
   npm link
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Config file

Create a `tool.config.js` file in your project root:

```js
// tool.config.js
export const port = 3000; // must be a number between 1 and 65535
```

The config is validated against this schema:
- `port` — **required**, number, must be between 1 and 65535
- No additional properties are allowed
- Default fallback if no config is found: `{ port: 1234 }`

### Running commands

```sh
# Start the app (loads and validates tool.config.js)
cli-tool --start

# Or run directly without linking
node bin/index.js --start
```

### Available scripts

Run these from inside the `tool/` directory:

```sh
pnpm lint        # Lint src/ and bin/ with ESLint
pnpm test        # Run all tests with Node's built-in test runner
pnpm test:watch  # Run tests in watch mode
pnpm build       # No-op (no build step required for pure JS)
```

### Logger output levels

| Method         | Color           | Purpose            |
| -------------- | --------------- | ------------------ |
| `.log()`       | Gray            | General output     |
| `.warning()`   | Yellow          | Warnings           |
| `.highlight()` | Cyan background | Prominent messages |
| `.debug()`     | Magenta         | Debug info         |
| `.error()`     | Red             | Errors (stderr)    |

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] `--start` command with config loading and validation
- [x] JSON Schema validation with human-friendly errors
- [x] Chalk-based leveled logger
- [x] Integration and unit tests (Node.js built-in test runner)
- [x] GitHub Actions CI (lint → test → build on Node 20 & 22)
- [ ] `--build` command implementation
- [ ] Full `cosmiconfig`-style config loading (multiple file formats)
- [ ] `DEBUG` environment variable integration for debug output

See the [open issues](https://github.com/ManoGuzman/cli-tool/issues) for a full list of proposed features and known issues.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/ManoGuzman/cli-tool/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ManoGuzman/cli-tool" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Manuel Guzman

Project Link: [https://github.com/ManoGuzman/cli-tool](https://github.com/ManoGuzman/cli-tool)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [arg](https://github.com/vercel/arg) — minimal CLI argument parser
* [chalk](https://github.com/chalk/chalk) — terminal string styling
* [AJV](https://ajv.js.org/) — JSON Schema validator
* [better-ajv-errors](https://github.com/nicolo-ribaudo/better-ajv-errors) — friendly validation error output
* [cosmiconfig](https://github.com/cosmiconfig/cosmiconfig) — config file loader
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template) — README template

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/ManoGuzman/cli-tool.svg?style=for-the-badge
[contributors-url]: https://github.com/ManoGuzman/cli-tool/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ManoGuzman/cli-tool.svg?style=for-the-badge
[forks-url]: https://github.com/ManoGuzman/cli-tool/network/members
[stars-shield]: https://img.shields.io/github/stars/ManoGuzman/cli-tool.svg?style=for-the-badge
[stars-url]: https://github.com/ManoGuzman/cli-tool/stargazers
[issues-shield]: https://img.shields.io/github/issues/ManoGuzman/cli-tool.svg?style=for-the-badge
[issues-url]: https://github.com/ManoGuzman/cli-tool/issues
[license-shield]: https://img.shields.io/github/license/ManoGuzman/cli-tool.svg?style=for-the-badge
[license-url]: https://github.com/ManoGuzman/cli-tool/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/manuel-guzmán-b87b841bb/
[product-screenshot]: images/screenshot.png
[Node.js-badge]: https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white
[Node-url]: https://nodejs.org/
[ESLint-badge]: https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white
[ESLint-url]: https://eslint.org/
[pnpm-badge]: https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white
[pnpm-url]: https://pnpm.io/
