package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.util.ArrayList;

/**
 * Created by sajarora on 4/8/17.
 */

public class HRDataType extends HealthDataType {

    private ArrayList<DataPoint> mDataset;

    public HRDataType() {
        super(HealthConstants.HeartRate.HEALTH_DATA_TYPE, "HR Data");
        mDataset = new ArrayList<>();
    }

    private class DataPoint {
        int timestamp;
        int heartrate;
    }

    @Override
    public void resetDataset() {
        mDataset.clear();
    }

    @Override
    public void addValue(Cursor c) {
        DataPoint dp = new DataPoint();
        dp.timestamp = c.getInt(c.getColumnIndex(HealthConstants.Common.CREATE_TIME));
        dp.heartrate =  c.getInt(c.getColumnIndex(HealthConstants.HeartRate.HEART_RATE));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
