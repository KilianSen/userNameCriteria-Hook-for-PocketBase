# userNameCriteria for PocketBase
A simple PocketBase Hook that allows to restrict usernames at user creation, by intercepting and blocking requests and sending a multi-language response back.

# Features
 - Set minimum and maximum length for usernames
 - Set if username must contain a special character
 - Set if username must contain a number
 - Set if username must contain an uppercase letter
 - Set if username must contain a lowercase letter
 - Set custom responses for each criterion
 - Multi Language response Support
 - Block user creation if criteria is not met
 - Log blocked requests

# Installation
This hook requires [HookSettings](https://github.com/KilianSen/hookSettings-for-PocketBase)

1. Download the latest release from the [releases page](https://github.com/KilianSen/userNameCriteria-Hook-for-PocketBase/releases) and put it in your `pb_hooks` folder
2. Restart/Reload PocketBase to generate the default configuration
3. Go into the PocketBase UI
4. Go to the `pbHookSettings` collection
5. Tweak `userNameCriteria` settings to your liking
