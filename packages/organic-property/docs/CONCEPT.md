
## Concept

```
import Field from '../Field';

const details = Field<{ firstName?: string, lastName?: string }>('details', CONTAINER)
    .link('../thing', { relative: true, twoWay: true, trigger: false })
    .link('something.thing', { relative: false, twoWay: true })
    // Miscellaneous data that can be attached to the field
    // This can be used for whatever reason
    // Setting the same attribute will replace the previous value for this field
    .attribute('somedata', { someMetaValue: 'example' })
    // Allow this field to be visible depending on roles
    // Allow is basically an alias of conditions
    .allow(['customer'])
    // Conditional checks will result in a visible true or false result
    // A condition will be added for each time condition is called (they stack)
    // Fields which fail conditional checks can be used to control frontend UI or strip out values for API requests
    .condition(doSomeConditionalCheck)
    .condition(doSomeConditionalCheck)
    // Provide validation logic for this field
    // Returns { valid: true|false, messages: [] }
    .validate(doSomeValidationCheck)
    // Children adds child fields
    // This can only be called once or it will replace the existing children if called again
    // Children can either be a container or a collection
    .children(CONTAINER, [
        Field<string | void>('firstName', STRING)
            .value('Richard')
            .link(PARENT)
            .link('./lastName')
            // If the on function returns something it will use this for the event
            // If the on function returns void it will not interfere with the event
            .on('init', convertToUpper)
            .on('get', convertToUpper)
            .on('set', convertToCamelCase)
            .on('update', doSomethingWhenThisUpdates)
            .on('reset', convertToCamelCase)
            .validate(doAnotherCheck),
        // An entity is a non field object
        Entity(),
        Field<strong | void>('lastName', STRING)
            .link(PARENT)
            .validate(doAnotherCheck)
    ]);

details.hydrate({
    firstName: 'Thomas',
    lastName: 'Ryans'
}, { extraValue: true }, false);

details.reset();
details.children.sort();
details.children.filter();
details.children.add(Field('newField', STRING))

details.visible = number;
details.invisble = number;
details.validation.valid = number;
details.validation.invalid = number;
details.validation.optional = number;

details.field('firstName').hydrate('James');
details.field('firstname').get();
details.field('firstname').remove();
details.get();

// Would like to be able to output the structure
```

```
details.hydrate({
    firstName: 'Thomas',
    lastName: 'Ryans'
}, { extraValue: true }, false);

details.reset();
details.children.sort();
details.children.filter();
details.children.add(Field('newField', STRING))

details.visible = number;
details.invisble = number;
details.validation.valid = number;
details.validation.invalid = number;
details.validation.optional = number;

details.field('firstName').hydrate('James');
details.field('firstname').get();
details.field('firstname').remove();
details.get();
```
