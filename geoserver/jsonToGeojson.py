# Generate GeoJSON from JSON data file
import geojson
import json

# Load the JSON data
with open('resources/geodata/morotur_routes_list.json', 'r') as file:
    data = json.load(file)
    features = []
    for route in data:
        feature = geojson.Feature(
            geometry=geojson.Point((float(route['lon']), float(route['lat']))),
            properties={
                'name': route['name'],
                'grade': int(route['grade']),
                'type': int(route['type']),
                'url': route['url']
            }
        )
        features.append(feature)

# Create a FeatureCollection
feature_collection = geojson.FeatureCollection(features)

# Save to GeoJSON file
with open('resources/geodata/morotur_routes.geojson', 'w') as geojson_file:
    geojson.dump(feature_collection, geojson_file)
print("GeoJSON file created successfully.")


