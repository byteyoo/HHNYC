package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.util.ArrayList;

/**
 * Created by sajarora on 4/8/17.
 */

public class SleepStageDataType extends HealthDataType {

    private class DataPoint {
        long startTime;
        long endTime;
        String stage;
    }

    private ArrayList<DataPoint> mDataset;

    public SleepStageDataType() {
        super(HealthConstants.SleepStage.HEALTH_DATA_TYPE, "Sleep Stage Data");
        mDataset = new ArrayList<>();
    }

    @Override
    public void resetDataset() {
        mDataset.clear();
    }

    @Override
    public void addValue(Cursor c) {
        DataPoint dp = new DataPoint();
        dp.startTime = c.getInt(c.getColumnIndex(HealthConstants.SessionMeasurement.START_TIME));
        dp.endTime = c.getInt(c.getColumnIndex(HealthConstants.SessionMeasurement.END_TIME));
        dp.stage = c.getString(c.getColumnIndex(HealthConstants.SleepStage.STAGE));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
