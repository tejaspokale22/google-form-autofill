# JSON Import Feature - Usage Guide

## Overview

The JSON Import feature allows you to quickly add multiple custom fields to your Google Form Autofill profile by importing them from a JSON file.

## How to Use

1. **Prepare your JSON file**

   - Create a JSON file with label-value pairs
   - Labels will become field names
   - Values will be pre-filled in the fields

2. **Import the file**

   - Open the extension popup
   - Click the "More" (⋯) button
   - Click "import as JSON"
   - Select your JSON file
   - Fields will be automatically added to the bottom of your custom fields list

3. **Save your profile**
   - After import, click "save profile" to persist the changes
   - The imported fields will now be available for autofilling forms

## JSON Format Examples

### Simple Format

```json
{
  "company name": "TechCorp Inc.",
  "position": "Software Engineer",
  "skills": "JavaScript, React, Node.js"
}
```

### Exported Format (from Export JSON feature)

```json
{
  "exportedAt": "2025-12-11T10:30:00.000Z",
  "totalFields": 3,
  "profile": {
    "company name": "TechCorp Inc.",
    "position": "Software Engineer",
    "skills": "JavaScript, React, Node.js"
  }
}
```

## Validation Rules

✅ **Accepted:**

- JSON files (.json extension)
- File size up to 5MB
- String or number values
- Non-empty labels and values

❌ **Rejected:**

- Non-JSON files
- Files larger than 5MB
- Empty labels or values
- Array values
- Object values
- null or undefined values

## Features

### Duplicate Prevention

- If an imported field has the same label as an existing custom field (case-insensitive), it will be skipped
- You'll see a notification showing how many fields were imported and how many were skipped

### Error Handling

- File type validation
- File size validation
- JSON parsing validation
- Data structure validation
- Individual field validation

### Automatic Cleanup

- Invalid fields are automatically filtered out
- You'll see a summary of valid vs invalid fields after import
- The file input is reset after each import (whether successful or not)

## Tips

1. **Export first, then modify**: Use the "export as JSON" feature to create a template, then modify it
2. **Label naming**: Use descriptive labels that match the form fields you want to fill
3. **Batch import**: Add many fields at once instead of creating them one by one
4. **Share templates**: Share JSON files with colleagues for consistent form filling

## Troubleshooting

**Problem**: "Please select a valid JSON file"

- **Solution**: Ensure your file has a `.json` extension

**Problem**: "Invalid JSON file"

- **Solution**: Validate your JSON syntax using a JSON validator (https://jsonlint.com)

**Problem**: "No valid fields found"

- **Solution**: Check that your JSON has at least one valid label-value pair with non-empty strings

**Problem**: Fields not showing after import

- **Solution**: Scroll down in the popup - imported fields are added at the bottom

**Problem**: Some fields were skipped

- **Solution**: Check for duplicate labels (case-insensitive) with existing custom fields

## Examples

See the included sample files:

- `sample-import.json` - Simple format example
- `sample-import-with-metadata.json` - Exported format example

You can use these files to test the import feature!
