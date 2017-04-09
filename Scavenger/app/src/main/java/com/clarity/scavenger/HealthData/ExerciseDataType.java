package com.clarity.scavenger.HealthData;

import android.database.Cursor;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.samsung.android.sdk.healthdata.HealthConstants;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.GZIPInputStream;

/**
 * Created by sajarora on 4/8/17.
 */

public class ExerciseDataType extends HealthDataType {

    public class LiveData {
        long start_time = 0L;
        float heart_rate = 0.f;
        float cadence = 0.f;
        float count = 0.f;
        float power = 0.f;
        float speed = 0.f;
    }

    public ArrayList<LiveData> getLiveData(byte[] zip) throws IOException, JsonSyntaxException {
        // decompress ZIP
        final int BUFFER_SIZE = 1024*1000;
        ByteArrayInputStream bis = new ByteArrayInputStream(zip);
        GZIPInputStream gis = new GZIPInputStream(bis, BUFFER_SIZE);
        StringBuilder jsonBuilder = new StringBuilder();
        byte[] data = new byte[BUFFER_SIZE];
        int bytesRead;
        while ((bytesRead = gis.read(data)) != -1) {
            jsonBuilder.append(new String(data, 0, bytesRead));
        }
        gis.close();
        bis.close();

        // translate JSON string to data class
        ArrayList<LiveData> liveData = new ArrayList<LiveData>();
        Gson gson = new Gson();
        liveData = gson.fromJson(jsonBuilder.toString(), new TypeToken<List<LiveData>>() {}.getType());
        return liveData;
    }

    private class DataPoint {
        long startTime;
        long endTime;
        int calorie;
        int exerciseType;
        float distance;
        ArrayList<LiveData> liveData;
        float meanSpeed;

        void setLiveData(byte[] data){
            try {
                this.liveData = getLiveData(data);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
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
        dp.distance = c.getFloat(c.getColumnIndex(HealthConstants.Exercise.DISTANCE));
//        dp.setLiveData(c.getBlob(c.getColumnIndex(HealthConstants.Exercise.LIVE_DATA)));
        dp.meanSpeed = c.getFloat(c.getColumnIndex(HealthConstants.Exercise.MEAN_SPEED));
        mDataset.add(dp);
    }

    @Override
    public String getJson() {
        Gson output = new Gson();
        return output.toJson(mDataset);
    }
}
