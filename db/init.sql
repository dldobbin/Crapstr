drop table if exists locations cascade;
create table locations (
	place_id text primary key,
	location point
);

insert into locations values ('ChIJAQAAQLgsDogR4nhjwflEdI0',(41.850033, -87.650023));
insert into locations values ('ChIJ58kNPA0sDogR6yucEbr6wJ4',(41.835205, -87.627044));
insert into locations values ('ChIJ_3C2OkcsDogR1HKmNkyMXPw',(41.837856, -87.644086));
insert into locations values ('ChIJu-eVtX0rDogRnAL4r-ucyaM',(41.862269, -87.616747));
insert into locations values ('ChIJXcZzy-0sDogRniPFXvsTG0k',(41.867896, -87.642619));
insert into locations values ('ChIJxXdiNbwsDogRD9QuRBqUa_4',(41.877576, -87.631990));
insert into locations values ('ChIJlUbZ4qMsDogR3tCinMzzKUg',(41.879429, -87.623708));
insert into locations values ('ChIJ2WKRwsMsDogRbGtzLAXNAuw',(41.879461, -87.644221));
insert into locations values ('ChIJT7Wpyj4tDogRRAPwjAbwk5s',(41.880639, -87.674224));
insert into locations values ('ChIJCWjBHBksDogRXpr-YYXUHBw',(41.885151, -87.629745));
insert into locations values ('ChIJNVUIeFIrDogRDEzSrRwJnD0',(41.891359, -87.607628));
insert into locations values ('ChIJ82J3aie0D4gRS61ZAgdHF1E',(41.974102, -87.907369));
insert into locations values ('ChIJu_tp4r4sDogRfYy4Xs5tDwE',(41.879104, -87.635953));
insert into locations values ('ChIJ-eSGa8EsDogRLv6BK1PHVGI',(41.879084, -87.642168));
insert into locations values ('ChIJBdjcPqUsDogRolOtlb9TRko',(41.883897, -87.627556));
insert into locations values ('ChIJNbKQElTTD4gR9grNTX3s-bo',(41.898750, -87.622879));
insert into locations values ('ChIJ9Sszh6YsDogRUUo6zu8_TQY',(41.882647, -87.623313));

drop table if exists reviews;
create table reviews (
	review_id serial primary key,
	place_id text references locations(place_id) on delete cascade,
	rating integer,
	description text
);

insert into reviews (place_id, rating, description) values ('ChIJAQAAQLgsDogR4nhjwflEdI0',3,'Poorly ventilated.');
insert into reviews (place_id, rating, description) values ('ChIJ58kNPA0sDogR6yucEbr6wJ4',1,'If Satan\'s got a favorite toilet, this is it.');
insert into reviews (place_id, rating, description) values ('ChIJ_3C2OkcsDogR1HKmNkyMXPw',2,'No dividers between urinals. Very uncomfortable.');
insert into reviews (place_id, rating, description) values ('ChIJu-eVtX0rDogRnAL4r-ucyaM',4,'Probably cleaner than my bathroom at home if I\'m being honest');
insert into reviews (place_id, rating, description) values ('ChIJXcZzy-0sDogRniPFXvsTG0k',2,'Beer shits.');
insert into reviews (place_id, rating, description) values ('ChIJxXdiNbwsDogRD9QuRBqUa_4',3,'Underwhelming.');
insert into reviews (place_id, rating, description) values ('ChIJlUbZ4qMsDogR3tCinMzzKUg',2,'Don\'t poop here.');
insert into reviews (place_id, rating, description) values ('ChIJ2WKRwsMsDogRbGtzLAXNAuw',4,'This place is pretty neat.');
insert into reviews (place_id, rating, description) values ('ChIJT7Wpyj4tDogRRAPwjAbwk5s',5,'Didn\'t even wipe the seat down beforehand.');
insert into reviews (place_id, rating, description) values ('ChIJCWjBHBksDogRXpr-YYXUHBw',2,'Green room isn\'t so green anymore if you know what I mean.');
insert into reviews (place_id, rating, description) values ('ChIJNVUIeFIrDogRDEzSrRwJnD0',3,'Was a 5/5 Stars, but I\'m rating this after I finished.');
insert into reviews (place_id, rating, description) values ('ChIJ82J3aie0D4gRS61ZAgdHF1E',2,'That\'s not water on the floor.');
insert into reviews (place_id, rating, description) values ('ChIJ9Sszh6YsDogRUUo6zu8_TQY',3,'Now we know why they call it the Bean.');
insert into reviews (place_id, rating, description) values ('ChIJu_tp4r4sDogRfYy4Xs5tDwE',4,'Really nice, but the bathroom attendant gave me stage fright.');
insert into reviews (place_id, rating, description) values ('ChIJ-eSGa8EsDogRLv6BK1PHVGI',4,'The seat was still warm, but it actually felt kind of nice.');
insert into reviews (place_id, rating, description) values ('ChIJBdjcPqUsDogRolOtlb9TRko',4,'So many floors, so many bathrooms!');
insert into reviews (place_id, rating, description) values ('ChIJNbKQElTTD4gR9grNTX3s-bo',3,'Pubes abound.');
insert into reviews (place_id, rating, description) values ('ChIJ82J3aie0D4gRS61ZAgdHF1E',3,'I like planes.');