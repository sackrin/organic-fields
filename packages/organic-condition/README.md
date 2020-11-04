# Organic Field

`yarn add @sackrin/organic-field` or `npm i -s @sackrin/organic-field`

## Creating basic field

```
import Field from '@sackrin/organic-field/Field';

// Create the field
const exampleField = Field<void | string>('exampleField', 'STRING');
// Add a value to the field
exampleField.value('Johnny');
// Read the value of the field
console.log(exampleField.value());
// outputs Johnny
```
