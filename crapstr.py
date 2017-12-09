from flask import Flask, url_for, render_template, g, jsonify, request
import requests
import json
import psycopg2
import psycopg2.extras
import os
import urlparse

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/location', methods=['GET','POST'])
def locations():
	if request.method == 'POST':
		with get_db() as db:
			with db.cursor() as cur:
				cur.execute("insert into reviews (place_id, rating, description, location) values (%s, %s, %s, ST_GeographyFromText('point(%s %s)'))", (request.form['placeId'], request.form['rating'], request.form['description'], float(request.form['lon']), float(request.form['lat']),))
		return ''
	with get_db() as db:
		with db.cursor() as cur:
			cur.execute("select place_id, avg(rating) as avg, ST_AsGeoJSON(location) as location from reviews where ST_Distance(location, ST_GeographyFromText('point(%s %s)')) < 5000 group by place_id, location", (float(request.args['lon']), float(request.args['lat']),))
			locations = []
			for row in cur.fetchall():
				location = json.loads(row['location'])
				locations.append({'placeId': row['place_id'], 'lat': location['coordinates'][1], 'lon': location['coordinates'][0], 'avg': float(row['avg'])})
			return jsonify(locations)

@app.route('/location/<string:place_id>')
def location(place_id):
	with get_db() as db:
		with db.cursor() as cur:
			cur.execute('select place_id, ST_AsGeoJSON(location) as location from reviews where place_id=%s', (place_id,))
			row = cur.fetchone()
			if not row:
				return jsonify('')
			loc = json.loads(row['location'])
			return jsonify({'placeId': row['place_id'], 'lat': loc['coordinates'][1], 'lon': loc['coordinates'][0]})

@app.route('/reviews', methods=['POST'])
def reviews():
	if request.method == 'POST':
		with get_db() as db:
			with db.cursor() as cur:
				cur.execute("insert into reviews (place_id, rating, description) values (%s, %s, %s)", (request.form['placeId'], request.form['rating'], request.form['description'],))
	return ''

@app.route('/reviews/<string:place_id>')
def reviews_for(place_id):
	with get_db() as db:
		with db.cursor() as cur:
			cur.execute('select rating, description from reviews where place_id=%s', (place_id,))
			reviews = [{'rating': row['rating'], 'description': row['description']} for row in cur.fetchall()]
			avg = 0
			if reviews:
				cur.execute('select avg(rating) from reviews where place_id=%s', (place_id,))
				avg = round(2*float(cur.fetchone()[0]))/2
			return jsonify(placeId=place_id, reviews=reviews, avg=avg)

@app.route('/map_js')
def map_js():
	url = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCWJcO-gIheo7bBxqkBh1y-5ZCo1BBiuaE&libraries=places"
	r = requests.get(url)
	return r.text

def connect_db():
    """Connects to the specific database."""
    urlparse.uses_netloc.append("postgres")
    url = urlparse.urlparse(os.environ["DATABASE_URL"])
    conn = psycopg2.connect(database=url.path[1:], user=url.username, password=url.password, host=url.hostname, port=url.port, cursor_factory=psycopg2.extras.DictCursor)
    return conn

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'db'):
        g.db = connect_db()
    return g.db

if __name__ == '__main__':
	app.run(debug=True)