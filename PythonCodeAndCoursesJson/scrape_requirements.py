import requests
import pprint
import json

sector_url_dict = {
	'Society': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=S&cls=10', 'code': 'society'},
	'History And Tradition': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=H&cls=10', 'code': 'history-tradition'},
	'Arts and Letters': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=A&cls=10', 'code': 'arts-letters'},
	'Humanities and Social Science': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=O&req[]=B&cls=10', 'code': 'humanities-soc'},
	'Living World': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=L&cls=10', 'code': 'living-world'},
	'Physical World': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=P&cls=10', 'code': 'physical-world'},
	'Natural Sciences and Mathematics': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=N&req[]=B&cls=10', 'code': 'natural-sciences'}
}

# sector_url_dict = {
	# 'Living World': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=L&cls=10',
# }

foundation_url_dict = {
	'Quantitative Data Analysis': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?type=M&cls=10', 'code': 'quant-data'},
	'Formal Reasoning & Analysis': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?type=FR&cls=10', 'code': 'formal-reasoning'},
	'Cross Cultural Analysis': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?type=C1&cls=10', 'code': 'cross-cult'},
	'Cultural Diversity in the U.S.': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?type=C2&cls=10', 'code': 'cultural-div'},
	'Language': {'url': 'https://apps.sas.upenn.edu/genreq/results.php?req[]=M&cls=10', 'code': 'language'}
}


semester = 'SPRING 20'

def combine_sectors_and_foundations(sectors, foundations):
	all = []
	for sector_course_id, course_d in sectors.copy().items():
		if sector_course_id not in foundations:
			new_course = course_d.copy()
			new_course['dataFoundational'] = ''
			new_course['foundational'] = ''
			all.append(new_course)
		else:
			new_course = course_d.copy()
			new_course['foundational'] = foundations[sector_course_id]['sector']
			new_course['dataFoundational'] = foundations[sector_course_id]['dataSector']
			all.append(new_course)
			# print('new poo', new_course)
	# now add remainting foundations
	for foundation_course_id, course_d in foundations.copy().items():
		if foundation_course_id in sectors: continue
		new_course = course_d.copy()
		new_course['foundational'] = new_course['sector']
		new_course['dataFoundational'] = new_course['dataSector']
		new_course['sector'] = ''
		new_course['dataSector'] = ''

		all.append(new_course)
	return all

def turn_array_into_d_with_course_id(arr):
	d = {}
	for a in arr:
		d[a['courseID']] = a
	return d

def turn_valids_into_d(valids):
	valid_ds = []
	for valid in valids:
		# print("VALID", valid)
		if len(valid) < 5:
			print('INVALID VALID', valid)
			continue
		d = {
			'courseName': valid[0],
			'courseID': valid[1],
			'term': valid[2],
			'sector': valid[3],
			'dataSector': valid[4]
		}
		valid_ds.append(d)
	return valid_ds

def start_scrape(sector_or_foundation='sector'):
	valids = []
	url_d = sector_url_dict if sector_or_foundation == 'sector' else foundation_url_dict
	for sector_name, body in url_d.items():
		sector = sector_name
		text = requests.get(body['url']).text
		classes = text.split(" <TR class = ''>")

		past = []

		for c in classes:
			parts = c.split('<TD>')
			for part in parts:
				if '</TR>' in part:
					part = part[0:part.index('</TR>')]
				part = part.replace('</TD>', '').strip()
				if part[0].isupper() or '1000' in part:
					# print("*****")
					# print(part)
					past.append(part)
					if semester in part:
						past.append(sector)
						past.append(body['code'])
						valids.append(past[-5:])
						past = []
	return valids

sectors_d = turn_valids_into_d(start_scrape('sector'))
foundations_d = turn_valids_into_d(start_scrape('foundation'))

print(len(sectors_d))
print(len(foundations_d))

sectors = turn_array_into_d_with_course_id(sectors_d)
foundations = turn_array_into_d_with_course_id(foundations_d)

all = combine_sectors_and_foundations(sectors, foundations)
# pprint.pprint(all)

open('courses.json', 'w').write(json.dumps(all))