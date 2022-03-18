# Cider Tracker Blocker
A plugin for Cider that aims to block trackers as well as ads based on [`@cliqz/adblocker-electron`](https://github.com/ghostery/adblocker/blob/master/packages/adblocker-electron/README.md)

## Development
### Requirements
- `node` 14+
- `yarn` (optional)
- [Cider](https://github.com/ciderapp/Cider) (only needed for testing)

### Bundling and building
To be able to use it in Cider you need to install the plugin's dependencies by running:

```
npm install
```

Or, if you installed yarn:

```
yarn install
```

After installing all the required dependencies, you have to bundle them by running:

```
npm run build
```

Or, if you installed yarn:

```
yarn build
```

### Testing the plugin

After building and bundling the plugin, you need to do the following:

- Copy the `index.js` and the `529.js` file from the project's root folder
- Create a `plugins` folder in the `%HOME%/%CONFIG_DIR%/Cider` user data directory (the directory path may vary between different OSes)
- Put the `index.js` and the `529.js` file in the `plugins` folder
- Launch Cider

