package com.clarity.scavenger;

import android.database.Cursor;
import android.util.Log;

import com.clarity.scavenger.HealthData.ExerciseDataType;
import com.clarity.scavenger.HealthData.HRDataType;
import com.clarity.scavenger.HealthData.HealthDataType;
import com.clarity.scavenger.HealthData.SleepDataType;
import com.clarity.scavenger.HealthData.StepCountDataType;
import com.samsung.android.sdk.healthdata.HealthConstants;
import com.samsung.android.sdk.healthdata.HealthDataResolver;
import com.samsung.android.sdk.healthdata.HealthDataResolver.Filter;
import com.samsung.android.sdk.healthdata.HealthDataResolver.ReadRequest;
import com.samsung.android.sdk.healthdata.HealthDataResolver.ReadResult;
import com.samsung.android.sdk.healthdata.HealthDataStore;
import com.samsung.android.sdk.healthdata.HealthResultHolder;

import java.util.Calendar;

/**
 * Created by sajarora on 4/8/17.
 */

public class HistoryGenerator {

    private final HealthDataStore mStore;
    private HealthDataType[] mDatatypes = new HealthDataType[]{
            new StepCountDataType(),
            new HRDataType(),
            new SleepDataType(),
            new ExerciseDataType()
    };

    HistoryGenerator(HealthDataStore store){
        mStore = store;
    }

    void getHistory(){
        for (int i = 0; i < mDatatypes.length; i++) {
            try {
                getDataforHealthDataType(i, mDatatypes[i]);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private void getDataforHealthDataType(int id, HealthDataType datatype) {
        HealthDataResolver resolver = new HealthDataResolver(mStore, null);
        long startTime = getStartTime();
        long endTime = System.currentTimeMillis();

        HealthDataResolver.Filter filter = Filter.and(Filter.greaterThanEquals(HealthConstants.SessionMeasurement.START_TIME, startTime),
                Filter.lessThanEquals(HealthConstants.SessionMeasurement.START_TIME, endTime));

        HealthDataResolver.ReadRequest request = new ReadRequest.Builder()
                .setDataType(datatype.uid)
                .setProperties(datatype.projection)
                .setFilter(filter)
                .build();
        try {
            resolver.read(request).setResultListener(new HealthDataListener(id));
        } catch (Exception e) {
            Log.e(MainActivity.APP_TAG, e.getClass().getName() + " - " + e.getMessage());
            Log.e(MainActivity.APP_TAG, "Getting " + datatype + " fails.");
        }
    }


    private long getStartTime(){
        Calendar start = Calendar.getInstance();
        start.add(Calendar.MONTH, -1);

        start.set(Calendar.HOUR_OF_DAY, 0);
        start.set(Calendar.MINUTE, 0);
        start.set(Calendar.SECOND, 0);
        start.set(Calendar.MILLISECOND, 0);
        return start.getTimeInMillis();
    }

    private class HealthDataListener implements HealthResultHolder.ResultListener<ReadResult> {

        private final int mHealthDataTypeIndex;

        public HealthDataListener(int healthDataTypeIndex){
            mHealthDataTypeIndex = healthDataTypeIndex;
        }

        @Override
        public void onResult(ReadResult result) {
            Cursor c = null;
            HealthDataType dataType = mDatatypes[mHealthDataTypeIndex];
            dataType.resetDataset();
            try {
                c = result.getResultCursor();
                if (c != null) {
                    while (c.moveToNext()) {
                        dataType.addValue(c);
                    }
                }
            } finally {
                if (c != null) {
                    c.close();
                }
            }

            MainActivity.getInstance().showDataFetchResult(dataType);
        }
    }

}
