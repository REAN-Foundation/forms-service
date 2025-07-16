# Form Service

> A comprehensive Node.js microservice for dynamic form building, management, and processing with advanced skip logic and conditional field operations.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/your-org/form-service.git
cd form-service

# Install dependencies
npm install

# Start the service
npm run dev
```

The service will be available at `http://localhost:3000`

## 📚 Documentation

**📖 [View Full Documentation](http://localhost:3000/api/docs)**

Once the service is running, you can access the complete documentation at:

- **Local Development**: <http://localhost:3000/api/docs>
- **Production**: <https://your-domain.com/api/docs>

### Documentation Features

- **Interactive API Reference**: Test endpoints directly from the docs
- **Code Examples**: Ready-to-use code snippets in multiple languages
- **Visual Diagrams**: Mermaid diagrams for complex concepts
- **Search Functionality**: Find what you need quickly
- **Responsive Design**: Works on desktop and mobile

## ✨ Key Features

- **Dynamic Form Builder**: Create complex forms with conditional logic
- **Skip Logic Engine**: Advanced field visibility and skip conditions
- **Validation Rules**: Comprehensive field validation with custom rules
- **Calculation Logic**: Mathematical and logical operations on form fields
- **Field Operations**: Composition, iteration, and function expressions
- **RESTful API**: Complete CRUD operations for all entities
- **Multi-database Support**: PostgreSQL, MySQL, and SQLite
- **TypeScript**: Full type safety and IntelliSense support

## 🛠️ Development

### Prerequisites

- Node.js 18+
- PostgreSQL/MySQL/SQLite
- npm or yarn

### Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### API Testing

The project includes Bruno API collections for testing:

- **Bruno Collection**: `bruno/form-service/`
- **Postman Collection**: `Postman/form-service.postman_collection.json`

## 📖 Documentation Sections

### Getting Started

- [Quick Start Guide](http://localhost:3000/api/docs/#/about/quickstart) - Get up and running in 5 minutes
- [Installation Guide](http://localhost:3000/api/docs/#/about/installation) - Detailed installation instructions
- [Configuration](http://localhost:3000/api/docs/#/about/configuration) - Environment and service configuration

### API Reference

- [REST API Overview](http://localhost:3000/api/docs/#/api/overview) - Complete API documentation
- [Form Templates](http://localhost:3000/api/docs/#/api/form-templates) - Form template management
- [Form Submissions](http://localhost:3000/api/docs/#/api/form-submissions) - Data collection and processing
- [Field Logic](http://localhost:3000/api/docs/#/api/field-logic) - Skip logic and validation

### Core Concepts

- [Skip Logic](http://localhost:3000/api/docs/#/guides/skip-logic) - Conditional field visibility
- [Validation Rules](http://localhost:3000/api/docs/#/guides/validation-rules) - Field validation
- [Calculation Logic](http://localhost:3000/api/docs/#/guides/calculation-logic) - Mathematical operations

### Examples

- [Basic Form Creation](http://localhost:3000/api/docs/#/examples/basic-form) - Simple form example
- [Conditional Fields](http://localhost:3000/api/docs/#/examples/conditional-fields) - Skip logic examples
- [API Integration](http://localhost:3000/api/docs/#/examples/api-integration-examples) - Client integration

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check |
| `GET` | `/api/docs` | Documentation |
| `POST` | `/api/forms/templates` | Create form template |
| `GET` | `/api/forms/templates` | List form templates |
| `POST` | `/api/forms/submissions` | Submit form data |
| `GET` | `/api/forms/submissions` | Get form submissions |

## 🏗️ Architecture

The service follows clean architecture principles with:

- **Domain Layer**: Core business logic and entities
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: Database, external services, and frameworks
- **Presentation Layer**: API controllers and validators

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](http://localhost:3000/api/docs/#/about/contributing) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
- **Issues**: [GitHub Issues](https://github.com/your-org/form-service/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/form-service/discussions)
- **Email**: <support@yourservice.com>

---

<div align="center">
  <strong>Ready to get started?</strong><br>
  <a href="http://localhost:3000/api/docs/#/about/quickstart">📖 Read the Quick Start Guide</a> |
  <a href="http://localhost:3000/api/docs/#/api/overview">🔧 View API Reference</a> |
  <a href="http://localhost:3000/api/docs/#/examples/basic-form">💡 See Examples</a>
</div>
