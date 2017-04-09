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
        if item.get('exerciseType') and int(item.get('exerciseType')) > 100:
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
        meanSpeed = item.get('meanSpeed')
        if meanSpeed:
            meanSpeed = float(meanSpeed)
            if meanSpeed < 1.3:
                item['level'] = 1
            elif 1.3 < meanSpeed <= 1.6:
                item['level'] = 2
            else:
                item['level'] = 3

    with open('./datasets/exercise_flags.json', 'w') as outfile:
        json.dump(flaggedItems, outfile)


if __name__ == '__main__':
    run()