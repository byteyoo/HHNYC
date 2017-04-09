package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.util.ArrayList;

/**
 * Created by sajarora on 4/8/17.
 */

public class ExerciseDataType extends HealthDataType {

    private class DataPoint {
        long startTime;
        long endTime;
        int calorie;
        int exerciseType;
        int distance;
        int maxHR;
        int minHR;
    }

    private ArrayList<DataPoint> mDataset;

    public ExerciseDataType() {
        super(HealthConstants.Exercise.HEALTH_DATA_TYPE, "Exercise Data");
        mDataset = new ArrayList<>();
    }

    @Override
    public void resetDataset() {
        mDataset.clear();
    }

    @Override
    public void addValue(Cursor c) {
        DataPoint dp = new DataPoint();
        dp.startTime = c.getLong(c.getColumnIndex(HealthConstants.SessionMeasurement.START_TIME));
        dp.endTime = c.getLong(c.getColumnIndex(HealthConstants.SessionMeasurement.END_TIME));
        dp.calorie = c.getInt(c.getColumnIndex(HealthConstants.Exercise.CALORIE));
        dp.exerciseType = c.getInt(c.getColumnIndex(HealthConstants.Exercise.EXERCISE_TYPE));
        dp.distance = c.getInt(c.getColumnIndex(HealthConstants.Exercise.DISTANCE));
        dp.maxHR = c.getInt(c.getColumnIndex(HealthConstants.Exercise.MAX_HEART_RATE));
        dp.minHR = c.getInt(c.getColumnIndex(HealthConstants.Exercise.MIN_HEART_RATE));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
