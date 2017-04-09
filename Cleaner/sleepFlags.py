import csv
import json
from pprint import pprint


def openCsv(file):
    with open(file, mode='r') as infile:
        reader = csv.DictReader(infile)
        result = [row for row in reader]
        infile.close()
    return result

RANGE = 10 * 60 * 1000

def run():
    print 'Starting flag grabber'

    result = openCsv('./datasets/clarity-combined.csv')
    flaggedItems = []
    for index, item in enumerate(result):
        timestamp_item = item.get('timestamp')
        if item.get('sleep') and int(item.get('sleep')) == 1:
            candidates = []
            while index > 0:
                index -= 1
                candidate = result[index]
                if int(candidate.get('timestamp')) > int(timestamp_item) - RANGE:
                    candidates.append(candidate)
                else:
                    break
            item['candidates'] = candidates
            flaggedItems.append(item)

    print "total: " + str(len(flaggedItems)) + " found"

    for item in flaggedItems:
        try:
            duration = (float(item.get('endTime')) - float(item.get('startTime'))) * -1 / 60/60/1000
        except:
            continue

        print duration

        if duration:
            if duration < 4:
                item['level'] = 3
            elif 4 < duration <= 6:
                item['level'] = 2
            else:
                item['level'] = 1

    with open('./datasets/sleep_flags.json', 'w') as outfile:
        json.dump(flaggedItems, outfile)


if __name__ == '__main__':
    run()