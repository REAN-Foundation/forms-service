# Basic Form Creation Example

> Learn how to create a simple contact form using the Form Service API

## Overview

This example demonstrates how to create a basic contact form with multiple field types, sections, and simple validation. We'll walk through the entire process from form template creation to form submission.

## Form Structure

Our contact form will have the following structure:

```
Contact Form
├── Personal Information
│   ├── Full Name (text, required)
│   ├── Email Address (email, required)
│   └── Phone Number (tel, optional)
├── Address Information
│   ├── Street Address (text, required)
│   ├── City (text, required)
│   ├── State (select, required)
│   └── ZIP Code (text, required)
└── Additional Information
    ├── Subject (text, required)
    └── Message (textarea, required)
```

## Step 1: Create Form Template

### API Request

<span class="api-method post">POST</span> `/api/forms/templates`

```json
{
  "name": "Contact Form",
  "description": "A simple contact form for customer inquiries",
  "sections": [
    {
      "name": "Personal Information",
      "description": "Basic contact details",
      "order": 1,
      "fields": [
        {
          "name": "fullName",
          "label": "Full Name",
          "type": "text",
          "required": true,
          "order": 1,
          "placeholder": "Enter your full name",
          "validation": {
            "minLength": 2,
            "maxLength": 100
          }
        },
        {
          "name": "email",
          "label": "Email Address",
          "type": "email",
          "required": true,
          "order": 2,
          "placeholder": "Enter your email address",
          "validation": {
            "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
          }
        },
        {
          "name": "phone",
          "label": "Phone Number",
          "type": "tel",
          "required": false,
          "order": 3,
          "placeholder": "Enter your phone number",
          "validation": {
            "pattern": "^[+]?[1-9]\\d{1,14}$"
          }
        }
      ]
    },
    {
      "name": "Address Information",
      "description": "Mailing address details",
      "order": 2,
      "fields": [
        {
          "name": "streetAddress",
          "label": "Street Address",
          "type": "text",
          "required": true,
          "order": 1,
          "placeholder": "Enter your street address"
        },
        {
          "name": "city",
          "label": "City",
          "type": "text",
          "required": true,
          "order": 2,
          "placeholder": "Enter your city"
        },
        {
          "name": "state",
          "label": "State",
          "type": "select",
          "required": true,
          "order": 3,
          "options": [
            {"value": "AL", "label": "Alabama"},
            {"value": "AK", "label": "Alaska"},
            {"value": "AZ", "label": "Arizona"},
            {"value": "AR", "label": "Arkansas"},
            {"value": "CA", "label": "California"},
            {"value": "CO", "label": "Colorado"},
            {"value": "CT", "label": "Connecticut"},
            {"value": "DE", "label": "Delaware"},
            {"value": "FL", "label": "Florida"},
            {"value": "GA", "label": "Georgia"},
            {"value": "HI", "label": "Hawaii"},
            {"value": "ID", "label": "Idaho"},
            {"value": "IL", "label": "Illinois"},
            {"value": "IN", "label": "Indiana"},
            {"value": "IA", "label": "Iowa"},
            {"value": "KS", "label": "Kansas"},
            {"value": "KY", "label": "Kentucky"},
            {"value": "LA", "label": "Louisiana"},
            {"value": "ME", "label": "Maine"},
            {"value": "MD", "label": "Maryland"},
            {"value": "MA", "label": "Massachusetts"},
            {"value": "MI", "label": "Michigan"},
            {"value": "MN", "label": "Minnesota"},
            {"value": "MS", "label": "Mississippi"},
            {"value": "MO", "label": "Missouri"},
            {"value": "MT", "label": "Montana"},
            {"value": "NE", "label": "Nebraska"},
            {"value": "NV", "label": "Nevada"},
            {"value": "NH", "label": "New Hampshire"},
            {"value": "NJ", "label": "New Jersey"},
            {"value": "NM", "label": "New Mexico"},
            {"value": "NY", "label": "New York"},
            {"value": "NC", "label": "North Carolina"},
            {"value": "ND", "label": "North Dakota"},
            {"value": "OH", "label": "Ohio"},
            {"value": "OK", "label": "Oklahoma"},
            {"value": "OR", "label": "Oregon"},
            {"value": "PA", "label": "Pennsylvania"},
            {"value": "RI", "label": "Rhode Island"},
            {"value": "SC", "label": "South Carolina"},
            {"value": "SD", "label": "South Dakota"},
            {"value": "TN", "label": "Tennessee"},
            {"value": "TX", "label": "Texas"},
            {"value": "UT", "label": "Utah"},
            {"value": "VT", "label": "Vermont"},
            {"value": "VA", "label": "Virginia"},
            {"value": "WA", "label": "Washington"},
            {"value": "WV", "label": "West Virginia"},
            {"value": "WI", "label": "Wisconsin"},
            {"value": "WY", "label": "Wyoming"}
          ]
        },
        {
          "name": "zipCode",
          "label": "ZIP Code",
          "type": "text",
          "required": true,
          "order": 4,
          "placeholder": "Enter your ZIP code",
          "validation": {
            "pattern": "^\\d{5}(-\\d{4})?$"
          }
        }
      ]
    },
    {
      "name": "Additional Information",
      "description": "Inquiry details",
      "order": 3,
      "fields": [
        {
          "name": "subject",
          "label": "Subject",
          "type": "text",
          "required": true,
          "order": 1,
          "placeholder": "Enter the subject of your inquiry",
          "validation": {
            "minLength": 5,
            "maxLength": 200
          }
        },
        {
          "name": "message",
          "label": "Message",
          "type": "textarea",
          "required": true,
          "order": 2,
          "placeholder": "Enter your message",
          "rows": 5,
          "validation": {
            "minLength": 10,
            "maxLength": 2000
          }
        }
      ]
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "template-uuid-123",
    "name": "Contact Form",
    "description": "A simple contact form for customer inquiries",
    "sections": [
      {
        "id": "section-uuid-1",
        "name": "Personal Information",
        "description": "Basic contact details",
        "order": 1,
        "fields": [
          {
            "id": "field-uuid-1",
            "name": "fullName",
            "label": "Full Name",
            "type": "text",
            "required": true,
            "order": 1,
            "placeholder": "Enter your full name",
            "validation": {
              "minLength": 2,
              "maxLength": 100
            }
          },
          {
            "id": "field-uuid-2",
            "name": "email",
            "label": "Email Address",
            "type": "email",
            "required": true,
            "order": 2,
            "placeholder": "Enter your email address",
            "validation": {
              "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
            }
          },
          {
            "id": "field-uuid-3",
            "name": "phone",
            "label": "Phone Number",
            "type": "tel",
            "required": false,
            "order": 3,
            "placeholder": "Enter your phone number",
            "validation": {
              "pattern": "^[+]?[1-9]\\d{1,14}$"
            }
          }
        ]
      }
    ],
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

## Step 2: Submit Form Data

### API Request

<span class="api-method post">POST</span> `/api/forms/submissions`

```json
{
  "templateId": "template-uuid-123",
  "responses": [
    {
      "fieldName": "fullName",
      "value": "John Doe"
    },
    {
      "fieldName": "email",
      "value": "john.doe@example.com"
    },
    {
      "fieldName": "phone",
      "value": "+1-555-123-4567"
    },
    {
      "fieldName": "streetAddress",
      "value": "123 Main Street"
    },
    {
      "fieldName": "city",
      "value": "New York"
    },
    {
      "fieldName": "state",
      "value": "NY"
    },
    {
      "fieldName": "zipCode",
      "value": "10001"
    },
    {
      "fieldName": "subject",
      "value": "Product Inquiry"
    },
    {
      "fieldName": "message",
      "value": "I would like to know more about your products and pricing. Please send me additional information."
    }
  ]
}
```

### Response

```json
{
  "success": true,
  "data": {
    "id": "submission-uuid-456",
    "templateId": "template-uuid-123",
    "responses": [
      {
        "id": "response-uuid-1",
        "fieldName": "fullName",
        "value": "John Doe",
        "fieldId": "field-uuid-1"
      },
      {
        "id": "response-uuid-2",
        "fieldName": "email",
        "value": "john.doe@example.com",
        "fieldId": "field-uuid-2"
      }
    ],
    "status": "submitted",
    "submittedAt": "2024-01-15T10:35:00.000Z",
    "createdAt": "2024-01-15T10:35:00.000Z"
  }
}
```

## Step 3: Retrieve Form Submissions

### API Request

<span class="api-method get">GET</span> `/api/forms/submissions?templateId=template-uuid-123`

### Response

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "submission-uuid-456",
        "templateId": "template-uuid-123",
        "responses": [
          {
            "fieldName": "fullName",
            "value": "John Doe"
          },
          {
            "fieldName": "email",
            "value": "john.doe@example.com"
          }
        ],
        "status": "submitted",
        "submittedAt": "2024-01-15T10:35:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "totalPages": 1,
      "hasNext": false,
      "hasPrev": false
    }
  }
}
```

## Using Bruno Collection

### 1. Import the Collection

1. Open Bruno
2. Import the collection from `bruno/form-service/collection.bru`
3. Set up environment variables in `bruno/form-service/environments/forms-service.bru`

### 2. Environment Variables

```json
{
  "baseUrl": "http://localhost:3000/api",
  "templateId": "",
  "submissionId": ""
}
```

### 3. Run the Requests

1. **Create Form Template**: Run "Create a form template" request
2. **Copy Template ID**: Copy the returned template ID to environment variable
3. **Submit Form**: Run "Create a new form submission" request
4. **View Submissions**: Run "Get form submissions" request

## Frontend Integration Example

### React Component

```jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/forms/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: 'template-uuid-123',
          responses: Object.entries(formData).map(([fieldName, value]) => ({
            fieldName,
            value
          }))
        })
      });

      const result = await response.json();

      if (result.success) {
        alert('Form submitted successfully!');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          streetAddress: '',
          city: '',
          state: '',
          zipCode: '',
          subject: '',
          message: ''
        });
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h2>Contact Us</h2>
      
      {error && <div className="error">{error}</div>}
      
      <div className="section">
        <h3>Personal Information</h3>
        
        <div className="field">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      <div className="section">
        <h3>Address Information</h3>
        
        <div className="field">
          <label htmlFor="streetAddress">Street Address *</label>
          <input
            type="text"
            id="streetAddress"
            value={formData.streetAddress}
            onChange={(e) => handleChange('streetAddress', e.target.value)}
            placeholder="Enter your street address"
            required
          />
        </div>

        <div className="field-row">
          <div className="field">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="Enter your city"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              required
            >
              <option value="">Select a state</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              {/* Add all states */}
            </select>
          </div>

          <div className="field">
            <label htmlFor="zipCode">ZIP Code *</label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              placeholder="Enter your ZIP code"
              required
            />
          </div>
        </div>
      </div>

      <div className="section">
        <h3>Additional Information</h3>
        
        <div className="field">
          <label htmlFor="subject">Subject *</label>
          <input
            type="text"
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="Enter the subject of your inquiry"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="message">Message *</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            placeholder="Enter your message"
            rows={5}
            required
          />
        </div>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Form'}
      </button>
    </form>
  );
};

export default ContactForm;
```

## CSS Styling

```css
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.contact-form h2 {
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.section {
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.section h3 {
  color: #555;
  margin-bottom: 20px;
  border-bottom: 2px solid #42b983;
  padding-bottom: 10px;
}

.field {
  margin-bottom: 15px;
}

.field-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
}

.field label {
  display: block;
  margin-bottom: 5px;
  font-weight: 600;
  color: #333;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.2);
}

.field textarea {
  resize: vertical;
  min-height: 100px;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #ffcdd2;
}

button {
  background-color: #42b983;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

button:hover:not(:disabled) {
  background-color: #3aa876;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .field-row {
    grid-template-columns: 1fr;
  }
}
```

## Next Steps

- 🔗 [Conditional Fields](examples/conditional-fields.md) - Add skip logic to your form
- ✅ [Validation Examples](examples/validation-examples.md) - Implement advanced validation
- 🧮 [Calculation Examples](examples/calculation-examples.md) - Add computed fields
- 🔧 [API Integration](examples/api-integration-examples.md) - Integrate with your application 