# Enigma_Machine

Welcome to React Native build of the **Enigma Machine**! Currently, only the M3 series, which was used by the [Kriegsmarine](https://en.wikipedia.org/wiki/Kriegsmarine), is available in the app. For more info about the device, check out the [Enigma Machine](https://en.wikipedia.org/wiki/Enigma_machine).


---
<details> <summary>

## **Web Project Setup**
</summary>

- **Navigate to any build in `Archive`.**
- **Copy the `URL` of the build folder.**
- **Import from the link to an `Expo project`.**
</details>


---
<details> <summary>

## **Local Project Setup**
</summary>

- **Download any `Build` folder from `Archive`.**
- **Download the `System_Files` folder.**
- **Download the `assets` folder.**
- **Combine the downloaded folders into one.**
- **Change `app.json` and `eas.json` as needed.**


---
<details> <summary>

### **For starters**
</summary>

```bash
cd <Project>
npm install -g expo-cli eas-cli
npm install
expo-cli start --tunnel
```

- Replace `<Project>` with your project's directory name.
- Install `Expo` and `EAS` if not already for making the build.
- `expo start --tunnel` lets you access the app.
</details>


---
<details> <summary>

### **For production**
</summary>

```bash
eas build --platform [android, ios, all]
```

- Replace `[android, ios, all]` with the platform(s) of choice.
- Consult the [EAS Build Documentation](https://docs.expo.dev/build/introduction/) for more details on configuring production builds.
</details> </details>


---
<details> <summary>

## **Change Log**
</summary>

-----------------------------------
<details><summary>Build_1</summary>

- **First ever stable version of `<Enigma_Machine>`**
- **[Go to folder >>](./Archive/Build_1/)**
</details>

-----------------------------------
<details><summary>Build_2</summary>

- In `ShowTime.js` in the `textInput` conponents `textAlignVertical='top'` was added.
- **[Go to folder >>](./Archive/Build_2/)**
</details>

-----------------------------------
<details><summary>Build_3</summary>

- The deafult `background` for the `Picker` was set to `"White"`.
- Added a `key` property for each mapped conponent.
- **[Go to folder >>](./Archive/Build_3/)**
</details>

-----------------------------------
<details><summary>Build_4</summary>

- Substituted each `RNselectPicker` for a `Picker` component.
- Adapted the `style` objects for the newly added component.
- **[Go to folder >>](./Archive/Build_4/)**
</details> </details>


---
Thank you for following the development of **`Enigma Machine`**! Stay tuned for future updates.
