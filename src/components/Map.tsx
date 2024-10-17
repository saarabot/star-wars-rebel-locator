import React, { useEffect, useRef } from 'react';
import { Feature, Map, View } from 'ol';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import countriesUrl from '@/data/countries.json?url';
import iconUrl from '@/assets/BlackRedMountain.svg?url';
import { fromLonLat } from 'ol/proj';
import { SecretObject } from '@/App';
import { Point } from 'ol/geom';
import { boundingExtent } from 'ol/extent';

interface MapComponentProps {
  targets: SecretObject[];
}

const MapComponent: React.FC<MapComponentProps> = ({ targets }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapContainer.current && !mapRef.current) {
      mapRef.current = new Map({
        target: mapContainer.current,
        layers: [
          new VectorLayer({
            background: '#1a2b39',
            source: new VectorSource({
              url: countriesUrl,
              format: new GeoJSON(),
            }),
            style: new Style({
              stroke: new Stroke({
                color: 'yellow',
                width: 2,
              }),
            }),
          }),
        ],
        view: new View({
          center: fromLonLat([0, 25]),
          zoom: 3,
        }),
      });

      // Set onclick location on map
      const locationSource = new VectorSource();
      const locationLayer = new VectorLayer({
        source: locationSource,
      });

      mapRef.current.on('click', (event) => {
        locationSource.clear();

        const coordinates = event.coordinate;
        const newMarker = new Feature({
          geometry: new Point(coordinates),
          icon: iconUrl,
        });

        locationSource.addFeature(newMarker);
      });
      mapRef.current.addLayer(locationLayer);
    }
  }, []);

  useEffect(() => {
    if (targets.length > 0 && mapRef.current) {
      const markerStyle = new Style({
        image: new Icon({
          src: iconUrl,
          scale: 0.12,
        }),
      });

      const markerSource = new VectorSource();
      const markerLayer = new VectorLayer({
        source: markerSource,
      });

      targets.forEach((target) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([target.long, target.lat])),
          info: target.id,
          icon: iconUrl,
        });
        feature.setStyle(markerStyle);
        markerSource.addFeature(feature);
      });
      mapRef.current.addLayer(markerLayer);

      // Zoom to fit all markers
      const extent = boundingExtent(
        markerSource.getFeatures().map((feature) => {
          const geometry = feature.getGeometry();
          return geometry ? (geometry as Point).getCoordinates() : [0, 0];
        })
      );
      mapRef.current
        .getView()
        .fit(extent, { duration: 1000, padding: [200, 50, 50, 50] });
    }
  }, [targets]);

  return (
    <div
      style={{
        height: '100%',
        minHeight: '200px',
        width: '100%',
        position: 'relative',
      }}
      className='mr-1'
    >
      <div
        ref={mapContainer}
        style={{ height: '500px' }}
        className='border-2 border-amber-400'
      ></div>
    </div>
  );
};

export default MapComponent;
