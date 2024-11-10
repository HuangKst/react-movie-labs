# react-movie-labs



## Extend the App

### Credits Display Components

#### 1. `CreditsList` Component

- **Description**: The `CreditsList` component is used to display a list of cast members for a movie or series. It accepts a `credits` array as a prop and iterates over this array to render a card for each cast member.
- **Usage**: Pass a `credits` array containing cast data as a prop. If `credits` is `undefined` or an empty array, the component will display the message “No cast information available.”
- Key Implementation Details:
  - Utilizes `Grid` layout to ensure cast cards are displayed responsively across different screen sizes.
  - Performs `undefined` checks on each `cast` item in the `map` function to prevent errors when data is still loading.

#### 2. `CreditItem` Component

- **Description**: The `CreditItem` component displays individual cast member details, including their profile picture, name, character, and episode count.
- **Usage**: The `CreditsList` component passes each `cast` object to `CreditItem`. `CreditItem` uses a `Card` layout to create the visual presentation of each cast card.
- Key Implementation Details:
  - Uses `Card` and `CardMedia` components to display the cast member’s profile picture and basic information.
  - Provides a default placeholder image in case the `profile_path` is missing from the cast data.
  - Includes default values when the `cast` object is `undefined` or lacks certain properties to prevent errors caused by accessing undefined properties.

#### Code Example

```js
// Using CreditsList in a parent component
<CreditsList credits={creditsData.cast} />
```