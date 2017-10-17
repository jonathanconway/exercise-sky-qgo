# Solution notes

## Summary of solution

I solved the tasks by implementing changes to the components and/or the logic (reducer and actions).

Task 1: Added a delete button to the items in <ItemsList /> to afford deletion. Kept the component stateless and hooked the handler up to a prop (passing the item id), which gets mapped to a dispatch of an action via `connect`. Implemented the reducer handling of the action, to filter on all items except items matching the item id passed in.

Task 2: Added a checkbox to the items, to afford toggling completion. Again, kept <ItemsList /> stateless and handled the change event of the checkbox via a dispatch call. Needed to also keep track of the checked state per item, so I evaluated an isChecked flag from each item (enforced in PropTypes). Finally, implemented the reducer handling, to toggle the isChecked flag on the item matching the item id passed in.

Task 3: Decided to create a component just for displaying filters (<ItemsFilter />). Implemented the 'hide checked' filter as a checkbox. Keeping the component stateless, mapped the filter state and the change event to state and dispatch calls respectively, and implemented the reducer handling as a simple toggle of the variable. My approach to reducing the items was to pick up the filtering toggle from <ItemsList /> and apply the filters there. I think there may be weaknesses to this approach. Particularly, <ItemsList /> now takes on concerns of both displaying and filtering items.

## Way of working

I worked on the 3 development tasks, in order, one-at-a-time.

With logic/behaviour, I followed a "test-first" approach, writing tests first, then code to pass them, then refactoring the tests and/or code.

With configuration and user interface definition code, I switched between code and the browser, to visually verify that the code was producing the correct effects (e.g. that HTML code was rendering a visually correct result).

I tried to keep commits fairly regular and self-contained, focussing each commit on a particular feature or change.

## Assumptions

- I assume that the exercise comprises only these tasks, and I'm not expected to add any additional features.
- I assume that the code is only expected to run in a development context, as the exercise is code-focussed, and constrainted to 90-minutes.

## What I could do better / what I would change

### Production

- In a production setting:
  - I would test cross-browser compatibility
  - I would write at least one automated system-test, covering an end-to-end workflow
  - I would automate deployment making it consistent and repeatable
  - I would separate configuration, code, data and secrets (i.e. 12-factor principles)
  - I would test for, and ensure, accessibility, ideally up to WCAG2.0 AA
  - I would improve the look-and-feel

### Code quality

#### Bootstrapping

While create-react-app is good for getting started quickly, these days I prefer to lay an even more minimal foundation, bootstrapping a project with just the minimum necessary code to get it testing, building and rendering. I feel (and this is just personal opinion/taste) that create-react-app brings along too much baggage, in the form of the 'react-scripts' dependency. I have created my own minimalist bootstrap, in the form of a one-page shell script. You can view it here: [conwy.codes/cram](CRAM).

#### Placement of filtering code

I think my implementation of the filtering in <ItemsList /> could be done better. Instead of lumping filtering and displaying concerns into this one component, perhaps the concerns could be split out somehow.

One idea is to create a <FilteredItemsList /> higher-order-component, which takes items from state, applies filters, and then outputs filtered items to its children via props, or to a render method.

Another thought is to add an array of filtered items to state, which get manipulated by the reducer, in response to filtering events (by defaut, showing all items). In order to not overload the reducer with concerns, perhaps the filtering handling could be split into a separate reducer. Not sure if the above is mis-using Redux. Perhaps filtering is more a "view" concern rather than an "application state" concern. I'd have to have a think about that.

#### Extensibility of filtering

I would possibly break filtering out into independent, composable modules.

So instead of modelling filters directly within state:
  `{ isFilterHideCompletedActivated: [bool] }`

I might set up a key-value map:
  `{ filters: { hideCompleted: [true|false], ...: ..., } }`
        
And even map the filtering logic to a function that an items array can be filtered on:
  `{ filters: { hideCompleted: (item) => { ... } }`

This way, the filters could become like pluggable modules, that can be added/removed without breaking anything.

And each filter could also be connected to a React component, which renders the UI for setting its value:
  `{
    filters: {
      hideCompleted: {
        filter: (item) => {...},
        component = [React.Component]
      }
    }
  }`

But I'm aware that the above might be over-complicating things. :)

#### Classnames

I might consider introducing Jed Watson's delightful little 'class-names' module to help with the classNames.

#### Other ideas

- Would love to introduce flow typing, as I find it more concise than PropTypes.

- Semantic HTML: the items-missing <p> tag should be outside the <ul>, as <p>s aren't valid children of <ul>s. I might fix this if I have time.

- Unit testing: Not sure if this is being too pedantic, but it might be good to bring the connect() statements under test coverage. They could be seen as configuration, but they also need to run for the solution to work. I'd either cover them with a general unit-test that tests that "unit of behaviour" across all container components, or alternately, with a system test (see following item).

- System testing: I'd probably have one system test that serves the app, loads it in a headless browser, and runs through a basic happy path (e.g. view items → add item → complete item → hide/show completed → delete item)

- Accessibility testing: basic keyboard-only and screenreader tests to ensure the solution can be used by means of assistive technology, and colour contrast checks

- Finally, styling: spruce it up a bit, possibly using styled-components!