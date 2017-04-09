package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.util.ArrayList;

/**
 * Created by sajarora on 4/8/17.
 */

public class StepCountDataType extends HealthDataType {

    private class DataPoint {
        long timestamp;
        int stepcount;
    }

    private ArrayList<DataPoint> mDataset;

    public StepCountDataType() {
        super(HealthConstants.StepCount.HEALTH_DATA_TYPE, "Step Count Data");
        mDataset = new ArrayList<>();
    }

    @Override
    public void resetDataset() {
        mDataset.clear();
    }

    @Override
    public void addValue(Cursor c) {
        DataPoint dp = new DataPoint();
        dp.timestamp = c.getLong(c.getColumnIndex(HealthConstants.Common.CREATE_TIME));
        dp.stepcount = c.getInt(c.getColumnIndex(HealthConstants.StepCount.COUNT));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
