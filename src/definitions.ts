import type { PluginListenerHandle } from '@capacitor/core';

export const PrinterDPIs = [200, 300] as const;
export const PrintAlignments = ['left', 'center', 'right'] as const;
export const PrinterFonts = ['A', 'B'] as const;
export const BarcodeTextPlacements = ['none', 'above', 'below', 'both'] as const;
export const BarcodeTypes = ['UPC_A', 'EAN8', 'EAN13', 'CODE39', 'ITF', 'CODABAR', 'CODE128'] as const;
export const DataCodeTypes = ['QR', ...BarcodeTypes] as const;

/**
 * When `"default"`, uses default internal printer settings.
 */
export type IsEnabled = boolean | 'default';
export type PrinterDPI = (typeof PrinterDPIs)[number];
export type PrintAlignment = (typeof PrintAlignments)[number];
export type BarcodeTextPlacement = (typeof BarcodeTextPlacements)[number];
/**
 * Available printer font types.
 * - `A`: Size of 12x24.
 * - `B`: Size of 9x24.
 * */
export type PrinterFont = (typeof PrinterFonts)[number];
export type BarcodeType = (typeof BarcodeTypes)[number];
export type DataCodeType = (typeof DataCodeTypes)[number];
export type Base64Encodable = string | Blob | BufferSource | number[];

export interface BluetoothDevice {
  name: string;
  address: string;
  majorClass: 'IMAGING' | 'UNCATEGORIZED';
}

export interface BluetoothScanResult {
  timeoutMs: number;
}

export interface CapacitorThermalPrinterPlugin {
  /**
   * @category Connectivity
   */
  startScan(): Promise<BluetoothScanResult>;
  /**
   * @category Connectivity
   */
  stopScan(): Promise<void>;
  /**
   * @category Connectivity
   */
  connect(options: { address: string }): Promise<BluetoothDevice | null>;
  /**
   * @category Connectivity
   */
  disconnect(): Promise<void>;

  /**
   * @category Connectivity
   */
  isConnected(): Promise<boolean>;

  /**
   * Emitted when new devices are discovered.
   *
   * @remarks
   * If you're using Angular as your framework of choice, the handler doesn't run in zone.
   *
   * @category Event Listeners
   */
  addListener(
    event: 'discoverDevices',
    handler: (data: { devices: BluetoothDevice[] }) => void,
  ): Promise<PluginListenerHandle>;

  /**
   * Emitted when device discovery finishes.
   *
   * @remarks
   * If you're using Angular as your framework of choice, the handler doesn't run in zone.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.startScan}
   * @see {@linkcode CapacitorThermalPrinterPlugin.stopScan}
   *
   * @category Event Listeners
   */
  addListener(event: 'discoveryFinish', handler: () => void): Promise<PluginListenerHandle>;
  /**
   * Emitted when a printer is successfully connected.
   *
   * @remarks
   * If you're using Angular as your framework of choice, the handler doesn't run in zone.
   *
   * @category Event Listeners
   */
  addListener(event: 'connected', handler: (device: BluetoothDevice) => void): Promise<PluginListenerHandle>;
  /**
   * Emitted when a printer is disconnected.
   *
   * @remarks
   * If you're using Angular as your framework of choice, the handler doesn't run in zone.
   *
   * @category Event Listeners
   */
  addListener(event: 'disconnected', handler: () => void): Promise<PluginListenerHandle>;

  //#region Text Formatting
  /**
   * Formats following texts as bold.
   *
   * @param enabled - Defaults to `true` if not specified.
   *
   * @see {@linkcode IsEnabled}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   *
   * @category Text Formatting
   */
  bold(enabled?: IsEnabled): this;
  /**
   * Formats following texts as underlined.
   *
   * @param enabled - Defaults to `true` if not specified.
   *
   * @see {@linkcode IsEnabled}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   *
   * @category Text Formatting
   * */
  underline(enabled?: IsEnabled): this;
  /**
   * Formats following texts with double width of each character.
   *
   * @param enabled - Defaults to `true` if not specified.
   *
   * @see {@linkcode IsEnabled}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.doubleHeight}
   *
   * @category Text Formatting
   */
  doubleWidth(enabled?: IsEnabled): this;
  /**
   * Formats following texts with double height of each character.
   *
   * @param enabled - Defaults to `true` if not specified.
   *
   * @see {@linkcode IsEnabled}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.doubleWidth}
   *
   * @category Text Formatting
   */
  doubleHeight(enabled?: IsEnabled): this;

  /**
   * Formats following texts with inverted colors. (white text on black background)
   *
   * @param enabled - Defaults to `true` if not specified.
   *
   * @see {@linkcode IsEnabled}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   *
   * @category Text Formatting
   */
  inverse(enabled?: IsEnabled): this;
  //#endregion

  //#region Image Formatting
  /**
   *
   * Sets the DPI used to correctly encode the width of the image used in {@linkcode CapacitorThermalPrinterPlugin.limitWidth} based on the printer.
   *
   * @param dpi - The DPI value.
   *
   * @remarks
   * - The initial DPI is 200.
   * - Must be either 200 or 300. Any other value will be treated as 200.
   *
   * @see {@linkcode PrinterDPI}
   * @see {@linkcode PrinterDPIs}
   * @see {@linkcode CapacitorThermalPrinterPlugin.limitWidth}
   * @see {@linkcode CapacitorThermalPrinterPlugin.image}
   *
   * @category Image Formatting
   */
  dpi(dpi: PrinterDPI): this;
  /**
   * Limits the width of following images.
   *
   * @param width - The maximum width of the image in millimeters ranging from 1mm to 880mm.
   *
   * @remarks
   * - The initial maximum width is 45mm.
   * - If the width is less than 1mm, this will fail silently.
   * - If the width is greater than 880mm it will be treated as 880mm.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.dpi}
   * @see {@linkcode CapacitorThermalPrinterPlugin.image}
   *
   * @category Image Formatting
   */
  limitWidth(width: number): this;
  //#endregion

  //#region Hybrid Formatting
  /**
   * Aligns following texts, images, qr codes and barcodes with the given alignment.
   *
   * @param alignment - Alignment to use.
   *
   * @see {@linkcode PrintAlignment}
   * @see {@linkcode PrintAlignments}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.image}
   * @see {@linkcode CapacitorThermalPrinterPlugin.qr}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   *
   * @category Hybrid Formatting
   */
  align(alignment: PrintAlignment): this;
  /**
   * Sets the character spacing of following texts and barcode texts.
   *
   * @param charSpacing - The character spacing in millimeters ranging from 0mm to 30mm.
   *
   * @remarks
   * - The initial spacing is 1mm.
   * - If the spacing is less than 0mm it will be treated as 0mm.
   * - If the spacing is greater than 30mm it will be treated as 30mm.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   *
   * @category Hybrid Formatting
   */
  charSpacing(charSpacing: number): this;
  /**
   * Sets the line spacing of following texts, images, qr codes, barcodes with the given spacing.
   *
   * @param lineSpacing - The line spacing in millimeters ranging from 0mm to 255mm.
   *
   * @remarks
   * - The initial spacing is 30mm.
   * - If the spacing is less than 0mm it will be treated as 0mm.
   * - If the spacing is greater than 255mm it will be treated as 255mm.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.image}
   * @see {@linkcode CapacitorThermalPrinterPlugin.qr}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   *
   * @category Hybrid Formatting
   */
  lineSpacing(lineSpacing: number): this;
  /**
   * Formats following texts and barcode texts with the given font.
   *
   * @param font - Font to use.
   *
   * @see {@linkcode PrinterFont}
   * @see {@linkcode PrinterFonts}
   * @see {@linkcode CapacitorThermalPrinterPlugin.text}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   *
   * @category Hybrid Formatting
   */
  font(font: PrinterFont): this;
  /**
   * Clears all formatting.
   *
   * @category Hybrid Formatting
   */
  clearFormatting(): this;
  //#endregion

  //#region Data Code Formatting
  /**
   * Sets the width of following barcodes.
   *
   * @param width - Width of barcode ranging from 3 to 6.
   *
   * @remarks
   * - The initial width is 3.
   * - Depending on the printer model, it may **halt** if the width exceeds it's printing width.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcodeHeight}
   *
   * @category Barcode Formatting
   */
  barcodeWidth(width: number): this;
  /**
   * Sets the height of following barcodes.
   *
   * @param height - Height of barcode in millimeters ranging from 1mm to 255mm.
   *
   * @remarks
   * - The initial height is 72mm.
   * - If the height is less than 1mm it will be treated as 1mm.
   * - If the height is greater than 255mm it will be treated as 255mm.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcodeWidth}
   *
   * @category Barcode Formatting
   */
  barcodeHeight(height: number): this;
  /**
   * Sets the placement of following barcode texts.
   *
   * @param placement - Placement to use.
   *
   * @see {@linkcode BarcodeTextPlacement}
   * @see {@linkcode BarcodeTextPlacements}
   * @see {@linkcode CapacitorThermalPrinterPlugin.barcode}
   *
   * @category Barcode Formatting
   */
  barcodeTextPlacement(placement: BarcodeTextPlacement): this;
  //#endregion

  //#region Content
  /**
   * Adds text to the print queue.
   *
   * @param text - Text to use.
   *
   * @remarks
   * To print a newline, explicitly end the text with a newline character (`\n`).
   *
   * @category Content
   */
  text(text: string): this;
  /**
   * Adds an image to the print queue.
   *
   * @param data - Image data. Can be a URL, a data URL, a Base64, a Blob, a BufferSource or a number array.
   *
   * @remarks
   * The supported image formats the running platform's supported formats.
   * For maximum compatibility, use PNG and JPEG formats.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.limitWidth}
   *
   * @category Content
   */
  image(data: Base64Encodable): this;
  /**
   * Adds a QR code to the print queue.
   *
   * @param data - QR code data.
   *
   * @category Content
   */
  qr(data: string): this;
  /**
   * Adds a barcode to the print queue.
   *
   * @param type - Barcode type.
   * @param data - Barcode data.
   *
   * @see {@linkcode BarcodeType}
   * @see {@linkcode DataCodeType}
   * @see {@linkcode BarcodeTypes}
   * @see {@linkcode DataCodeTypes}
   *
   * @category Content
   */
  barcode(type: BarcodeType, data: string): this;
  /**
   * Adds raw data to the print queue. Use only if you know what you are doing.
   *
   * @param data - The data. Can be a URL, a data URL, a Base64, a Blob, a BufferSource or a number array.
   *
   * @remarks
   * Each byte will be truncated/wrapped if it's outside the range of 0 to 255.
   *
   * @category Content
   */
  raw(data: Base64Encodable): this;
  /**
   * Adds a self-test instruction to the print queue which usually prints general information about the printer and its capabilities.
   *
   * @remarks
   * The printer may not support this instruction and fail silently.
   *
   * @category Content
   */
  selfTest(): this;
  //#endregion

  //#region Content Actions
  /**
   * Adds a beep instruction to the print queue.
   *
   * @remarks
   * The printer may not support this instruction and fail silently.
   *
   * @category Content Actions
   */
  beep(): this;
  /**
   * Adds an open drawer instruction to the print queue.
   *
   * @remarks
   * The printer may not support this instruction and fail silently.
   *
   * @category Content Actions
   */
  openDrawer(): this;
  /**
   * Adds a cut instruction to the print queue.
   *
   * @param half - If true, performs a half cut depending on the printer model.
   *
   * @remarks
   * - The printer may not support the full cut instruction and fail silently.
   * - The printer may not support the half cut instruction and fail silently.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.feedCutPaper}
   *
   * @category Content Actions
   */
  cutPaper(half?: boolean): this;
  /**
   * Adds a cut instruction to the print queue preceded by a line feed.
   *
   * @param half - If true, performs a half cut depending on the printer model.
   * @remarks
   * - The printer may not support the full cut instruction and fail silently.
   * - The printer may not support the half cut instruction and fail silently.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.cutPaper}
   *
   * @category Content Actions
   */
  feedCutPaper(half?: boolean): this;
  //#endregion

  //#region Printing Actions
  /**
   * Resets the print queue while clearing all formatting.
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.write}
   * @see {@linkcode CapacitorThermalPrinterPlugin.clearFormatting}
   *
   * @category Printing Actions
   */
  begin(): this;
  /**
   * Writes the print queue to the printer.
   *
   * @remarks
   * Calling this method doesn't reset the print queue
   *
   * @see {@linkcode CapacitorThermalPrinterPlugin.begin}
   *
   * @category Printing Actions
   */
  write(): Promise<void>;
  //#endregion
}
