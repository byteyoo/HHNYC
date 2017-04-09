package com.clarity.scavenger.HealthData;

import android.database.Cursor;

/**
 * Created by sajarora on 4/8/17.
 */

public abstract class HealthDataType {

    public final String uid;
    public String[] projection;
    public final String simpleName;

    HealthDataType(String uid, String simpleName) {
        this.uid = uid;
        this.simpleName = simpleName;
    }

    HealthDataType(String uid, String simpleName, String[] projection){
        this.uid = uid;
        this.simpleName = simpleName;
        this.projection = projection;
    }

    public abstract void resetDataset();
    public abstract void addValue(Cursor c);
    public abstract String getJson();
}
