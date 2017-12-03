import csv
import sense2vec
import urllib2
import json
def getPartOfSpeech(speechValue):
	if speechValue == "n":
                return '|NOUN'
	elif speechValue == "v":
		return '|VERB'
	elif speechValue == "adj": 
		return '|ADJ'
	elif speechValue == "adv":
		return '|ADV'
	else:
		return '|NOUN'

def decodeAndCombine(string1, string2): 
	return string1.decode('utf-8-sig') + string2.decode('utf-8-sig')

def getJsonData(offensiveWord):
	req = "https://api.datamuse.com/words?ml="
	word = offensiveWord.decode('utf-8-sig').rstrip()
	reqCombined = req + word
	response = urllib2.urlopen(reqCombined)
        return json.loads(response.read())

with open('output.txt', 'rb+') as output: 
	model = sense2vec.load()
	with open('OffensiveWords12_2.csv', 'rU') as csvfile:
		spamreader = csv.reader(csvfile)
		overallCos = 0; 
		numOfWords = 0; 
		for row in spamreader:
			#at some point we need to determine what these words are from the input
			numOfWords = numOfWords + 1
			queryWord = row[0].rstrip()
			output.write(queryWord)
			output.write(',')
			combined = decodeAndCombine(queryWord, '|NOUN')
			freq, query_vector = model[combined]
			sumOfCos = 0;
			jsonData = getJsonData(queryWord)
			index = 0
			count = 0
			while(count < 5):
				#get next entry
				entry = jsonData[index]
				#get word 
				word = entry["word"]
				if (word == 'misbegotten' 	
					or word == 'illegitimate child'
					or word == 'backbite'
					or word == 'bollix'
					or word == 'screw up'
					or word == 'fuck up'
					or word == 'mess up'
					or word == 'shnook'
					or word == 'stopcock'
					or word == 'poove'
					or word == 'bally'
					or word == 'zany'
					or word == 'glans'
					or word == 'purulent'
					or word == "slattern"
					or word == 'fornicatress'
					or word == 'loose woman'
					or word == 'slovenly woman'
					or word == 'douche bag'
					or word == 'numskull'
					or word == 'buncombe'
					or word == 'cocotte'
					or word == 'cyprian'):
					index = index + 1
				else:
					#get part of speech - check for undefined
					lenOfTags = len(entry["tags"])
					partOfSpeech = getPartOfSpeech(entry["tags"][lenOfTags-1])
					comparison = decodeAndCombine(word, partOfSpeech)
					freq, query_vector2 = model[comparison]
					num = model.data.similarity(query_vector, query_vector2)
					sumOfCos = num + sumOfCos
					count = count + 1
					index = index + 1
			avg = sumOfCos/5
			output.write(str(avg))
			output.write('\n')
			overallCos = overallCos + avg;
			print avg
			print ""
		print overallCos/numOfWords
		output.write(str(overallCos/numOfWords))
