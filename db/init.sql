create extension postgis;

drop table if exists locations cascade;

-- coords are in 'point(lon lat)' format
drop table if exists reviews;
create table reviews (
	review_id serial primary key,
	place_id text,
	rating integer,
	description text,
	location geography(point, 4326)
);

insert into reviews (place_id, rating, description, location) values ('ChIJAQAAQLgsDogR4nhjwflEdI0',3,'Poorly ventilated.',ST_GeographyFromText('point(-87.650023 41.850033)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ58kNPA0sDogR6yucEbr6wJ4',1,'If Satan''s got a favorite toilet, this is it.',ST_GeographyFromText('point(-87.627044 41.835205)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ_3C2OkcsDogR1HKmNkyMXPw',2,'No dividers between urinals. Very uncomfortable.',ST_GeographyFromText('point(-87.644086 41.837856)'));
insert into reviews (place_id, rating, description, location) values ('ChIJu-eVtX0rDogRnAL4r-ucyaM',4,'Probably cleaner than my bathroom at home if I''m being honest',ST_GeographyFromText('point(-87.616747 41.862269)'));
insert into reviews (place_id, rating, description, location) values ('ChIJXcZzy-0sDogRniPFXvsTG0k',2,'Beer shits.',ST_GeographyFromText('point(-87.642619 41.867896)'));
insert into reviews (place_id, rating, description, location) values ('ChIJxXdiNbwsDogRD9QuRBqUa_4',3,'Underwhelming.',ST_GeographyFromText('point(-87.631990 41.877576)'));
insert into reviews (place_id, rating, description, location) values ('ChIJlUbZ4qMsDogR3tCinMzzKUg',2,'Don''t poop here.',ST_GeographyFromText('point(-87.623708 41.879429)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ2WKRwsMsDogRbGtzLAXNAuw',4,'This place is pretty neat.',ST_GeographyFromText('point(-87.644221 41.879461)'));
insert into reviews (place_id, rating, description, location) values ('ChIJT7Wpyj4tDogRRAPwjAbwk5s',5,'Didn''t even wipe the seat down beforehand.',ST_GeographyFromText('point(-87.674224 41.880639)'));
insert into reviews (place_id, rating, description, location) values ('ChIJCWjBHBksDogRXpr-YYXUHBw',2,'Green room isn''t so green anymore if you know what I mean.',ST_GeographyFromText('point(-87.629745 41.885151)'));
insert into reviews (place_id, rating, description, location) values ('ChIJNVUIeFIrDogRDEzSrRwJnD0',3,'Was a 5/5 Stars, but I''m rating this after I finished.',ST_GeographyFromText('point(-87.607628 41.891359)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ82J3aie0D4gRS61ZAgdHF1E',2,'That''s not water on the floor.',ST_GeographyFromText('point(-87.907369 41.974102)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ9Sszh6YsDogRUUo6zu8_TQY',3,'Now we know why they call it the Bean.',ST_GeographyFromText('point(-87.623313 41.882647)'));
insert into reviews (place_id, rating, description, location) values ('ChIJu_tp4r4sDogRfYy4Xs5tDwE',4,'Really nice, but the bathroom attendant gave me stage fright.',ST_GeographyFromText('point(-87.635953 41.879104)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ-eSGa8EsDogRLv6BK1PHVGI',4,'The seat was still warm, but it actually felt kind of nice.',ST_GeographyFromText('point(-87.642168 41.879084)'));
insert into reviews (place_id, rating, description, location) values ('ChIJBdjcPqUsDogRolOtlb9TRko',4,'So many floors, so many bathrooms!',ST_GeographyFromText('point(-87.627556 41.883897)'));
insert into reviews (place_id, rating, description, location) values ('ChIJNbKQElTTD4gR9grNTX3s-bo',3,'Pubes abound.',ST_GeographyFromText('point(-87.622879 41.898750)'));
insert into reviews (place_id, rating, description, location) values ('ChIJ82J3aie0D4gRS61ZAgdHF1E',3,'I like planes.',ST_GeographyFromText('point(-87.907369 41.974102)'));