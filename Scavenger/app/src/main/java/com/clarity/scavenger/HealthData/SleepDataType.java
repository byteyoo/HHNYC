package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.util.ArrayList;

/**
 * Created by sajarora on 4/8/17.
 */

public class SleepDataType extends HealthDataType {

    private ArrayList<DataPoint> mDataset;

    public SleepDataType() {
        super(HealthConstants.Sleep.HEALTH_DATA_TYPE, "Sleep Data");
        mDataset = new ArrayList<>();
    }

    private class DataPoint {
        long startTime;
        long endTime;
    }

    @Override
    public void resetDataset() {
        mDataset.clear();
    }

    @Override
    public void addValue(Cursor c) {
        DataPoint dp = new DataPoint();
        dp.startTime =  c.getLong(c.getColumnIndex(HealthConstants.Sleep.START_TIME));
        dp.endTime =  c.getLong(c.getColumnIndex(HealthConstants.Sleep.END_TIME));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
