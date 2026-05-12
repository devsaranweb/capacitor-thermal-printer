// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorThermalPrinter",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "CapacitorThermalPrinter",
            targets: ["CapacitorThermalPrinterPlugin"]
        )
    ],
    dependencies: [
        .package(
            url: "https://github.com/ionic-team/capacitor-swift-pm.git",
            "7.0.0"..<"9.0.0"
        )
    ],
    targets: [
        .binaryTarget(
            name: "RTPrinterSDK",
            path: "ios/Plugin/SDK/RTPrinterSDK.xcframework"
        ),
        .target(
            name: "CapacitorThermalPrinterPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
                "RTPrinterSDK"
            ],
            path: "ios/Plugin",
            exclude: [
                "Info.plist",
                "SDK/include",
                "SDK/libRTPrinterSDK.a",
                "SDK/RTPrinterSDK.xcframework"
            ],
            resources: [.process("SDK/Resource")],
            publicHeadersPath: "."
        )
    ]
)
