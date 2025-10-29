<!-- Image removed: ensure logo.sample.png exists in ./images before re-adding -->

# CLI Tool &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)](https://travis-ci.org/npm/npm) [![npm](https://img.shields.io/npm/v/npm.svg?style=flat-square)](https://www.npmjs.com/package/npm) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://github.com/your/your-project/blob/master/LICENSE)

> A modern command-line tool for application development

A configurable command-line tool built with Node.js and ES modules for starting and building applications with beautiful terminal output and robust configuration management.

## Installing / Getting started

Get up and running quickly with the CLI tool:

```shell
git clone <repository-url>
cd cli-tool
npm install
npm link
```

This will install dependencies and make the tool globally available. You can then run commands like `node bin/index.js --start` to launch your applications.

## Developing

### Built With
- **Node.js** - Runtime environment
- **ES Modules** - Modern JavaScript module system
- **arg** - Command line argument parsing
- **chalk** - Terminal string styling
- **cosmiconfig** - Configuration file loading
- **ajv** - JSON schema validation

### Prerequisites
- Node.js (version 14 or higher)
- npm package manager

### Setting up Dev

Here's how to set up the development environment:

```shell
git clone <repository-url>
cd cli-tool/tool
npm install
```

This installs all dependencies and sets up the project structure with the CLI entry point, source files, and configuration management.

### Building

The project uses ES modules and doesn't require a build step for development:

```shell
node bin/index.js --start
node bin/index.js --build
```

For global usage after development:
```shell
npm link
```

### Deploying / Publishing

To publish a new version:

```shell
npm version patch
npm publish
```

This updates the version number and publishes the package to npm registry.

## Configuration

The tool supports multiple configuration formats and automatic discovery:

**Configuration file formats:**
- `tool.config.js` (ES modules or CommonJS)
- `tool.config.json`
- `tool.config.yaml/.yml`
- `.toolrc` files
- `tool` field in `package.json`

**Configuration schema:**
```json
{
  "type": "object",
  "properties": {
    "port": {
      "type": "number",
      "minimum": 1,
      "maximum": 65535
    }
  },
  "required": ["port"],
  "additionalProperties": false
}
```

## Tests

Run the test suite:

```shell
npm test
```

Run linting:
```shell
npm run lint
```

Tests validate configuration schema, command parsing, and core functionality.

## Features

- **Start Command** - Launch your application with custom configuration
- **Build Command** - Build your application (coming soon)
- **Configuration Management** - JSON schema validation with cosmiconfig
- **Colored Output** - Beautiful terminal output with chalk
- **Debug Logging** - Built-in debug capabilities
- **ES Modules** - Modern JavaScript module system

## Usage Examples

### Basic Usage
```bash
# Create configuration (ES module syntax; requires Node.js with `"type": "module"` in package.json)
echo 'export default { port: 8080 };' > tool.config.js

# Alternatively, for CommonJS environments:
echo 'module.exports = { port: 8080 };' > tool.config.js

# Start the application
node bin/index.js --start
```

### Debug Mode
```bash
DEBUG=* node bin/index.js --start
DEBUG=config:* node bin/index.js --start
```

## Project Structure

```
tool/
├── bin/
│   └── index.js          # CLI entry point
├── src/
│   ├── logger.js         # Logging utilities
│   ├── commands/
│   │   └── start.js      # Start command implementation
│   └── config/
│       ├── config-mgr.js # Configuration management
│       └── schema.json   # Configuration schema
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## Versioning

We use [SemVer](http://semver.org/) for versioning. For available versions, see the [tags on this repository](https://github.com/your/your-project/tags).

## Licensing

MIT License - see LICENSE file for details.
