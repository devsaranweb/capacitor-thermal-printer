<h1 align="center">
  <img
    src="https://raw.githubusercontent.com/Malik12tree/capacitor-thermal-printer/main/assets/Logo.png"
    width="64"
    valign="middle"
  />
  <code>capacitor-thermal-printer</code>
  <br>
  <img src="https://img.shields.io/badge/bluetooth-6796f9?&logo=bluetooth&logoColor=white">
  <img src="https://img.shields.io/badge/Capacitor-119EFF?logo=Capacitor&logoColor=white">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Android-3DDC84?logo=android&logoColor=white">
  <img src="https://img.shields.io/badge/iOS-157EFB?logo=apple&logoColor=white">
  <br>
  <img src="https://img.shields.io/github/license/Malik12tree/capacitor-thermal-printer?color=orange">

</h1>

High-speed, reliable bluetooth ESC thermal printer and encoder Capacitor plugin. Both on Android and iOS!

- [x] Using the official RTPrinter SDK by [Rongta Technology](https://www.rongtatech.com/) <3
- [x] Cross-platform compatibility (Android & iOS)
- [x] **_Swift_** speeds on iOS of [BLE](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy) **(known for it's pain-in-the-ass speed)**

## Install

```bash
npm install capacitor-thermal-printer --save
npx cap sync
```

The plugin now ships a `Package.swift`, so Capacitor 8 apps using Swift Package Manager (`ios/App/CapApp-SPM/Package.swift`) pick it up automatically on `cap sync`. CocoaPods consumers continue to work via the updated `CapacitorThermalPrinter.podspec` (now `vendored_frameworks`).

### iOS device-only (Simulator unsupported)

The bundled RTPrinterSDK is distributed by Rongta as an `arm64` device-only static library, wrapped here as `RTPrinterSDK.xcframework`. The xcframework therefore ships **only the `ios-arm64` slice** — iOS Simulator builds (`arm64-simulator`, `x86_64-simulator`) will fail to link until Rongta publishes a simulator slice. Build, debug, and test the printer on a real iOS device. Web and Android workflows are unaffected.

### Additional iOS Setup

<img src="./assets/ios-include.png" />

Open your iOS project in Xcode, then:

1. In the left sidebar, select your project (usually named "App").
2. Select your main target (usually also named "App").
3. Navigate to "Build Phases" tab.
4. Under "Copy Bundle Resources", click the "+" button and choose "Add Other..."
5. Navigate to the `node_modules/capacitor-thermal-printer/ios/Plugin/Resources/ble_serial.plist` file and select it

And voilà! You're all set!

## Example

Make sure to check the Ionic Angular example in the [example](./example) folder.

### 1. Import the plugin

```ts
import { CapacitorThermalPrinter } from 'capacitor-thermal-printer';
```

### 2. Connect to printer

```ts
const device = await CapacitorThermalPrinter.connect({
  address: 'XX:XX:XX:XX:XX:XX',
});
if (device === null) {
  console.log('Woops, failed to connect!');
} else {
    console.log('Connected!', device.name, device.address);
}
```

You can also use the `startScan` method to discover nearby devices.

- On Android, only printers will be discovered.
- On iOS, all bluetooth devices will be discovered.

```ts
CapacitorThermalPrinter.addListener('discoverDevices', (devices) => {
  console.log('Discovered devices list:', devices);
});

await CapacitorThermalPrinter.startScan();
```

### 3. Print sample receipt

```ts
await CapacitorThermalPrinter.begin()
  .align('center')

  .image('https://raw.githubusercontent.com/Malik12tree/capacitor-thermal-printer/main/assets/Logo-Black.png')

  .bold()
  .underline()
  .text('The amazing store\n')

  .doubleWidth()
  .text('RECEIPT\n')
  .clearFormatting()

  .text('Item 1: $10.00\n')
  .text('Item 2: $15.00\n')

  .align('right')
  .text('Total: $25.00\n')

  .align('center')
  .qr('https://example.com')
  .barcode('UPC_A', '123456789012')

  .cutPaper()

  .write()
  .then(() => console.log('Printed!'))
  .catch((e) => console.error('Failed to print!', e));
```

## Documentation

Check out the [Docs](./docs/README.md)!

## Issues

If you encounter any issues with this plugin, please report them at [Issues](https://github.com/Malik12tree/capacitor-thermal-printer/issues)

## Contributing

We're open to, and grateful for, any contributions made! Make sure to check [Contribution Guidelines](./CONTRIBUTING.md)
