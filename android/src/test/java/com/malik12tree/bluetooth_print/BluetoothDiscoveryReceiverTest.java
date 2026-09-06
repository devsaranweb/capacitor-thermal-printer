package com.malik12tree.bluetooth_print;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import android.bluetooth.BluetoothClass;
import android.bluetooth.BluetoothDevice;
import android.content.Intent;
import java.util.concurrent.atomic.AtomicReference;
import org.junit.Test;

public class BluetoothDiscoveryReceiverTest {

    @Test
    public void uncategorizedDeviceIsReportedByReceiver() {
        BluetoothDevice device = mock(BluetoothDevice.class);
        BluetoothClass bluetoothClass = mock(BluetoothClass.class);
        Intent intent = mock(Intent.class);
        when(device.getBluetoothClass()).thenReturn(bluetoothClass);
        when(bluetoothClass.getMajorDeviceClass()).thenReturn(BluetoothClass.Device.Major.UNCATEGORIZED);
        when(intent.getAction()).thenReturn(BluetoothDevice.ACTION_FOUND);
        when(intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)).thenReturn(device);

        AtomicReference<BluetoothDevice> reportedDevice = new AtomicReference<>();
        AtomicReference<String> reportedClass = new AtomicReference<>();
        BluetoothDiscoveryReceiver receiver = new BluetoothDiscoveryReceiver(
            new BluetoothDiscoveryReceiver.Listener() {
                @Override
                public void onDevice(BluetoothDevice found, String majorClass) {
                    reportedDevice.set(found);
                    reportedClass.set(majorClass);
                }

                @Override
                public void onFinished() {}
            }
        );

        receiver.onReceive(null, intent);

        assertSame(device, reportedDevice.get());
        assertEquals("UNCATEGORIZED", reportedClass.get());
    }

    @Test
    public void phoneDeviceIsNotReportedByReceiver() {
        BluetoothDevice device = mock(BluetoothDevice.class);
        BluetoothClass bluetoothClass = mock(BluetoothClass.class);
        Intent intent = mock(Intent.class);
        when(device.getBluetoothClass()).thenReturn(bluetoothClass);
        when(bluetoothClass.getMajorDeviceClass()).thenReturn(BluetoothClass.Device.Major.PHONE);
        when(intent.getAction()).thenReturn(BluetoothDevice.ACTION_FOUND);
        when(intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE)).thenReturn(device);

        AtomicReference<BluetoothDevice> reportedDevice = new AtomicReference<>();
        BluetoothDiscoveryReceiver receiver = new BluetoothDiscoveryReceiver(
            new BluetoothDiscoveryReceiver.Listener() {
                @Override
                public void onDevice(BluetoothDevice found, String majorClass) {
                    reportedDevice.set(found);
                }

                @Override
                public void onFinished() {}
            }
        );

        receiver.onReceive(null, intent);

        assertNull(reportedDevice.get());
    }
}
