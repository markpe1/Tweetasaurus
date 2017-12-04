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
def getRecursiveWord(result, j):
	if(result[j]["word"] in badWords or result[j]["word"] in ignoreWords):
		return getRecursiveWord(result, j + 5)
	else:
		entry = result[j]
		word = result[j]["word"]
		lenOfTags = len(entry["tags"])
		partOfSpeech = getPartOfSpeech(entry["tags"][lenOfTags-1])
		comparison = decodeAndCombine(word, partOfSpeech)
		return comparison

with open('finalOutput.txt', 'rb+') as output:
	#I removed faggot cause it broke it 
	badWords = {"fagot", "faggot", "fuckwit", "cocksucker", "dumbass", "asshat", "shithead", "prick", "horseshit", "dogshit", "shitty", "apeshit", "arsehole", "asshole", "bastard", "bitch", "bollocks", "bullshit", "bunghole", "butthole","cock", "cunt", "dickhead", "fucker", "fucking", "goddamn", "jackass", "motherfucker", "penis", "pussy", "fucker","damn", "shit", "slut", "puss", "fuck", "ass", "whore", "fag", "dick", "cock"}
	#words sense2vec can't process
	ignoreWords = {'walk out', 'disagree with', 'hawkshaw', 'sporting lady', 'kitty-cat', 'walk out' 'disagree with', 'bust up', 'come down', 'resort to', 'lavigne', 'birth control', 'slip up', 'one another', 'get over', 'each other', 'feel for', 'go out','shut up', 'rid of', 'look after', 'white people', 'suck off', 'preanal', 'fingerer', 'dasypygal', 'effluvium', 'shitfaced', 'misbegotten', 'illegitimate child', 'backbite', 'bollix', 'screw up', 'fuck up', 'mess up', 'shnook', 'stopcock', 'poove', 'bally', 'zany','glans', 'purulent',  'slattern', 'fornicatress', 'loose woman', 'slovenly woman', 'douche bag', 'numskull', 'buncombe', 'cocotte', 'cyprian' }
	model = sense2vec.load()
	with open('OffensiveWords12_2.csv', 'rU') as csvfile:
		spamreader = csv.reader(csvfile)
		overallCos = 0; 
		numOfWords = 0; 
		for row in spamreader:
			#at some point we need to determine what these words are from the input
			numOfWords = numOfWords + 1
			queryWord = row[0].rstrip()
			if(queryWord != "faggot"):
				#print(queryWord)
				output.write(queryWord)
				output.write(',')
				combined = decodeAndCombine(queryWord, '|NOUN')
				freq, query_vector = model[combined]
				sumOfCos = 0;
				jsonData = getJsonData(queryWord)
				index = 0
				count = 0
				entries = []
				for i in range(0, 5):
					entries.append(getRecursiveWord(jsonData, i))
				#print entries
				for entry in entries:
					freq, query_vector2 = model[entry]
					num = model.data.similarity(query_vector, query_vector2)
					sumOfCos = num + sumOfCos
				avg = sumOfCos/5
				output.write(str(avg))
				output.write('\n')
				overallCos = overallCos + avg;
				#print avg
		#print overallCos/numOfWords
		output.write(str(overallCos/numOfWords))
