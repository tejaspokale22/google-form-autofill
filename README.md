# google-form-autofill

A Chrome extension to autofill Google Forms with saved profile data and custom fields.

## Features

- **Autofill Google Forms**: Save your details once and reuse them across similar forms
- **Custom Fields**: Add custom fields for any form-specific data
- **Import/Export**: Import and export your profile data as JSON or PDF
- **Field Management**: Copy, remove, or hide fields as needed
- **Form Reset**: Clear all filled data from a Google Form

## Import JSON Feature

The extension supports importing custom fields from JSON files. This allows you to:

- Quickly add multiple custom fields at once
- Share field templates with others
- Backup and restore your custom field configurations

### Supported JSON Formats

#### Simple Format (Key-Value Pairs)

```json
{
  "company name": "TechCorp Inc.",
  "position": "Software Engineer",
  "experience years": "3",
  "skills": "JavaScript, React, Node.js"
}
```

#### Exported Format (With Metadata)

```json
{
  "exportedAt": "2025-12-11T10:30:00.000Z",
  "totalFields": 4,
  "profile": {
    "company name": "TechCorp Inc.",
    "position": "Software Engineer",
    "experience years": "3",
    "skills": "JavaScript, React, Node.js"
  }
}
```

### How to Import JSON

1. Click the "More" (three dots) button in the extension popup
2. Click "import as JSON"
3. Select your JSON file
4. The fields will be automatically added to your custom fields list at the bottom

### Import Validation

The import feature includes robust validation:

- **File Type**: Only `.json` files are accepted
- **File Size**: Maximum 5MB per file
- **Data Validation**:
  - Labels must be non-empty strings
  - Values must be strings or numbers
  - Invalid entries are skipped with a notification
- **Duplicate Prevention**: Fields with existing labels won't be added twice

### Example Import File

See `sample-import.json` for an example of the JSON format:

```json
{
  "company name": "TechCorp Inc.",
  "position": "Software Engineer",
  "experience years": "3",
  "skills": "JavaScript, React, Node.js",
  "linkedin profile": "https://linkedin.com/in/johndoe",
  "github username": "johndoe",
  "expected salary": "80000",
  "notice period": "30 days",
  "availability": "Immediate"
}
```

## Installation

1. Clone this repository
2. Run `npm install`
3. Run `npm run build`
4. Load the `dist` folder as an unpacked extension in Chrome

## Development

```bash
npm run dev
```

## License

MIT
