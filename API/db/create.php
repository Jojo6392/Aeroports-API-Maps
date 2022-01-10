<?php

$db = new SQLite3('store.db');

$db->exec("CREATE TABLE airports(id INTEGER PRIMARY KEY, name TEXT, latitude TEXT, longitude TEXT)");
$db->exec("INSERT INTO airports(name, latitude, longitude) VALUES('Aéroport Charles de Gaulle - Roissy', '49.0066334', '2.5220051')");
$db->exec("INSERT INTO airports(name, latitude, longitude) VALUES('Hartsfield Airport - Atlanta', '33.6407282', '-84.4277001')");
$db->exec("INSERT INTO airports(name, latitude, longitude) VALUES('Hongqiao Airport - Shanghai', '31.1925243', '121.3309125')");

$db->exec("CREATE TABLE users(id INTEGER PRIMARY KEY, login TEXT, password TEXT, role TEXT)");
$db->exec("INSERT INTO users(login, password, role) VALUES('admin', 'admin', 'admin')");
$db->exec("INSERT INTO users(login, password, role) VALUES('client', 'client', 'client')");
$db->exec("INSERT INTO users(login, password, role) VALUES('edit', 'edit', 'edit')");

echo "airports table created\n";
