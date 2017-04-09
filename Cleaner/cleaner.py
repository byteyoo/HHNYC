import json
from pprint import pprint

import datetime
from time import mktime


def createDayTimestamps(date):
    timestamp = int(mktime(date.timetuple()))
    bucket = {}
    while True:
        bucket[timestamp] = []
        timestamp += 30
        if timestamp > mktime(date.timetuple()) + 24 * 60:
            break
    return bucket


def createTimestampBucket():
    currentDate = datetime.datetime.now()
    zeroDate = datetime.datetime(year=currentDate.year, month=currentDate.month, day=currentDate.day)
    monthago = zeroDate - datetime.timedelta(days=60)

    result = {}
    while monthago < zeroDate:
        buckets = createDayTimestamps(monthago)
        result[int(mktime(monthago.timetuple()))] = buckets
        monthago += datetime.timedelta(days=1)

    return result


def processStepCount():
    data = None
    with open('./datasets/step_count_data.json') as data_file:
        data = json.load(data_file)

    result = {}
    for item in data:
        data_timestamp = int(item.get('timestamp')/1000)
        result[data_timestamp] = item.get('stepcount')
    return result


def sortCleanData(data, buckets):
    for k, v in data.iteritems():
        data_date = datetime.datetime.utcfromtimestamp(k)

        for timestamp, bucket in buckets.iteritems():
            bucket_date = datetime.datetime.utcfromtimestamp(timestamp)
            if bucket_date.date() != data_date.date(): # not same day
                continue

            for b, t in bucket.iteritems(): # iterate over buckets
                if int(b) < int(k) <= int(b + 30):
                    t.append(v)
    return buckets


def run():
    print 'Starting cleaner'
    buckets = createTimestampBucket()
    clean_data = processStepCount()
    step_count = sortCleanData(clean_data, buckets)
    json_data = {}
    for k, day in step_count.iteritems():
        inner = []
        for bucket, value in day.iteritems():
            total = 0
            for item in value:
                total += item
            inner.append({
                'timestamp': bucket,
                'stepcount': total
            })
        json_data[k] = inner

    with open('./datasets/step_count_clean_data.json', 'w') as outfile:
        json.dump(json_data, outfile)


if __name__ == '__main__':
    run()