package com.malik12tree.bluetooth_print;

import android.annotation.SuppressLint;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothClass;
import android.bluetooth.BluetoothDevice;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

final class BluetoothDiscoveryReceiver extends BroadcastReceiver {

    interface Listener {
        void onDevice(BluetoothDevice device, String majorClass);

        void onFinished();
    }

    private final Listener listener;

    BluetoothDiscoveryReceiver(Listener listener) {
        this.listener = listener;
    }

    @SuppressLint("MissingPermission")
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (BluetoothDevice.ACTION_FOUND.equals(action)) {
            BluetoothDevice device;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
                device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE, BluetoothDevice.class);
            } else {
                device = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
            }
            if (device == null) return;
            String majorClass = reportableMajorClass(device.getBluetoothClass());
            if (majorClass != null) {
                listener.onDevice(device, majorClass);
            }
        } else if (BluetoothAdapter.ACTION_DISCOVERY_FINISHED.equals(action)) {
            listener.onFinished();
        }
    }

    static String reportableMajorClass(BluetoothClass bluetoothClass) {
        if (bluetoothClass == null) return "UNCATEGORIZED";
        int majorClass = bluetoothClass.getMajorDeviceClass();
        if (majorClass == BluetoothClass.Device.Major.IMAGING) return "IMAGING";
        if (majorClass == BluetoothClass.Device.Major.UNCATEGORIZED) return "UNCATEGORIZED";
        return null;
    }
}
